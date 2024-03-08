"use client"

import styles from "@/app/page.module.css";
import Image from "next/image";
import sunny from "../../public/sunny.png";
import { useState, useEffect } from "react";


export default function CommonHeader () {

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
                        {`
                        ${time.getHours() >= 10 ? "" : "0"}${String(time.getHours())}:
                        ${time.getMinutes() >= 10 ? "" : "0"}${String(time.getMinutes())}:
                        ${time.getSeconds() >= 10 ? "" : "0"}${String(time.getSeconds())}
                        `}
                    </p>
                </div>
                <div id={styles.date}>
                    <p id={styles.current_date}>
                        {`${months[date.getMonth()]}, ${date.getDay()}`}<br />{date.getFullYear()}
                    </p>
                </div>
            </div>
        </>
    )
}