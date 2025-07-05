"use client"

import styles from '@/app/(commonSite)/[locale]/page.module.css';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';


export default function Dating () {

    const dating = useTranslations("HeaderComponents");

    const [date, setDate] = useState(new Date());
    const months : string[] = [
        dating("Dating.months.jan"), dating("Dating.months.feb"), dating("Dating.months.mar"), dating("Dating.months.apr"),
        dating("Dating.months.may"), dating("Dating.months.jun"), dating("Dating.months.jul"), dating("Dating.months.aug"),
        dating("Dating.months.sep"), dating("Dating.months.oct"), dating("Dating.months.nov"), dating("Dating.months.dec"),
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

    const weatherWeekday = useTranslations("HeaderComponents");

    const [date, setDate] = useState(new Date());
    const weekdays : string[] = [
        weatherWeekday("WeatherWeekday.weekdays.sun"),
        weatherWeekday("WeatherWeekday.weekdays.mon"),
        weatherWeekday("WeatherWeekday.weekdays.tue"),
        weatherWeekday("WeatherWeekday.weekdays.wed"),
        weatherWeekday("WeatherWeekday.weekdays.thu"),
        weatherWeekday("WeatherWeekday.weekdays.fri"),
        weatherWeekday("WeatherWeekday.weekdays.sat"),
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
