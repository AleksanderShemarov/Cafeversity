import styles from "@/app/page.module.css";
import Image, { StaticImageData } from "next/image";
import emptyImg from '../../public/no_image1.jpg';


export default function Greeting() {

    const allData : [StaticImageData, string[]][] = [
        [
            emptyImg,
            [
                "The first line: Lorem, ipsum dolor.",
                "The second line: Lorem ipsum dolor sit amet.",
                "The third line: Lorem ipsum dolor sit.",
            ],
        ],
    ];

    return (
        <div className={styles.features}>
            {
                allData.map(
                    (datum, index) => 
                    <div className={styles.know0} key={index}>
                        <div className={styles.feature_picture}>
                            <Image src={datum[0]} alt="picture0" style={{
                            width: "20vw",
                            height: "250px",
                            borderRadius: "24px",
                            }}></Image>
                        </div>
                        <div className={styles.feature_list}>
                            <ul id={styles.list}>
                                {datum[1].map((datumLine : string, index : number) => 
                                    <li key={index}>{datumLine}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
