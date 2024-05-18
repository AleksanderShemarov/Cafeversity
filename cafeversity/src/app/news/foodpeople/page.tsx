"use client";

import styles from "@/app/news/foodpeople/foodpeople.module.css";
import SearchLine from "@/components/SearchLine";
import ArticleBar from "@/components/ArticleBar";
import Gordon_Ramsay from "../../../../public/Gordon_Ramsay_and_the_dish.jpg";
import Gordon_Ramsay_cooking from "../../../../public/Gordon_Ramsay_cooking.jpg";
import noImage from "../../../../public/no_image1.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";


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

    const [articleData, setArticleData] = useState<ArticlesData[]>([
        // {
        // id: 0,
        // article_title: "Article Template",
        // article_text: "This article is the only test.",
        // article_image_path: "/no_image1.jpg",
        // articleList_seeing: false,
        // mainImagePath: "/no_image1.jpg",
        // mainTitle: "Загаловак артыкула",
        // shortTitle: "Кароткі запіс",
        // firstText: "Ўводзіны да артыкула",
        // personalImagePath: "/no_image1.jpg",
        // personalName: "John",
        // personalSurname: "Doe",
        // birthDay: "May 18th 1995",
        // birthTown: "New York",
        // birthCountry: "United States",
        // birthdayDate: "18.05.1995",
        // personalStatus: "World Wild Web Personal Example, Real Person (possibly)",
        // imagePaths: "/no_image1.jpg;/no_image1.jpg;/no_image1.jpg",
        // mainText: "This text is temporary! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam non enim sint ducimus, dolores molestias reprehenderit? Atque facere autem, ipsa aliquam rerum, voluptatum nemo laudantium quisquam at molestias est sapiente.",
        // createdAt: "2024-05-17T11:29:51.000Z",
        // published: false,
        // }
    ]);

    // const articlesBars = [
    //     {
    //         id: 1,
    //         image: Gordon_Ramsay,
    //         imageName: "Gordon_Ramsay_and_the_dish.jpg",
    //         articleHead: "Гордан Рамсей",
    //         articleShort: "Легенда кухарскага мастацтва, рэстаратар ды тэле-зорка. 8 зорак Мішлэну і шэф-повар, вядомы ва ўсім свеце.",
    //     },
    //     {
    //         id: 2,
    //         image: Gordon_Ramsay_cooking,
    //         imageName: "Gordon_Ramsay_cooking.jpg",
    //         articleHead: "Плануем...",
    //         articleShort: "У хуткім часе будуць даданыя новыя асобы. Мы працуем над гэтым.",
    //     },
    //     {
    //         id: 3,
    //         image: noImage,
    //         imageName: "no_image1.jpg",
    //         articleHead: "Article Header",
    //         articleShort: "Short Description.",
    //     },
    // ];

    useEffect(() => {
        fetch("http://localhost:3000/api/articles_route", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setArticleData(data);
        })
        .catch((error) => {
            console.error("Памылка пры атрыманні дадзен з табліцы people_and_food: ", error);
        });
    }, []);

    return (
        <div id={styles.main_part}>
            <h1>Знакамітыя людзі аб Ежы</h1>
            <SearchLine />
            {/* {articlesBars && articlesBars.map((articleBar) => {
                return (
                    <Link
                        key={articleBar.id}
                        href={`/news/foodpeople/${articleBar.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <ArticleBar
                            key={articleBar.id}
                            picture={articleBar.image}
                            pictName={articleBar.imageName}
                            articleName={articleBar.articleHead}
                            shortText={articleBar.articleShort}
                        />
                    </Link>
                )
            })} */}
            {articleData && articleData.filter((articleDatum) => articleDatum.articleList_seeing).map((articleDatum, index) => {
                if (articleDatum.published) {
                    return (
                        <Link
                            key={index}
                            href={`/news/foodpeople/${articleDatum.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ArticleBar
                                key={articleDatum.id}
                                picture={articleDatum.article_image_path}
                                pictName={`${articleDatum.article_image_path}`}
                                articleName={articleDatum.article_title}
                                shortText={articleDatum.article_text}
                            />
                        </Link>
                    )
                } else {
                    return (
                        <ArticleBar
                            key={articleDatum.id}
                            picture={articleDatum.article_image_path}
                            pictName={`${articleDatum.article_image_path}`}
                            articleName={articleDatum.article_title}
                            shortText={articleDatum.article_text}
                        />
                    )
                }
            })}
        </div>
    )
}
