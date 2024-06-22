"use client";

import tempUserPage from "../../../public/tempUserImage.png";
import Image from "next/image";
import styles from "@/app/[authorizedUser]/authorized.module.css";
import { useState } from "react";


export default function AuthorizedUser({ params }: { params: { authorizedUser: string } }) {
    
    const { authorizedUser } = params;
    const [message, setMessage] = useState<string>("");

    async function CookieShowing() {
        await fetch("http://localhost:3000/api/logging_in", {
            method: "GET",
        })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setMessage(`${data.message}: ${data.userSessionId}`);
        })
        .catch((error) => console.error(error));
    }
    
    return (
        <>
            <div style={{
                display: "flex",
                border: "3px dashed orange",
                alignItems: "center",
                justifyContent: "flex-start",
            }}>
                <Image
                    src={tempUserPage}
                    alt="tempUserImage.png"
                    className={styles.userImage}
                ></Image>
                <h2 className={styles.userName}>{authorizedUser}</h2>
            </div>
            <p>Cookie-file: {message}</p>
            <button type="button" onClick={() => CookieShowing()}>Show a Cookie-file.</button>
            {/* <div className={styles.exit_cover}>
                <div id={styles.exit_field}></div>
            </div> */}
        </>
    )
}
