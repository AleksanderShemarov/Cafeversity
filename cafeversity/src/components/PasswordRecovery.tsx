"use client";

import styles from "@/app/(auth)/[locale]/LoginPage.module.css";
import { useState, useEffect } from "react";
import TextFormField from "@/components/TextFormField";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


export default function PasswordRecovery() {

    const pathname = usePathname();

    const passwordRecovery = useTranslations("AuthPages");

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
                <p id={styles.formTitle}>{passwordRecovery("titles.passwordRecovery")}</p>
                {pageLoaded ? (<>
                    {token ? (<>
                        <TextFormField
                            label={passwordRecovery("fields.passwordField.nameNew")}
                            inputType="password"
                            inputName="password1"
                            styleId={styles.password}
                            placeholder={passwordRecovery("fields.passwordField.placeholder")}
                            value={newPassword}
                            onChange={(e) => valueChange(e, setNewPassword)}
                            style={passwordStyle}
                        />

                        <TextFormField
                            label={passwordRecovery("fields.passwordField.repeatName")}
                            inputType="password"
                            inputName="password2"
                            styleId={styles.password_again}
                            placeholder={passwordRecovery("fields.passwordField.placeholder")}
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
                                >{passwordRecovery("buttons.passwordChange")}</button>
                            </div>
                        ) : (
                            <Link href={`${pathname.slice(0, 3)}/login/signin`}>
                                <input type="button" value={passwordRecovery("buttons.enterGate")} id={styles.submitButton} />
                            </Link>
                        )}
                    </>) : (
                        <div className={styles.error_block}>
                            <p>
                                {passwordRecovery("links.newRecovery.part1")}
                                <Link href={`${pathname.slice(0, 3)}/login/recovery`}>
                                    {passwordRecovery("links.newRecovery.part2")}
                                </Link>.
                            </p>
                            <Link href={pathname.slice(0, 3)}><input type="button" value={passwordRecovery("buttons.mainPage")} id={styles.closeButton} /></Link>
                        </div>
                    )}
                </>) : <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ fontSize: "22px", fontStyle: "italic" }}>{passwordRecovery("others.loading")}</p>
                    </div>
                }
            </form>
        </>
    )
}
