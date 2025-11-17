"use client";

import { IconCashMove } from "@tabler/icons-react";
import { useCashPaymentContext } from "./CashPaymentContext";


export default function PaymentBtn({ optionChoisen }: { optionChoisen: "bank-credit-card"|"mobile-card-app"|"bitcoins"|"" }) {
    return (
        <button type="button"
            className={`
                m-0 p-0 px-[2rem] py-[1rem] rounded-[1rem]
                flex flex-row items-center justify-center gap-[1rem]
                text-[1.8rem] font-bold
                ${optionChoisen === "" ? "bg-white text-gray-400" : "bg-green-500 text-white"}

                ${
                    optionChoisen === ""
                    ?
                    "hover:cursor-not-allowed disabled:outline-2 disabled:outline-gray-400"
                    :
                    "hover:cursor-pointer hover:outline-2 hover:outline-green-500 hover:bg-white hover:text-green-500"
                }
            `}
            onClick={() => {}}
        >
            <IconCashMove className="h-[3rem] w-[3rem]" /> Аплаціць
        </button>
    );
}


export function CashPaymentBtn({ commonCost }: { commonCost: string }) {
    
    const { cash } = useCashPaymentContext();

    const enoughSum = Number(cash !== "" ? cash : 0) >= Number(commonCost);
    
    return (
        <button type="button"
            className={`
                m-0 p-0 px-[2rem] py-[1rem] rounded-[1rem]
                flex flex-row items-center justify-center gap-[1rem]
                text-[1.8rem] font-bold
                ${!enoughSum ? "bg-white text-gray-400" : "bg-green-500 text-white"}

                ${
                    !enoughSum
                    ?
                    "hover:cursor-not-allowed disabled:outline-2 disabled:outline-gray-400"
                    :
                    "hover:cursor-pointer hover:outline-2 hover:outline-green-500 hover:bg-white hover:text-green-500"
                }
            `}
            onClick={() => {}}
        >
            <IconCashMove className="h-[3rem] w-[3rem]" /> Аплаціць
        </button>
    );
}
