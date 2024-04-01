import styles from "@/app/news/news.module.css";
// import Calculator from "@/components/Calculator"; // temporarily added for the "recipeday" page
import dynamic from "next/dynamic";


const Calculator = dynamic(() => import("@/components/Calculator"), { ssr: false })

export default function RecipeDay () {
    return (
        <div id={styles.main_part}>
            <h1>Сённяшнія Рэцэпты</h1>
            <Calculator />
        </div>
    )
}
