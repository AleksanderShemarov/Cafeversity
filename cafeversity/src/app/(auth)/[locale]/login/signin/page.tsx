import styles from "@/app/(auth)/[locale]/login/LoginPage.module.css" 
import LogIn from "@/components/LogIn";
import { ToastContainer } from "react-toastify";


export default function SignInPage() {
    return (
        <>
            <div className={styles.login_field}>
                <LogIn />
            </div>
            <div>
                <ToastContainer theme="light" />
            </div>
        </>
    )
}
