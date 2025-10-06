import styles from "@/app/(commonSite)/[locale]/news/foodpeople/[foodpeople]/article.module.css";
import Image from "next/image";
import Link from "next/link";
import ToTopButton from "@/app/components/ReturnToTop/ToTopButton";


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


export default async function ArticlePage({ params }: { params: { locale: string, foodpeople: number } }) {

    const { foodpeople } = params;
    // console.log(foodpeople);// 2
    const choisenArticle: ArticlesData = await fetch(`http://localhost:3000/api/articles?id=${foodpeople}`, { cache: "no-store" })
        .then(res => res.json());

    const images: string[] = choisenArticle.imagePaths.split(";");
    
    const [texts_string, slider] = choisenArticle.mainText.split("\\\\#slider:");
    const texts: string[] = texts_string.split("\\\\&;");

    /* 
    text sources (about Gordon Ramsay and other cookers):
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

    let lifeYears: number = 0;
    if (years === 0) {
        const lastBracket = choisenArticle.personalStatus.lastIndexOf(")");
        const rip = Number(choisenArticle.personalStatus.substring(lastBracket - 4, lastBracket));
        const firstBracket = choisenArticle.birthdayDate.lastIndexOf(".");
        const born = Number(choisenArticle.birthdayDate.substring(firstBracket + 1));
        lifeYears = rip - born;
    }

    const relatedPersons: PersonInfo[] = [];
    let sliderNameAndParts;
    const sliderCode = slider[0];
    if (slider) {
        sliderNameAndParts = slider.substring(1).split("\\\\#person:");

        for (let i = 1; i < sliderNameAndParts.length; i++) {
            const sliderPart = sliderNameAndParts[i].split(";");
            relatedPersons.push({
                name: sliderPart[0],
                image: sliderPart[1],
                description: sliderPart[2],
            });
        }
    }

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
                            <h2>Галоўная Асоба</h2>
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
                                        {years !== 0 ? years : `~${lifeYears}`} год
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

                    {texts.map((text, index) => {
                        if (sliderCode !== "_" && parseInt(sliderCode) === index) {
                            return (
                                <div key={index}>
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

                                    <div className={styles.relatedPersons}>
                                        <h2 className={styles.sectionTitle}>{sliderNameAndParts![0]}</h2>
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
                                </div>
                            );
                        } else {
                            return (
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
                            );
                        }
                    })}

                    {slider && sliderCode === "_" && (
                    <div className={styles.relatedPersons}>
                        <h2 className={styles.sectionTitle}>{sliderNameAndParts![0]}</h2>
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
                    </div>)}
                </section>
            </div>
            <ToTopButton name="Вяртанне да пачатку" />
        </div>
    )
}
