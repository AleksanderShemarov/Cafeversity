import styles from "@/app/(commonSite)/[locale]/news/foodpeople/[foodpeople]/article.module.css";
import Image from "next/image";
import Link from "next/link";
// import prisma from "../../../../../../../lib/utils/prismaClient";
// import Chef from "@/../../public/Chef_Gordon_Ramsay.jpg";
// import Gordon from "@/../../public/Gordon_Ramsay.jpg";
// import GordonRamsay_Photo from "@/../../public/GordonRamsay_Photo.jpg";
// import Ramsay_Mina from "@/../../public/GordonRamsay_MichaelMina_Masterchef.jpg";
// import Ramsay_Rush from "@/../../public/GordonRamsay_AndreRush.jpg";


interface PersonInfo {
    name: string,
    image: string,
    description: string,
}


interface ArticlesData {
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


// export async function generateStaticParams() {
//     // let articles = await fetch("http://localhost:3000/api/articles").then((response) => response.json());
//     //
//     // articles = articles.filter((article: ArticlesData) => article.articleList_seeing);
//     // return articles.map((article: ArticlesData) => ({
//     //     id: article,
//     // }));

//     const articles = await prisma.people_and_food.findMany({
//         where: { articleList_seeing: true },
//     });
//     return articles.map((article) => ({ foodpeople: article.id.toString() }));
// }

export default async function ArticlePage({ params }: { params: { locale: string, foodpeople: number } }) {

    const { foodpeople } = params;
    // console.log(foodpeople);// 2
    const choisenArticle: ArticlesData = await fetch(`http://localhost:3000/api/articles?id=${foodpeople}`)
        .then(res => res.json());

    const images: string[] = choisenArticle.imagePaths.split(";");
    const texts: string[] = choisenArticle.mainText.split("\\\\&;");

    // const imagesTexts: string[][] = [];
    // for (let i = 0; i < images.length; i++) {
    //     const part = [];
    //     part.push(images[i]);
    //     part.push(texts[i]);
    //     imagesTexts.push(part);
    // }

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

    const relatedPersons: PersonInfo[] = [
        {
            name: "Андрэ Чэф Раш",
            image: "/Chef_Andre_Rush.jpeg",
            description: "Былы шэф-кухар Белага дому ЗША"
        },
        {
            name: "Хіраакі Накабаяшы",
            image: "/Cook_Bayashi.png", 
            description: "Японскі шэф-кухар, вядомы як Bayashi"
        },
        {
            name: "Альбэрт Няжвінскі",
            image: "/Albert_Can_Cook.jpg",
            description: "Папулярны кулінарны блогер з мянушкай Albert Can Cook"
        }
    ];

    return (
        <div id={styles.main_part}>
            <div id={styles.article_body}>

                <section className={styles.heroSection}>
                    <Image
                        src={choisenArticle.mainImagePath}
                        alt={choisenArticle.mainTitle}
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay} />
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>{choisenArticle.mainTitle}</h1>
                        <p className={styles.heroSubtitle}>{choisenArticle.shortTitle}</p>
                    </div>
                </section>

                <section className={styles.returnButton}>
                    <Link href={`/${params.locale}/news/foodpeople`} className={styles.returnLink}>
                        <span className={styles.arrowIcon}>←</span>
                        Да Пошуку Артыкулаў
                    </Link>
                </section>

                <section className={styles.contentSection}>
                    <div className={styles.introText}>
                    {choisenArticle.firstText.split("\\\\;").map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                    </div>

                    <div className={styles.personalCard}>
                        <div className={styles.personalImage}>
                            <Image
                                src={choisenArticle.personalImagePath}
                                alt={`${choisenArticle.personalName} ${choisenArticle.personalSurname}`}
                                width={400}
                                height={500}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className={styles.personalInfo}>
                            <h2>Галоўная Інфармацыя</h2>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Поўнае Імя:</span>
                                    <span className={styles.infoValue}>
                                        {choisenArticle.personalName} {choisenArticle.personalSurname}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Дата Нараджэння:</span>
                                    <span className={styles.infoValue}>
                                        {choisenArticle.birthDay}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Месца Нараджэння:</span>
                                    <span className={styles.infoValue}>
                                        {choisenArticle.birthTown}, {choisenArticle.birthCountry}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Узрост:</span>
                                    <span className={styles.infoValue}>
                                        {years} год
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Статус:</span>
                                    <span className={styles.infoValue}>
                                        {choisenArticle.personalStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {texts.map((text, index) => (
                        <div key={index} className={styles.contentBlock}>
                            <div className={styles.contentImage}>
                                <Image
                                    src={images[index] || "/default-image.jpg"}
                                    alt={`Малюнак ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.contentText}>
                                {text.split("\\\\;").map((paragraph, pIndex) => (
                                    <p key={pIndex}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className={styles.relatedPersons}>
                        <h2 className={styles.sectionTitle}>Звязаныя Асобы</h2>
                        <div className={styles.personsSlider}>
                            {relatedPersons.map((person, index) => (
                                <div key={index} className={styles.personCard}>
                                    <Image
                                        src={person.image}
                                        alt={person.name}
                                        width={120}
                                        height={120}
                                        className={styles.personImage}
                                    />
                                    <h3 className={styles.personName}>{person.name}</h3>
                                    <p className={styles.personDescription}>{person.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
