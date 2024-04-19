import styles from "@/app/news/foodpeople/foodpeople.module.css";
import Gordon_Ramsay from "../../public/Gordon_Ramsay_and_the_dish.jpg";
import Image from "next/image";


export default function ArticleBar() {
    return (
        <>
        {/* <div id={styles.article_bar_zone}> */}
            <div className={styles.article_bar_body}>
                <div className={styles.article_bar_image}>
                    <Image
                        src={Gordon_Ramsay}
                        alt="Gordon_Ramsay_and_the_dish.jpg"
                        height={375}
                        style={{
                            borderTopLeftRadius: "27px",
                            borderBottomLeftRadius: "27px",
                        }}
                    ></Image>
                </div>
                <div className={styles.article_bar_text}>
                    <div className={styles.article_text}>
                        {/* <h2 className={styles.article_name}>Article Header</h2> */}
                        <h2 className={styles.article_name}>Гордан Рамсей</h2>
                        <p className={styles.article_short}>
                            Легенда кулінарнага мастацтва, рэстаратар ды тэле-зорка. 7 зорак Мішлэну і шэф-повар, якога ведаюць ва ўсім свеце.
                        </p>
                        {/* <p className={styles.article_short}>
                            Short Description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, recusandae.
                        </p> */}
                    </div>
                </div>
            </div>
        {/* </div> */}
        </>
    )
}