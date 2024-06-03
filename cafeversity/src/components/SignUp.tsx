"use client";

import styles from "@/pages/login/LoginPage.module.css";
import Link from "next/link";
// import Image from "next/image";
// import Google from "@/../../public/google_icon.webp";
// import GitHub from "@/../../public/github_icon.webp";
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
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (password1 === "" && password2 === "") {
            setPasswordStyle({});
        } else if (password1 !== password2) {
            setPasswordStyle({
                outline: "2px solid red",
            });
        } else {
            setPasswordStyle({
                outline: "2px solid green",
            });
        }
    }, [password1, password2]);

    return (
        <>
            <form action="" method="post" id={styles.loginForm} onSubmit={UserRegistration}>
                <p id={styles.formTitle}>Рэгістрацыйная Форма</p>
                
                {/* <label>Імя</label>
                <input
                    type="text"
                    name="firstName"
                    id={styles.firstname}
                    placeholder="Тадэўш"
                    value={name}
                    onChange={(e) => valueChange(e, setName)}
                /> */}
                <TextFormField
                    label="Імя"
                    inputName="firstName"
                    styleId={styles.firstname}
                    placeholder="Тадэўш"
                    value={name}
                    onChange={(e) => valueChange(e, setName)}
                />


                {/* <label>Прозвішча</label>
                <input
                    type="text"
                    name="lastName"
                    id={styles.lastname}
                    placeholder="Касцюшка"
                    value={surname}
                    onChange={(e) => valueChange(e, setSurname)}
                /> */}
                <TextFormField
                    label="Прозвішча"
                    inputName="lastName"
                    styleId={styles.lastname}
                    placeholder="Касцюшка"
                    value={surname}
                    onChange={(e) => valueChange(e, setSurname)}
                />


                {/* <label>Мянушка (Нікнэйм)</label>
                <input
                    type="text"
                    name="nickName"
                    id={styles.nickname}
                    placeholder="Андрэйка"
                    value={nickname}
                    onChange={(e) => valueChange(e, setNickname)}
                /> */}
                <TextFormField
                    label="Мянушка (Нікнэйм)"
                    inputName="nickName"
                    styleId={styles.nickname}
                    placeholder="Андрэйка"
                    value={nickname}
                    onChange={(e) => valueChange(e, setNickname)}
                />


                {/* <label>E-пошта</label>
                <input
                    type="email"
                    name="eMail"
                    id={styles.eMail}
                    placeholder="Kastiushka@gmail.com"
                    value={email}
                    onChange={(e) => valueChange(e, setEmail)}
                /> */}
                <TextFormField
                    label="E-пошта"
                    inputType="email"
                    inputName="eMail"
                    styleId={styles.eMail}
                    placeholder="Kastiushka@gmail.com"
                    value={email}
                    onChange={(e) => valueChange(e, setEmail)}
                />


                {/* <label>Пароля</label>
                <input
                    type="password"
                    name="password"
                    id={styles.password}
                    placeholder="Кодавае Слова"
                    value={password1}
                    onChange={(e) => valueChange(e, setPassword1)}
                /> */}
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


                {/* <label>Паўтарыце Паролю</label>
                <input
                    type="password"
                    name="passwordAgain"
                    id={styles.password_again}
                    placeholder="Кодавае Слова"
                    value={password2}
                    onChange={(e) => valueChange(e, setPassword2)}
                /> */}
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
                    <button id={styles.submitButton} type="submit">Рэгістрацыя</button>
                    <Link href="/"><input type="button" value="Сыйсці" id={styles.closeButton} /></Link>
                </div>

                {/* <div>
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
                </div> */}
            </form>
        </>
    )
}
