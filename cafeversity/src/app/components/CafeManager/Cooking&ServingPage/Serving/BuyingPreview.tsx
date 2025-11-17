"use client";

import { FoodDatumWithAmountTypes } from "./BuyingContext";
import { useBuyingPreviewContext } from "./BuyingPreviewContext";
import BuyingPreviewCard from "./BuyingPreviewCard";
import ConfirmToPay, { CommingBack } from "./BuyingPreviewBtns";
import { IconBasketSearch } from "@tabler/icons-react";


interface BuyingPreviewProps {
    buyingData: FoodDatumWithAmountTypes[],
    commonCost: string,
}


export default function BuyingPreview({ buyingData, commonCost }: BuyingPreviewProps) {

    const { buyingRef } = useBuyingPreviewContext();

    return (
        <div ref={buyingRef}>
            <p className="
                p-0 pb-[1.25rem]
                flex flex-row items-center justify-center gap-[1.5rem]
                text-[2rem] font-bold text-center
                underline underline-offset-1
            ">
                <IconBasketSearch className="w-[3.5rem] h-[3.5rem]" /> Праверка Накупу
            </p>
            <div className="w-[100%] h-[80%] py-[1.25rem] overflow-y-auto">
            {buyingData.map(datum =>
                <BuyingPreviewCard key={`preview-dish-${datum.id}`}
                    food_name={datum.food_name}
                    imagePath={datum.imagePath}
                    food_portion={datum.food_portion}
                    cost={datum.cost}
                    dishTypeId={datum.dishTypeId}
                    amount={datum.amount}
                />
            )}
            </div>
            <div className="
                absolute bottom-[4rem] left-0 right-0
                flex flex-row items-center justify-around
            ">
                <CommingBack />
                <span className="text-[2rem] font-bold underline underline-offset-2">
                    Агульны Кошт: {commonCost} BYN
                </span>
                <ConfirmToPay />
            </div>
        </div>
    )
}
