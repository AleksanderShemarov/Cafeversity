import styles from "./page.module.css";
import Greeting from "@/components/Greeting";
import TwoMainBottomButtons from "@/components/MainBottomButtons";
import Link from "next/link";


type buttonDatum = {
    path: string,
    id_style: string,
    button_name: string,
}// These types are for the TwoMainBottomButtons Component's array in 'data' variable and are the same in OptionData interface

export default function Home() {

    const buttonsData : buttonDatum[] = [
        { path: "/commonMenu", id_style: styles.food_today, button_name: "Сённяшнія Стравы" },
        { path: "/news/foodpeople", id_style: styles.food_news, button_name: "Ежа Свету" },
    ];

    return (
        <>
            <div id={styles.main_part}>
                <h1>Галоўная старонка, дзе карыстальнік будзе вітацца.</h1>
                <Greeting />

                {/* Часовае рашэнне (Temporary Solution) */}
                <Link href="/admin/dashboard" style={{ fontSize: "2.5rem" }}>Admin&#39;s Page (Dashboard)</Link>
                {/*  */}
            </div>
            <TwoMainBottomButtons data={buttonsData}/>
        </>
    );
}
