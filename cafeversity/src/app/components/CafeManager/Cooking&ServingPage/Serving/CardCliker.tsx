"use client";

import { useState } from "react";
import { FoodDatumTypes } from "./Category";
import { useBuyingContext } from "./BuyingContext";


export default function CardCliker({
    clickerDishData, className = "", children
}: {
    clickerDishData: FoodDatumTypes, className?: string, children: React.ReactNode
}) {

    const { setBuyingData } = useBuyingContext();

    const [isClicked, setIsClicked] = useState<boolean>(false);
    
    return (
        <div onClick={() => {
            if (!isClicked) {
                setBuyingData(prev =>
                    [
                        ...prev,
                        {
                            ...clickerDishData,
                            amount: 1
                        }
                    ]
                );
            } else {
                setBuyingData(prev =>
                    prev.filter(prevPart =>
                        prevPart.id !== clickerDishData.id
                    )
                );
            }
            setIsClicked(prev => !prev);
        }}
            className={`
                ${className}
                ${isClicked ? "outline-3 outline-blue-400" : ""}
            `}
        >
            {children}
        </div>
    );
}
