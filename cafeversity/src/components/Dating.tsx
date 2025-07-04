"use client"

import styles from '@/app/(commonSite)/[locale]/page.module.css';
import { useState, useEffect } from 'react';


export default function Dating () {

    const [date, setDate] = useState(new Date());
    const months : string[] = [
        "Студзень", "Люты", "Сакавік", "Красавік",
        "Травень", "Чэрвень", "Ліпень", "Жнівень",
        "Верасень", "Кастрычнік", "Лістапад", "Снежань",
    ];

    useEffect(() => {
        setInterval(() => {
            if (`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` === "0:0:0") {
                setDate(new Date());
            }
        }, 1000);
    }, [date]);

    return (
        <div id={styles.date}>
            <p id={styles.current_date}>
                {`${months[date.getMonth()]}, ${date.getDate()}`}<br />{date.getFullYear()}
            </p>
        </div>
    )
}

export function WeatherWeekday() {

    const [date, setDate] = useState(new Date());
    const weekdays : string[] = [
        "Нд", "Пн", "Аў", "Ср", "Чц", "Пт", "Сб",
    ];

    useEffect(() => {
        setInterval(() => {
            if (`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` === "0:0:0") {
                setDate(new Date());
            }
        }, 1000);
    }, [date]);

    return (
        <div id={styles.weather_line}>
            <p id={styles.weather_degrees}>+22&#176;C, {weekdays[date.getDay()]}</p>
        </div>
    )

}
