"use client";

import { IconBasketDollar, IconArrowLeft } from "@tabler/icons-react";
import { useBuyingPreviewContext } from "./BuyingPreviewContext";


export default function ConfirmToPay() {
    return (
        <button type="button"
            className="
                m-0 p-0 px-[3rem] py-[1.5rem] rounded-[2rem]
                flex flex-row items-center justify-center gap-[1rem] bg-orange-500
                text-[1.8rem] text-white font-bold

                hover:cursor-pointer hover:outline-4 hover:outline-orange-500 hover:bg-white hover:text-orange-500
            "
            onClick={() => alert("After clicking on this button the payment view will be shown.")}
        >
            <IconBasketDollar className="h-[3rem] w-[3rem]" /> Да Аплаты
        </button>
    );
}


export function CommingBack() {

    const { buyingPreviewRef } = useBuyingPreviewContext();

    return (
        <button type="button"
            className="
                m-0 p-0 px-[3rem] py-[1.5rem] rounded-[2rem]
                flex flex-row items-center justify-center gap-[1rem] bg-red-500
                text-[1.8rem] text-white font-bold

                hover:cursor-pointer hover:outline-4 hover:outline-red-500 hover:bg-white hover:text-red-500
            "
            onClick={() => {
                if (buyingPreviewRef.current) {
                    buyingPreviewRef.current.close();
                    document.body.style.overflow = "unset";
                }
            }}
        >
            <IconArrowLeft className="h-[3rem] w-[3rem]" /> Ўзад
        </button>
    );
}
