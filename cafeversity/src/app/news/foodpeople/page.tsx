import styles from "@/app/news/foodpeople/foodpeople.module.css";
import SearchLine from "@/components/SearchLine";


export default function FoodPeople () {
    return (
        <div id={styles.main_part}>
            <h1>Знакамітыя людзі аб Ежы</h1>
            <SearchLine />
        </div>
    )
}
