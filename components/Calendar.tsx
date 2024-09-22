"use client";

import style from "../styles/calendar.module.css";
import "react-calendar/dist/Calendar.css";
import React from "react";
import { Calendar } from "react-calendar";
import moment from "moment";

export default function calendar() {
  const defaultDate = new Date(2024, 10, 10);

  const dayList = ["2024-11-10"];

  const addContent = ({ date }: any) => {
    if (dayList.find((day) => day === moment(date).format("YYYY-MM-DD")))
      return <div>❤️</div>;
  };
  return (
    <div className={style.cal_container}>
      <Calendar
        locale="ko"
        defaultValue={defaultDate}
        formatDay={(locale, date) => moment(date).format("DD")}
        calendarType="gregory"
        view="month"
        prev2Label={null}
        next2Label={null}
        tileContent={addContent}
        showNeighboringMonth={false}
      />
    </div>
  );
}
