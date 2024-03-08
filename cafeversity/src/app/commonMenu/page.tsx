"use client"

import Link from "next/link";
import styles from "../page.module.css";
import sunny from "../../../public/sunny.png";
import { useState, useEffect } from "react";
import Image from "next/image";


export default function CommonMenuPage() {

    const [date, setDate] = useState(new Date());
    const months : string[] = [
        "Студзень", "Люты", "Сакавік", "Красавік",
        "Травень", "Чэрвень", "Ліпень", "Жнівень",
        "Верасень", "Кастрычнік", "Лістапад", "Снежань",
    ];

    const [time, setTime] = useState(date);

    useEffect(() => {
        setInterval(() => {
            setTime(new Date());
            if (String(time.getHours()) === "00" && String(time.getMinutes()) === "00" && String(time.getSeconds) === "00") {
                setDate(time);
            }
        }, 1000);
    }, [time])

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
            <div id={styles.main_part}>
                <h1>Просты спіс ежы на сённяшні дзень.</h1>
            </div>
            <div className={styles.buttons}>
                <Link href="/" id={styles.food_news}>Галоўная старонка</Link>
                <Link href="/news" id={styles.main_view}>Ежа Свету</Link>
            </div>
        </>
    )
}
