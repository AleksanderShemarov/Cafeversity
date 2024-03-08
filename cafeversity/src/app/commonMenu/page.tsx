import Link from "next/link";
import styles from "../page.module.css";
import CommonLayout from "@/components/CommonLayout";


export default function CommonMenuPage() {

    return (
        <CommonLayout>
            <div id={styles.main_part}>
                <h1>Просты спіс ежы на сённяшні дзень.</h1>
            </div>
            <div className={styles.buttons}>
                <Link href="/" id={styles.food_news}>Галоўная старонка</Link>
                <Link href="/news" id={styles.main_view}>Ежа Свету</Link>
            </div>
        </CommonLayout>
    )
}
