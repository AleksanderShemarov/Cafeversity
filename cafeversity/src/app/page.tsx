import styles from "./page.module.css";
import Link from "next/link";
// import CommonLayout from "@/components/CommonLayout";
import Greeting from "@/components/Greeting";


export default function Home() {

    return (
        <>
        {/* <CommonLayout> */}{/* I removed it into layout.tsx; RootLayout Component */}
            <div id={styles.main_part}>
                <h1>Галоўная старонка, дзе карыстальнік будзе вітацца.</h1>
                <Greeting />
            </div>
            <div className={styles.buttons}>
                <Link href="/commonMenu" id={styles.food_today}>
                    Сённяшнія Стравы
                    {/* <p className={styles.button_name}>Сённяшнія Стравы</p> */}
                </Link>
                <Link href="/news/foodpeople" id={styles.food_news}>
                    Ежа Свету
                    {/* <p className={styles.button_name}>Ежа Свету</p> */}
                </Link>
            </div>
        {/* </CommonLayout> */}
        </>
    );
}
