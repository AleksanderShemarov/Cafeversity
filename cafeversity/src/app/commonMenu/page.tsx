import Link from "next/link";
import styles from "./commonMenu.module.css";
// import CommonLayout from "@/components/CommonLayout";
import FoodList from "@/components/FoodList";


export default function CommonMenuPage() {

    return (
        <>
        {/* <CommonLayout> */}{/* I removed it into layout.tsx; RootLayout Component */}
            <div id={styles.main_part}>
                <h1>Просты спіс ежы на сённяшні дзень.</h1>
                <FoodList />
            </div>
            <div className={styles.buttons}>
                <Link href="/" id={styles.food_news}>Галоўная старонка</Link>
                <Link href="/news/foodpeople" id={styles.main_view}>Ежа Свету</Link>
            </div>
        {/* </CommonLayout> */}
        </>
    )
}
