"use client";

import {
    IconCake, IconFlame, IconGlassCocktail, IconSalad,
    // IconSearch,
    // IconSnowflake,
    IconSoup
} from "@tabler/icons-react";
import { useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import DishesGrid from "./DishesGrid";


const iconMap = new Map([
    ['IconSalad', IconSalad],
    // ['IconSnowflake', IconSnowflake],
    ['IconSoup', IconSoup],
    ['IconFlame', IconFlame],
    ['IconCake', IconCake],
    ['IconGlassCocktail', IconGlassCocktail]
]);

interface CategoriesControlProps {
    readonly categories: readonly {
        readonly id: number,
        readonly name: string,
        readonly categoryName: string,
        readonly icon: string,
    }[]
}

export default function CategoriesControl({ categories }: CategoriesControlProps) {

    const [categoryVisibility, setCategoryVisibility] = useState<number[]>(categories.map(category => category.id));

    const categoryClickHandler = (categoryId: number) => {
        setCategoryVisibility(prev => {
            if (prev.includes(categoryId) && prev.length > 1) {
                return prev.filter(id => id !== categoryId);
            } 
            else if (!prev.includes(categoryId)) {
                return [...prev, categoryId];
            }
            return prev;
        });
    }

    return (
        <>
            <div style={{
                width: "100%", margin: "0 auto",
                backgroundColor: "rgba(252, 242, 223, 0.67)", backdropFilter: "blur(5px)",
                display: "block", position: "sticky", top: 0, zIndex: 10
            }}>

                {/* Temporary Solution!!! */}
                {/* <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem",
                    paddingTop: "1.5rem", marginTop: 0, marginBottom: "1.5rem", marginLeft: 0, marginRight: 0
                }}>
                    <IconSearch
                        style={{
                            height: "3.5rem", width: "3.5rem",
                            borderRadius: "20%", boxShadow: "0px 0px 3px -1px rgba(66, 68, 90, 1)",
                            color: "orange"
                        }}
                    />
                    <input type="text" placeholder="Search..."
                        style={{
                            height: "3.5rem", fontSize: "2rem", border: "none", borderBottom: "2px solid orange",
                            backgroundColor: "inherit", paddingLeft: "10px", paddingRight: "10px", paddingBottom: 0
                        }}
                    />
                </div> */}
                {/* !!! */}
                
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", margin: "1rem 0", flexWrap: "wrap" }}>
                    {categories.map(category =>
                        <p key={category.id}
                            style={{
                                fontSize: "1.8rem", padding: "0.5rem 1.5rem", border: "2px ridge orange",
                                height: "2.5rem", borderRadius: "1.5rem", fontWeight: 400,
                                cursor: categoryVisibility.length > 1 || !categoryVisibility.includes(category.id) ? "pointer" : "not-allowed",
                                backgroundColor: categoryVisibility.includes(category.id) ? "orange" : "inherit",
                                opacity: categoryVisibility.length === 1 && categoryVisibility.includes(category.id) ? 0.6 : 1,
                            }}
                            onClick={() => {
                                if (categoryVisibility.length > 1 || !categoryVisibility.includes(category.id)) {
                                    categoryClickHandler(category.id);
                                }
                            }}
                        >
                            {category.name}
                        </p>
                    )}
                </div>
            </div>

            <div>
                {categories.map(category =>
                    {
                        const IconComponent = iconMap.get(category.icon);
                        return (
                            <CategoryCard key={category.id}
                                name={category.name}
                                icon={IconComponent!}
                                isVisible={categoryVisibility.includes(category.id)}
                            >
                                <DishesGrid categotyName={category.categoryName} />
                            </CategoryCard>
                        );
                    }
                )}
            </div>
        </>
    );
}
