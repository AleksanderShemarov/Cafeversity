import Link from "next/link";
import styles from "../page.module.css";


export default function CommonMenuPage() {
    return (
        <>
            <h1>Просты спіс ежы на сённяшні дзень.</h1>
            <div className={styles.buttons}>
                <Link href="/news" id={styles.food_news}>Ежа Свету</Link>
                <Link href="/" id={styles.main_view}>Галоўная старонка</Link>
            </div>
        </>
    )
}
