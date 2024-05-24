<<<<<<< HEAD
"use client";

import Link from "next/link";
=======
// import Link from "next/link";
>>>>>>> developer
import styles from "./commonMenu.module.css";
// import CommonLayout from "@/components/CommonLayout";
import FoodList from "@/components/FoodList";
<<<<<<< HEAD
import React, { useState } from "react";
import Calculator from "@/components/Calculator";
=======
import TwoMainBottomButtons from "@/components/MainBottomButtons";
>>>>>>> developer


type buttonDatum = {
    path: string,
    id_style: string,
    button_name: string,
}// These types are for the TwoMainBottomButtons Component's array in 'data' variable and are the same in OptionData interface

export default function CommonMenuPage() {

<<<<<<< HEAD
    const [click, setClick] = useState<boolean>(false);
    const [food, setFood] = useState<[number, string, number, number]>([0, "", 0, 0.00]);

    const foodIncluding = (
        event: React.MouseEvent<HTMLParagraphElement>,
        product_index: number,
        product_id: number,
        product_name: string,
        product_cost: number,
    ) => {
        // console.log("This signal goes from the Common Menu page through FoodList Component.");
        console.log(`Product Index: ${product_index}`);
        setFood([product_id, product_name, 1, product_cost]);
    }
=======
    const buttonsData : buttonDatum[] = [
        { path: "/", id_style: styles.food_news, button_name: "Галоўная старонка" },
        { path: "/news/foodpeople", id_style: styles.food_news, button_name: "Ежа Свету" },
    ];
>>>>>>> developer

    return (
        <>
        {/* <CommonLayout> */}{/* I removed it into layout.tsx; RootLayout Component */}
            <div id={styles.main_part}>
                <h1>Просты спіс ежы на сённяшні дзень.</h1>
                <div id={styles.calculator_div} style={{
                    right: click ? "0px" : "-500px",
                }}>
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
                    <Calculator params={food} />
                </div>
                <FoodList onClick={foodIncluding} />
            </div>
            {/* <div className={styles.buttons}>
                <Link href="/" id={styles.food_news}>Галоўная старонка</Link>
                <Link href="/news/foodpeople" id={styles.main_view}>Ежа Свету</Link>
            </div> */}
            <TwoMainBottomButtons data={buttonsData} />
        {/* </CommonLayout> */}
        </>
    )
}
