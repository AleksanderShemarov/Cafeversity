import styles from "@/app/(auth)/[locale]/login/LoginPage.module.css";
import PasswordRecovery from "@/components/PasswordRecovery";
import { ToastContainer } from "react-toastify";


export default function ResetPassword() {
    return (
        <>
            <div className={styles.login_field}>
                <PasswordRecovery />
            </div>
            <div>
                <ToastContainer theme="light" />
            </div>
        </>
    )
}
