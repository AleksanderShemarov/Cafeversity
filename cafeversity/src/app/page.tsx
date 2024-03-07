"use client"

import styles from "./page.module.css";
// import './globals.css';
import Link from "next/link";
import Image from "next/image";
import sunny from '../../public/sunny.png';
import { useEffect, useState } from "react";


export default function Home() {

  let date = new Date();
  const months : string[] = [
    "Студзень", "Люты", "Сакавік", "Красавік",
    "Травень", "Чэрвень", "Ліпень", "Жнівень",
    "Верасень", "Кастрычнік", "Лістапад", "Снежань",
  ];

  const [time, setTime] = useState(date);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, [])

  return (
    <>
      <div id={styles.header}>
        <div id={styles.weather}>
          <div id={styles.weather_icon}>
            <Image src={sunny} alt="sunny_day" width={46} height={46}></Image>
          </div>
          <div id={styles.weather_line}>
            <p id={styles.weather_degrees}>+22&#176;C</p>
          </div>
        </div>
        <div id={styles.clock}>
          <p id={styles.clock_time}>
            {time.getHours() >= 10 ? "" : "0"}{time.getHours()}:
            {time.getMinutes() >= 10 ? "" : "0"}{time.getMinutes()}:
            {time.getSeconds() >= 10 ? "" : "0"}{time.getSeconds()}
          </p>
        </div>
        <div id={styles.date}>
            <p id={styles.current_date}>
              {`${months[date.getMonth()]}, ${date.getDay()}`}<br />{date.getFullYear()}
            </p>
        </div>
      </div>
      <div className="main_part">
        <h1>Галоўная старонка, дзе карыстальнік будзе вітацца.</h1>
      </div>
      <div className={styles.buttons}>
        <Link href="/commonMenu" id={styles.food_today}>
          Сённяшнія Стравы
          {/* <p className={styles.button_name}>Сённяшнія Стравы</p> */}
        </Link>
        <Link href="/news" id={styles.food_news}>
          Ежа Свету
          {/* <p className={styles.button_name}>Ежа Свету</p> */}
        </Link>
      </div>
    </>
  );
}
