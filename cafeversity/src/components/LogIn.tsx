"use client";

import styles from "@/app/(auth)/[locale]/LoginPage.module.css";
import Link from "next/link";
// import Image from "next/image";
// import Google from "@/../../public/google_icon.webp";
// import GitHub from "@/../../public/github_icon.webp";
import React, { useEffect, useState } from "react";
import TextFormField from "./TextFormField";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useTranslations } from "next-intl";


export default function LogIn() {

    const pathname = usePathname();

    const loggingIn = useTranslations("AuthPages");

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [enableSignIn, setEnableSignIn] = useState<boolean>(false);

    const [checking, setChecking] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // const [isClosed, setIsClosed] = useState<boolean>(true);

    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    const UserSigningIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setChecking(true);

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
            credentials: "include"
        })
        .then((res) => {
            console.log(res.status);
            return res.json() as Promise<LoginResponse>;
        })
        .then((data) => {
            if (data.redirect) {
                toast.success(data.message, { position: "top-center", style: { fontSize: "1.8rem" } });
                setChecking(false);
                setLoading(true);
                window.location.href = data.redirect;
            }
            else {
                toast.error(data.message, { position: "top-center", style: { fontSize: "1.8rem" } });
                setChecking(false);
            }
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
        <form action="" method="post" id={styles.loginForm} onSubmit={UserSigningIn}>
            <p id={styles.formTitle}>{loggingIn("titles.enterGate")}</p>

            <TextFormField
                label={loggingIn("fields.emailField.name")}
                inputType="email"
                inputName="eMail"
                styleId={styles.eMail}
                placeholder={loggingIn("fields.emailField.placeholder")}
                value={email}
                onChange={(e) => valueChange(e, setEmail)}
            />

            <TextFormField
                label={loggingIn("fields.passwordField.name")}
                inputType="password"
                inputName="passwordl"
                styleId={styles.password}
                placeholder={loggingIn("fields.passwordField.placeholder")}
                value={password}
                onChange={(e) => valueChange(e, setPassword)}
            />
            
            {/* <label>Імя</label>
            <input type="text" name="firstName" id={styles.firstname} placeholder="Тадэўш"/>

            <label>Прозвішча</label>
            <input type="text" name="lastName" id={styles.lastname} placeholder="Касцюшка" />

            <label>Пароля</label>
            <input type="password" name="password" id={styles.password} placeholder="Кодавае Слова"/> */}

            <div className={styles.formButtons}>
                {checking ? (
                    <button type="button" disabled style={{
                        height: "35px", minWidth: "105px", fontSize: "20px", borderRadius: "10px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        outline: "3px solid blue", color: "blue", backgroundColor: "white",
                    }}>
                        <div style={{ 
                            width: "2rem", 
                            height: "2rem", 
                            border: "2px solid transparent",
                            borderTop: "2px solid currentColor",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite"
                        }} />
                    </button>
                ) : loading ? (
                    <button type="button" disabled style={{
                        height: "35px", minWidth: "105px", fontSize: "20px", borderRadius: "10px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        outline: "3px solid blue", color: "blue", backgroundColor: "white",
                    }}>
                        <p style={{ margin: 0, fontSize: "2rem", display: "flex", alignItems: "center" }}>
                            Загрузка<span id="dots"></span>
                        </p>
                    </button>
                ) : (
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
                    
                    >
                        {loggingIn("buttons.logIn")}
                    </button>
                )}
                <Link href={pathname.slice(0, 3)}>
                    <input type="button"
                        value={loggingIn("buttons.back")}
                        id={styles.closeButton}
                    />
                </Link>
            </div>

            {/* <div>
                <p id={styles.optional_ways_bar}
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
                    }}
                >
                    {loggingIn("others.networks")}
                </p>
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
            </div> */}
            <div className={styles.help_block}>
                <p>
                    {loggingIn("links.forgottenPassword.part1")}
                    <Link href={`${pathname.slice(0, 3)}/login/recovery`}>
                        {loggingIn("links.forgottenPassword.part2")}
                    </Link>
                    .
                </p>
                <p>
                    {loggingIn("links.toSignUp.part1")}
                    <Link href={`${pathname.slice(0, 3)}/login/signup`}>
                        {loggingIn("links.toSignUp.part2")}
                    </Link>
                    .
                </p>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                #dots::after {
                    content: '';
                    display: inline-block;
                    animation: dots 1.5s steps(4, end) infinite;
                    font-size: 2rem;
                }

                @keyframes dots {
                    0% {
                        content: '';
                    }
                    25% {
                        content: '•';
                    }
                    50% {
                        content: '••';
                    }
                    75% {
                        content: '•••';
                    }
                    100% {
                        content: '';
                    }
                }
            `}</style>
        </form>
    )
}
