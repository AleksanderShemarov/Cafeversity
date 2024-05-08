import React from "react";
// import CommonLayout from "@/components/CommonLayout";
import ThreeSubLinks from "@/components/ThreeSubLinks";
import Link from "next/link";
import styles from "@/app/page.module.css";
import TwoMainBottomButtons from "@/components/MainBottomButtons";


type buttonDatum = {
    path: string,
    id_style: string,
    button_name: string,
}// These types are for the TwoMainBottomButtons Component's array in 'data' variable and are the same in OptionData interface

export default function Layout ({ children }: Readonly<{children: React.ReactNode}>) {

    const buttonsData : buttonDatum[] = [
        { path: "/commonMenu", id_style: styles.food_today, button_name: "Сённяшнія Стравы" },
        { path: "/", id_style: styles.main_view, button_name: "Галоўная старонка" },
    ];

    return (
        <>
        {/* <CommonLayout> */}{/* I removed it into layout.tsx; RootLayout Component */}
            <ThreeSubLinks>
                {children}
            </ThreeSubLinks>
            {/* <div className={styles.buttons}>
                <Link href="/commonMenu" id={styles.food_today}>Сённяшнія Стравы</Link>
                <Link href="/" id={styles.main_view}>Галоўная старонка</Link>
            </div> */}
            <TwoMainBottomButtons data={buttonsData} />
        {/* </CommonLayout> */}
        </>
    )
}
