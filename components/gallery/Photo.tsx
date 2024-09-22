"use client";

import style from "../../styles/photo.module.css";
import "photoswipe/style.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import images from "../gallery/Image";
import React, { useRef, useState } from "react";

export default function photo() {
  const [isMoreView, setIsMoreView] = useState(false);
  const scrollRef = useRef(null);
  const onClickImageMoreViewButton = () => {
    setIsMoreView(!isMoreView);
    isMoreView === true
      ? window.scrollTo({ top: window.scrollY - 1500, behavior: "smooth" })
      : window.scrollTo({ top: 3000, behavior: "smooth" });
  };
  return (
    <div className={style.wrap}>
      <div className={style.text}>갤러리</div>
      <div
        className={style.imgwrap}
        style={{
          maxHeight: isMoreView ? "" : "60vh",
        }}
      >
        {isMoreView && <div className={style.overlay}></div>}
        <Gallery>
          <div className={style.gallery}>
            {images.map((image, index) => {
              return (
                <Item
                  key={index}
                  cropped
                  original={`${image.source}`}
                  thumbnail={`${image.source}`}
                  width={image.width}
                  height={image.height}
                >
                  {({ ref, open }) => (
                    <img
                      className={style.img}
                      alt={image.alt}
                      src={`${image.source}`}
                      ref={ref}
                      onClick={open}
                    />
                  )}
                </Item>
              );
            })}
          </div>
        </Gallery>
      </div>

      <div className={style.button} onClick={onClickImageMoreViewButton}>
        <div>
          {isMoreView === false ? (
            <svg
              width="35"
              height="35"
              fill="none"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg.png"
            >
              <path
                d="M4.83625 5.83185L10 10.9843L15.1637 5.83185L16.75 7.4181L10 14.1681L3.25 7.4181L4.83625 5.83185Z"
                fill="#cdcdcd"
              />
            </svg>
          ) : (
            <svg
              width="35"
              height="35"
              fill="none"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg.png"
            >
              <path
                d="M4.83625 14.1681L10 9.0156L15.1637 14.1681L16.75 12.5818L10 5.83185L3.25 12.5818L4.83625 14.1681Z"
                fill="#cdcdcd"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
