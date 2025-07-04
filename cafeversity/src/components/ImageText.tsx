import styles from "@/app/(commonSite)/[locale]/commonMenu/commonMenu.module.css";
import React from "react";


interface ImageData {
    title: string,
    ingredients: string,
    portion: number,
    cost: number,
    onClick: (
        event: React.MouseEvent<HTMLParagraphElement>,
    ) => void,
}

export default function ImageText({ title, ingredients, portion, cost, onClick } : ImageData) {
    return (
        <div className={styles.text_lines}>
            <p id={styles.food_title}>{title}</p>
            <p id={styles.food_ing}>Склад: {ingredients}</p>
            <div className={styles.portia_price}>
                <p id={styles.portia}>Вага порцыі: {portion} г.</p>
                <p id={styles.price} onClick={onClick}>Кошт: {cost} BYN</p>
            </div>
        </div>
    )
}
