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
                {`
                ${time.getHours() >= 10 ? "" : "0"}${time.getHours()} :
                ${time.getMinutes() >= 10 ? "" : "0"}${time.getMinutes()} :
                ${time.getSeconds() >= 10 ? "" : "0"}${time.getSeconds()}
                `}
            </p>
        </div>
    )
}
