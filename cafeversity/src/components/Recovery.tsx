"use client";

import styles from "@/app/(auth)/login/LoginPage.module.css";
import TextFormField from "./TextFormField";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";


export default function Recovery() {

    const [email, setEmail] = useState<string>("");
    const [enableRecovery, setEnableRecovery] = useState<boolean>(false);

    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    const sendRecoveryKey = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formFields = { email: email };

        await fetch("http://localhost:3000/api/password_recovery", {
            method: "POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(formFields),
        })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then((data) => {
            //console.log(data);
            if (data.messageType === "Success") toast.success(data.message, { position: "top-center" });
            else if (data.messageType === "Error") toast.error(data.message, { position: "top-center" });
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (email === "") {
            setEnableRecovery(false);
        } else {
            setEnableRecovery(true);
        }
    }, [email]);

    return (
        <>
            <form action="" method="post" id={styles.loginForm} onSubmit={sendRecoveryKey}>
                <p id={styles.formTitle}>Аднаўленне Доступу</p>

                <TextFormField
                    label="E-пошта"
                    inputType="email"
                    inputName="eMail"
                    styleId={styles.eMail}
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => valueChange(e, setEmail)}
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
                    >Даслаць</button>
                    <Link href="/"><input type="button" value="Да Галоўнай" id={styles.closeButton} /></Link>
                </div>

                <div className={styles.help_block}>
                    <p>Яшчэ не рэгістраваліся? Калі ласка, націскніце <Link href="/login/signup">тут</Link>.</p>
                    <p>Ўжо успомнілі паролю? =&gt; <Link href="/login/signin">Пераходзьце сюды</Link>!</p>
                </div>
            </form>
        </>
    )
}
