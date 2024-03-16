// import Link from "next/link";
// import styles from "../page.module.css";
import styles2 from "@/app/news/news.module.css"
// import CommonLayout from "@/components/CommonLayout";
// import ThreeSubLinks from "@/components/ThreeSubLinks";
import WorldFood from "./worldfood/page";
import FoodPeople from "./foodpeople/page";
import RecipeDay from "./recipeday/page";


export default function NewsPage() {

    return (
        <>    
            <WorldFood id={styles2.main_part} />
            <FoodPeople id={styles2.main_part} />
            <RecipeDay id={styles2.main_part} />
        </>
    )
}

{/*<CommonLayout>
            <ThreeSubLinks>
                <WorldFood id={styles2.main_part} />
            </ThreeSubLinks>

            <div id={styles.main_part}>
                <h1>Старонка з навінамі з сусвету ежы</h1>
            </div>

            <div className={styles.buttons}>
                <Link href="/commonMenu" id={styles.food_today}>Сённяшнія Стравы</Link>
                <Link href="/" id={styles.main_view}>Галоўная старонка</Link>
            </div>
        </CommonLayout> */}