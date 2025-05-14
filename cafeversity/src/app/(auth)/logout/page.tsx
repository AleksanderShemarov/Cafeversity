"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";


export default function ExitProcessPage () {

    async function LogOut () {

        interface LoginResponse {
            message: string;
            redirect?: string;
        }

        await fetch("http://localhost:3000/api/logging_out", {
            method: "GET",
            credentials: "include"
        })
        .then((res) => {
            console.log(res.status);
            return res.json() as Promise<LoginResponse>;
        })
        .then((data) => {
            console.log(data);
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        })
        .catch((error) => {
            console.error(error);
            window.location.href = "/";
        });
    }

    useEffect(() => {
        LogOut();
    }, []);

    const t = useTranslations("ExitPage");

    return (
        <div style={{
            width: "100%",
            height: "98vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(222, 184, 135, 0.8)",
        }}>
            <h1 style={{
                margin: "0",
                padding: "2%",
                border: "5px solid brown",
                borderRadius: "3vh",
                textAlign: "center",
                backgroundColor: "rgb(225, 225, 225)",
                boxShadow: "0 0 10px 10px lightgrey",
            }}>
                {t("name")}
            </h1>
        </div>
    )
}
