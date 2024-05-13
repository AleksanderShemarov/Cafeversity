// import Link from "next/link";
import styles from "./commonMenu.module.css";
// import CommonLayout from "@/components/CommonLayout";
import FoodList from "@/components/FoodList";
import TwoMainBottomButtons from "@/components/MainBottomButtons";


type buttonDatum = {
    path: string,
    id_style: string,
    button_name: string,
}// These types are for the TwoMainBottomButtons Component's array in 'data' variable and are the same in OptionData interface

export default function CommonMenuPage() {

    const buttonsData : buttonDatum[] = [
        { path: "/", id_style: styles.food_news, button_name: "Галоўная старонка" },
        { path: "/news/foodpeople", id_style: styles.food_news, button_name: "Ежа Свету" },
    ];

    return (
        <>
        {/* <CommonLayout> */}{/* I removed it into layout.tsx; RootLayout Component */}
            <div id={styles.main_part}>
                <h1>Просты спіс ежы на сённяшні дзень.</h1>
                <FoodList />
            </div>
            {/* <div className={styles.buttons}>
                <Link href="/" id={styles.food_news}>Галоўная старонка</Link>
                <Link href="/news/foodpeople" id={styles.main_view}>Ежа Свету</Link>
            </div> */}
            <TwoMainBottomButtons data={buttonsData} />
        {/* </CommonLayout> */}
        </>
    )
}
