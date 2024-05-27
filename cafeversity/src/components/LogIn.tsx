"use client";

import styles from "@/pages/login/LoginPage.module.css";
import Link from "next/link";
import Image from "next/image";
import Google from "@/../../public/google_icon.webp";
import GitHub from "@/../../public/github_icon.webp";
import { useState } from "react";


export default function LogIn() {

    const [isClosed, setIsClosed] = useState<boolean>(true);

    return (
        <>
            <form action="" method="post" id={styles.loginForm}>
                <p id={styles.formTitle}>Уваходная Брама</p>
                
                <label>Імя</label>
                <input type="text" name="firstName" id={styles.firstname} placeholder="Тадэўш"/>

                <label>Прозвішча</label>
                <input type="text" name="lastName" id={styles.lastname} placeholder="Касцюшка" />

                <label>Пароля</label>
                <input type="password" name="password" id={styles.password} placeholder="Кодавае Слова"/>

                <div className={styles.formButtons}>
                    <Link href="/TemporaryPage"><input type="button" value="Увайсці" id={styles.submitButton} /></Link>
                    <Link href="/"><input type="button" value="Сыйсці" id={styles.closeButton} /></Link>
                </div>

                <div>
                    <p 
                        id={styles.optional_ways_bar}
                        onClick={() => {setIsClosed(!isClosed)}}
                        style={{
                            borderBottomLeftRadius: isClosed ? "30%" : "0",
                            borderBottomRightRadius: isClosed ? "30%" : "0",
                            borderTopLeftRadius: isClosed ? "0" : "30%",
                            borderTopRightRadius: isClosed ? "0" : "30%",
                            transition: `border-bottom-left-radius 0.5s ease-in-out,
                            border-bottom-right-radius 0.5s ease-in-out,
                            border-top-left-radius 0.5s ease-in-out,
                            border-top-right-radius 0.5s ease-in-out`,
                        }}>Уваход з дапамогай сетак</p>
                    <div
                        id={styles.social_buttons}
                        style={{ 
                            maxHeight: isClosed ? '0' : '58px',
                            overflow: "hidden",
                            transition: 'max-height 0.5s ease-in-out',
                        }}
                    >
                        <div className={styles.social_button}>
                            <Image
                                src={Google}
                                alt="google_icon.webp"
                                height={35}
                                width={35}
                                style={{ margin: "auto", }}></Image>
                        </div>
                        <div className={styles.social_button}>
                            <Image
                                src={GitHub}
                                alt="github_icon.jpg"
                                height={35}
                                width={35}
                                style={{ margin: "auto", }}></Image>
                        </div>
                    </div>
                </div>
                <div className={styles.help_block}>
                    <p>Калі забыліся пра паролю, перайдзіце <Link href="/TemporaryPage">сюды</Link>.</p>
                    <p>Яшчэ не рэгістраваліся? Калі ласка, націскніце <Link href="/TemporaryPage">тут</Link>.</p>
                </div>
            </form>
        </>
    )
}
