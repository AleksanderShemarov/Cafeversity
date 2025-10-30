"use client";

import { OrderXTypes } from "./NewOrderPreview";
import DishBlank from "./DishBlank";
import { useDishContext } from "./ChooseDishContext";
import { useState } from "react";


export default function DishesInOrder({ orderInfo }: { orderInfo: OrderXTypes }) {

    const { setSelectedDish } = useDishContext();

    const [choisen, setChoisen] = useState<string>("");

    return (
        <div className="grow flex flex-col">
            <p className="shrink-0 text-[1.8rem] text-left font-bold m-0 p-0">
                <span>Стравы </span>
                <span className="text-[1.8rem] text-left text-gray-400 font-medium m-0 p-0">
                    ({orderInfo.dishes.length})
                </span>
            </p>
            <div className="flex-1 overflow-y-auto">
                {orderInfo.dishes.map((dish, index) =>
                    <DishBlank key={`dish-in-order-${index}`}
                        image={dish.dishes.imagePath}
                        dishName={dish.dishes.food_name}
                        dishCost={dish.dishes.cost}
                        onDishBlankClick={() => {
                            setSelectedDish(dish.dishes.food_name);
                            setChoisen(`dish-in-order-${index}`);
                        }}
                        optionalStyle={`
                            ${choisen === `dish-in-order-${index}` ? "outline-3 outline-[goldenrod]" : "outline-1 outline-[lightgray]"}
                        `}
                    />
                )}
            </div>
            <div className="
                shrink-0 px-[1rem] py-[0.75rem] mt-auto
                outline-1 outline-[lightgray] rounded-[1.25rem]
            ">
                <p className="
                    text-[1.6rem] text-justify font-normal m-0 p-0
                    text-wrap h-[7.5dvh] overflow-y-auto
                ">
                    <span className="text-[1.8rem] text-left font-bold">Каментар: </span>{orderInfo.comment}.
                </p>
            </div>
        </div>
    );
}
