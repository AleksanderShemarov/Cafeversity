"use client";

import { useTranslations } from "next-intl";
import styles from "@/app/(auth)/[locale]/LoginPage.module.css";
import TextFormField from "@/components/TextFormField";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

// add parallel routes for EmailCodeConfirmation:
// --- the first one is for inputting a sent generated code (has already created);
// --- the second one is for inputting a secret word (!!! MUST BE CREATED !!!).


export default function EmailCodeConfirmation() {

    const pathname = usePathname();
    const codeConfirm = useTranslations("AuthPages");

    const [code, setCode] = useState<string>("");
    const [enableReg, setEnableReg] = useState<boolean>(false);

    const [checking, setChecking] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        let newValue = event.target.value.toUpperCase();

        newValue = newValue.replace(/-/g, "");

        if (newValue.length > 4) {
            newValue = newValue.slice(0, 4) + "-" + newValue.slice(4);
        }
        if (newValue.length > 10) {
            newValue = newValue.slice(0, 10) + "-" + newValue.slice(10);
        }

        newValue = newValue.slice(0, 15);
        
        reactHook(newValue);
    }

    useEffect(() => {
        if (code === "" || code.length !== 15) {
            setEnableReg(false);
        } else {
            setEnableReg(true);
        }
        // if (code.length === 4 || code.length === 10)
        //     setCode(`${code}-`);
    }, [code]);

    const CodeSentOnServer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setChecking(true);

        const formFields = {
            adminId: Number(sessionStorage.getItem("admin-id")),
            emailCode: code
        }

        await fetch("http://localhost:3000/api/adminCheck?page=emailCode", {
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
                setChecking(false);
                setLoading(true);
                sessionStorage.removeItem("admin-id");
                window.location.href = data?.redirect;
            }
            if (data.status === "Error") {
                toast.error(data.message, { position: "top-center", style: { fontSize: "1.8rem" } });
                setChecking(false);
            }
        })
        .catch((error) => console.error(error));
    }

    return (
        <form action="" method="post" id={styles.loginForm} onSubmit={CodeSentOnServer}>
            <p id={styles.formTitle}>{codeConfirm("titles.codeConfirmation")}</p>
            <p id={styles.formText}>
                {`${
                    codeConfirm("texts.codeConfirmation.part1")
                    }email@example.com${
                    codeConfirm("texts.codeConfirmation.part2")
                }`}
            </p>
            <TextFormField
                label={codeConfirm("fields.emailCodeConfirmField.name")}
                inputType="text"
                inputName="passwordAgain"
                styleId={styles.password}
                placeholder={codeConfirm("fields.emailCodeConfirmField.placeholder")}
                value={code}
                onChange={(e) => valueChange(e, setCode)}
            />

            <div className={styles.formButtons}>
                {checking ? (
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
                ) : loading ? (
                    <button type="button" disabled style={{
                        height: "35px", minWidth: "105px", fontSize: "20px", borderRadius: "10px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        outline: "3px solid blue", color: "blue", backgroundColor: "white",
                    }}>
                        <p style={{ margin: 0, fontSize: "2rem", display: "flex", alignItems: "center" }}>
                            Загрузка<span id="dots"></span>
                        </p>
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
                        {codeConfirm("buttons.confirm")}
                    </button>
                )}
                <Link href={`${pathname.slice(0, 3)}/admiN_Login`}>
                    <input type="button" value={codeConfirm("buttons.adminEntrance")} id={styles.closeButton} />
                </Link>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                #dots::after {
                    content: '';
                    display: inline-block;
                    animation: dots 1.5s steps(4, end) infinite;
                    dont-size: 2rem;
                }

                @keyframes dots {
                    0% {
                        content: '';
                    }
                    25% {
                        content: '•';
                    }
                    50% {
                        content: '••';
                    }
                    75% {
                        content: '•••';
                    }
                    100% {
                        content: '';
                    }
                }
            `}</style>
        </form>
    );
}
