"use client";

import styles from "@/app/(commonSite)/[locale]/news/foodpeople/foodpeople.module.css";
import SearchLine from "@/components/SearchLine";
import ArticleCard from "@/app/components/ArticleCard";
import { SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


export default function FoodPeople () {

    interface ArticlesData {
        id: number,
        article_title: string,
        article_text: string,
        article_image_path: string,
        articleList_seeing: boolean,
        mainImagePath: string,
        mainTitle: string,
        shortTitle: string,
        firstText: string,
        personalImagePath: string,
        personalName: string,
        personalSurname: string,
        birthDay: string,
        birthTown: string,
        birthCountry: string,
        birthdayDate: string,
        personalStatus: string,
        imagePaths: string,
        mainText: string,
        createdAt: string,
        published: boolean,
    }


    const [articleData, setArticleData] = useState<ArticlesData[]>([]);// The initial data are put into 'articleData'
    const [filteredArticleData, setFilteredArticleData] = useState<ArticlesData[]>([]);// Filtered – into 'filteredArticleData'
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [query, setNewQuery] = useState<string>("");
    const pathname = usePathname();
    

    const newQuery = (searchQuery: { target: { value: SetStateAction<string>; }; }) => {
        setNewQuery(searchQuery.target.value);
    };


    useEffect(() => {
        setIsLoaded(false);

        fetch("http://localhost:3000/api/articles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
        .then((res) => res.json())
        .then((data) => {
            const visibleArticles = data.filter((datum: ArticlesData) => datum.articleList_seeing);
            setArticleData(visibleArticles);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error("Памылка пры атрыманні дадзен з табліцы people_and_food: ", error);
            setIsLoaded(true);
        });
    }, []);


    useEffect(() => {
        let newRequestedArticles = articleData;

        if (query.trim() !== "") {
            newRequestedArticles = newRequestedArticles.filter((articleDatum) => {
                const titleIncludesQuery = articleDatum.article_title.toLowerCase().includes(query.toLowerCase().trim());
                return titleIncludesQuery;
            });
        }

        setFilteredArticleData(newRequestedArticles);
    }, [query, articleData]);


    const DataLoading = useTranslations("NewsPage.Food&People");


    return (
        <div id={styles.main_part}>
            <SearchLine searchingHandler={newQuery} />
            
            {!isLoaded ? (
                <div className={styles.loadingMessage}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>{DataLoading("dataLoading")}</p>
                </div>
            ) : filteredArticleData.length > 0 ? (
                filteredArticleData.map((article) =>
                    <ArticleCard
                        key={article.id}
                        id={article.id}
                        image={article.article_image_path}
                        imageName={article.article_title}
                        articleName={article.article_title}
                        shortText={article.article_text}
                        published={article.published}
                        pathname={pathname}
                    />
                )
            ) : (
                <div className={styles.noResultsMessage}>
                    <div className={styles.noResultsIcon}>🔍</div>
                    <p className={styles.noResultsText}>
                        {query.trim() !== "" 
                            ? `Наступных артыкулаў па запыце "${query}" не існуе.`
                            : "На дадзены момант артыкулы адсутнічаюць."
                        }
                    </p>
                </div>
            )}
        </div>
    )
}
