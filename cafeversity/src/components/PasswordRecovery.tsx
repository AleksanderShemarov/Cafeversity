"use client";

import styles from "@/pages/login/LoginPage.module.css";
import { useState, useEffect } from "react";
import TextFormField from "@/components/TextFormField";
import Link from "next/link";
import { useRouter } from "next/router";


export default function PasswordRecovery() {

    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>("");

    const [enableRecovery, setEnableRecovery] = useState<boolean>(false);
    const [passwordStyle, setPasswordStyle] = useState<React.CSSProperties>({});

    const router = useRouter();
    const { token } = router.query;

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
        .then((data) => console.log(data))
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
                </>) : (
                <div className={styles.error_block}>
                    <p>
                        Прабачце, калі ласка, але час актыўнасці спасылцы ўжо скончыўся.
                        Каб запатрабаваць новую, сціскніце <Link href="/login/recovery">тут</Link>.
                    </p>
                    <Link href="/"><input type="button" value="Да Галоўнай" id={styles.closeButton} /></Link>
                </div>
                )}
            </form>
        </>
    )
}
