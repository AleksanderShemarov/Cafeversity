"use client";

import TextFormField from "@/components/TextFormField";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import styles from "@/app/(auth)/[locale]/LoginPage.module.css";


export default function AdminLogin() {
    
    const pathname = usePathname();

    const adminLogin = useTranslations("AuthPages");

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [passwordStyle, setPasswordStyle] = useState<React.CSSProperties>({});

    const [enableReg, setEnableReg] = useState<boolean>(false);

    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    const AdminLoggingIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formFields = {
            firstName: name,
            lastName: surname,
            email: email,
            password: password,
        }

        await fetch("http://localhost:3000/api/adminCheck", {
            method: "POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(formFields),
        })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then((data) => {
            if (data.status === "Success") {
                toast.success(data.message, { position: "top-center", style: { fontSize: "1.8rem" } });
                sessionStorage.setItem("admin-id", JSON.stringify(data?.adminId));
                window.location.href = `/${pathname.split("/")[1]}/${data?.redirect}`;
            }
            if (data.status === "Error") toast.error(data.message, { position: "top-center", style: { fontSize: "1.8rem" } });
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (password === "" || name === "" || surname === "" || email === "") {
            setPasswordStyle({});
            setEnableReg(false);
        } else {
            // setPasswordStyle({ outline: "2px solid green" });
            setEnableReg(true);
        }
    }, [password, name, surname, email]);

    return (
        <>
            <form action="" method="post" id={styles.loginForm} onSubmit={AdminLoggingIn}>
                <p id={styles.formTitle}>{adminLogin("titles.adminGate")}</p>
                
                <TextFormField
                    label={adminLogin("fields.nameField.name")}
                    inputName="firstName"
                    styleId={styles.firstname}
                    placeholder={adminLogin("fields.nameField.placeholder")}
                    value={name}
                    onChange={(e) => valueChange(e, setName)}
                />

                <TextFormField
                    label={adminLogin("fields.surnameField.name")}
                    inputName="lastName"
                    styleId={styles.lastname}
                    placeholder={adminLogin("fields.surnameField.placeholder")}
                    value={surname}
                    onChange={(e) => valueChange(e, setSurname)}
                />

                <TextFormField
                    label={adminLogin("fields.emailField.name")}
                    inputType="email"
                    inputName="eMail"
                    styleId={styles.eMail}
                    placeholder={adminLogin("fields.emailField.namedPlaceholder")}
                    value={email}
                    onChange={(e) => valueChange(e, setEmail)}
                />

                <TextFormField
                    label={adminLogin("fields.passwordField.name")}
                    inputType="password"
                    inputName="password"
                    styleId={styles.password_again}
                    placeholder={adminLogin("fields.passwordField.placeholder")}
                    value={password}
                    onChange={(e) => valueChange(e, setPassword)}
                    style={passwordStyle}
                />

                <div className={styles.formButtons}>
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
                        {adminLogin("buttons.logIn")}
                    </button>
                    <Link href={pathname.slice(0, 3)}>
                        <input type="button" value={adminLogin("buttons.exit")} id={styles.closeButton} />
                    </Link>
                </div>
            </form>
        </>
    );
}
