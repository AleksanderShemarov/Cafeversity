import styles from "@/app/news/foodpeople/[foodpeople]/article.module.css";
import GordonRamsay_mainView from "@/../../public/Gordon_Ramsay_mainview.jpg";
import Image, { StaticImageData } from "next/image";
import Gordon_frontview from "@/../../public/Gordon_Ramsay_frontview.jpg";
import Chef from "@/../../public/Chef_Gordon_Ramsay.jpg";
import Gordon from "@/../../public/Gordon_Ramsay.jpg";
import GordonRamsay_Photo from "@/../../public/GordonRamsay_Photo.jpg";
import Ramsay_Mina from "@/../../public/GordonRamsay_MichaelMina_Masterchef.jpg";
import Ramsay_Rush from "@/../../public/GordonRamsay_AndreRush.jpg";
import { text } from "stream/consumers";


export default function ArticlePage() {

    /* 
    text sources:
    - https://familytron.com/gordon-ramsay/;
    - https://en.wikipedia.org/wiki/Gordon_Ramsay;
    */ 
    const contextImagesTexts: [StaticImageData, string][] = [
        [
            Chef,
            `Хоць Гордан Рамзі нарадзіўся ў Джонстоўне, Шатландыя, ва ўзросце 9 год ён пераяджае са сваёй сям'ёю ў Англію, 
дзе вырас у раёне Бішоптан гораду Стратфард-на-Эйване. Сваё ранняе жыццё Гордан апісваў як «безнадзейна вандроўнае»: 
сям'я пастаянна пераязджала з-за памкненняў і няўдач яго бацькі. Па словах Гордану, ён быў жорсткім алкаголікам і, ва 
сваёй аўтабіяграфіі, апісвае яго як «зацятага бабніка», які жорстка абыходзіўся з дзецьмі і грэбаваў імі.\;
Няглядзячы на гэта Гордан спадзяваўся стаць футбалістам і ўпершыню быў абраны гуляць у футбол ва ўзросце 12 гадоў 
у спаборніцтве для падлеткаў да 14 год.\;
Ранняя футбольная кар'ера была адзначана траўмамі, апошняя з якіх вымушала Гордана адмовіцца ад яе, – сур'ёзная траўма калена. 
Ва ўзросце 16 год ён пераехаў з сямейнага дома на кватэру ў горадзе Банберы.`,
        ],
        [Gordon, ''],
        [
            GordonRamsay_Photo,
            `Гэта на сам рэч малавядомы факт, але ў Гордана Рамсей ёсць яшчэ дзве сястры і брат.\;
Старэйшая сястра, Дыяна Рамсей, шмат часу праводзіла са сваім малодшым братам Горданам. 
Калі знаходзіцца ў кватэры з іх жорсткім бацькам стала немагчыма, Дыяна пераехала ў Банбері і ўзяла з сабою Гордана. 
Пасля гэтага яна знайшла працу афіцыянткай у рэстарацыі. Дзякуючы Дыяне, Гордан патрапіў на працу кухарам 
у гэта жа месца – гэта быў пачатак яго вялікай кар'еры.\;Ронні Рамсей, малодшыя брат Гордана, 
усё сваё дарослае жыццё змагаецца з наркотыкамі.\;Аб малодшай сястре Гордана, Івані Рамсей, вядома толькі, 
што яна некаторы час працавала медсястрою.`,
        ],
        [Ramsay_Mina, ''],
        [Ramsay_Rush, ''],
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
                            boxShadow: "0 7px 4px yellowgreen",
                        }}
                    ></Image>
                    <div id={styles.article_enter_name}>
                        <h1 id={styles.article_enter_head}>Гордан Рамсей</h1>
                        <p id={styles.article_enter_shorty}>Незвычайны лёс цікавага чалавека</p>
                    </div>
                </div>
                <div id={styles.first_text}>
                    <p>
                        &emsp;Большай часткай людзі ведаюць яго працаздольным і таленавітым шэф-кухарам,
                        рэстаратарам, які валодае адначасова 17 зоркамі Мэшлену, знатаком 
                        вышэйшай кухні і адным з лепшых прафесіяналаў у стварэнні страў.<br />
                        &emsp;Першапачаткова планаваў звязаць свой лёс з зусім іншым: ... футболам. 
                        Траўма назі павярнула яго лёс у другі шлях.<br />
                        &emsp;Сёння пройдземся па галоўных 
                        кроках яго жыцця, каб асэнсаваць асобу Гордана Рамсей.
                    </p>
                </div>
                <div id={styles.personal_data_block}>
                    <p>Галоўныя дадзеныя</p>
                    {/* <p>Галоўныя дадзеныя Гордана Рамсей</p> */}
                    <div className={styles.personal_data}>
                        <Image
                            src={Gordon_frontview}
                            alt={`${Gordon_frontview}`}
                            height={600}
                            className={styles.photo_data}
                        ></Image>
                        <ul className={styles.table_data}>
                            <li>
                                <span style={{
                                    fontStyle: "italic",
                                    fontWeight: "bolder",
                                }}>Імя:</span>&emsp;Гордан (анг.: Gordon)
                            </li>
                            <li>
                                <span style={{ 
                                    fontStyle: "italic",
                                    fontWeight: "bolder",
                                }}>Прозвішча:</span>&emsp;Рамсей (анг.: Ramsay)
                            </li>
                            <li>
                                <span style={{ 
                                    fontStyle: "italic",
                                    fontWeight: "bolder",
                                }}>Нарадзіўся:</span>&emsp;8 {birth_months[10]} 1966 года;<br />
                            Джонстоўн, Злучанае Каралеўства</li>
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
                                }}>Статус:</span>&emsp;Шэф-кухар, Рэстаратар
                            </li>
                        </ul>
                    </div>
                </div>
                {contextImagesTexts.map((contextImageText, index) =>
                    <div key={index} className={styles.article_part}>
                        <div className={styles.article_image}>
                            <Image
                                src={contextImageText[0]}
                                alt="Temporary_Photos"
                                height={300}
                            ></Image>
                        </div>
                        <div className={styles.article_text}>
                            {contextImageText[1] !== '' ? (
                                <div>
                                    {contextImageText[1].split("\;").map((textPart, index) => 
                                        <div key={index} style={{
                                            textIndent: "1.5em",
                                            lineHeight: "1.35em",
                                        }}>{textPart}</div>
                                    )}
                                </div>
                             ) : (
                                <p>
                                    &emsp;Lorem ipsum dolor sit amet consectetur 
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
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
