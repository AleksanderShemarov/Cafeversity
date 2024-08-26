"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import crcleBtnStyle from "./BottomMenu.module.css";


export default function BottomMenu () {
    return (
        <div style={{
            position: "absolute",
            left: "0",
            right: "0",
            marginLeft: "auto",
            marginRight: "auto",
            bottom: "10px",
            width: "100%",
        }}>
            <div style={{
                border: "3px double black",
                width: "20%",
                height: "20vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                borderTopLeftRadius: "70px",
                borderTopRightRadius: "70px",
                flexDirection: "column",
            }}>
                <CircleBtnsDiv>
                    <CircleButton
                        // path=""
                        name="Налады акаўнту"
                        icon="/settings-gear.png"
                        icon_alt="Settings_Icon"
                        marginTop={50}
                    />
                    <CircleButton
                        // path=""
                        name="Меню"
                        icon="/menu_list_icon.webp"
                        icon_alt="Menu_List_Icon"
                    />
                    <CircleButton
                        // path=""
                        name="Навіны"
                        icon="/earth_planet.webp"
                        icon_alt="Earth_Icon"
                        marginTop={50}
                    />
                </CircleBtnsDiv>
                <p style={{
                    fontSize: "20px",
                    fontStyle: "italic",
                    textAlign: "center",
                }}>Меню для рэгістраваных карыстальнікаў</p>
            </div>
        </div>
    )
}


function CircleBtnsDiv ({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={crcleBtnStyle.btns_div}>
                {children}
            </div>
        </>
    )
}


type CrcleBtn = {
    path?: string,
    name?: string,
    icon?: string,
    icon_alt?: string,
    marginTop?: number,
}

function CircleButton ({
    path = "#", name = "CrcleBtn", icon = "/no_image1.jpg", icon_alt = "No_Icon", marginTop = 0
} : CrcleBtn) {

    const [showing, setShowing] = useState<boolean>(false);

    return (
        <>
            <Link href={path}>
                <div
                    className={crcleBtnStyle.btn_body}
                    style={{ marginTop: `${marginTop}px` }}
                    onMouseEnter={() => setShowing(true)}
                    onMouseLeave={() => setShowing(false)}
                >
                    <Image src={icon} alt={icon_alt} width={75} height={75}></Image>
                    {showing &&
                    <p className={crcleBtnStyle.btn_name}>
                        {name}
                    </p>}
                </div>
            </Link>
        </>
    )
}
