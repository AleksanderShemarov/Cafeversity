"use client";

import styles from "@/app/(auth)/[locale]/LoginPage.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextFormField from "./TextFormField";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


export default function SignUp() {

    const pathname = usePathname();

    const signingUp = useTranslations("AuthPages");

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const [passwordStyle, setPasswordStyle] = useState<React.CSSProperties>({});

    const [enableReg, setEnableReg] = useState<boolean>(false);

    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    const UserRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formFields = {
            firstName: name,
            lastName: surname,
            nickName: nickname,
            email: email,
            password: password2,
        }

        await fetch("http://localhost:3000/api/register", {
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
            if (data.status === "Success") toast.success(data.message, { position: "top-center" });
            if (data.status === "Error") toast.error(data.message, { position: "top-center" });
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (password1 === "" || password2 === "" || name === "" || surname === "" || email === "") {
            setPasswordStyle({});
            setEnableReg(false);
        } else if (password1 !== password2) {
            setPasswordStyle({ outline: "2px solid red" });
            setEnableReg(false);
        } else {
            setPasswordStyle({ outline: "2px solid green" });
            setEnableReg(true);
        }
    }, [password1, password2, name, surname, email]);

    return (
        <>
            <form action="" method="post" id={styles.loginForm} onSubmit={UserRegistration}>
                <p id={styles.formTitle}>{signingUp("titles.registration")}</p>
                
                <TextFormField
                    label={signingUp("fields.nameField.name")}
                    inputName="firstName"
                    styleId={styles.firstname}
                    placeholder={signingUp("fields.nameField.placeholder")}
                    value={name}
                    onChange={(e) => valueChange(e, setName)}
                />

                <TextFormField
                    label={signingUp("fields.surnameField.name")}
                    inputName="lastName"
                    styleId={styles.lastname}
                    placeholder={signingUp("fields.surnameField.placeholder")}
                    value={surname}
                    onChange={(e) => valueChange(e, setSurname)}
                />

                <TextFormField
                    label={signingUp("fields.nicknameField.name")}
                    inputName="nickName"
                    styleId={styles.nickname}
                    placeholder={signingUp("fields.nicknameField.placeholder")}
                    value={nickname}
                    onChange={(e) => valueChange(e, setNickname)}
                />

                <TextFormField
                    label={signingUp("fields.emailField.name")}
                    inputType="email"
                    inputName="eMail"
                    styleId={styles.eMail}
                    placeholder={signingUp("fields.emailField.namedPlaceholder")}
                    value={email}
                    onChange={(e) => valueChange(e, setEmail)}
                />

                <TextFormField
                    label={signingUp("fields.passwordField.name")}
                    inputType="password"
                    inputName="password"
                    styleId={styles.password}
                    placeholder={signingUp("fields.passwordField.placeholder")}
                    value={password1}
                    onChange={(e) => valueChange(e, setPassword1)}
                    style={passwordStyle}
                />

                <TextFormField
                    label={signingUp("fields.passwordField.repeatName")}
                    inputType="password"
                    inputName="passwordAgain"
                    styleId={styles.password_again}
                    placeholder={signingUp("fields.passwordField.placeholder")}
                    value={password2}
                    onChange={(e) => valueChange(e, setPassword2)}
                    style={passwordStyle}
                />

                <div className={styles.formButtons}>
                    {/* <Link href="/TemporaryPage"><input type="button" value="Рэгістрацыя" id={styles.submitButton} /></Link> */}
                    <button
                        id={styles.submitButton}
                        type="submit"
                        disabled={!enableReg}
                        style={enableReg ? {} : { 
                            color: "white",
                            fontStyle: "italic",
                            backgroundColor: "lightgray",
                            outline: "2px dashed black",
                            pointerEvents: "none",
                        }}
                    >{signingUp("buttons.signUp")}</button>
                    <Link href={pathname.slice(0, 3)}><input type="button" value={signingUp("buttons.exit")} id={styles.closeButton} /></Link>
                </div>

                <div className={styles.help_block}>
                    <p>
                        {signingUp("links.alreadySinedUp.part1")}
                        <Link href={`${pathname.slice(0, 3)}/login/signin`}>
                            {signingUp("links.alreadySinedUp.part2")}
                        </Link>
                        !
                    </p>
                </div>
            </form>
        </>
    )
}
