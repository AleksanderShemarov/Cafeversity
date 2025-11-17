"use client";

import { IconBasketDollar, IconArrowLeft, IconX } from "@tabler/icons-react";
import { useBuyingPreviewContext } from "./BuyingPreviewContext";


export default function ConfirmToPay() {

    const { buyingRef, paymentRef } = useBuyingPreviewContext();

    return (
        <button type="button"
            className="
                m-0 p-0 px-[3rem] py-[1.5rem] rounded-[2rem]
                flex flex-row items-center justify-center gap-[1rem] bg-orange-500
                text-[1.8rem] text-white font-bold

                hover:cursor-pointer hover:outline-4 hover:outline-orange-500 hover:bg-white hover:text-orange-500
            "
            onClick={() => {
                if (buyingRef.current && paymentRef.current) {
                    buyingRef.current.style.display = "none";
                    paymentRef.current.style.display = "flex";
                }
            }}
        >
            <IconBasketDollar className="h-[3rem] w-[3rem]" /> Да Аплаты
        </button>
    );
}


export function CommingBack() {

    const { buyingPreviewRef, buyingRef } = useBuyingPreviewContext();

    return (
        <button type="button"
            className="
                m-0 p-0 px-[3rem] py-[1.5rem] rounded-[2rem]
                flex flex-row items-center justify-center gap-[1rem] bg-red-500
                text-[1.8rem] text-white font-bold

                hover:cursor-pointer hover:outline-4 hover:outline-red-500 hover:bg-white hover:text-red-500
            "
            onClick={() => {
                if (buyingPreviewRef.current && buyingRef.current) {
                    buyingPreviewRef.current.close();
                    buyingRef.current.style.display = "none";
                    document.body.style.overflow = "unset";
                }
            }}
        >
            <IconArrowLeft className="h-[3rem] w-[3rem]" /> Ўзад
        </button>
    );
}


export function CancelButton() {

    const { buyingRef, paymentRef } = useBuyingPreviewContext();

    return (
        <button type="button"
            className="
                m-0 p-0 px-[1rem] py-[0.5rem] rounded-[1rem]
                absolute top-1/2 right-0 -translate-y-[50%]
                flex flex-row items-center justify-center gap-[1rem] bg-red-500
                text-[1.8rem] text-white font-bold

                hover:cursor-pointer hover:outline-2 hover:outline-red-500 hover:bg-white hover:text-red-500
            "
            onClick={() => {
                if (buyingRef.current && paymentRef.current) {
                    paymentRef.current.style.display = "none";
                    buyingRef.current.style.display = "block";
                }
            }}
        >
            <IconX className="h-[3rem] w-[3rem]" /> Адмена
        </button>
    );
}