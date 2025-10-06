"use client";

import TextFormField from "@/components/TextFormField";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import styles from "@/app/(auth)/[locale]/LoginPage.module.css";


const adminRoles: string[] = [
    "Founder Admin", "General Admin", "Registration Admin", "Routes Admin", "Communication Admin"
] as const;

const languages = [
    { lang: "by", name: "Беларуская" },
    { lang: "cz", name: "Čeština" },
    { lang: "en", name: "English" },
    { lang: "pl", name: "Polski" },
    { lang: "ru", name: "Русский" },
    { lang: "tr", name: "Türkçe" },
    { lang: "ua", name: "Українська" },
] as const;//!!!

export default function AdminRegist() {
    const pathname = usePathname();

    const adminRegist = useTranslations("AuthPages");

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [adminRole, setAdminRole] = useState<string>("Communication Admin");
    const [language, setLanguage] = useState<string>(pathname.split("/")[1]);
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [unknownWord, setUnknownWord] = useState<string>("");

    const [passwordStyle, setPasswordStyle] = useState<React.CSSProperties>({});

    const [enableReg, setEnableReg] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    const AdminSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        const formFields = {
            firstName: name,
            lastName: surname,
            email: email,
            phone: telephone,
            role: adminRole,
            lang: language,
            password: password2,
            secretword: unknownWord
        }

        await fetch("http://localhost:3000/api/adminReg", {
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
                toast.success(data.message, { position: "top-center", style: { fontSize: "1.5rem" } });
                window.location.href = `/${pathname.split("/")[1]}/${data?.redirect}`;
            }
            if (data.status === "Error") {
                toast.error(data.message, { position: "top-center", style: { fontSize: "1.5rem" } });
                setLoading(false);
            }
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (password1 === "" || password2 === "" || name === "" || surname === "" || email === "" || unknownWord === "") {
            setPasswordStyle({});
            setEnableReg(false);
        } else if (password1 !== password2) {
            setPasswordStyle({ outline: "2px solid red" });
            setEnableReg(false);
        } else if (unknownWord.length < 8 || unknownWord.length > 30) {
            setPasswordStyle({ outline: "2px solid red" });
            setEnableReg(false);
        } else {
            setPasswordStyle({ outline: "2px solid green" });
            setEnableReg(true);
        }
    }, [password1, password2, name, surname, email, unknownWord]);

    return (
        <form action="" method="post" id={styles.loginForm} onSubmit={AdminSignUp}>
            <p id={styles.formTitle}>{adminRegist("titles.adminReg")}</p>
            <div style={{ overflowY: "auto", flexGrow: 1, paddingRight: "10px", marginRight: "-10px", paddingLeft: "10px" }}>
                <TextFormField
                    label={adminRegist("fields.nameField.name")}
                    inputName="firstName"
                    styleId={styles.firstname}
                    placeholder={adminRegist("fields.nameField.placeholder")}
                    value={name}
                    onChange={(e) => valueChange(e, setName)}
                />

                <TextFormField
                    label={adminRegist("fields.surnameField.name")}
                    inputName="lastName"
                    styleId={styles.lastname}
                    placeholder={adminRegist("fields.surnameField.placeholder")}
                    value={surname}
                    onChange={(e) => valueChange(e, setSurname)}
                />

                <TextFormField
                    label={adminRegist("fields.emailField.name")}
                    inputType="email"
                    inputName="eMail"
                    styleId={styles.eMail}
                    placeholder={adminRegist("fields.emailField.namedPlaceholder")}
                    value={email}
                    onChange={(e) => valueChange(e, setEmail)}
                />

                <div>
                    <p style={{
                        fontSize: "2.2rem", fontStyle: "italic", paddingLeft: "0.5rem",
                        marginBottom: "0.75rem", marginTop: 0
                    }}>
                        {adminRegist("fields.otherNames.adminRole")}
                    </p>
                    <select id="" name="admin-roles" defaultValue={adminRole} onChange={(e) => setAdminRole(e.target.value)}
                        style={{
                            marginBottom: "2.5rem", fontSize: "2.0rem", border: "2px solid",
                            padding: "0.5rem", borderRadius: "1rem"
                        }}
                    >
                        {adminRoles.map((role, index) =>
                            <option key={index} value={role} style={{ fontSize: "2.0rem" }}>{role}</option>
                        )}
                    </select>
                </div>
                
                <div>
                    <p style={{
                        fontSize: "2.2rem", fontStyle: "italic", paddingLeft: "0.5rem",
                        marginBottom: "0.75rem", marginTop: 0
                    }}>
                        {adminRegist("fields.otherNames.language")}
                    </p>
                    <select name="languages" id="" defaultValue={language} onChange={(e) => setLanguage(e.target.value)}
                        style={{
                            marginBottom: "2.5rem", fontSize: "2.0rem", border: "2px solid",
                            padding: "0.5rem", borderRadius: "1rem"
                        }}
                    >
                        {languages.map((language, index) =>
                            <option key={index} value={language.lang} style={{ fontSize: "2rem" }}>{language.name}</option>
                        )}
                    </select>
                </div>

                <TextFormField
                    label={adminRegist("fields.telephoneField.name")}
                    inputType="telephone"
                    inputName="telephone"
                    styleId={styles.password_again}
                    placeholder={adminRegist("fields.telephoneField.placeholder")}
                    value={telephone}
                    onChange={(e) => valueChange(e, setTelephone)}
                    style={passwordStyle}
                />

                <TextFormField
                    label={adminRegist("fields.passwordField.name")}
                    inputType="password1"
                    inputName="password1"
                    styleId={styles.password_again}
                    placeholder={adminRegist("fields.passwordField.placeholder")}
                    value={password1}
                    onChange={(e) => valueChange(e, setPassword1)}
                    style={passwordStyle}
                />

                <TextFormField
                    label={adminRegist("fields.passwordField.repeatName")}
                    inputType="password2"
                    inputName="password2"
                    styleId={styles.password_again}
                    placeholder={adminRegist("fields.passwordField.placeholder")}
                    value={password2}
                    onChange={(e) => valueChange(e, setPassword2)}
                    style={passwordStyle}
                />

                <TextFormField
                    label={adminRegist("fields.unknownwordField.name")}
                    inputType="unknownWord"
                    inputName="unknownWord"
                    styleId={styles.password_again}
                    placeholder={adminRegist("fields.unknownwordField.placeholder")}
                    value={unknownWord}
                    onChange={(e) => valueChange(e, setUnknownWord)}
                    style={passwordStyle}
                />

                <div className={styles.formButtons}>
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
                            {adminRegist("buttons.logIn")}
                        </button>
                    )}
                    <Link href={pathname.slice(0, 3)}>
                        <input type="button" value={adminRegist("buttons.exit")} id={styles.closeButton} />
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </form>
    );
}
