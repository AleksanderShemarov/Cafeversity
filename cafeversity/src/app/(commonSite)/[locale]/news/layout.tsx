"use client";

import React from "react";
// import ThreeSubLinks from "@/components/ThreeSubLinks";
import styles from "@/app/(commonSite)/[locale]/page.module.css";
import TwoMainBottomButtons from "@/components/MainBottomButtons";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


type buttonDatum = {
    path: string,
    id_style: string,
    button_name: string,
}

export default function Layout ({ children }: Readonly<{children: React.ReactNode}>) {

    const pathname = usePathname();
    // console.log("actual pathname -->", pathname);

    const newsPage = useTranslations("NewsPage");

    const buttonsData : buttonDatum[] = [
        { path: `${pathname.slice(0, 3)}/commonMenu`, id_style: styles.food_today, button_name: newsPage("bottomButtons.left") },
        { path: pathname.slice(0, 3), id_style: styles.main_view, button_name: newsPage("bottomButtons.right") },
    ];

    return (
        <>
            {/* <ThreeSubLinks> */}
                {children}
            {/* </ThreeSubLinks> */}
            <TwoMainBottomButtons data={buttonsData} />
        </>
    )
}
