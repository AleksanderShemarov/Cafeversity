import styles from "@/app/news/foodpeople/[foodpeople]/article.module.css";
import GordonRamsay_mainView from "@/../../public/Gordon_Ramsay_mainview.jpg";
import Image from "next/image";


export default function ArticlePage() {
    return (
        <div id={styles.main_part}>
            <h1>Тут будзе адабраны для прагляду артыкул.</h1>
            <div id={styles.article_body}>
                <div id={styles.article_enter_image}>
                    <Image
                        src={GordonRamsay_mainView}
                        alt="Gordon_Ramsay_mainview.jpg"
                        height={500}
                        width={925}
                        style={{
                            borderTopLeftRadius: "27px",
                            borderTopRightRadius: "27px",
                        }}
                    ></Image>
                    <div id={styles.article_enter_name}>
                        <h1 id={styles.article_enter_head}>Гордан Рамсей</h1>
                        <p id={styles.article_enter_shorty}>Незвычайны лёс цікавага чалавека</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
