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

    const languages = [
        { lang: "by", name: "Беларуская" },
        { lang: "cz", name: "Čeština" },
        { lang: "en", name: "English" },
        { lang: "pl", name: "Polski" },
        { lang: "ru", name: "Русский" },
        { lang: "tr", name: "Türkçe" },
        { lang: "ua", name: "Українська" },
    ] as const;//!!!

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [lang, setLang] = useState<string>(pathname.split("/")[1]);
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const [passwordStyle, setPasswordStyle] = useState<React.CSSProperties>({});

    const [enableReg, setEnableReg] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const valueChange = (
        event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>,
        reactHook: (value: string) => void
    ) => {
        reactHook(event.target.value);
    }

    const UserRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        const formFields = {
            firstName: name,
            lastName: surname,
            nickName: nickname,
            email: email,
            lang: lang,
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
            setLoading(false);
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
        <form action="" method="post" id={styles.loginForm} onSubmit={UserRegistration}>
            <p id={styles.formTitle}>{signingUp("titles.registration")}</p>
            <div style={{ overflowY: "auto", flexGrow: 1, paddingRight: "10px", marginRight: "-10px", paddingLeft: "10px" }}>
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

                <div style={{
                    display: "flex", alignItems: "center", alignContent: "center", justifyContent: "space-between",
                    paddingLeft: "0.5rem", marginBottom: "3rem", marginTop: "1rem"
                    }}>
                    <p style={{ margin: 0, fontSize: "2.2rem", fontStyle: "italic" }}>
                        {signingUp("fields.otherNames.language")}
                    </p>
                    <select onChange={(e) => valueChange(e, setLang)}
                        style={{
                            fontSize: "2.0rem", border: "2px solid",
                            padding: "0.5rem", borderRadius: "1rem"
                        }}
                    >
                    {languages.map((language) =>
                        <option key={`language-${language.name}`} value={language.lang}>
                            {language.name}
                        </option>
                    )}
                    </select>
                </div>

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
                    {loading ? (
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
                    ) : (
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
                        >
                            {signingUp("buttons.signUp")}
                        </button>
                    )}
                    <Link href={pathname.slice(0, 3)}><input type="button" value={signingUp("buttons.exit")} id={styles.closeButton} /></Link>
                </div>
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

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </form>
    )
}
