import styles from "@/app/commonMenu/commonMenu.module.css";


interface ImageData {
    title: string,
    ingredients: string,
    portion: number,
    cost: number,
}

export default function ImageText({ title, ingredients, portion, cost } : ImageData) {
    return (
        <div className={styles.text_lines}>
            <p id={styles.food_title}>{title}</p>
            <p id={styles.food_ing}>Склад: {ingredients}</p>
            <div className={styles.portia_price}>
                <p id={styles.portia}>Вага порцыі: {portion} граммаў</p>
                <p id={styles.price}>Кошт: {cost} BYN</p>
            </div>
        </div>
    )
}
