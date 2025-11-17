"use client";

import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction } from "react";
import { Icon, IconProps } from "@tabler/icons-react";


interface ElectricPayChoiceProps {
    name: string,
    clickingName: "" | "bank-credit-card" | "mobile-card-app" | "bitcoins",
    clickingOn: "" | "bank-credit-card" | "mobile-card-app" | "bitcoins",
    setClickingOn: Dispatch<SetStateAction<"" | "bank-credit-card" | "mobile-card-app" | "bitcoins">>,
    PaymentIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
}


export default function ElectricPayChoice({ name, clickingName, clickingOn, setClickingOn, PaymentIcon }: ElectricPayChoiceProps) {
    return (
        <div
            className={`
                w-[25rem] h-[18rem] p-[1.5rem]
                flex flex-col items-center justify-between
                bg-purple-800 rounded-[2.5rem] border-6
                hover:cursor-pointer
                ${clickingName === clickingOn ? "border-orange-400" : "border-purple-500"}
            `}
            onClick={() => setClickingOn(clickingName)}
        >
            <p className={`text-[2.7rem] text-white text-center font-medium ${clickingName === clickingOn ? "underline" : ""}`}>{name}</p>
            <PaymentIcon className="w-[5rem] h-[5rem] rounded-full text-white mx-auto" />
        </div>
    );
}
