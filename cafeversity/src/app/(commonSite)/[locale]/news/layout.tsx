"use client";

import React from "react";
// import CommonLayout from "@/components/CommonLayout";
import ThreeSubLinks from "@/components/ThreeSubLinks";
import styles from "@/app/(commonSite)/[locale]/page.module.css";
import TwoMainBottomButtons from "@/components/MainBottomButtons";
import { usePathname } from "next/navigation";


type buttonDatum = {
    path: string,
    id_style: string,
    button_name: string,
}// These types are for the TwoMainBottomButtons Component's array in 'data' variable and are the same in OptionData interface

export default function Layout ({ children }: Readonly<{children: React.ReactNode}>) {

    const pathname = usePathname();
    // console.log("actual pathname -->", pathname);

    const buttonsData : buttonDatum[] = [
        { path: `${pathname.slice(0, 3)}/commonMenu`, id_style: styles.food_today, button_name: "Сённяшнія Стравы" },
        { path: pathname.slice(0, 3), id_style: styles.main_view, button_name: "Галоўная старонка" },
    ];

    return (
        <>
        {/* <CommonLayout> */}{/* I removed it into layout.tsx; RootLayout Component */}
            <ThreeSubLinks>
                {children}
            </ThreeSubLinks>
            <TwoMainBottomButtons data={buttonsData} />
        {/* </CommonLayout> */}
        </>
    )
}
