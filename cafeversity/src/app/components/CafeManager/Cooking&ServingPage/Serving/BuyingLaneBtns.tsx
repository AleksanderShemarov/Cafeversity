"use client";

import { IconFileCheck, IconSquareRoundedX } from "@tabler/icons-react";
import { useBuyingContext } from "./BuyingContext";
import { useBuyingPreviewContext } from "./BuyingPreviewContext";


export default function ReadyButton() {

    const { buyingPreviewRef } = useBuyingPreviewContext();

    return (
        <button type="button"
            className="
                m-0 p-0 px-[1.5rem] py-[0.75rem] rounded-[1.5rem]
                flex flex-row items-center justify-center gap-[1rem] bg-blue-500
                text-[1.6rem] text-white font-semibold

                hover:cursor-pointer hover:outline-2 hover:outline-blue-500 hover:bg-white hover:text-blue-500
            "
            onClick={
                //() => alert("The Special Preview will be shown before the payment will be started.")
                () => {
                    if (buyingPreviewRef.current) {
                        buyingPreviewRef.current.showModal();
                        document.body.style.overflow = "hidden";
                    }
                }
            }
        >
            Гатова <IconFileCheck className="h-[2.5rem] w-[2.5rem]" />
        </button>
    );
}


export function CancelButton() {

    const { setBuyingData, setClickedDishes } = useBuyingContext();

    return (
        <button type="button"
            className="
                m-0 p-0 px-[1.5rem] py-[0.75rem] rounded-[1.5rem]
                flex flex-row items-center justify-center gap-[1rem] bg-red-500
                text-[1.6rem] text-white font-semibold

                hover:cursor-pointer hover:outline-2 hover:outline-red-500 hover:bg-white hover:text-red-500
            "
            onClick={() => {
                setBuyingData([]);
                setClickedDishes([]);
            }}
        >
            Адмена <IconSquareRoundedX className="h-[2.5rem] w-[2.5rem]" />
        </button>
    );
}
