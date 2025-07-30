"use client"

import styles from "@/app/(commonSite)/[locale]/page.module.css";
import { useState, useEffect } from "react";


/*
// It was the first written type of a Clock component.
// If you wanted to use it, you had to add 'dynamic()' function for its correct working.
//
// const Clock = dynamic(() => import('@/components/Clock'), { ssr: false, })


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
                {`T1 
                ${time.getHours() >= 10 ? "" : "0"}${time.getHours()} :
                ${time.getMinutes() >= 10 ? "" : "0"}${time.getMinutes()} :
                ${time.getSeconds() >= 10 ? "" : "0"}${time.getSeconds()}
                `}
            </p>
        </div>
    )
}
*/

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
            <p id={styles.clock_time}>T2 {currentHour} : {currentMinute} : {currentSecond}</p>
        </div>
    )
}

export function Clock3 () {
    const [date, setDate] = useState<Date|null>(null);

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        }
    }, []);

    return (
        <div id={styles.clock}>
            <p id={styles.clock_time}>
                T3 {date ? date.getHours() : "00"} : {date ? date.getMinutes() : "00"} : {date ? date.getSeconds() : "00"}
            </p>
        </div>
    )
}
