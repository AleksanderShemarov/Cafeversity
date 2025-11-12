"use client";

import { FoodDatumTypes } from "./Category";
import { useBuyingContext } from "./BuyingContext";


export default function CardCliker({
    clickerDishData, className = "", children
}: {
    clickerDishData: FoodDatumTypes, className?: string, children: React.ReactNode
}) {

    const { setBuyingData, clickedDishes, setClickedDishes } = useBuyingContext();
    
    return (
        <div onClick={() => {
            if (!clickedDishes.includes(clickerDishData.id)) {
                setBuyingData(prev =>
                    [
                        ...prev,
                        {
                            ...clickerDishData,
                            amount: 1
                        }
                    ]
                );
                setClickedDishes(prev => [...prev, clickerDishData.id]);
            } else {
                setBuyingData(prev =>
                    prev.filter(prevPart =>
                        prevPart.id !== clickerDishData.id
                    )
                );
                setClickedDishes(prev => prev.filter(prevValue => prevValue !== clickerDishData.id));
            }
        }}
            className={`
                ${className}
                ${clickedDishes.includes(clickerDishData.id) ? "outline-3 outline-blue-400" : ""}
            `}
        >
            {children}
        </div>
    );
}
