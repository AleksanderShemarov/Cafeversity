"use client";

import Link from "next/link";
import styles from "./commonMenu.module.css";
import CommonLayout from "@/components/CommonLayout";
import FoodList from "@/components/FoodList";
import React, { useState } from "react";
import Calculator from "@/components/Calculator";


export default function CommonMenuPage() {

    const [click, setClick] = useState<boolean>(false);

    const foodIncluding = (
        event: React.MouseEvent<HTMLParagraphElement>,
        product_index: number,
        product_id: number,
        product_name: string,
        product_cost: number,
    ) => {
        console.log("This signal goes from the Common Menu page through FoodList Component.");
        console.log(`Product Index: ${product_index}`);
        console.log(`Product ID: ${product_id}`);
        console.log(`Product Name: ${product_name}`);
        console.log(`Product Cost: ${product_cost}`);
        console.log("Product portion amount is 1");
    }

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
                <FoodList onClick={foodIncluding} />
            </div>
            <div className={styles.buttons}>
                <Link href="/" id={styles.food_news}>Галоўная старонка</Link>
                <Link href="/news/foodpeople" id={styles.main_view}>Ежа Свету</Link>
            </div>
        </CommonLayout>
    )
}
