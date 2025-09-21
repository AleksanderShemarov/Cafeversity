"use client"

import Image, { StaticImageData } from "next/image";
import quality from "../../public/якасць.jpeg";
import city_map from "../../public/гарадзкая_мапа.jpeg";
import fresh_food from "../../public/карысная_ежа.jpeg";
import { useState, useEffect, useCallback, useRef } from "react";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Greeting.module.css";


interface Slide {
    image: StaticImageData,
    lines: string[]
}


export default function Greeting() {
    const slidesText = useTranslations("GreetingPage");


    const slides: Slide[] = [
        {
            image: fresh_food,
            lines: [
                slidesText("slidesText.slide1.line1"),
                slidesText("slidesText.slide1.line2"),
                slidesText("slidesText.slide1.line3"),
            ]
        },
        {
            image: city_map,
            lines: [
                slidesText("slidesText.slide2.line4"),
                slidesText("slidesText.slide2.line5"),
                slidesText("slidesText.slide2.line6"),
            ]
        },
        {
            image: quality,
            lines: [
                slidesText("slidesText.slide3.line7"),
                slidesText("slidesText.slide3.line8"),
                slidesText("slidesText.slide3.line9"),
            ]
        }
    ];


    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);


    const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const progressTimerRef = useRef<NodeJS.Timeout | null>(null);


    const clearAllTimers = useCallback(() => {
        // console.log("Clearing timers, current value:", autoPlayTimerRef.current);

        if (autoPlayTimerRef.current) {
            clearTimeout(autoPlayTimerRef.current);
            autoPlayTimerRef.current = null;
        }
        if (progressTimerRef.current) {
            clearInterval(progressTimerRef.current);
            progressTimerRef.current = null;
        }
    }, []);


    const scheduleAutoPlay = useCallback(() => {
        autoPlayTimerRef.current = setTimeout(() => {
            setIsAutoPlay(true);
            setProgress(0);
        }, 5000);
        // console.log("autoPlayTimerRef.current in scheduleAutoPlay", autoPlayTimerRef.current);
    }, [setIsAutoPlay]);


    useEffect(() => {
        if (!isAutoPlay) return;

        progressTimerRef.current = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 100) {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                    return 0;
            }
            return prev + 2;
        });
        }, 100);

        return () => {
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
            }
        };
    }, [isAutoPlay, slides.length]);


    useEffect(() => {
        return () => {
            clearAllTimers();
        };
    }, [clearAllTimers]);


    const handleContainerClick = useCallback(() => {
        setIsAutoPlay(false);
        setProgress(0);
        
        scheduleAutoPlay();
    }, [scheduleAutoPlay]);


    const handleProgressClick = useCallback((index: number) => {
        setCurrentSlide(index);
        setIsAutoPlay(false);
        setProgress(0);
        
        scheduleAutoPlay();
    }, [scheduleAutoPlay]);

    return (
        <div className={styles.container}>
            <AnimatePresence mode="wait">
                <motion.div key={currentSlide}
                    className={styles.slide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={handleContainerClick}
                >
                    <div className={styles.imageContainer}>
                        <Image src={slides[currentSlide].image} alt={`Slide ${currentSlide + 1}`}
                            fill className={styles.image}
                        />
                        <div className={styles.overlay} />
                    </div>

                    <motion.div className={styles.textContainer}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, backdropFilter: "blur(5px)" }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className={styles.textContent}>
                        {slides[currentSlide].lines.map((line, index) =>
                            <motion.p key={index} className={styles.textLine}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                            >
                                {line}
                            </motion.p>
                        )}
                        </div>
                    </motion.div>

                    {/* {isPaused && (
                        <div className={styles.pauseIndicator}>
                            ⏸️ Паўза
                        </div>
                    )} */}
                    {!isAutoPlay && (
                        <div className={styles.statusIndicator}>
                            ↻ Працяг праз 5s
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className={styles.progressContainer}>
            {slides.map((_, index) =>
                <div key={index}
                    className={clsx(
                        styles.progressLine,
                        {
                            [styles.active]: index === currentSlide,
                            [styles.completed]: index < currentSlide
                        }
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleProgressClick(index);
                    }}
                >
                    <motion.div className={styles.progressFill}
                        initial={{ width: index === currentSlide ? "0%" : "0%" }}
                        animate={{
                            width: index === currentSlide
                            ? `${progress}%`
                            : index < currentSlide ? "100%" : "0%"
                        }}
                        transition={{ duration: 0.1 }}
                    >

                    </motion.div>
                </div>
            )}
            </div>
        </div>
    )
}
