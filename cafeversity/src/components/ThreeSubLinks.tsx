"use client"

import Link from "next/link";
import styles from "@/app/(commonSite)/[locale]/news/news.module.css";
import { useState } from "react";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";


export default function ThreeSubLinks({ children }: Readonly<{children: React.ReactNode,}>) {

    const pathname = usePathname();

    const [activeButtons, setActiveButtons] = useState<boolean[]>([false, true, false]);

    const handleClick = (num: number) => {
        const activity : boolean[] = Array(activeButtons.length).fill(false);
        const button = !(activeButtons[num]);
        activity[num] = button;
        setActiveButtons(activity);
    }

    return (
        <>
            <div className={styles.sub_links_panel}>
                <div className={styles.sub_links}>
                    <Link href={`${pathname.slice(0, 3)}/news/recipeday`} legacyBehavior passHref>
                        <a className={clsx(styles.sub_link, {
                            [styles.sub_link_disabled]: activeButtons[0],
                        })} onClick={() => handleClick(0)}>Рэцэпт Дня</a>
                    </Link>
                    <Link href={`${pathname.slice(0, 3)}/news/foodpeople`} legacyBehavior passHref>
                        <a className={clsx(styles.sub_link, {
                            [styles.sub_link_disabled]: activeButtons[1],
                        })} onClick={() => handleClick(1)}>Людзі і Ежа</a>
                    </Link>
                    <Link href={`${pathname.slice(0, 3)}/news/worldfood`} legacyBehavior passHref>
                        <a className={clsx(styles.sub_link, {
                            [styles.sub_link_disabled]: activeButtons[2],
                        })} onClick={() => handleClick(2)}>Свет Ежы</a>
                    </Link>
                </div>
            </div>
            {children}
        </>
    )
}
