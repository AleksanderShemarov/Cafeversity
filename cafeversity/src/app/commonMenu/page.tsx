"use client";

import Link from "next/link";
import styles from "./commonMenu.module.css";
import CommonLayout from "@/components/CommonLayout";
import FoodList from "@/components/FoodList";
import { useState } from "react";


export default function CommonMenuPage() {

    const [click, setClick] = useState<boolean>(false);

    return (
        <CommonLayout>
            <div id={styles.main_part}>
                <h1>Просты спіс ежы на сённяшні дзень.</h1>
                <div id={styles.calculator_div} style={{
                    right: click ? "0px" : "-550px",
                }}>
                    <p id={styles.temporarily_p}>Calculator Field</p>
                    <button
                        type="button"
                        style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                        }}
                        onClick={() => setClick(!click)}
                    >
                        {click ? "Pushed" : "Push"}
                    </button>
                </div>
                <FoodList />
            </div>
            <div className={styles.buttons}>
                <Link href="/" id={styles.food_news}>Галоўная старонка</Link>
                <Link href="/news/foodpeople" id={styles.main_view}>Ежа Свету</Link>
            </div>
        </CommonLayout>
    )
}
