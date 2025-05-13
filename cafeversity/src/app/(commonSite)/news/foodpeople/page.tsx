"use client";

import styles from "@/app/(commonSite)/news/foodpeople/foodpeople.module.css";
import SearchLine from "@/components/SearchLine";
import ArticleBar from "@/components/ArticleBar";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";


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

    // User input a text into SearchLine component
    const [query, setNewQuery] = useState<string>("");

    const newQuery = (searchQuery: { target: { value: SetStateAction<string>; }; }) => {
        setNewQuery(searchQuery.target.value);
    };


    useEffect(() => {
        fetch("http://localhost:3000/api/articles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            data = data.filter((datum: ArticlesData) => datum.articleList_seeing);
            setArticleData(data);
        })
        .catch((error) => {
            console.error("Памылка пры атрыманні дадзен з табліцы people_and_food: ", error);
        });
    }, []);


    // The 'articleData' array is being set by User's input text
    useEffect(() => {
        let newRequestedArticles = articleData;
        if (query !== "") {
            newRequestedArticles = newRequestedArticles.filter((articleDatum) => {
                const titleIncludesQuery = articleDatum.article_title.toLowerCase().includes(query.toLowerCase());
                return titleIncludesQuery;
            });
        }

        setFilteredArticleData(newRequestedArticles);

        setIsLoaded(true);// Articles data is loaded and will be shown for Users
    }, [query, articleData]);


    return (
        <div id={styles.main_part}>
            <h1>Знакамітыя людзі аб Ежы</h1>
            <SearchLine searchingHandler={newQuery} />
            {!isLoaded ? 
            (<div style={{
                marginTop: "5vh",
            }}>
                <p style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontStyle: "italic",
                }}>Пампаванне дадзен...</p>
            </div>) : 
            filteredArticleData.length > 0 ? 
            filteredArticleData.map((articleBar, index) => {
                if (articleBar.published) {
                    return (
                        <Link
                            key={index}
                            href={`/news/foodpeople/${articleBar.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ArticleBar
                                key={articleBar.id}
                                picture={articleBar.article_image_path}
                                pictName={`${articleBar.article_image_path}`}
                                articleName={articleBar.article_title}
                                shortText={articleBar.article_text}
                            />
                        </Link>
                    )
                } else {
                    return (
                        <ArticleBar
                            key={articleBar.id}
                            picture={articleBar.article_image_path}
                            pictName={`${articleBar.article_image_path}`}
                            articleName={articleBar.article_title}
                            shortText={articleBar.article_text}
                        />
                    )
                }
            }) : (
                <div style={{
                    marginTop: "5vh",
                }}>
                    <p style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontStyle: "italic",
                    }}>Наступных артыкулаў па запыце не існуе.</p>
                </div>
            )}
        </div>
    )
}
