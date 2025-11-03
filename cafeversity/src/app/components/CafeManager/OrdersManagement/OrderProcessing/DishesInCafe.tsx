"use client";

import CafeDishBlank from "../DishBlanks/CafeDishBlank";
import { useDishContext } from "./ChooseDishContext";
import { useRef, useEffect } from "react";


type CafeDishTypes = {
    dishes: {
        food_portion: number,
        cost: number,
        id: number,
        imagePath: string,
        food_name: string,
        dishTypeId: number | null,
    };
}


export default function DishesInCafe({ cafeDishes }: { cafeDishes: CafeDishTypes[] }) {

    const { selectedDish } = useDishContext();
    
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderDishRef = useRef<Record<string, HTMLDivElement|null>>({});

    useEffect(() => {
        if (selectedDish && sliderDishRef.current[selectedDish]) {
            sliderDishRef.current[selectedDish]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [selectedDish]);

    return (
        <div className="flex items-start justify-center">
            <div>
                <p className="text-[1.8rem] text-left font-bold m-0 p-0">
                    <span>Стравы Страўні </span>
                    <span className="text-[1.8rem] text-left text-gray-400 font-medium m-0 p-0">
                        ({cafeDishes.length})
                    </span>
                </p>
                <div
                    className="
                        w-[36dvw] flex flex-row items-center overflow-x-auto
                        snap-x snap-mandatory scroll-smooth
                    "
                    ref={sliderRef}
                >
                    {cafeDishes.map(dish =>
                        <div key={`dish-in-cafe-${dish.dishes.id}`} ref={(el) => {
                            (sliderDishRef.current[dish.dishes.food_name] = el);
                        }}>
                            <CafeDishBlank
                                dishImage={dish.dishes.imagePath}
                                dishName={dish.dishes.food_name}
                                dishPortion={dish.dishes.food_portion}
                                dishCost={dish.dishes.cost}
                                dishType={dish.dishes.dishTypeId as number}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
