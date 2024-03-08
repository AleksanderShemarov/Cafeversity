import styles from "@/app/page.module.css";
import Image from "next/image";
import sunny from "../../public/sunny.png";
import dynamic from "next/dynamic";


export default function CommonHeader () {

    let date = new Date();
    const months : string[] = [
        "Студзень", "Люты", "Сакавік", "Красавік",
        "Травень", "Чэрвень", "Ліпень", "Жнівень",
        "Верасень", "Кастрычнік", "Лістапад", "Снежань",
    ];

    const Clock = dynamic(
        () => import('@/components/Clock'), {
            ssr: false,            
        }
    )

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
                <Clock />
                <div id={styles.date}>
                    <p id={styles.current_date}>
                        {`${months[date.getMonth()]}, ${date.getDay()}`}<br />{date.getFullYear()}
                    </p>
                </div>
            </div>
        </>
    )
}