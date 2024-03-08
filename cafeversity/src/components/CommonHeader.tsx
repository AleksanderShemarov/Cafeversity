import styles from "@/app/page.module.css";
import Image from "next/image";
import sunny from "../../public/sunny.png";
import dynamic from "next/dynamic";
import Dating from "@/components/Dating";


export default function CommonHeader () {

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
                <Dating />
            </div>
        </>
    )
}