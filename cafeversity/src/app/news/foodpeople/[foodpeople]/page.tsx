import styles from "@/app/news/foodpeople/[foodpeople]/article.module.css";
import Image from "next/image";


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
    let articles = await fetch("http://localhost:3000/api/articles_route").then((response) => response.json());

    articles = articles.filter((article: ArticlesData) => article.articleList_seeing);
    return articles.map((article: ArticlesData) => ({
        id: article,
    }));
}

export default async function ArticlePage({ params }: { params: {foodpeople: number} }) {

    const { foodpeople } = params;
    console.log(foodpeople);// 2
    const choisenArticle: ArticlesData = await fetch(`http://localhost:3000/api/articles_route?id=${foodpeople}`)
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
//     const contextImagesTexts: [StaticImageData, string][] = [
//         [
//             Chef,
//             `Хоць Гордан Рамзі нарадзіўся ў Джонстоўне, Шатландыя, ва ўзросце 9 год ён пераяджае са сваёй сям'ёю ў Англію, 
// дзе вырас у раёне Бішоптан гораду Стратфард-на-Эйване. Сваё ранняе жыццё Гордан апісваў як «безнадзейна вандроўнае»: 
// сям'я пастаянна пераязджала з-за памкненняў і няўдач яго бацькі. Па словах Гордану, ён быў жорсткім алкаголікам і, ва 
// сваёй аўтабіяграфіі, апісвае яго як «зацятага бабніка», які жорстка абыходзіўся з дзецьмі і грэбаваў імі.\\;
// Няглядзячы на гэта Гордан спадзяваўся стаць футбалістам і ўпершыню быў абраны гуляць у футбол ва ўзросце 12 гадоў 
// у спаборніцтве для падлеткаў да 14 год.\\;Ранняя футбольная кар'ера была адзначана траўмамі, апошняя з якіх вымушала Гордана 
// адмовіцца ад яе, – сур'ёзная траўма калена. Ва ўзросце 16 год ён пераехаў з сямейнага дома на кватэру ў горадзе Банберы.`,
//         ],
//         [
//             Gordon,
//             `Гордан Рамсей вырашыў звярнуць больш сур'ёзную ўвагу да сваёй кулінарнай адукацыі ў 19 год: 
// паступіў у Тэхнічны каледж Паўночнага Оксфардшыра для вывучэння гатэльнага менэджменту. Каледж спансаваўся Rotary International, 
// адной з найбуйнейшых сэрвісных арганізацый у свеце. Пазней Гордан казаў пра сваё рашэнне паступіць у каледж грамадскага харчавання 
// як «поўную выпадковасць».\\;У сярэдзіне 1980-х гадоў Гордан працаваў шэф-кухарам у гатэлі Wroxton House, дзе пад яго кіраўніцтвам 
// былі кухня і сталовая на 60 месцаў у Wickham Arms. Потым Гордан Рамсей пераехаў у Лондан, дзе працаваў у шэрагу рэстаранаў, 
// пакуль не натхніўся працаваць на Марка П'ера Уайта ў рэстарацыі Harveys.\\;Праз два гады і дзесяць месяцаў Гордан моцна 
// стаміўся ад «лютасці, здзекаў і гвалту» у Harveys. Ён вырашыў: яго далейшы шлях кар'ернага росту будзе накіраваны на вывучэнне 
// французскай кухні. Марк П'ер Уайт адгаворваў Гордана Рамсей ўладкавацца на працу ў Парыж і заахвочваў яго працаваць на Альбера Ру 
// ў Le Gavroche у Мэйферы. Гордан пагадзіўся з яго парадай. Праз неякі час там Гордан сустрэўся з Жан-Клодам Брэтонам, які пазней 
// стаў яго мэтрам у рэстарацыі Gordon Ramsay. Гордан прапрацаваў у Le Gavroche на працягу 1 году і Альбер Ру запрасіў 
// яго працаваць з ім у Hotel Diva, гарналыжным курорце ў французскіх Альпах.\\;У 23 гады Гордан Рамсей пераехаў у Парыж, 
// дзе працаваў з кухарамі Гаем Савоем і Жаэлем Робюшонам, ганараваныя зоркамі Мішлен, і працягваў сваё навучанне ў Францыі 
// на працягу трох год. Перад тым, як паддацца фізічнаму і разумоваму стрэсу на кухнях, Гордан Рамсей ўзяў год, каб папрацаваць 
// асабістым шэф-кухарам на прыватнай яхце Idlewild. Падчас сваёй працы Гордан падарожнічаў па астравах Сіцыліі і Сардзініі ў Італіі, 
// што дазволіла яму вывучаць асаблівасці італьянскай кухні.\\;Гордан Рамсей вярнуўся ў Лондан у 1993 годзе і адразу яму прапанавалі 
// пасаду галоўнага шэф-кухара пад кіраўніцтвам П'ера Кофмана ў гатэлі La Tante Claire з трыма зоркамі Мішлену у Чэлсі. 
// Неўзабаве пасля гэтага Марк П'ер Уайт зноў увайшоў у жыццё Гордана з прапановай прызначыць яго на пасаду галоўнага кухара і часткай
// у 10% у рэстарацыі Rossmore, які належыць дзелавым партнёрам Уайта. Rossmore пераклічалі ў Aubergine і ўжо праз 14 месяцаў яна 
// атрымала сваю першую зорку Мішлен. У 1997 годзе была здабыта другая зорка Мішлен.\\;У ліпені 1998 году з-за спрэчак з уладальнікамі 
// бізнесу Рамзі, якія хацелі ператварыць Aubergine ў сетку рэстарацый, а таксама мара Гордана аб кіраванні ўласным рэстаранам 
// ён выйшаў з партнёрства. Пазней Гордан Рамсей пісаў аб гэтым рашэнні так: «Гэта самы важны дзень за ўсю маю кулінарную кар'еру; 
// самае важнае рашэнне ў маім жыцці».\\;З таго часу пачынаецца жыццё Гордана Рамсей як самастойнага шэф-кухара, рэстаратара 
// і тэлезоркі.`,
//         ],
//         [
//             GordonRamsay_Photo,
//             `Гэта на сам рэч малавядомы факт, але ў Гордана Рамсей ёсць яшчэ дзве сястры і брат.\\;
// Старэйшая сястра, Дыяна Рамсей, шмат часу праводзіла са сваім малодшым братам Горданам. 
// Калі знаходзіцца ў кватэры з іх жорсткім бацькам стала немагчыма, Дыяна пераехала ў Банберы і ўзяла з сабою Гордана. 
// Пасля гэтага яна знайшла працу афіцыянткай у рэстарацыі. Дзякуючы Дыяне, Гордан патрапіў на працу кухарам 
// у гэта жа месца – гэта быў пачатак яго вялікай кар'еры.\\;Ронні Рамсей, малодшыя брат Гордана, 
// усё сваё дарослае жыццё змагаецца з наркотыкамі.\\;Аб малодшай сястре Гордана, Івані Рамсей, вядома толькі, 
// што яна некаторы час працавала медсястрою.`,
//         ],
//         [
//             Ramsay_Mina,
//             `Спачатку Гордан Рамсей з дапамогай свайго цесця, Крыса Хатчэсана, і яго былых калег з рэстарацыі Aubergine 
// у 1998 годзе адчыняе уласную рэстарацыю ў Чэлсі – Restaurant Gordon Ramsay. У 2001 годзе рэстарацыя была ганаравана трэццяй 
// зоркай Мішлен – гэта з'ява абвясціла Гордана Рамсей першым шэф-кухарам Злучанага Каралеўства з Шатландзкім паходжаннем, які 
// гэтага дасягнуў.\\;У агульнай лічбе Гордан Рамсей і яго рэстарацыі атрымалі 18 зорак Мішлен, з якіх 8 захоўваюцца ў 
// сённяшнім дні. На момант друкавання дадзенай інфармацыі (травень 2024 года) Гордан Рамсей валодае 10 рэстарацыямі:\\;
// - 6 (шасцёра) ў Брытаніі;\\;- 2 (дзве) у Францыі;\\;- 1 (адна) у ЗША;\\;- 1 (адна) у Сінгапуры.\\;
// Гордан Рамсей з'яўляецца галоўным кіраўніком шматлікіх кухарскіх праграмаў, шмат з якіх ён сам быў ініцыятарам. Далейшы спіс 
// 10 лепшых і папулярных праграмаў Гордана Рамсей быў узят на вэб-старонцы "The Best Gordon Ramsay Shows, Ranked" з крыніцы "Ranker" 
// (https://www.ranker.com/list/best-gordon-ramsay-shows/ranker-tv):\\;
// 1) Hell's Kitchen (30.05.2005);\\;2) Ramsay's Kitchen Nightmares (United Kingdom) (31.05.2005);\\;
// 3) Kitchen Nightmares (in the United States) (19.09.2007);\\;4) MasterChef (27.07.2010);\\;5) Hotel Hell (13.08.2012);\\;
// 6) MasterChef Junior (27.09.2013);\\;7) Gordon Ramsay's 24 Hours to Hell and Back (13.06.2018);\\;
// 8) Gordon, Gino and Fred: Road Trip (11.10.2018);\\;9) Gordon Ramsay: Uncharted (21.07.2019).\\;10) Next Level Chef (02.01.2022);\\;
// Гордан Рамсей атрымаў шмат розных узнагарод, але ёсць адна вельмі цікавая з іх – Найправасходны Ордэн Брытанскай імперыі, якую ён 
// атрымаў ад каралевы Лізаветы ІІ у 2006 годзе па заслугах у гасцінічнай індустрыі.`,
//         ],
//         [
//             Ramsay_Rush,
//             `Акрамя таго, Гордан Рамсей вядомы знаёмасцямі са мноствам знакамітых кухараў і людзяў, якія ставяцца да варэння ежы
// як да мастацтва. Яны зрабіліся папулярныя падчас пандэміі каронавірусу ў 2020 – 2022 годы. Сярод ніх: Андрэ Чэф Раш 
// (Andre Chef Rush), Хіраакі Накабаясі (Bayashi), Альберт Няжвінскі (Albert CanCook), Джанлука Контэ (itsQCP), Густава Тоста 
// (Guga Foods), Нікалас Чэнінг «Нік» Ды Джавані (Nick DiGiovanni) і шмат-шмат іншых.\\; Шмат хто з ніх сустракаўся з Горданам не 
// толькі для сваіх сумесных відэа, але яшчэ па запрашэннях Гордана ў розныя кулінарныя спаборніцтва. Напрыклад:\\;-> Альберт Няжвінскі 
// быў адным з трох галоўных удзельнікаў у кухарскім спаборніцтвы "Idiot Sandwitch" у Лас-Вегас;\\;-> Нікалас Ды Джаванні стаў 
// фіналістам і заняў трэцяе месца 10 сезону спаборніцтва "MasterChef".`,
//         ],
//     ];

    // const birth_months: string[] = [
    //     "Студня", "Лютага", "Сакавіка", "Красавіка",
    //     "Траўня", "Чэрвня", "Ліпеня", "Жніўня",
    //     "Верасня", "Кастрычніку", "Лістападу", "Снежня",
    // ];

    const years: number = ~~((
        new Date().getTime() - new Date(choisenArticle.birthdayDate).getTime()
    ) / (1000 * 60 * 60 * 24 * 365.25));

    return (
        <div id={styles.main_part}>
            <h1>Тут будзе адабраны для прагляду артыкул.</h1>
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
                    {/* <p>Галоўныя дадзеныя Гордана Рамсей</p> */}
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
                {/* {contextImagesTexts.map((contextImageText, index) =>
                    <div key={index} className={styles.article_part}>
                        <div className={styles.article_image}>
                            <Image
                                src={contextImageText[0]}
                                alt="Temporary_Photos"
                                height={300}
                            ></Image>
                        </div>
                        <div className={styles.article_text}>
                            <div>
                                {contextImageText[1].split("\\;").map((textPart, index) => 
                                    <div key={index} style={{
                                        textIndent: "1.5em",
                                        lineHeight: "1.35em",
                                        color: "white",
                                    }}>{textPart}</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <p>Ніжэй дадзеныя ўзятыя з Базы Дадзен праз articles_route API</p> */}
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
