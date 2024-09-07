"use client";

import { BottomButtonsContext } from "@/components/BottomMenu/BottomMenu";
import BottomMenu from "@/components/BottomMenu/BottomMenu";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import { useState } from "react";
import setStyles from "./settings.module.css";


type bottomBtns = {
    name: string,
    icon: string,
    icon_alt: string,
    topMargin?: number,
    path?: string,
}


export default function SettingsPage({ params }: { params: { authorizedUser: string } }) {

    const { authorizedUser } = params;

    const BottomBtns: bottomBtns[] = [
        { name: "Меню", icon: "/menu_list_icon.webp", icon_alt: "Menu_List_Icon", topMargin: 50, },
        { name: "Агульная", icon: "/account_icon.png", icon_alt: "Account_Icon",
            path: `/${authorizedUser}` },
        { name: "Навіны", icon: "/earth_planet.webp", icon_alt: "Earth_Icon", topMargin: 50, },
    ];

    const parts: string[] = ["Common Settings", "Tasties & Body Constitution", "Page Appearance"];

    const [checking, setChecking] = useState<boolean[]>([true, false, false]);

    const switching = (index: number) => {
        const newParts = Array(checking.length).fill(false);
        newParts[index] = !(checking[index]);
        setChecking(newParts);
    }

    return (
        <>
            <h2 style={{ fontFamily: "Consolas, monospace" }}>Account Settings</h2>
            <hr style={{ backgroundColor: "black", height: "3px" }} />
            <div style={{
                // border: "3px solid black",
                display: "flex",
                fontFamily: "Consolas, monospace",
                fontSize: "20px",
            }}>
                {parts.map((part, index) =>
                    <p
                        key={index}
                        onClick={() => switching(index)}
                        className={setStyles.bar_link}
                        style={{
                            color: checking[index] ? "#714efe" : "black",
                            borderBottom: checking[index] ? "3px solid #714efe" : "none",
                        }}
                    >
                        {part}
                    </p>
                )}
            </div>
            <ImageEditor />
            <p>There will be another settings: ...</p>
            <BottomButtonsContext.Provider value={BottomBtns}>
                <BottomMenu />
            </BottomButtonsContext.Provider>
        </>
    )
}
