"use client";

import Link from "next/link";
import styles from "./commonMenu.module.css";
import CommonLayout from "@/components/CommonLayout";
import FoodList from "@/components/FoodList";
import { useState } from "react";
import Calculator from "@/components/Calculator";


export default function CommonMenuPage() {

    const [click, setClick] = useState<boolean>(false);

    return (
        <CommonLayout>
            <div id={styles.main_part}>
                <h1>Просты спіс ежы на сённяшні дзень.</h1>
                <div id={styles.calculator_div} style={{
                    right: click ? "0px" : "-500px",
                }}>
                    {/* <p id={styles.temporarily_p}>Calculator Field</p> */}
                    <button
                        type="button"
                        style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                            marginLeft: "15px",
                            marginRight: "5px",
                        }}
                        onClick={() => setClick(!click)}
                    >
                        {click ? "Close Calculator" : "Open Calculator"}
                    </button>
                    <Calculator />
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
