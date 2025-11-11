"use client";

import { useBuyingContext } from "./BuyingContext";
import { IconPlus, IconMinus } from "@tabler/icons-react";


interface CardBottomLineProps {
    foodID: number,
    portion: number,
    cost: number,
    foodType: number,
}


export default function CardBottomLine({ foodID, portion, cost, foodType }: CardBottomLineProps) {

    const { buyingData, setBuyingData } = useBuyingContext();

    const dataPart = buyingData.filter(datum => datum.id === foodID);

    return (
        <div className={`
            w-[100%] py-[0.25rem] inline-flex items-center
            ${dataPart.length > 0 && "justify-center items-stretch"}
        `}
        onClick={(e) => dataPart.length > 0 && e.stopPropagation()}
        >
        {
            dataPart.length > 0
            ?
            <>
                <button type="button"
                    className="
                        m-0 p-0 bg-blue-400 px-[0.5rem] rounded-l-[0.75rem]
                        hover:cursor-pointer hover:bg-blue-600
                    "
                    onClick={() => setBuyingData(prev => {
                        const dataAmount = dataPart[0].amount;
                        if (dataAmount === 1) {
                            return prev;
                        } else {
                            return prev.map(prevPart => 
                                prevPart.id === foodID
                                ? { ...prevPart, amount: prevPart.amount - 1}
                                : prevPart
                            );
                        }
                    })}
                >
                    <IconMinus className="h-[1.9rem] w-[1.9rem] m-0 text-white font-[Consolas_monospace] font-semibold" />
                </button>
                <span className="
                    px-[1rem]
                    flex items-center
                    text-[1.25rem] bg-blue-400 text-white
                    font-[Consolas_monospace] font-semibold
                ">
                    {dataPart[0].amount}
                </span>
                <button type="button"
                    className="
                        m-0 p-0 bg-blue-400 px-[0.5rem] rounded-r-[0.75rem]
                        hover:cursor-pointer hover:bg-blue-600
                    "
                    onClick={() => setBuyingData(prev => {
                        const dataAmount = dataPart[0].amount;
                        if (dataAmount === 3) {
                            return prev;
                        } else {
                            return prev.map(prevPart => 
                                prevPart.id === foodID
                                ? { ...prevPart, amount: prevPart.amount + 1}
                                : prevPart
                            );
                        }
                    })}
                >
                    <IconPlus className="h-[1.9rem] w-[1.9rem] m-0 text-white font-[Consolas_monospace] font-semibold" />
                </button>
            </>
            :
            <>
                <p className="grow text-[1.4rem] text-left font-normal m-0 p-0">{portion}{foodType === 6 ? "ml" : "g"}</p>
                <p className="grow text-[1.4rem] text-right font-normal m-0 p-0">{cost} BYN</p>
            </>
        }
        </div>
    );
}
