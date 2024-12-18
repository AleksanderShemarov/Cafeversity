"use client";

import styles from "@/app/page.module.css";
import Image from "next/image";
import sunny from "../../public/sunny.png";
// import dynamic from "next/dynamic";
import Dating, { WeatherWeekday } from "@/components/Dating";
import Entrance from "./Entrance";
import { Clock2, Clock3 } from "@/components/Clock";
import { useEffect, useState } from "react";
import Link from "next/link";
import DialogView from "./Dialog/DialogView";


// { params }: { params: { authorizedUser: string } }
export default function CommonHeader () {

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
        
        // const { authorizedUser } = params;

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

    return (
        <>
            <div id={styles.header}>
                <div id={styles.weather}>
                    <div id={styles.weather_icon}>
                        <Image src={sunny} alt="sunny_day" width={46} height={46}></Image>
                    </div>
                    <WeatherWeekday />
                </div>

                {/* <Clock /> */}
                <Clock2 />{/* Clock2 rewritings are stood in useEffect hook and don't need to be as a dynamic component  */}
                <Clock3 />{/* Clock3 Component doesn't convert a Date object into hours, minutes and seconds in useEffect hook.
                Therefore it shows time more exactly than Clock2 and doesn't call an error of dynamic process as Clock1.
                Thanks for Joeward Peralta (https://github.com/joewardperalta/digital-clock) */}
                
                <Dating />
                <div
                    style={{ margin: "auto 0" }} 
                    onClick={() => {
                        isExitView(!exitView);
                        document.body.style.overflow = "hidden";
                    }}
                >
                    <Entrance
                        path={isAuthorized ? '' : '/login/signin'}
                        sign={isAuthorized ? 'Выхад' : 'Ўваход'}
                    />
                </div>
                {(isAuthorized && exitView) && (
                    <DialogView
                        question="Вы на сам рэч хаціце выйсці?"
                        dialog_cover={{ backgroundColor: "rgba(222, 184, 135, 0.8)" }}
                        dialog_container={{ border: "5px solid orange" }}
                        dialog_question={{ textShadow: "none" }}
                    >
                        <Link href="/ExitProcess" style={{ width: "25%" }}>
                            <input type="button" value="Так" id={styles.accessButton} />
                        </Link>
                        <input type="button" value="Не" id={styles.denyButton} onClick={() => {
                            isExitView(!exitView);
                            document.body.style.overflow = "auto";
                        }} />
                    </DialogView>
                )}
            </div>
        </>
    )
}
