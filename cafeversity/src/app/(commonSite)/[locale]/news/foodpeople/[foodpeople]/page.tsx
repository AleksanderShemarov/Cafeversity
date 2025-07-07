import styles from "@/app/(commonSite)/[locale]/news/foodpeople/[foodpeople]/article.module.css";
import Image from "next/image";
// import Chef from "@/../../public/Chef_Gordon_Ramsay.jpg";
// import Gordon from "@/../../public/Gordon_Ramsay.jpg";
// import GordonRamsay_Photo from "@/../../public/GordonRamsay_Photo.jpg";
// import Ramsay_Mina from "@/../../public/GordonRamsay_MichaelMina_Masterchef.jpg";
// import Ramsay_Rush from "@/../../public/GordonRamsay_AndreRush.jpg";


type ArticlesData = {
    id: number,
    article_title: string,
    article_text: string,
    article_image_path: string,
    articleList_seeing: boolean,
    mainImagePath: string,
    mainTitle: string,
    shortTitle: string,
    firstText: string,
    personalImagePath: string,
    personalName: string,
    personalSurname: string,
    birthDay: string,
    birthTown: string,
    birthCountry: string,
    birthdayDate: string,
    personalStatus: string,
    imagePaths: string,
    mainText: string,
    createdAt: string,
    published: boolean,
}

export async function generateStaticParams() {
    let articles = await fetch("http://localhost:3000/api/articles").then((response) => response.json());

    articles = articles.filter((article: ArticlesData) => article.articleList_seeing);
    return articles.map((article: ArticlesData) => ({
        id: article,
    }));
}

export default async function ArticlePage({ params }: { params: {foodpeople: number} }) {

    const { foodpeople } = params;
    // console.log(foodpeople);// 2
    const choisenArticle: ArticlesData = await fetch(`http://localhost:3000/api/articles?id=${foodpeople}`)
        .then(res => res.json());

    const images: string[] = choisenArticle.imagePaths.split(";");
    const texts: string[] = choisenArticle.mainText.split("\\\\&;");

    const imagesTexts: string[][] = [];
    for (let i = 0; i < images.length; i++) {
        const part = [];
        part.push(images[i]);
        part.push(texts[i]);
        imagesTexts.push(part);
    }

    /* 
    text sources:
    - https://familytron.com/gordon-ramsay/;
    - https://en.wikipedia.org/wiki/Gordon_Ramsay;
    - https://www.ranker.com/list/best-gordon-ramsay-shows/ranker-tv;
    - https://youtube.fandom.com/wiki/Bayashi_TV
    - https://youtube.fandom.com/wiki/Nick_DiGiovanni
    - https://youtube.fandom.com/wiki/Albert_cancook
    - https://youtube.fandom.com/wiki/ItsQCP
    */

    const years: number = ~~((
        new Date().getTime() - new Date(choisenArticle.birthdayDate).getTime()
    ) / (1000 * 60 * 60 * 24 * 365.25));

    return (
        <div id={styles.main_part}>
            {/* <h1>Тут будзе адабраны для прагляду артыкул.</h1> */}
            <div id={styles.article_body}>
                <div id={styles.article_enter_image}>
                    <Image
                        src={choisenArticle.mainImagePath}
                        alt={`${choisenArticle.mainImagePath.slice(1)}`}
                        height={500}
                        width={925}
                        style={{
                            borderTopLeftRadius: "27px",
                            borderTopRightRadius: "27px",
                            boxShadow: "0 7px 4px yellow",
                        }}
                    ></Image>
                    <div id={styles.article_enter_name}>
                        <h1 id={styles.article_enter_head}>{choisenArticle.mainTitle}</h1>
                        <p id={styles.article_enter_shorty}>{choisenArticle.shortTitle}</p>
                    </div>
                </div>
                <div id={styles.first_text}>
                    {choisenArticle.firstText.split("\\\\;").map((first_text_part, index) => 
                        <div key={index} style={{
                            textIndent: "1.5em",
                            fontSize: "28px",
                            color: "antiquewhite",
                            lineHeight: "1.35em",
                        }}>{first_text_part}</div>
                    )}
                </div>
                <div id={styles.personal_data_block}>
                    <p>Галоўныя дадзеныя</p>
                    <div className={styles.personal_data}>
                        {/* <Image
                            src={Gordon_frontview}
                            alt={`${Gordon_frontview}`}
                            height={600}
                            className={styles.photo_data}
                        ></Image> */}
                        <Image
                            src={choisenArticle.personalImagePath}
                            alt={`${choisenArticle.personalImagePath.slice(1)}`}
                            height={600}
                            width={450}
                            className={styles.photo_data}
                        ></Image>
                        <ul className={styles.table_data}>
                            <li>
                                <span style={{
                                    fontStyle: "italic",
                                    fontWeight: "bolder",
                                }}>Імя:</span>&emsp;{choisenArticle.personalName}
                            </li>
                            <li>
                                <span style={{ 
                                    fontStyle: "italic",
                                    fontWeight: "bolder",
                                }}>Прозвішча:</span>&emsp;{choisenArticle.personalSurname}
                            </li>
                            <li>
                                <span style={{ 
                                    fontStyle: "italic",
                                    fontWeight: "bolder",
                                }}>Нарадзіўся:</span>&emsp;{choisenArticle.birthDay};<br />
                            {choisenArticle.birthTown}, {choisenArticle.birthCountry}</li>
                            <li>
                                <span style={{ 
                                    fontStyle: "italic",
                                    fontWeight: "bolder",
                                }}>Узрост:</span>&emsp;{years} год
                            </li>
                            <li>
                                <span style={{ 
                                    fontStyle: "italic",
                                    fontWeight: "bolder",
                                }}>Статус:</span>&emsp;{choisenArticle.personalStatus}
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Дадзеныя з Базы Дадзен праз articles API</p> */}
                {imagesTexts.map((imageText, index) =>
                    <div key={index} className={styles.article_part}>
                        <div className={styles.article_image}>
                            <div className={styles.image_container}>
                                <Image
                                    src={imageText[0]}
                                    alt={`${imageText[0].slice(1)}`}
                                    height={300}
                                    width={550}
                                    style={{
                                        borderRadius: "30px",
                                    }}
                                ></Image>
                            </div>
                        </div>
                        <div className={styles.article_text}>
                            <div>
                                {imageText[1].split("\\\\;").map((text, index) => 
                                    <div key={index} style={{
                                        textIndent: "1.5em",
                                        lineHeight: "1.35em",
                                        color: "white",
                                    }}>{text}</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
