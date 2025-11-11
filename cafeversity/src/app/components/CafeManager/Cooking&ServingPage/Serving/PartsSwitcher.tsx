"use client";

import { useViewContext } from "./ViewContext";


export default function PartsSwitcher({ children }: { children: React.ReactNode }) {
    
    const { partActive, setPartActive } = useViewContext();

    return (
        <div className="w-[100%] bg-[whitesmoke]">
            <div className="
                mx-auto my-0 mb-[1.5rem]
                flex flex-row items-center justify-center gap-2
            ">
                <button type="button"
                    className={`
                        m-0 p-0 px-[1.25rem] py-[0.75rem]
                        rounded-t-[1rem]
                        ${partActive === "actual-dishes" ? "border-l-2 border-t-2 border-r-2" : "border-l-1 border-t-1 border-r-1" }
                        border-t-[lightgray] border-l-[lightgray] border-r-[lightgray]
                        text-[1.6rem] font-semibold
                        hover:cursor-pointer
                    `}
                    onClick={() => setPartActive("actual-dishes")}
                >
                    Actual Dishes
                </button>
                <button type="button"
                    className={`
                        m-0 p-0 px-[1.75rem] py-[1rem]
                        rounded-t-[1rem]
                        ${partActive === "ready-orders" ? "border-l-2 border-t-2 border-r-2" : "border-l-1 border-t-1 border-r-1" }
                        border-t-[lightgray] border-l-[lightgray] border-r-[lightgray]
                        text-[1.6rem] font-semibold
                        hover:cursor-pointer
                    `}
                    onClick={() => setPartActive("ready-orders")}
                >
                    Ready Orders
                </button>
            </div>
            {children}
        </div>
    );
}
