"use client";

import style from "../styles/guestbook.module.css";
import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { db } from "../firebase"; // Firebase 설정 파일을 가져옴
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import bcrypt from "bcryptjs";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  passwordHash: string;
}
export default function guestbook() {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(
    []
  );

  useEffect(() => {
    // const fetchGuestbookEntries = async () => {
    //   const querySnapshot = await getDocs(collection(db, "guestbook"));
    //   const entries = querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   })) as GuestbookEntry[];
    //   setGuestbookEntries(entries);
    // };
    // fetchGuestbookEntries();
    const unsubscribe = onSnapshot(collection(db, "guestbook"), (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GuestbookEntry[];
      setGuestbookEntries(entries);
    });
    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || !password) {
      alert("All fields are required!");
      return;
    }
    // 제출 후 필드 초기화
    setName("");
    setMessage("");
    setPassword("");
    try {
      // 비밀번호 해시 처리
      const passwordHash = await bcrypt.hash(password, 10);
      // Firestore 컬렉션에 데이터 추가
      await addDoc(collection(db, "guestbook"), {
        name,
        message,
        passwordHash, // 해시된 비밀번호 저장
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const handleDelete = async (id: string, inputPassword: string) => {
    const entry = guestbookEntries.find((entry) => entry.id === id);
    if (!entry) return;

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(inputPassword, entry.passwordHash);
    if (isMatch) {
      // Firestore에서 데이터 삭제
      await deleteDoc(doc(db, "guestbook", id));
      setGuestbookEntries(guestbookEntries.filter((entry) => entry.id !== id));
    } else {
      alert("Incorrect password");
    }
  };

  const handleUpdate = async (
    id: string,
    inputPassword: string,
    newMessage: string
  ) => {
    const entry = guestbookEntries.find((entry) => entry.id === id);
    if (!entry) return;

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(inputPassword, entry.passwordHash);
    if (isMatch) {
      // Firestore에서 데이터 업데이트
      await updateDoc(doc(db, "guestbook", id), { message: newMessage });
      setGuestbookEntries(
        guestbookEntries.map((e) =>
          e.id === id ? { ...e, message: newMessage } : e
        )
      );
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div>
      <div className={style.title}>방명록</div>
      <div className={style.list}>
        <ul>
          {guestbookEntries.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.name}:</strong> {entry.message}
              <button
                onClick={() => {
                  const inputPassword = prompt(
                    "Enter your password to delete:"
                  );
                  if (inputPassword) handleDelete(entry.id, inputPassword);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  const inputPassword = prompt(
                    "Enter your password to update:"
                  );
                  const newMessage = prompt("Enter new message:");
                  if (inputPassword && newMessage)
                    handleUpdate(entry.id, inputPassword, newMessage);
                }}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form className={style.formwrap} onSubmit={handleSubmit}>
        <input
          className={style.input}
          placeholder="이름"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <div className={style.passwordContainer}>
          <input
            className={style.input}
            placeholder="비밀번호"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <div className={style.icon} onClick={togglePasswordVisibility}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}{" "}
          </div>
        </div>
        <textarea
          className={style.textarea}
          placeholder="메시지"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
        />
        <button className={style.button} type="submit">
          등록
        </button>
      </form>
    </div>
  );
}
