"use client";

import React, { useState } from "react";
import styles from "@/app/news/foodpeople/foodpeople.module.css";


export default function SearchLine() {

    const [line, setLine] = useState<string>("");

    const valueChanging = (event: React.ChangeEvent<HTMLInputElement>, reactHook: (value: string) => void) => {
        reactHook(event.target.value);
    }

    return (
        <div id={styles.searchline}>
            <div id={styles.searchline_box}>
                <input
                    id={styles.searchline_zone}
                    type="text"
                    value={line}
                    onChange={(e) => valueChanging(e, setLine)}
                 />
            </div>
            <div className={styles.temporary_answer}>
                <p className={styles.temporary_answer_line}>{line}</p>
            </div>
        </div>
    )
}