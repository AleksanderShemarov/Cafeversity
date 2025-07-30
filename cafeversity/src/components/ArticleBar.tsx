import styles from "@/app/(commonSite)/[locale]/news/foodpeople/foodpeople.module.css";
// import Gordon_Ramsay from "../../public/Gordon_Ramsay_and_the_dish.jpg";
import Image, { StaticImageData } from "next/image";


interface ArticleBarValues {
    picture: StaticImageData | string,
    pictName: string,
    articleName: string,
    shortText: string,
}

export default function ArticleBar({ picture, pictName, articleName, shortText } : ArticleBarValues) {
    return (
        <>
            <div className={styles.article_bar_body}>
                <div className={styles.article_bar_image}>
                    <Image
                        src={picture}
                        alt={pictName}
                        height={375}
                        width={665}// Вырашыць праблему з габарытамі рознапамерных малюнкаў
                        style={{
                            borderTopLeftRadius: "27px",
                            borderBottomLeftRadius: "27px",
                        }}
                    ></Image>
                </div>
                <div className={styles.article_bar_text}>
                    <div className={styles.article_text}>
                        <h2 className={styles.article_name}>{articleName}</h2>
                        <p className={styles.article_short}>{shortText}</p>
                    </div>
                </div>
            </div>
        </>
    )
}