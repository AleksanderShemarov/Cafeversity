"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useState } from "react";
import crcleBtnStyle from "./BottomMenu.module.css";


type bottomBtns = {
    name: string,
    icon: string,
    icon_alt: string,
    topMargin?: number,
    path?: string,
}

const BottomButtonsContext = createContext<bottomBtns[]>([]);

export {BottomButtonsContext};


export default function BottomMenu () {

    const bottomBtns = useContext(BottomButtonsContext);

    return (
        <div className={crcleBtnStyle.menuBlock}>
            <div className={crcleBtnStyle.menuContainer}>
                <CircleBtnsDiv>
                    {bottomBtns.map((bottomBtn, index) => 
                        <CircleButton
                            key={index}
                            path={bottomBtn.path ?? "#"}
                            name={bottomBtn.name}
                            icon={bottomBtn.icon}
                            icon_alt={bottomBtn.icon_alt}
                            marginTop={bottomBtn.topMargin ?? 0}
                        />
                    )}
                </CircleBtnsDiv>
                {/* <p style={{
                    fontSize: "20px",
                    fontStyle: "italic",
                    textAlign: "center",
                    lineHeight: "1.5",
                    paddingTop: "10px",
                }}>Меню для рэгістраваных карыстальнікаў</p> */}
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
                    <Image src={icon} alt={icon_alt} width={62} height={62}></Image>
                    {showing &&
                    <p className={crcleBtnStyle.btn_name}>
                        {name}
                    </p>}
                </div>
            </Link>
        </>
    )
}
