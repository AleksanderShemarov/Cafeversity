import Link from "next/link";
import styles from "../page.module.css";


export default function CommonMenuPage() {
    return (
        <>
            <h1>Просты спіс ежы на сённяшні дзень.</h1>
            <div className={styles.buttons}>
                <Link href="/" id={styles.food_news}>Галоўная старонка</Link>
                <Link href="/news" id={styles.main_view}>Ежа Свету</Link>
            </div>
        </>
    )
}
