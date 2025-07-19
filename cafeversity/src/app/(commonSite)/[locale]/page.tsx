"use client";

import styles from "./page.module.css";
import Greeting from "@/components/Greeting";
import TwoMainBottomButtons from "@/components/MainBottomButtons";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


type buttonDatum = {
    path: string,
    id_style: string,
    button_name: string,
}// These types are for the TwoMainBottomButtons Component's array in 'data' variable and are the same in OptionData interface

export default function Home() {

    const pathname = usePathname();
    // console.log("actual pathname -->", pathname);

    const greetings = useTranslations("GreetingPage");

    const buttonsData : buttonDatum[] = [
        { path: `${pathname}/commonMenu`, id_style: styles.food_today, button_name: greetings("bottomButtons.left") },
        { path: `${pathname}/news/foodpeople`, id_style: styles.food_news, button_name: greetings("bottomButtons.right") },
    ];

    return (
        <>
            <div id={styles.main_part}>
                {/* <h1>Галоўная старонка, дзе карыстальнік будзе вітацца.</h1> */}
                <Greeting />
            </div>
            <TwoMainBottomButtons data={buttonsData}/>
        </>
    );
}
