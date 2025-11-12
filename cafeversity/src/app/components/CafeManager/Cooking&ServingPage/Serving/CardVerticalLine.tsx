"use client";

import { useBuyingContext } from "./BuyingContext";
import { IconPlus, IconMinus } from "@tabler/icons-react";


export default function CardVerticalLine({ foodID }: { foodID: number }) {
    
    const { buyingData, setBuyingData } = useBuyingContext();

    const dataPart = buyingData.filter(datum => datum.id === foodID);
    
    return (
        <div className={`
            h-[10rem]
            absolute top-[0.5rem] right-[1rem]
            flex flex-col justify-between
        `}
        onClick={(e) => dataPart.length > 0 && e.stopPropagation()}
        >
            <button type="button"
                className="
                    m-0 p-0 bg-green-400 rounded-[50%]
                    hover:cursor-pointer hover:bg-green-600
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
                <IconPlus className="h-[2.7rem] w-[2.7rem] m-0 text-white font-[Consolas_monospace] font-semibold" />
            </button>
            <span className="
                flex items-center justify-center
                text-[1.8rem] font-[Consolas_monospace] font-semibold
                underline underline-offset-1
            ">
                {dataPart[0].amount}
            </span>
            <button type="button"
                className="
                    m-0 p-0 bg-red-400 rounded-[50%]
                    hover:cursor-pointer hover:bg-red-600
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
                <IconMinus className="h-[2.7rem] w-[2.7rem] m-0 text-white font-[Consolas_monospace] font-semibold" />
            </button>
        </div>
    );
}
