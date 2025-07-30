"use client";

import React, { useState } from "react";
import styles from "@/app/(commonSite)/[locale]/news/foodpeople/foodpeople.module.css";
import { useTranslations } from "next-intl";


type SearchLineHandler = {
    searchingHandler: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void,
}

export default function SearchLine({ searchingHandler }: SearchLineHandler) {

    const searchLine = useTranslations("NewsPage.Food&People");

    const [line, setLine] = useState<string>("");

    const valueChanging = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    return (
        <>
            <div id={styles.searchline_box} style={{ outline: "1px solid" }}>
                <input
                    id={styles.searchline_zone}
                    title={searchLine("searchLineTip")}
                    type="text"
                    value={line}
                    onChange={(e) => {
                        searchingHandler(e);
                        valueChanging(e, setLine);
                    }}
                    placeholder={searchLine("searchLine")}
                 />
            </div>
            <div className={styles.temporary_answer}>
                <p className={styles.temporary_answer_line}>{line}</p>
            </div>
        </>
    )
}
