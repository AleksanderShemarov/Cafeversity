"use client";

import styles from "@/app/(auth)/login/LoginPage.module.css";
import { useState, useEffect } from "react";
import TextFormField from "@/components/TextFormField";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";


export default function PasswordRecovery() {

    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>("");

    const [enableRecovery, setEnableRecovery] = useState<boolean>(false);
    const [passwordStyle, setPasswordStyle] = useState<React.CSSProperties>({});
    
    const [pageLoaded, setPageLoaded] = useState<boolean>(false);
    const [serverAnswer, setServerAnswer] = useState<boolean>(false);

    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            setToken(token);
            setPageLoaded(true);
        }
    }, []);


    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    const PasswordRecovery = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formFields = {
            receivedToken: token,
            password: newPassword,
        }

        await fetch("http://localhost:3000/api/recovery_checking", {
            method: "POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(formFields),
        })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then((data) => {
            // console.log(data);
            if (data.messageType === "Success") {
                setServerAnswer(true);
                toast.success(data.message, { position: "top-center" });
            }
            else if (data.messageType === "Error") toast.error(data.message, { position: "top-center" });
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (newPassword === "" || confirmedNewPassword === "") {
            setEnableRecovery(false);
            setPasswordStyle({});
        } else if (newPassword !== confirmedNewPassword) {
            setEnableRecovery(false);
            setPasswordStyle({ outline: "2px solid red" });
        } else {
            setEnableRecovery(true);
            setPasswordStyle({ outline: "2px solid green" });
        }
    }, [newPassword, confirmedNewPassword]);

    return (
        <>
            <form action="" method="post" id={styles.loginForm} onSubmit={PasswordRecovery}>
                <p id={styles.formTitle}>Аднаўленне Паролі</p>
                {pageLoaded ? (<>
                    {token ? (<>
                        <TextFormField
                            label="Новая Пароля"
                            inputType="password"
                            inputName="password1"
                            styleId={styles.password}
                            placeholder="Кодавае Слова"
                            value={newPassword}
                            onChange={(e) => valueChange(e, setNewPassword)}
                            style={passwordStyle}
                        />

                        <TextFormField
                            label="Паўтарыце Паролю"
                            inputType="password"
                            inputName="password2"
                            styleId={styles.password_again}
                            placeholder="Кодавае Слова"
                            value={confirmedNewPassword}
                            onChange={(e) => valueChange(e, setConfirmedNewPassword)}
                            style={passwordStyle}
                        />

                        {!serverAnswer ? (
                            <div className={styles.formButtons}>
                                <button
                                    type="submit"
                                    id={styles.submitButton}
                                    disabled={!enableRecovery}
                                    style={enableRecovery ? {} : { 
                                        color: "white",
                                        fontStyle: "italic",
                                        backgroundColor: "lightgray",
                                        outline: "2px dashed black",
                                        pointerEvents: "none",
                                    }}
                                >Змяніць Паролю</button>
                            </div>
                        ) : (
                            <Link href="/login/signin">
                                <input type="button" value="Да Ўваходу" id={styles.submitButton} />
                            </Link>
                        )}
                    </>) : (
                        <div className={styles.error_block}>
                            <p>
                                Прабачце, калі ласка, але час актыўнасці спасылцы ўжо скончыўся.
                                Каб запатрабаваць новую, сціскніце <Link href="/login/recovery">тут</Link>.
                            </p>
                            <Link href="/"><input type="button" value="Да Галоўнай" id={styles.closeButton} /></Link>
                        </div>
                    )}
                </>) : <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "22px", fontStyle: "italic" }}>Loading...</p>
                    </div>
                }
            </form>
        </>
    )
}
