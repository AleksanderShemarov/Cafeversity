"use client"

import styles from "@/app/(commonSite)/[locale]/page.module.css";
import Image, { StaticImageData } from "next/image";
import quality from "../../public/якасць.jpeg";
import city_map from "../../public/гарадзкая_мапа.jpeg";
import fresh_food from "../../public/карысная_ежа.jpeg";
import { useState } from "react";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";


export default function Greeting() {

    // const allData : [StaticImageData, string[], boolean][] = [
    //     [
    //         emptyImg,
    //         [
    //             "The first line: Lorem, ipsum dolor.",
    //             "The second line: Lorem ipsum dolor sit amet.",
    //             "The third line: Lorem ipsum dolor sit.",
    //         ],
    //         false,
    //     ],
    //     [
    //         emptyImg,
    //         [
    //             "The fourth line: Lorem, ipsum dolor.",
    //             "The fifth line: Lorem ipsum dolor sit amet.",
    //             "The sixth line: Lorem ipsum dolor sit.",
    //         ],
    //         true,
    //     ],
    //     [
    //         emptyImg,
    //         [
    //             "The seventh line: Lorem, ipsum dolor.",
    //             "The eighth line: Lorem ipsum dolor sit amet.",
    //             "The nineth line: Lorem ipsum dolor sit.",
    //         ],
    //         true,
    //     ],
    // ];

    // const booleans : boolean[] = allData.map((datum : [StaticImageData, string[], boolean]) => datum[2]);

    // const [divsVisibility, setDivsVisibility] = useState(booleans);

    // const toggleDivsVisibility = (index : number) => {
    //     const newPoints = Array(divsVisibility.length).fill(true);
    //     let chosenPoint = !(divsVisibility[index]);
    //     newPoints[index] = chosenPoint;
    //     // console.log(divsVisibility, newPoints);
    //     setDivsVisibility(newPoints);
    // };


    const slidesText = useTranslations("GreetingPage");

    const staticImages : StaticImageData[] = [
        fresh_food,
        city_map,
        quality,
    ];
    const strings : string[][] = [
        [
            slidesText("slidesText.slide1.line1"),
            slidesText("slidesText.slide1.line2"),
            slidesText("slidesText.slide1.line3"),
        ],
        [
            slidesText("slidesText.slide2.line4"),
            slidesText("slidesText.slide2.line5"),
            slidesText("slidesText.slide2.line6"),
        ],
        [
            slidesText("slidesText.slide3.line7"),
            slidesText("slidesText.slide3.line8"),
            slidesText("slidesText.slide3.line9"),
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
