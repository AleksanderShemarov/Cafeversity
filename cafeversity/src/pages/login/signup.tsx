import styles from "@/pages/login/LoginPage.module.css";
import SignUp from "@/components/SignUp";


export default function SignUpPage() {
    return (
        <>
            <div className={styles.login_field}>
                <SignUp />
            </div>
        </>
    )
}
