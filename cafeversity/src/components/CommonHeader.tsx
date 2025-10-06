"use client";

import styles from "@/app/(commonSite)/[locale]/page.module.css";
// import Image from "next/image";
// import sunny from "../../public/sunny.png";
import Dating, { WeatherWeekday } from "@/components/Dating";
import Entrance from "./Entrance";
import { Clock3 } from "@/components/Clock";
import { useEffect, useState } from "react";
import Link from "next/link";
import DialogView from "./Dialog/DialogView";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LangSwitcher from "./PublicLangSwitcher/LangSwitcher";


export default function CommonHeader () {

    const pathname = usePathname();

    // const Clock = dynamic(
    //     () => import('@/components/Clock'), {
    //         ssr: false,            
    //     }
    // )
    // /* Server and Client have different clock time (the first has the previous time; the second – the next time).
    // From this moment we call Clock component as a dynamic component*/

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [exitView, isExitView] = useState<boolean>(false);

    async function CookieFinding () {    

        await fetch("http://localhost:3000/api/logging_in", {
            method: "GET",
        })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setIsAuthorized(data.userSessionId);
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        CookieFinding();
    }, []);

    const t = useTranslations("MainUserPage");
    const entrance = useTranslations("HeaderComponents");

    return (
        <>
            <div id={styles.header}>
                {/* <div id={styles.weather}>
                    <div id={styles.weather_icon}>
                        <Image src={sunny} alt="sunny_day" width={46} height={46}></Image>
                    </div>
                    <WeatherWeekday />
                </div> */}
                <WeatherWeekday />

                {/* <Clock2 />Clock2 rewritings are stood in useEffect hook and don't need to be as a dynamic component  */}
                <Clock3 />{/* Clock3 Component doesn't convert a Date object into hours, minutes and seconds in useEffect hook.
                Therefore it shows time more exactly than Clock2 and doesn't call an error of dynamic process as Clock1.
                Thanks for Joeward Peralta (https://github.com/joewardperalta/digital-clock) */}
                
                <Dating />

                {!isAuthorized &&
                    <LangSwitcher />
                }

                <div
                    style={{ margin: "auto 0" }} 
                    onClick={() => {
                        isExitView(!exitView);
                        document.body.style.overflow = "hidden";
                    }}
                >

                    <Entrance
                        path={isAuthorized ? '' : `${pathname.slice(0, 3)}/login/signin`}
                        sign={isAuthorized ? t("exitButton.name") : entrance("Entrance")}
                    />
                </div>

                {(isAuthorized && exitView) && (
                    <DialogView
                        question={t("exitButton.question")}
                        dialog_cover={{ backgroundColor: "rgba(222, 184, 135, 0.8)" }}
                        dialog_container={{ border: "5px solid orange" }}
                        dialog_question={{
                            textShadow: "none", fontFamily: "var(--font-family)",
                            fontWeight: "var(--font-volume-weight)", fontStyle: "var(--font-volume-style)",
                        }}
                    >
                        <Link href={`${pathname.slice(0, 3)}/logout`} style={{ width: "25%" }}>
                            <input type="button" value={t("exitButton.access")} id={styles.accessButton} />
                        </Link>
                        <input type="button" value={t("exitButton.deny")} id={styles.denyButton} onClick={() => {
                            isExitView(!exitView);
                            document.body.style.overflow = "auto";
                        }} />
                    </DialogView>
                )}
            </div>
        </>
    )
}
