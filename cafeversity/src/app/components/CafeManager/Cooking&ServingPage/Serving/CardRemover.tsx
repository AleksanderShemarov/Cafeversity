"use client";

import { useBuyingContext } from "./BuyingContext";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";


export default function CardRemover({ foodID, children }: { foodID: number, children: React.ReactNode }) {

    const { setBuyingData, setClickedDishes } = useBuyingContext();

    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div className="relative"
            onMouseEnter={() => setIsHovered(prev => !prev)}
            onMouseLeave={() => setIsHovered(prev => !prev)}
        >
            <span onClick={() => {
                setBuyingData(prev => prev.filter(prevPart => prevPart.id !== foodID));
                setClickedDishes(prev => prev.filter(prevValue => prevValue !== foodID));
            }}
                className={`
                    ${isHovered ? "block" : "hidden"}
                    absolute top-[16%] left-[30%] z-10
                    m-0 p-[0.5rem] bg-red-500 rounded-[50%]
                    hover:cursor-pointer hover:bg-red-700
                `}
            >
                <IconTrash className="h-[3rem] w-[3rem] m-0 text-white font-[Consolas_monospace] font-semibold" />
            </span>
            {children}
        </div>
    );
}
