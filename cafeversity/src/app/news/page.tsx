import Link from "next/link";
import styles from "../page.module.css";


export default function NewsPage() {
    return (
        <>
            <h1>Старонка з навінамі з сусвету ежы</h1>
            <div className={styles.buttons}>
                <Link href="/commonMenu" id={styles.food_today}>Сённяшнія Стравы</Link>
                <Link href="/" id={styles.main_view}>Галоўная старонка</Link>
            </div>
        </>
    )
}
