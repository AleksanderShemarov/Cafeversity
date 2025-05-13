"use client";

import React from "react";
import BottomMenu, { BottomButtonsContext } from "@/components/BottomMenu/BottomMenu";
import { usePathname } from "next/navigation";

import { useTranslations } from "next-intl";


type bottomBtns = {
    name: string,
    icon: string,
    icon_alt: string,
    topMargin?: number,
    path?: string,
}


export default function Layout ({ children }: Readonly<{ children: React.ReactNode }>) {

    const pathname = usePathname()?.substring(1);

    const t = useTranslations("MainUserPage");

    let BottomBtns: bottomBtns[];

    if (pathname?.includes("/settingsPage")) {
        BottomBtns = [
            { name: t("vanishingNavbar.menu"), icon: "/menu_list_icon.webp", icon_alt: "Menu_List_Icon", topMargin: 50, },
            { name: t("vanishingNavbar.main"), icon: "/account_icon.png", icon_alt: "Account_Icon",
                path: `/${pathname.substring(0, pathname.lastIndexOf("/"))}` },
            { name: t("vanishingNavbar.news"), icon: "/earth_planet.webp", icon_alt: "Earth_Icon", topMargin: 50, },
        ];
    } else {
        BottomBtns = [
            { name: t("vanishingNavbar.settings"), icon: "/settings-gear.png", icon_alt: "Settings_Icon",
            topMargin: 50, path: `/${pathname}/settingsPage` },
            { name: t("vanishingNavbar.menu"), icon: "/menu_list_icon.webp", icon_alt: "Menu_List_Icon", },
            { name: t("vanishingNavbar.news"), icon: "/earth_planet.webp", icon_alt: "Earth_Icon",
            topMargin: 50, },
        ];  
    }

    return (
        <>
            <BottomButtonsContext.Provider value={BottomBtns}>
                {children}
                <BottomMenu />
            </BottomButtonsContext.Provider>
        </>
    )
}
