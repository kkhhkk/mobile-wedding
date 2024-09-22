"use client";

import style from "../styles/countdown.module.css";
import React, { useEffect, useState } from "react";

interface IDateProps {
  weddingDate: string;
  groomName: string;
  brideName: string;
}

const calculateTimeLeft = (weddingDate) => {
  let timeLeft = [];
  const now = new Date().getTime();
  const deadline = new Date(weddingDate).getTime();
  const time = deadline - now;
  const day = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  timeLeft = [day, hours, minutes, seconds];
  return timeLeft;
};

export default function countdown({
  weddingDate,
  groomName,
  brideName,
}: IDateProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(weddingDate));
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);
  });
  const day = Number(timeLeft[0].toString()) + 1;
  return (
    <div>
      <div className={style.wrap}>
        <div className={style.block}>
          <div>
            <h2 suppressHydrationWarning>{timeLeft[0].toString()}</h2>
            <span>일</span>
          </div>
        </div>
        <div className={style.block}>
          <div>
            <h2 suppressHydrationWarning>{timeLeft[1].toString()}</h2>
            <span>시</span>
          </div>
        </div>
        <div className={style.block}>
          <div>
            <h2 suppressHydrationWarning>{timeLeft[2].toString()}</h2>
            <span>분</span>
          </div>
        </div>
        <div className={style.block}>
          <div>
            <h2 suppressHydrationWarning>{timeLeft[3].toString()}</h2>
            <span>초</span>
          </div>
        </div>
      </div>
      <div className={style.alt}>
        <span>
          {groomName} ❤️ {brideName}의 결혼식이{" "}
        </span>
        <span className={style.daycolor}>{day}</span>
        <span> 일 남았습니다.</span>
      </div>
    </div>
  );
}
