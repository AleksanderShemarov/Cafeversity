import styles from "@/app/(auth)/[locale]/login/LoginPage.module.css";
import PasswordRecovery from "@/components/PasswordRecovery";
import LangSwitcher from "@/components/PublicLangSwitcher/LangSwitcher";
import { ToastContainer } from "react-toastify";
import "../../../../globals.css";


export default function ResetPassword() {
    return (
        <>
            <div style={{ position: "relative" }}>
                <div style={{
                    position: "absolute", top: 0, left: "50%", fontFamily: "Consolas, monospace",
                    transform: "translate(-50%, 0)"
                }}>
                    <LangSwitcher color="black" />
                </div>
            </div>
            <div className={styles.login_field}>
                <PasswordRecovery />
            </div>
            <div>
                <ToastContainer theme="light" />
            </div>
        </>
    )
}
