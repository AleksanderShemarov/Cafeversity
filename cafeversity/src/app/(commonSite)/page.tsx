import styles from "./page.module.css";
// import CommonLayout from "@/components/CommonLayout";
import Greeting from "@/components/Greeting";
import TwoMainBottomButtons from "@/components/MainBottomButtons";


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
        {/* <CommonLayout> */}{/* I removed it into layout.tsx; RootLayout Component */}
            <div id={styles.main_part}>
                <h1>Галоўная старонка, дзе карыстальнік будзе вітацца.</h1>
                <Greeting />
            </div>
            <TwoMainBottomButtons data={buttonsData}/>
        {/* </CommonLayout> */}
        </>
    );
}
