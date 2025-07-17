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
    
    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    useEffect(() => {
        if (code === "" || code.length > 15 || code.length < 15) {
            setEnableReg(false);
        } else {
            setEnableReg(true);
        }
    }, [code]);

    const CodeSentOnServer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formFields = {
            adminId: sessionStorage.getItem("admin-id"),
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
            if (data.status === "Success") toast.success(data.message, { position: "top-center" });
            if (data.status === "Error") toast.error(data.message, { position: "top-center" });
        })
        .catch((error) => console.error(error));
    }

    return (
        <>
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
                    inputType="password"
                    inputName="passwordAgain"
                    styleId={styles.password}
                    placeholder={codeConfirm("fields.emailCodeConfirmField.placeholder")}
                    value={code}
                    onChange={(e) => valueChange(e, setCode)}
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
                        {codeConfirm("buttons.confirm")}
                    </button>
                    <Link href={`${pathname.slice(0, 3)}/admiN_Login`}>
                        <input type="button" value={codeConfirm("buttons.adminEntrance")} id={styles.closeButton} />
                    </Link>
                </div>
            </form>
        </>
    );
}
