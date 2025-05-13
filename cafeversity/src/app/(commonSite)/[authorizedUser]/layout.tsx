"use client";

import React from "react";
import BottomMenu, { BottomButtonsContext } from "@/components/BottomMenu/BottomMenu";
import { usePathname } from "next/navigation";


type bottomBtns = {
    name: string,
    icon: string,
    icon_alt: string,
    topMargin?: number,
    path?: string,
}

export default function Layout ({ children }: Readonly<{children: React.ReactNode}>) {

    const pathname = usePathname()?.substring(1);
    console.log(pathname);

    let BottomBtns: bottomBtns[];

    if (pathname?.includes("/settingsPage")) {
        BottomBtns = [
            { name: "Меню", icon: "/menu_list_icon.webp", icon_alt: "Menu_List_Icon", topMargin: 50, },
            { name: "Агульная", icon: "/account_icon.png", icon_alt: "Account_Icon",
                path: `/${pathname.substring(0, pathname.lastIndexOf("/"))}` },
            { name: "Навіны", icon: "/earth_planet.webp", icon_alt: "Earth_Icon", topMargin: 50, },
        ];
    } else {
        BottomBtns = [
            { name: "Налады акаўнту", icon: "/settings-gear.png", icon_alt: "Settings_Icon",
            topMargin: 50, path: `/${pathname}/settingsPage` },
            { name: "Меню", icon: "/menu_list_icon.webp", icon_alt: "Menu_List_Icon", },
            { name: "Навіны", icon: "/earth_planet.webp", icon_alt: "Earth_Icon",
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
