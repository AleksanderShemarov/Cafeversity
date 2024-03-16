import styles from "@/app/page.module.css";
import Image from "next/image";
import sunny from "../../public/sunny.png";
import dynamic from "next/dynamic";
import Dating, {WeatherWeekday} from "@/components/Dating";


export default function CommonHeader () {

    const Clock = dynamic(
        () => import('@/components/Clock'), {
            ssr: false,            
        }
    )
    /* Server and Client have different clock time (the first has the previous time; the second – the next time).
    From this moment we call Clock component as a dynamic component*/

    return (
        <>
            <div id={styles.header}>
                <div id={styles.weather}>
                    <div id={styles.weather_icon}>
                        <Image src={sunny} alt="sunny_day" width={46} height={46}></Image>
                    </div>
                    <WeatherWeekday />
                </div>
                <Clock />
                <Dating />
            </div>
        </>
    )
}