import styles from "@/pages/login/LoginPage.module.css";
import PasswordRecovery from "@/components/PasswordRecovery";


export default function ResetPassword() {
    return (
        <>
            <div className={styles.login_field}>
                <PasswordRecovery />
            </div>
        </>
    )
}
