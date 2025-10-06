"use client"

import styles from '@/app/(commonSite)/[locale]/page.module.css';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';


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


interface WeatherData {
    temperature: number,
    condition: string,
    icon: string,
    humidity: number,
    wind: number,
    location: string
}


export function WeatherWeekday() {

    const weatherWeekday = useTranslations("HeaderComponents");

    const [weatherForecast, setWeatherForecast] = useState<WeatherData|null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchWeather() {
        setLoading(true);

        const response = await fetch("http://localhost:3000/api/weatherForecast", { cache: "no-store" });
        const result = await response.json();
        setWeatherForecast(result.data);

        setLoading(false);
    }

    useEffect(() => {
        fetchWeather();

        const interval = setInterval(fetchWeather, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

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
        <div id={styles.weather}>
            <div>
                {loading
                ? <Image src="/no_image1.jpg" alt="no_image1" width={20} height={20} />
                : <Image src={`http:${weatherForecast?.icon}`} alt={`${weatherForecast?.condition}`} width={64} height={64} />
                }
            </div>
            <div id={styles.weather_line}>
                {loading
                ? <p id={styles.weather_degrees}>... {weekdays[date.getDay()]}</p>
                : <p id={styles.weather_degrees}>
                    {weatherForecast!.temperature > 0 ? "+" : ""}
                    {Math.round(weatherForecast!.temperature)}&#176;C, {weekdays[date.getDay()]}
                </p>
                }
            </div>
        </div>
    )
}
