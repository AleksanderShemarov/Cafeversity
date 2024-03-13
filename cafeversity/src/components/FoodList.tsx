"use client"

import styles from "@/app/commonMenu/commonMenu.module.css";
import Image from "next/image";
import maczanka from "../../public/Мачанка_з_блінамі.jpeg";
import ImageText from "./ImageText";
import { useEffect, useState } from "react";


export default function FoodList() {

    const [title, setTitle] = useState<string>("Назва Ежы");
    const [ing, setIng] = useState<string>("Склад: прадукт №1 (_%), прадукт №2 (_%), прадукт №3 (_%).");
    const [portion, setPortion] = useState<number>(200);
    const [price, setPrice] = useState<number>(0.00);

    interface Data {
        id: number,
        food_name: string,
        includes: string,
        spicy: boolean,
        vegetarian: boolean,
        vegan: boolean,
        protein: number,
        fats: number,
        carbohydrates: number,
        amino_acids: string,
        food_portion: number,
        cost: number,
        imagePath: string,
    }

    const [products, setProducts] = useState<Data[]>([
        {
            id: 0,
            food_name: "Страва",
            includes: "Склад: ___(_%)",
            spicy: false,
            vegetarian: true,
            vegan: false,
            protein: 0.00,
            fats: 0.00,
            carbohydrates: 0.00,
            amino_acids: "Розныя",
            food_portion: 2000,
            cost: 1.23,
            imagePath: "/no_image1.jpg",
        }// imagePath: "/image_folder/no_image1.jpg", (This example is correct too)
    ]);// You will see these data a few moments until the dishes_BY data fetching will be ended. If you see these data all time, data fetching is failed.

    useEffect(() => {
        fetch("http://localhost:3000/api/route", {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the request headers to indicate JSON format
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
        }).catch((error) => {
            console.error("Памылка пры атрыманні дадзен:", error)
        });
      }, []);

    return (
        <div className={styles.list_fields_zone}>
            <div id={styles.list_field}>
                <Image src={maczanka} alt="Мачанка_з_блінамі" style={{
                    width: "20vw",
                    height: "250px",
                    border: "7px solid gold",
                    borderRadius: "30px",
                    margin: "0 auto",
                    marginTop: "10px",
                    marginBottom: "10px",
                }}></Image>
                <ImageText
                    title={title}
                    ingredients={ing}
                    portion={portion}
                    cost={price}
                />
            </div>
            <div>{products.map((product) => 
            <div key={product.id}>
                <p>Product&apos;s Name: {product.food_name}</p>
                <p>Product&apos;s Composition: {product.includes}</p>
                <p>Is it spice? -&gt; {Boolean(product.spicy).toString().charAt(0).toUpperCase() + Boolean(product.spicy).toString().slice(1)}.<br />
                Is it for vegetarians? -&gt; {Boolean(product.vegetarian).toString().charAt(0).toUpperCase() + Boolean(product.vegetarian).toString().slice(1)}.
                <br />Is it for vegans? -&gt; {Boolean(product.vegan).toString().charAt(0).toUpperCase() + Boolean(product.vegan).toString().slice(1)}.</p>
                <p>Protein (g): {product.protein}. Fats (g): {product.fats}. Carbohydrates (g): {product.carbohydrates}</p>
                <p>Amino Acids & Others: {product.amino_acids}</p>
                <p>Portion (g): {product.food_portion}. Price: {product.cost}</p>
                <p>&quot;{product.imagePath}&quot; It is incorrect image path, because it starts with &quot;./&quot;,<br />
                but it must be started with &quot;/&quot;</p>
                <p>{product.imagePath[0] === "." ? product.imagePath.slice(1) : product.imagePath}</p>
                <p>{product.imagePath.slice(product.imagePath.lastIndexOf("/")+1)}</p>
                <Image
                    src={product.imagePath.slice(product.imagePath.lastIndexOf("/"))}
                    alt={product.imagePath.slice(product.imagePath.lastIndexOf("/")+1)}
                    width={200}
                    height={150}
                ></Image>
            </div>)}</div>
        </div>
    )
}
