"use client";

import { useCashPaymentContext } from "./CashPaymentContext";
import CashMachineBtn from "./CashMachineBtn";


const buttons = [
    { text: "1", style: "col-start-1 col-end-2 row-start-1 row-end-2 w-16 h-16 flex items-center justify-center" },
    { text: "2", style: "col-start-2 col-end-3 row-start-1 row-end-2 w-16 h-16 flex items-center justify-center" },
    { text: "3", style: "col-start-3 col-end-4 row-start-1 row-end-2 w-16 h-16 flex items-center justify-center" },
    { text: "4", style: "col-start-1 col-end-2 row-start-2 row-end-3 w-16 h-16 flex items-center justify-center" },
    { text: "5", style: "col-start-2 col-end-3 row-start-2 row-end-3 w-16 h-16 flex items-center justify-center" },
    { text: "6", style: "col-start-3 col-end-4 row-start-2 row-end-3 w-16 h-16 flex items-center justify-center" },
    { text: "7", style: "col-start-1 col-end-2 row-start-3 row-end-4 w-16 h-16 flex items-center justify-center" },
    { text: "8", style: "col-start-2 col-end-3 row-start-3 row-end-4 w-16 h-16 flex items-center justify-center" },
    { text: "9", style: "col-start-3 col-end-4 row-start-3 row-end-4 w-16 h-16 flex items-center justify-center" },
    { text: ".", style: "col-start-1 col-end-2 row-start-4 row-end-5 w-16 h-16 flex items-center justify-center" },
    { text: "0", style: "col-start-2 col-end-3 row-start-4 row-end-5 w-16 h-16 flex items-center justify-center" },
    { text: "X", style: "col-start-3 col-end-4 row-start-4 row-end-5 w-16 h-16 flex items-center justify-center" },
] as const;


export default function CashMachine() {

    const { cash, setCash } = useCashPaymentContext();

    return (
        <div className="w-[90%] mx-auto flex flex-col items-center">
            <input type="text" readOnly value={cash} placeholder="0.00"
                className="
                    pointer-events-none bg-white
                    text-[2.5rem] text-center
                    border-none border-b-2
                "
            />
            <div className="
                grid grid-cols-3 grid-rows-4 gap-x-[1.5rem] gap-y-[1.5rem]
                w-full max-w-[30rem] mt-[1.5rem]
                justify-items-center
            ">
            {
                buttons.map(button =>
                    <CashMachineBtn key={`cash-machine-button-${button.text}`}
                        text={button.text}
                        className={button.style}
                        onClick={() => setCash(prev => {
                            if (button.text === "X") {
                                return "";
                            } else if (button.text === ".") {
                                return prev.includes(".") ? prev : prev + button.text;
                            } else {
                                return prev + button.text;
                            }
                        })}
                    />
                )
            }
            </div>
        </div>
    );
}
