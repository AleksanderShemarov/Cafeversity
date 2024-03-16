import React from "react";
import CommonLayout from "@/components/CommonLayout";
import ThreeSubLinks from "@/components/ThreeSubLinks";
import Link from "next/link";
import styles from "@/app/page.module.css";


export default function Layout ({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <CommonLayout>
            <ThreeSubLinks>
                {children}
            </ThreeSubLinks>
            <div className={styles.buttons}>
                <Link href="/commonMenu" id={styles.food_today}>Сённяшнія Стравы</Link>
                <Link href="/" id={styles.main_view}>Галоўная старонка</Link>
            </div>
        </CommonLayout>
    )
}
