import styles from "@/app/page.module.css";
import Image, { StaticImageData } from "next/image";
import emptyImg from '../../public/no_image1.jpg';


export default function Greeting() {

    const listLines : string[] = [
        "The first line: Lorem, ipsum dolor.",
        "The second line: Lorem ipsum dolor sit amet.",
        "The third line: Lorem ipsum dolor sit.",
    ];

    const imgFile : StaticImageData = emptyImg;// it is for images adding into several info blocks

    return (
        <div className={styles.features}>
            <div className={styles.know0}>
                <div className={styles.feature_picture}>
                    <Image src={imgFile} alt="picture0" style={{
                        width: "20vw",
                        height: "250px",
                        borderRadius: "24px",
                    }}></Image>
                </div>
                <div className={styles.feature_list}>
                    <ul id={styles.list}>
                        {listLines.map((listLine : string, index : number) => 
                            <li key={index}>{listLine}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
