"use client";

import styles from "@/pages/login/LoginPage.module.css";
import Link from "next/link";
import Image from "next/image";
import Google from "@/../../public/google_icon.webp";
import GitHub from "@/../../public/github_icon.webp";
import React, { useEffect, useState } from "react";
import TextFormField from "./TextFormField";

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";


export default function LogIn() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [enableSignIn, setEnableSignIn] = useState<boolean>(false);

    const [isClosed, setIsClosed] = useState<boolean>(true);

    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    const UserSigningIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        interface LoginResponse {
            message: string;
            redirect?: string;
        }

        const formFields = {
            email: email,
            password: password,
        }

        await fetch("http://localhost:3000/api/logging_in", {
            method: "POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(formFields),
        })
        .then((res) => {
            console.log(res.status);
            return res.json() as Promise<LoginResponse>;
        })
        .then((data) => {
            if (data.redirect) {
                toast.success(data.message, { position: "top-center" });
                window.location.href = data.redirect;
            }
            else toast.error(data.message, { position: "top-center" });
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (email === "" || password === "") {
            setEnableSignIn(false);
        } else {
            setEnableSignIn(true);
        }
    }, [email, password]);

    return (
        <>
            <form action="" method="post" id={styles.loginForm} onSubmit={UserSigningIn}>
                <p id={styles.formTitle}>Уваходная Брама</p>

                <TextFormField
                    label="E-пошта"
                    inputType="email"
                    inputName="eMail"
                    styleId={styles.eMail}
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => valueChange(e, setEmail)}
                />

                <TextFormField
                    label="Пароля"
                    inputType="password"
                    inputName="passwordl"
                    styleId={styles.password}
                    placeholder="Кодавае Слова"
                    value={password}
                    onChange={(e) => valueChange(e, setPassword)}
                />

                <div className={styles.formButtons}>
                    <button
                        type="submit"
                        id={styles.submitButton}
                        disabled={!enableSignIn}
                        style={enableSignIn ? {} : { 
                            color: "white",
                            fontStyle: "italic",
                            backgroundColor: "lightgray",
                            outline: "2px dashed black",
                            pointerEvents: "none",
                        }}
                    >Увайсці</button>
                    <Link href="/"><input type="button" value="Ўзад" id={styles.closeButton} /></Link>
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
                    <p>Калі забыліся пра паролю, перайдзіце <Link href="/login/recovery">сюды</Link>.</p>
                    <p>Яшчэ не рэгістраваліся? Калі ласка, націскніце <Link href="/login/signup">тут</Link>.</p>
                </div>
            </form>
        </>
    )
}
