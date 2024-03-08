import styles from "./page.module.css";
import Link from "next/link";
import CommonLayout from "@/components/CommonLayout";


export default function Home() {

    return (
        <CommonLayout>
            <div id={styles.main_part}>
                <h1>Галоўная старонка, дзе карыстальнік будзе вітацца.</h1>
            </div>
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
        </CommonLayout>
    );
}
