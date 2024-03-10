"use client"

import styles from "@/app/page.module.css";
import Image, { StaticImageData } from "next/image";
import emptyImg from '../../public/no_image1.jpg';
import { useState } from "react";
import { clsx } from "clsx";


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
    //             "The first line: Lorem, ipsum dolor.",
    //             "The second line: Lorem ipsum dolor sit amet.",
    //             "The third line: Lorem ipsum dolor sit.",
    //         ],
    //         true,
    //     ],
    // ];

    // const booleans : boolean[] = allData.map((datum : [StaticImageData, string[], boolean]) => datum[2]);

    // const [divsVisibility, setDivsVisibility] = useState(booleans);

    // const toggleDivsVisibility = (index : number) => {
    //     const updatedVisibility = [...divsVisibility];
    //     updatedVisibility[index] = !updatedVisibility[index];
    //     setDivsVisibility(updatedVisibility);
    // };


    const staticImages : StaticImageData[] = [
        emptyImg,
        emptyImg,
    ];
    const strings : string[][] = [
        [
            "The first line: Lorem, ipsum dolor.",
            "The second line: Lorem ipsum dolor sit amet.",
            "The third line: Lorem ipsum dolor sit.",
        ],
        [
            "The first line: Lorem, ipsum dolor.",
            "The second line: Lorem ipsum dolor sit amet.",
            "The third line: Lorem ipsum dolor sit.",
        ],
    ]
    let booleans : boolean[] = [
        false,
        true,
    ]

    const [divsVisibility, setDivsVisibility] = useState(booleans);

    const toggleDivsVisibility = (index : number) => {
        const updatedVisibility = [...divsVisibility];
        updatedVisibility[index] = !updatedVisibility[index];
        console.log(updatedVisibility);
        setDivsVisibility(updatedVisibility);
    }

    return (
        <>    
            <div className={styles.features}>
                {/* {
                    allData.map(
                        (datum : [StaticImageData, string[], boolean], index : number) => 
                        <div className={clsx(styles.know_block, {
                            [styles.know_block_disabled]: divsVisibility[index],
                        })} key={index}>
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
                                        <li key={100 + index}>{datumLine}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )
                }
                <div id={styles.slider_points}>
                    {allData.map(
                        (datum : [StaticImageData, string[], boolean], index : number) =>
                        <div id={styles.point} key={index} onClick={() => toggleDivsVisibility(index)}></div>
                    )}
                </div> */}
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
                        ></input>
                    )}
                </div>
            </div>
        </>
    )
}
