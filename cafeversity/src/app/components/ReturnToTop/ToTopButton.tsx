"use client";

import { useState, useEffect } from "react";
import styles from "@/app/(commonSite)/[locale]/news/foodpeople/[foodpeople]/article.module.css";


export default function ToTopButton ({ name }: { name: string }) {
    const [isVisible, setIsVisible] = useState<boolean>(false);


    useEffect(() => {
        const scrollHandler = () => {
            const topScroll = window.pageYOffset || document.documentElement.scrollTop;            
            setIsVisible(topScroll > 300);
        };

        scrollHandler();

        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
        {isVisible && (
            <button
                type="button"
                onClick={scrollToTop}
                className={styles.backToTop}
                aria-label="Вяртанне да пачатку"
            >
                <span className={styles.arrowIcon}>↑</span>
                <span className={styles.buttonText}>{name}</span>
            </button>
        )}
        </>
    );
}
