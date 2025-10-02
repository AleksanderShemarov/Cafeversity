"use client";

import { useState, useEffect } from "react";
import CardBlock from "@/components/CardParts/CardBlock";
import CardImage from "@/components/CardParts/CardImage";
import CardTitle from "@/components/CardParts/CardTitle";
import { IconInfoSquareRoundedFilled } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


type Dish = {
    id: number,
    food_name: string,
    imagePath: string,
}

export default function DishesGrid({ categotyName }: { categotyName: string }) {
    
    const dishesLoading = useTranslations("UserMenuPage");

    const pathname = usePathname();
    // const router = useRouter();

    const [dishes, setDishes] = useState<Dish[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [brightness, setBrightness] = useState<number[]>([]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                setLoading(true);
                
                const response = await fetch(`http://localhost:3000/api/foodlist?category=${categotyName}`, { cache: "no-store" });
                if (!response.ok) {
                    throw new Error("Error while dishes loading!");
                }

                const data = await response.json();
                setDishes(data);

                setLoading(false);
            }
            catch (error) {
                console.log(`Error has happened: ${error instanceof Error && error.message}`);
            }
        };

        fetchDishes();
    }, [categotyName]);

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center', fontSize: "1.8rem" }}>{dishesLoading("loading")}</div>
    }

    if (dishes.length === 0) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', fontSize: "1.8rem" }}>
                {dishesLoading("noDishes")}
            </div>
        );
    }

    function dishRouterHandler(dishID: number) {
        window.location.href = `${pathname}/${dishID}`;
    }
    
    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(21vw, 1fr))',
            gap: '1rem',
            padding: '0 1rem'
        }}>
            {dishes.map((dish) => (
                <div key={dish.id} style={{
                    display: "flex", flexDirection: "column",
                    width: 'fit-content', height: 'fit-content',
                    borderRadius: "1.5rem", backgroundColor: "lightgray",
                    filter: brightness.includes(dish.id) ? "brightness(0.8)" : "brightness(1)",
                    cursor: brightness.includes(dish.id) ? "pointer" : "auto",
                    position: "relative"
                }}
                    onMouseEnter={() => setBrightness(prev => [...prev, dish.id])}
                    onMouseLeave={() => setBrightness(prev => prev.filter(id => id !== dish.id))}
                    onClick={() => dishRouterHandler(dish.id)}
                >
                    <div style={{
                        position: "absolute", top: 0, left: 0,
                        width: "100%", height: "100%", zIndex: 9,
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <IconInfoSquareRoundedFilled
                            style={{
                                height: "5rem", width: "5rem", color: "rgb(0, 140, 255)",
                                visibility: brightness.includes(dish.id) ? "visible" : "hidden"
                            }}
                        />
                    </div>
                    <CardBlock height="18vh" width="21vw">
                        <CardImage 
                            imagePath={dish.imagePath.slice(8)}
                            style={{ borderRadius: "1.5rem" }}
                            fill
                        />
                        <CardTitle 
                            title={dish.food_name}
                            style={{
                                color: "black",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 8,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                padding: "0.5rem",
                                textAlign: "center",
                                textWrap: "pretty",
                                fontSize: "1.8rem"
                            }}
                        />
                    </CardBlock>
                </div>
            ))}
        </div>
    );
}
