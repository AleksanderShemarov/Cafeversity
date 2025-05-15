import styles from "@/app/(auth)/login/LoginPage.module.css";
import SignUp from "@/components/SignUp";
import { ToastContainer } from "react-toastify";


export default function SignUpPage() {
    return (
        <>
            <div className={styles.login_field}>
                <SignUp />
            </div>
            <div>
                <ToastContainer theme="light" />
            </div>
        </>
    )
}
