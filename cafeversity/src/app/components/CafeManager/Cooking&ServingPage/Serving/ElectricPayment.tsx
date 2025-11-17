"use client";

import PaymentBtn from "./PaymentBtn";
import ElectricPayChoice from "./ElectricPayChoice";
import { useState } from "react";
import { IconCreditCardPay, IconDeviceMobile, IconCoinBitcoin } from "@tabler/icons-react";


const electricPaymentOptions = [
    { name: "Банкаўская Картка", trigger: "bank-credit-card", icon: IconCreditCardPay },
    { name: "Мабільны Дадатак", trigger: "mobile-card-app", icon: IconDeviceMobile },
    { name: "Біткоіны", trigger: "bitcoins", icon: IconCoinBitcoin },
] as const;


export default function ElectricPayment({ commonCost, choisenName }: { commonCost: string, choisenName: string }) {    
    
    const [choisenOption, setChoisenOption] = useState<"bank-credit-card"|"mobile-card-app"|"bitcoins"|"">("");
    
    return (
        <div className={`
            ${
                choisenName === "electric-pay"
                ?
                "flex flex-col items-center justify-around gap-[3rem] flex-1 px-[2rem] py-[1.5rem]"
                :
                "hidden"
            }
        `}>
            <p className="text-[4.5rem] text-center font-semibold">Агульны Кошт: <span className="underline">{commonCost}</span> BYN</p>
            <div className="w-[75%] flex flex-row items-center justify-between">
            {electricPaymentOptions.map(option =>
                <ElectricPayChoice key={option.trigger}
                    name={option.name}
                    clickingName={option.trigger}
                    clickingOn={choisenOption}
                    setClickingOn={setChoisenOption}
                    PaymentIcon={option.icon}
                />
            )}
            </div>
            <PaymentBtn optionChoisen={choisenOption} />
        </div>
    );
}
