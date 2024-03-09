import styles from "@/app/page.module.css";
import Image from "next/image";
import emptyImg from '../../public/no_image1.jpg';


export default function Greeting() {
    return (
        <div className={styles.features}>
            <div className={styles.know0}>
                <div className={styles.feature_picture}>
                    <Image src={emptyImg} alt="picture0" style={{
                        width: "20vw",
                        height: "250px",
                        borderRadius: "24px",
                    }}></Image>
                </div>
                <div className={styles.feature_list}>
                    <ul id={styles.list}>
                        <li>The first line: Lorem, ipsum dolor.</li>
                        <li>The second line: Lorem ipsum dolor sit amet.</li>
                        <li>The third line: Lorem ipsum dolor sit.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
