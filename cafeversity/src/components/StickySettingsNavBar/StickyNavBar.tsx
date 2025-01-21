"use client";

import stickyStyles from "@/components/StickySettingsNavBar/StickyNavBar.module.css";
import { useState } from "react";
import StickyNavbarPart from "./StickyNavbarPart";
import { useTranslations } from "next-intl";


export default function StickyNavBar({
    navbarName,
    pageTranslate,
    stickyNavbarParts,
}: {
    navbarName: string,
    pageTranslate: string,
    stickyNavbarParts: string[],
}) {
    const [checking, setChecking] = useState<boolean[]>([true, false, false]);

    const switching = (index: number) => {
        const newParts = Array(checking.length).fill(false);
        newParts[index] = !(checking[index]);
        setChecking(newParts);
    }

    const t = useTranslations(pageTranslate);

    return (
        <div id={stickyStyles.sticky_navbar}>
            <p id={stickyStyles.sticky_navbar_name}>
                {t(navbarName)}
            </p>
            <hr />
            <div id={stickyStyles.sticky_navbar_links}>
                {stickyNavbarParts.map((navbarPart, index) =>
                    <StickyNavbarPart key={index}
                        actionIndex={index}
                        partName={navbarPart}
                        pageTranslate={pageTranslate}
                        checkingBools={checking}
                        switchFunc={switching}
                    />
                )}
            </div>
        </div>
    )
}
