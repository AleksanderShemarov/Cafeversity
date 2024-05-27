"use client"

import styles from "@/app/page.module.css";
import { useState, useEffect } from "react";


export default function Clock () {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, [])


    return (
        <div id={styles.clock}>
            <p id={styles.clock_time}>
                {`Type1 
                ${time.getHours() >= 10 ? "" : "0"}${time.getHours()} :
                ${time.getMinutes() >= 10 ? "" : "0"}${time.getMinutes()} :
                ${time.getSeconds() >= 10 ? "" : "0"}${time.getSeconds()}
                `}
            </p>
        </div>
    )
}

export function Clock2 () {

    const [currentHour, setCurrentHour] = useState<number>(0);
    const [currentMinute, setCurrentMinute] = useState<number>(0);
    const [currentSecond, setCurrentSecond] = useState<number>(0);

    useEffect(() => {
        const date = new Date();

        const hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
        
        const timer = setInterval(() => {
            setCurrentHour(hour);
            setCurrentMinute(minute);
            setCurrentSecond(second);
        }, 1000);

        return () => clearInterval(timer);
    }, [currentHour, currentMinute, currentSecond]);


    return (
        <div id={styles.clock}>
            <p id={styles.clock_time}>Type2 {currentHour} : {currentMinute} : {currentSecond}</p>
        </div>
    )
}