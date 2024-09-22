"use client";

import style from "../../styles/accountdetail.module.css";
import Copy from "../../file/Icons/copy.svg";
import kakaopay from "../../file/Icons/kakaopay.png";
import toss from "../../file/Icons/toss.png";

interface IAccountProps {
  name: string;
  relation: string;
  bank: string;
  account: string;
  kakaopayAccount?: string;
  tossAccount?: string;
}

export default function accountDetail({
  name,
  relation,
  bank,
  account,
  kakaopayAccount,
  tossAccount,
}: IAccountProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(account).then(
      () => {
        alert("계좌번호가 복사되었습니다.");
      },
      () => {
        alert("계좌번호 복사에 실패했습니다.");
      }
    );
  };
  return (
    <div className={style.wrap}>
      <div className={style.info}>
        <span className={style.relation}>{relation}</span>
        <span className={style.name}>{name}</span>
      </div>
      <div className={style.detail}>
        <div>
          {bank} {account}
        </div>
        <button className={style.copybutton} onClick={handleCopy}>
          <img className={style.img} src={Object(Copy).src} />
        </button>
      </div>
      <div className={style.accountlink}>
        {kakaopayAccount && (
          <button
            className={style.accountbutton}
            // ref={Object(kakaopayAccount).src}
            // target="_blank"
            rel="noreferrer"
          >
            <img
              className={style.kakaopayimg}
              src={`${kakaopay}`}
              alt="kakaopay"
            />
          </button>
        )}
        {tossAccount && (
          <button
            className={style.accountbutton}
            //   href={`${tossAccount}`}
            //   target="_blank"
            rel="noreferrer"
          >
            <img className={style.tossimg} src={`${toss}`} alt="toss" />
          </button>
        )}
      </div>
    </div>
  );
}
