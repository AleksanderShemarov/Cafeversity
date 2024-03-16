import Link from "next/link";
import styles from "@/app/news/news.module.css";


export default function ThreeSubLinks({ children }: Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            <div className={styles.sub_links_panel}>
                <div className={styles.sub_links}>
                    <Link href="/news/recipeday" className="sub_link">Рэцэпт Дня</Link>
                    <Link href="/news/foodpeople" className="sub_link">Людзі і Ежа</Link>
                    <Link href="/news/worldfood" className="sub_link">Свет Ежы</Link>
                </div>
            </div>
            {children}
        </>
    )
}
