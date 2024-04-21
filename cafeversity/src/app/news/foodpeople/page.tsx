import styles from "@/app/news/foodpeople/foodpeople.module.css";
import SearchLine from "@/components/SearchLine";
import ArticleBar from "@/components/ArticleBar";
import Gordon_Ramsay from "../../../../public/Gordon_Ramsay_and_the_dish.jpg";
import Gordon_Ramsay_cooking from "../../../../public/Gordon_Ramsay_cooking.jpg";
import noImage from "../../../../public/no_image1.jpg";


export default function FoodPeople () {

    const articlesBars = [
        {
            id: 1,
            image: Gordon_Ramsay,
            imageName: "Gordon_Ramsay_and_the_dish.jpg",
            articleHead: "Гордан Рамсей",
            articleShort: "Легенда кулінарнага мастацтва, рэстаратар ды тэле-зорка. 7 зорак Мішлэну і шэф-повар, якога ведаюць ва ўсім свеце.",
        },
        {
            id: 2,
            image: Gordon_Ramsay_cooking,
            imageName: "Gordon_Ramsay_cooking.jpg",
            articleHead: "Плануем...",
            articleShort: "У хуткім часе будуць даданыя новыя асобы. Мы працуем над гэтым.",
        },
        {
            id: 3,
            image: noImage,
            imageName: "no_image1.jpg",
            articleHead: "Article Header",
            articleShort: "Short Description.",
        },
    ];

    return (
        <div id={styles.main_part}>
            <h1>Знакамітыя людзі аб Ежы</h1>
            <SearchLine />
            {articlesBars.map((articleBar) => 
                <ArticleBar
                    key={articleBar.id}
                    picture={articleBar.image}
                    pictName={articleBar.imageName}
                    articleName={articleBar.articleHead}
                    shortText={articleBar.articleShort}
                />
            )}
        </div>
    )
}
