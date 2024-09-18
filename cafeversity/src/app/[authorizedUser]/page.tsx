"use client";

import Image from "next/image";
import styles from "@/app/[authorizedUser]/authorized.module.css";
import BottomMenu from "@/components/BottomMenu/BottomMenu";
import { BottomButtonsContext } from "@/components/BottomMenu/BottomMenu";
import { useEffect, useState } from "react";


type bottomBtns = {
    name: string,
    icon: string,
    icon_alt: string,
    topMargin?: number,
    path?: string,
}

type userDataTypes = {
    firstName: string,
    lastName: string,
    userPhoto: string,
}

export default function AuthorizedUser({ params }: { params: { authorizedUser: string } }) {
    
    const { authorizedUser } = params;
    const nameSurname: string[] = authorizedUser.split("_");

    const [userData, setUserData] = useState<userDataTypes>();

    useEffect(() => {
        fetch(`http://localhost:3000/api/userData?name=${authorizedUser}`)
        .then(res => res.json())
        .then(data => {
            setUserData(data);
        });
    }, [authorizedUser]);

    const BottomBtns: bottomBtns[] = [
        { name: "Налады акаўнту", icon: "/settings-gear.png", icon_alt: "Settings_Icon",
        topMargin: 50, path: `/${authorizedUser}/settingsPage` },
        { name: "Меню", icon: "/menu_list_icon.webp", icon_alt: "Menu_List_Icon", },
        { name: "Навіны", icon: "/earth_planet.webp", icon_alt: "Earth_Icon",
        topMargin: 50, },
    ];

    return (
        <>
            <div style={{
                display: "flex",
                border: "3px dashed orange",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "30px",
            }}>
                <div className={styles.userImage}>
                    <Image
                        src={userData ? userData.userPhoto : "/uploads/tempUserImage.png"}
                        alt={userData ? userData.userPhoto : "/uploads/tempUserImage.png"}
                        layout="fill"
                    ></Image>
                </div>
                <p className={styles.userName}>{nameSurname[0]}<br />{nameSurname[1]}</p>
            </div>
            <BottomButtonsContext.Provider value={BottomBtns}>
                <BottomMenu />
            </BottomButtonsContext.Provider>
            {/* <div className={styles.exit_cover}>
                <div id={styles.exit_field}></div>
            </div> */}
        </>
    )
}
