"use client";

import { useBuyingContext } from "./BuyingContext";
import BuyingLaneCard from "./BuyingLaneCard";
import CardRemover from "./CardRemover";
import ReadyButton, { CancelButton } from "./BuyingLaneBtns";


export default function BuyingLane() {

    const { buyingData } = useBuyingContext();

    const positions = buyingData.length > 4 || buyingData.length === 0 ? "страў" : buyingData.length === 1 ? "страва" : "стравы";
    const commonCost = buyingData.length > 0 ? String(buyingData.reduce((sum, datum) => sum + (datum.cost * datum.amount), 0).toFixed(2)) : "0.00";

    return (
        <div className={`
            ${buyingData.length === 0 ? "hidden" : "block"}
            sticky bottom-0 left-0 right-0
            min-h-[25rem] w-[100%]
            bg-[whitesmoke]/50 backdrop-blur-[8px]
            border-2
        `}>
            <p className="
                m-0 mb-[2rem] p-0 py-[1.25rem]
                text-[1.6rem] text-center
                font-semibold
            ">
                Ў Накупе: {buyingData.length} {positions}; {commonCost} BYN
            </p>
            <div className="
                flex flex-row flex-nowrap
                items-center gap-[5rem] mx-[3rem]
                overflow-x-auto
            ">
            {
                buyingData.length === 0
                ?
                <p className="w-[100%] text-[1.4rem] text-center italic">Ніводнай стравы</p>
                :
                buyingData.map(datum =>
                    <CardRemover key={`buying-dish-${datum.id}`} foodID={datum.id}>
                        <BuyingLaneCard id={datum.id}
                            food_name={datum.food_name}
                            imagePath={datum.imagePath}
                            cost={datum.cost}
                            food_portion={datum.food_portion}
                            dishTypeId={datum.dishTypeId}
                            amount={datum.amount}
                        />
                    </CardRemover>
                )
            }
            </div>
            <div className="w-[100%] py-[0.5rem] flex flex-row items-center justify-center gap-[2rem]">
                <ReadyButton />
                <CancelButton />
            </div>
        </div>
    );
}
