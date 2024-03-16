"use client"

import styles from "@/app/commonMenu/commonMenu.module.css";
import Image from "next/image";
import ImageText from "./ImageText";
import { useEffect, useState } from "react";


export default function FoodList() {

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
        }
    ]);
    /* "/no_image1.jpg" – An each picture path must be started with "/"
    and a picture's file (for example, "no_image1.jpg") after it*/

    /* You will see these data a few moments until the dishes_BY data fetching will be ended.
    If you see these data all time, data fetching is failed.*/

    useEffect(() => {
        fetch("http://localhost:3000/api/route", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
            {products.map((product) => 
                <div id={styles.list_field} key={product.id}>
                    <div id={styles.list_field_image}>
                        <Image
                            src={product.imagePath.slice(product.imagePath.lastIndexOf("/"))}
                            alt={product.imagePath.slice(product.imagePath.lastIndexOf("/"))+1}
                            width={318}
                            height={216}
                            style={{
                                border: "7px solid gold",
                                borderRadius: "30px",
                                margin: "auto",
                                marginTop: "10px",
                                marginBottom: "10px",
                                width: "19vw",
                                height: "215px",
                                marginLeft: "0.5vw",
                                marginRight: "0.5vw",
                            }}
                        ></Image>
                    </div>
                    <ImageText
                        title={product.food_name}
                        ingredients={product.includes}
                        portion={product.food_portion}
                        cost={product.cost}
                    />
                </div>
            )}
        </div>
    )
}


/* <div key={product.id}>
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
        src={product.imagePath[0] === "." ? product.imagePath.slice(product.imagePath.lastIndexOf("/")) : product.imagePath}
        alt={product.imagePath.slice(product.imagePath.lastIndexOf("/")+1)}
        width={200}
        height={150}
    ></Image>
</div> */
