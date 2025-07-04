"use client"

import styles from "@/app/(commonSite)/[locale]/page.module.css";
import Image, { StaticImageData } from "next/image";
// import emptyImg from '../../public/no_image1.jpg';
import quality from "../../public/якасць.jpeg";
import city_map from "../../public/гарадзкая_мапа.jpeg";
import fresh_food from "../../public/карысная_ежа.jpeg";
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



    // // This code controls automatical changing info blocks with user's opportunity to do it manually
    // const [currentIndex, setCurrentIndex] = useState<number>(0);
    // const [manual, setManual] = useState<boolean>(false);
    // const timerRef = useRef<number | null>(null);
    //
    // const changeIndex = useCallback(() => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % staticImages.length);
    // }, [staticImages, setCurrentIndex]);
    //
    // useEffect(() => {
    //     timerRef.current = window.setInterval(changeIndex, 5000);
    //     return () => {
    //         if (timerRef.current) {
    //             window.clearInterval(timerRef.current)
    //         }
    //     }
    // }, [changeIndex])
    //
    // useEffect(() => {
    //     const resume = () => {
    //         setManual(false);
    //         if (timerRef.current) {
    //             window.clearInterval(timerRef.current);
    //         }
    //         timerRef.current = window.setTimeout(changeIndex, 5000);
    //     }
    //     if (manual){
    //         if (timerRef.current) {
    //             window.clearInterval(timerRef.current);
    //         }
    //         timerRef.current = window.setTimeout(resume, 5000);
    //     }
    //     return () => {
    //         if (timerRef.current) {
    //             window.clearTimeout(timerRef.current);
    //         }
    //     };
    // }, [changeIndex, manual])
    //
    // const toggleVisibility = (index: number) => {
    //     setCurrentIndex(index);
    //     setManual(true);
    // }
    //
    // {
    //     staticImages.map(
    //         (image: StaticImageData, index : number) => 
    //         <div className={clsx(styles.know_block, {
    //                 [styles.know_block_disabled]: index !== currentIndex,
    //             })} key={index}>
    //             <div className={styles.feature_picture}>
    //                 <Image src={image} alt="picture0" style={{
    //                 width: "20vw",
    //                 height: "250px",
    //                 borderRadius: "24px",
    //                 }}></Image>
    //             </div>
    //             <div className={styles.feature_list}>
    //                 <ul id={styles.list}>
    //                     {strings[index].map((line : string, index : number) => 
    //                         <li key={100 + index}>{line}</li>
    //                     )}
    //                 </ul>
    //             </div>
    //         </div>
    //     )
    // }
    // <div id={styles.slider_points}>
    //     {staticImages.map(
    //         (image : StaticImageData, index : number) =>
    //         <input
    //             type="button"
    //             id={styles.point}
    //             key={index}
    //             onClick={() => toggleVisibility(index)}
    //             value={index}
    //             disabled={index === currentIndex}
    //         ></input>
    //     )}
    // </div>



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
                        <div
                            id={styles.point}
                            key={index}
                            onClick={() => {divsVisibility[index] && toggleDivsVisibility(index)}}
                        ></div>
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
                            disabled={!divVisib}
                        ></input>
                    )}
                </div>
            </div>
        </>
    )
}
