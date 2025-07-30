"use client"

import Link from "next/link";
import styles from "@/app/(commonSite)/[locale]/news/news.module.css";
import { useState } from "react";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


export default function ThreeSubLinks({ children }: Readonly<{children: React.ReactNode,}>) {

    const pathname = usePathname();

    const threeSublinks = useTranslations("NewsPage.threeSublinks");

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
                        })} onClick={() => handleClick(0)}>{threeSublinks("bestRecipeSublink")}</a>
                    </Link>
                    <Link href={`${pathname.slice(0, 3)}/news/foodpeople`} legacyBehavior passHref>
                        <a className={clsx(styles.sub_link, {
                            [styles.sub_link_disabled]: activeButtons[1],
                        })} onClick={() => handleClick(1)}>{threeSublinks("food&peopleSubLink")}</a>
                    </Link>
                    <Link href={`${pathname.slice(0, 3)}/news/worldfood`} legacyBehavior passHref>
                        <a className={clsx(styles.sub_link, {
                            [styles.sub_link_disabled]: activeButtons[2],
                        })} onClick={() => handleClick(2)}>{threeSublinks("foodEventsSublink")}</a>
                    </Link>
                </div>
            </div>
            {children}
        </>
    )
}
