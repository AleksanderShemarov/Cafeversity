import styles from "@/pages/login/LoginPage.module.css";
import LogIn from "@/components/LogIn";


export default function LoginPage() {
    return (
        <>
            <div className={styles.login_field}>
                <LogIn />
            </div>
        </>
    )
}
