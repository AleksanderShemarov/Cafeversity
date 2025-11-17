"use client";

import { IconBasketDollar, IconCoins, IconCreditCard } from "@tabler/icons-react";
import { useBuyingPreviewContext } from "./BuyingPreviewContext";
import { useState } from "react";
import { CancelButton } from "./BuyingPreviewBtns";
import ElectricPayment from "./ElectricPayment";
import CashPayment from "./CashPayment";


export default function PaymentsBlock({ commonCost }: { commonCost: string }) {

    const { paymentRef } = useBuyingPreviewContext();
    
    const [isRadioClicked, setIsRadioClicked] = useState<"electric-pay"|"cash">("electric-pay");
    
    return (
        <div ref={paymentRef} className="hidden flex-col h-[100%]">
            <p className="
                p-0 mb-[1.25rem] relative
                flex flex-row items-center justify-center gap-[1.5rem]
                text-[2rem] font-bold text-center
                underline underline-offset-1
                shrink-0
            ">
                <IconBasketDollar className="w-[3.5rem] h-[3.5rem]" /> Аплата
                <CancelButton />
            </p>
            <div className=" bg-amber-300 p-[2.5rem] flex-1 rounded-[1rem] flex flex-col gap-[1.5rem]">
                <div className="w-[100%] flex flex-row items-center gap-[7.5rem]">
                    <div onClick={() => setIsRadioClicked("electric-pay")}
                        className={`
                            flex-1 flex flex-row items-center justify-start gap-[2rem]
                            px-[1.5rem] py-[1rem]
                            bg-amber-500 rounded-[1.25rem]
                            cursor-pointer
                            ${isRadioClicked === "electric-pay" ? "outline-3 outline-gray-600 outline-offset-2" : ""}
                        `}
                    >
                        <input type="radio" checked={isRadioClicked === "electric-pay"} id="payment-1"
                            name="electric-pay" value="electric-card"
                            onChange={() => setIsRadioClicked("electric-pay")}
                            className="
                                w-[2.75rem] h-[2.75rem]
                                appearance-none
                                border-2 border-gray-600
                                rounded-full
                                bg-inherit
                                cursor-pointer
                                
                                checked:border-gray-600 
                                checked:bg-gray-300
                                
                                checked:before:content-[''] 
                                checked:before:block 
                                checked:before:w-1/2
                                checked:before:h-1/2 
                                checked:before:rounded-full 
                                checked:before:bg-gray-500
                                checked:before:mx-auto 
                                checked:before:my-2.5
                                transition-colors duration-200
                            "
                        />
                        <span className="flex flex-row items-center gap-[1rem]">
                            <IconCreditCard className="w-[3.5rem] h-[3.5rem] text-black" />
                            <p className={`
                                text-[1.8rem] text-black font-bold
                                ${isRadioClicked === "electric-pay" ? "underline underline-offset-2" : ""}
                            `}>
                                Эляктронная картка
                            </p>
                        </span>
                    </div>
                    <div onClick={() => setIsRadioClicked("cash")}
                        className={`
                            flex-1 flex flex-row items-center justify-start gap-[2rem]
                            px-[1.5rem] py-[1rem]
                            bg-amber-500 rounded-[1.25rem]
                            cursor-pointer
                            ${isRadioClicked === "cash" ? "outline-3 outline-gray-600 outline-offset-2" : ""}
                        `}
                    >
                        <input type="radio" checked={isRadioClicked === "cash"} id="payment-2"
                            name="cash" value="cash"
                            onChange={() => setIsRadioClicked("cash")}
                            className="
                                w-[2.75rem] h-[2.75rem]
                                appearance-none
                                border-2 border-gray-600
                                rounded-full
                                bg-inherit
                                cursor-pointer
                                
                                checked:border-gray-600 
                                checked:bg-gray-300
                                
                                checked:before:content-[''] 
                                checked:before:block 
                                checked:before:w-1/2
                                checked:before:h-1/2 
                                checked:before:rounded-full 
                                checked:before:bg-gray-500
                                checked:before:mx-auto 
                                checked:before:my-2.5
                                transition-colors duration-200
                            "
                        />
                        <span className="flex flex-row items-center gap-[1rem]">
                            <IconCoins className="w-[3.5rem] h-[3.5rem] text-black" />
                            <p className={`
                                text-[1.8rem] text-black font-bold
                                ${isRadioClicked === "cash" ? "underline underline-offset-2" : ""}
                            `}>
                                Наяўныя грошы
                            </p>
                        </span>
                    </div>
                </div>
                <ElectricPayment commonCost={commonCost} choisenName={isRadioClicked} />
                <CashPayment commonCost={commonCost} choisenName={isRadioClicked} />
            </div>
        </div>
    );
}
