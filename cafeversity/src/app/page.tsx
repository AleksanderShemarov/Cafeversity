import styles from "./page.module.css";
// import './globals.css';
import Link from "next/link";
import Image from "next/image";
import sunny from '../../public/sunny.png';


export default function Home() {

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
        <div id={styles.clock}></div>
        <div id={styles.date}></div>
      </div>
      <h1>Галоўная старонка, дзе карыстальнік будзе вітацца.</h1>
      <div className={styles.buttons}>
        <Link href="/commonMenu" id={styles.food_today}>
          Сённяшнія Стравы
          {/* <p className={styles.button_name}>Сённяшнія Стравы</p> */}
        </Link>
        <Link href="/news" id={styles.food_news}>
          Ежа Свету
          {/* <p className={styles.button_name}>Ежа Свету</p> */}
        </Link>
      </div>
    </>
  );
}
