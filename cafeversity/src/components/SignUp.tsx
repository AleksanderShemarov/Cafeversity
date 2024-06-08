"use client";

import styles from "@/pages/login/LoginPage.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextFormField from "./TextFormField";


export default function SignUp() {

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
            password1: password1,
            password2: password2,
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
        .then((data) => console.log(data))
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
                <p id={styles.formTitle}>Рэгістрацыйная Форма</p>
                
                <TextFormField
                    label="Імя"
                    inputName="firstName"
                    styleId={styles.firstname}
                    placeholder="Тадэўш"
                    value={name}
                    onChange={(e) => valueChange(e, setName)}
                />

                <TextFormField
                    label="Прозвішча"
                    inputName="lastName"
                    styleId={styles.lastname}
                    placeholder="Касцюшка"
                    value={surname}
                    onChange={(e) => valueChange(e, setSurname)}
                />

                <TextFormField
                    label="Мянушка (Нікнэйм)"
                    inputName="nickName"
                    styleId={styles.nickname}
                    placeholder="Андрэйка"
                    value={nickname}
                    onChange={(e) => valueChange(e, setNickname)}
                />

                <TextFormField
                    label="E-пошта"
                    inputType="email"
                    inputName="eMail"
                    styleId={styles.eMail}
                    placeholder="Kastiushka@gmail.com"
                    value={email}
                    onChange={(e) => valueChange(e, setEmail)}
                />

                <TextFormField
                    label="Пароля"
                    inputType="password"
                    inputName="password"
                    styleId={styles.password}
                    placeholder="Кодавае Слова"
                    value={password1}
                    onChange={(e) => valueChange(e, setPassword1)}
                    style={passwordStyle}
                />

                <TextFormField
                    label="Паўтарыце Паролю"
                    inputType="password"
                    inputName="passwordAgain"
                    styleId={styles.password_again}
                    placeholder="Кодавае Слова"
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
                    >Рэгістрацыя</button>
                    <Link href="/"><input type="button" value="Выйсці" id={styles.closeButton} /></Link>
                </div>

                <div className={styles.help_block}>
                    <p>Ўжо зарэгістраваныя – калі ласка, <Link href="/login/signin">сюды</Link>!</p>
                </div>
            </form>
        </>
    )
}
