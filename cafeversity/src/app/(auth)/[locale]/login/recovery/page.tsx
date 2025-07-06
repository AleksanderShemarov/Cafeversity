import styles from "@/app/(auth)/[locale]/login/LoginPage.module.css";
import LangSwitcher from "@/components/PublicLangSwitcher/LangSwitcher";
import Recovery from "@/components/Recovery";
import { ToastContainer } from "react-toastify";
import "../../../../globals.css";


export default function RecoveryPage() {
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
                <Recovery />
            </div>
            <div>
                <ToastContainer theme="light" />
            </div>
        </>
    )
}
