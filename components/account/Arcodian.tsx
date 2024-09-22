"use client";

import style from "../../styles/arcodian.module.css";
import { ReactNode, useState } from "react";

interface IAccordionProps {
  title: string;
  children: ReactNode;
}
export default function arcodian({ title, children }: IAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={style.wrap}>
      <div className={style.header} onClick={toggleAccordion}>
        <p>{title}</p>

        <div
          style={{
            transform: isOpen ? "rotate(180deg)" : undefined,
            transition: "all ease-in-out 0.3s",
          }}
        >
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg.png"
          >
            <path
              d="M4.83625 5.83185L10 10.9843L15.1637 5.83185L16.75 7.4181L10 14.1681L3.25 7.4181L4.83625 5.83185Z"
              fill="#cdcdcd"
            />
          </svg>
        </div>
      </div>

      {isOpen && <div className={style.content}>{children}</div>}
    </div>
  );
}
