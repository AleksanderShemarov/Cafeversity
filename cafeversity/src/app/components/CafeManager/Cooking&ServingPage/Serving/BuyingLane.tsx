"use client";

import { useBuyingContext } from "./BuyingContext";
import BuyingLaneCard from "./BuyingLaneCard";
import CardRemover from "./CardRemover";


export default function BuyingLane() {

    const { buyingData } = useBuyingContext();

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
                Ў Накупе
            </p>
            <div className="
                flex flex-row flex-nowrap
                items-center
                gap-[5rem] overflow-x-visible
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
        </div>
    );
}
