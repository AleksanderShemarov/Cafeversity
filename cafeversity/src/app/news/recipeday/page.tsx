import styles from "@/app/news/news.module.css";
import Calculator from "@/components/Calculator"; // temporarily added for the "recipeday" page


export default function RecipeDay () {
    return (
        <div id={styles.main_part}>
            <h1>Сённяшнія Рэцэпты</h1>
            <Calculator />
        </div>
    )
}
