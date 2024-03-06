import styles from "./page.module.css";
// import './globals.css';
import Link from "next/link";


export default function Home() {

  return (
    <>
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
