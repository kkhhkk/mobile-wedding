"use client";

import style from "../../styles/map.module.css";
import Location from "../Map/Location";

interface IMapInfoProps {
  address1: string;
  address2: string;
  naverMap: string;
  kakaoMap: string;
  lat: number;
  lon: number;
}

export default function map({
  address1,
  address2,
  naverMap,
  kakaoMap,
  lat,
  lon,
}: IMapInfoProps) {
  return (
    <div>
      <div className={style.title}>오시는 길</div>
      <div>
        <h3>{address1}</h3>
        <span>{address2}</span>
      </div>
      <Location lat={lat} lon={lon} />
      <div className={style.button}>
        <button onClick={() => window.open(naverMap)}>네이버 지도</button>
        <button onClick={() => window.open(kakaoMap)}>카카오맵</button>
      </div>
    </div>
  );
}
