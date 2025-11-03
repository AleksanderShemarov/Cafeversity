"use client";

import { changeOrderStatus } from "@/app/actions/orderStatusChanging";
import { useProcessContext } from "./ProcessContext";


const differentBtns = [
    { label: "Пацвердзіць Падрыхтоўку", value: "READY" },
    { label: "Пакінуць Рыхтуемай", value: "PREPARING" },
];


export default function ConfirmButtonWithSelect({ orderNumber, currentStatus }: { orderNumber: number, currentStatus: string }) {

    const { processingDishes } = useProcessContext();

    const buttonType = processingDishes.every(processDish => processDish.dishReady)
        ? differentBtns.find(btn => btn.value === "READY")!
        : differentBtns.find(btn => btn.value === currentStatus)!;

    return (
        <form action={changeOrderStatus}>
            <input type="hidden" name="number-of-order" value={orderNumber} />
            <button type="submit"
                name="order-status"
                value={buttonType.value}
                className={`
                    px-[1.5rem] py-[0.75rem] m-0 rounded-[0.75rem]
                    ${
                        buttonType.value === "PREPARING"
                        ?
                        `bg-[burlywood] text-[1.6rem] text-white font-semibold
                        hover:outline-3 hover:outline-[burlywood]
                        hover:bg-white hover:text-[burlywood] hover:cursor-pointer`
                        :
                        `bg-green-600 text-[1.6rem] text-white font-semibold
                        hover:outline-3 hover:outline-green-600
                        hover:bg-white hover:text-green-600 hover:cursor-pointer`
                    }
                `}
            >
                {buttonType.label}
            </button>
        </form>
    );
}
