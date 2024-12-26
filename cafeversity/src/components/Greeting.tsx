"use client"

import styles from "@/app/page.module.css";
import Image, { StaticImageData } from "next/image";
import quality from "../../public/якасць.jpeg";
import city_map from "../../public/гарадзкая_мапа.jpeg";
import fresh_food from "../../public/карысная_ежа.jpeg";
import { useState } from "react";
import { clsx } from "clsx";


export default function Greeting() {

    const staticImages : StaticImageData[] = [
        fresh_food,
        city_map,
        quality,
    ];
    const strings : string[][] = [
        [
            "The first line: Lorem, ipsum dolor.",
            "The second line: Lorem ipsum dolor sit amet.",
            "The third line: Lorem ipsum dolor sit.",
        ],
        [
            "The fourth line: Lorem, ipsum dolor.",
            "The fifth line: Lorem ipsum dolor sit amet.",
            "The sixth line: Lorem ipsum dolor sit.",
        ],
        [
            "The seventh line: Lorem, ipsum dolor.",
            "The eighth line: Lorem ipsum dolor sit amet.",
            "The nineth line: Lorem ipsum dolor sit.",
        ],
    ]
    const booleans : boolean[] = [
        false,
        true,
        true,
    ]

    const [divsVisibility, setDivsVisibility] = useState(booleans);

    const toggleDivsVisibility = (index : number) => {
        const newPoints = Array(divsVisibility.length).fill(true);
        const chosenPoint = !(divsVisibility[index]);
        newPoints[index] = chosenPoint;
        setDivsVisibility(newPoints);
    }


    return (
        <>    
            <div className={styles.features}>
                {
                    divsVisibility.map(
                        (divVisib : boolean, index : number) => 
                        <div className={clsx(styles.know_block, {
                                [styles.know_block_disabled]: divVisib,
                            })} key={index}>
                            <div className={styles.feature_picture}>
                                <Image src={staticImages[index]} alt="picture0" style={{
                                width: "20vw",
                                height: "250px",
                                borderRadius: "24px",
                                }}></Image>
                            </div>
                            <div className={styles.feature_list}>
                                <ul id={styles.list}>
                                    {strings[index].map((line : string, index : number) => 
                                        <li key={100 + index}>{line}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )
                }
                <div id={styles.slider_points}>
                    {divsVisibility.map(
                        (divVisib : boolean, index : number) =>
                        <input
                            type="button"
                            id={styles.point}
                            key={index}
                            onClick={() => toggleDivsVisibility(index)}
                            value={index}
                            disabled={!divVisib}
                        ></input>
                    )}
                </div>
            </div>
        </>
    )
}
