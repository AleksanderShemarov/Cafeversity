import styles from "@/app/(auth)/login/LoginPage.module.css";
import Recovery from "@/components/Recovery";


export default function RecoveryPage() {
    return (
        <>
            <div className={styles.login_field}>
                <Recovery />
            </div>
        </>
    )
}
