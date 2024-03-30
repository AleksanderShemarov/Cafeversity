import styles from "@/app/news/news.module.css";


export default function Calculator() {
    return (
        <div id={styles.calculator}>
            <p id={styles.calculator_name}>Лічыльнык страў</p>
            <table className="food_zone">
                <tr>
                    <th>№</th>
                    <th>Назва Стравы</th>
                    <th>Кол-сць порцый</th>
                    <th>Кошт</th>
                </tr>
                <tr>
                    <td>1.</td>
                    <td>Калдуны</td>
                    <td>1</td>
                    <td>3.15</td>
                </tr>
            </table>
            <div className={styles.message_summa}>
                <div className={styles.importance}>Паведамленне</div>
                <div className={styles.price_sum}>Сума коштаў</div>
            </div>
        </div>
    )
}