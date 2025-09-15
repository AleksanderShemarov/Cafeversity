"use client";

import { useTranslations } from "next-intl";
import styles from "@/app/(auth)/[locale]/LoginPage.module.css";
import TextFormField from "@/components/TextFormField";
import Link from "next/link";
import { useState, startTransition } from "react";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import adminSecretWordCheck from "@/app/actions/adminSecretWordCheck";


export default function EmailCodeConfirmation() {

    const pathname = usePathname();
    const codeConfirm = useTranslations("AuthPages");

    const [word, setWord] = useState<string>("");
    
    const valueChange = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value.toUpperCase());
    }

    const wordCheck = () => {
        startTransition(async() => {
            const answer = await adminSecretWordCheck(Number(sessionStorage.getItem("admin-id")), word);
            if (answer.code) {
                toast.success(answer.message, { position: "top-center", style: { fontSize: "1.8rem" } });
                sessionStorage.removeItem("admin-id");
                window.location.href = `${answer?.redirect}`;
            } else {
                toast.error(answer.message, { position: "top-center", style: { fontSize: "1.8rem" } });
            }
        });
    }

    return (
        <form action="" id={styles.loginForm} onSubmit={wordCheck}>
            <p id={styles.formTitle}>Ўвод свайго слова</p>
            <p id={styles.formText}>
                Ўвядзіце свае слова
            </p>
            <TextFormField
                label={codeConfirm("fields.emailCodeConfirmField.name")}
                inputType="text"
                inputName="passwordAgain"
                styleId={styles.password}
                placeholder={codeConfirm("fields.emailCodeConfirmField.placeholder")}
                value={word}
                onChange={(e) => valueChange(e, setWord)}
            />

            <div className={styles.formButtons}>
                <button
                    id={styles.submitButton}
                    type="submit"
                    disabled={word.length === 0}
                    style={word.length === 0 ? { 
                        color: "white",
                        fontStyle: "italic",
                        backgroundColor: "lightgray",
                        outline: "2px dashed black",
                        pointerEvents: "none",
                    } : {}}
                >
                    {codeConfirm("buttons.confirm")}
                </button>
                <Link href={`${pathname.slice(0, 3)}/admiN_Login`}>
                    <input type="button" value={codeConfirm("buttons.adminEntrance")} id={styles.closeButton} />
                </Link>
            </div>
        </form>
    );
}