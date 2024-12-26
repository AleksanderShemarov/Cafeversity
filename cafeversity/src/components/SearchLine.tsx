"use client";

import React, { useState } from "react";
import styles from "@/app/news/foodpeople/foodpeople.module.css";


type SearchLineHandler = {
    searchingHandler: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void,
}

export default function SearchLine({ searchingHandler }: SearchLineHandler) {

    const [line, setLine] = useState<string>("");

    const valueChanging = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    return (
        <>
            <div id={styles.searchline_box}>
                <input
                    id={styles.searchline_zone}
                    title="Увядзі свой запыт!"//"Type your query here!"
                    type="text"
                    value={line}
                    onChange={(e) => {
                        searchingHandler(e);
                        valueChanging(e, setLine);
                    }}
                    placeholder="Пошук..."//"Search..."
                 />
            </div>
            <div className={styles.temporary_answer}>
                <p className={styles.temporary_answer_line}>{line}</p>
            </div>
        </>
    )
}
