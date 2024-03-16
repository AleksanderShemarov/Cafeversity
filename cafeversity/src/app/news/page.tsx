import Link from "next/link";
import styles from "../page.module.css";
import styles2 from "@/app/news/news.module.css"
import CommonLayout from "@/components/CommonLayout";
import ThreeSubLinks from "@/components/ThreeSubLinks";
import WorldFood from "./worldfood/page";


export default function NewsPage() {

    return (
        <CommonLayout>
            <ThreeSubLinks>
                <WorldFood id={styles2.main_part} />
            </ThreeSubLinks>
            {/* <div id={styles.main_part}>
                <h1>Старонка з навінамі з сусвету ежы</h1>
            </div> */}
            <div className={styles.buttons}>
                <Link href="/commonMenu" id={styles.food_today}>Сённяшнія Стравы</Link>
                <Link href="/" id={styles.main_view}>Галоўная старонка</Link>
            </div>
        </CommonLayout>
    )
}
