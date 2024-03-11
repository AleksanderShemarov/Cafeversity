"use client"

import styles from "@/app/commonMenu/commonMenu.module.css";
import Image from "next/image";
import maczanka from "../../public/Мачанка_з_блінамі.jpeg";
import ImageText from "./ImageText";
import { useState } from "react";


export default function FoodList() {

    const [title, setTitle] = useState<string>("Назва Ежы");
    const [ing, setIng] = useState<string>("Склад: прадукт №1 (_%), прадукт №2 (_%), прадукт №3 (_%).");
    const [portion, setPortion] = useState<number>(200);
    const [price, setPrice] = useState<number>(0.00);

    return (
        <div className={styles.list_fields_zone}>
            <div id={styles.list_field}>
                <Image src={maczanka} alt="Мачанка_з_блінамі" style={{
                    width: "20vw",
                    height: "250px",
                    border: "7px solid gold",
                    borderRadius: "30px",
                    margin: "0 auto",
                    marginTop: "10px",
                    marginBottom: "10px",
                }}></Image>
                <ImageText
                    title={title}
                    ingredients={ing}
                    portion={portion}
                    cost={price}
                />
            </div>
        </div>
    )
}
