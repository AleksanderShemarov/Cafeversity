import styles from "@/app/news/foodpeople/[foodpeople]/article.module.css";
import GordonRamsay_mainView from "@/../../public/Gordon_Ramsay_mainview.jpg";
import Image, { StaticImageData } from "next/image";
import Gordon_frontview from "@/../../public/Gordon_Ramsay_frontview.jpg";
import Chef from "@/../../public/Chef_Gordon_Ramsay.jpg";
import Gordon from "@/../../public/Gordon_Ramsay.jpg";
import GordonRamsay_Photo from "@/../../public/GordonRamsay_Photo.jpg";
import Ramsay_Mina from "@/../../public/GordonRamsay_MichaelMina_Masterchef.jpg";
import Ramsay_Rush from "@/../../public/GordonRamsay_AndreRush.jpg";


export default function ArticlePage() {

    const contextImages: StaticImageData[] = [
        Chef,
        Gordon,
        GordonRamsay_Photo,
        Ramsay_Mina,
        Ramsay_Rush,
    ];

    const birth_months: string[] = [
        "Студня", "Лютага", "Сакавіка", "Красавіка",
        "Траўня", "Чэрвня", "Ліпеня", "Жніўня",
        "Верасня", "Кастрычніку", "Лістападу", "Снежня",
    ];

    const years: number = ~~((
        new Date().getTime() - new Date("08.11.1966").getTime()
    ) / (1000 * 60 * 60 * 24 * 365.25));

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
                <div id={styles.first_text}>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur 
                        adipisicing elit. Obcaecati necessitatibus 
                        voluptas dolore nobis eos iure nulla doloribus 
                        error repudiandae expedita eum delectus 
                        commodi, velit mollitia.
                    </p>
                </div>
                <div id={styles.personal_data_block}>
                    <p>Галоўныя дадзеныя Гордана Рамсей</p>
                    <div className={styles.personal_data}>
                        <Image
                            src={Gordon_frontview}
                            alt={`${Gordon_frontview}`}
                            height={600}
                            className={styles.photo_data}
                        ></Image>
                        <ul className={styles.table_data}>
                            <li>
                                Імя: Гордан (анг.: Gordon)
                            </li>
                            <li>
                                Прозвішча: Рамсей (анг.: Ramsay)
                            </li>
                            <li>Нарадзіўся: 8 {birth_months[10]} 1966 года</li>
                            <li>Узрост: {years} год</li>
                            <li>Статус: Шэф-кухар, Рэстаратар</li>
                        </ul>
                    </div>
                </div>
                {contextImages.map((contextImage, index) =>
                    <div key={index} className={styles.article_part}>
                        <div className={styles.article_image}>
                            <Image
                                src={contextImage}
                                alt="Temporary_Photos"
                                height={300}
                            ></Image>
                        </div>
                        <div className={styles.article_text}>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet consectetur 
                                adipisicing elit. Perspiciatis ipsum 
                                quaerat culpa numquam ipsam aspernatur 
                                in odit animi nulla vitae! Mollitia in 
                                quis facilis quod quia fuga, ullam illo 
                                ipsum maxime libero, est reiciendis 
                                laudantium ea provident, repellendus 
                                quasi ipsa odio eum placeat vitae 
                                voluptatum cumque quos consequatur 
                                impedit? Similique.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
