"use client";

import { useViewContext } from "./ViewContext";


export default function ActualDishes({ children }: { children: React.ReactNode }) {

    const { partActive } = useViewContext();

    return (
        <div className={`
            ${partActive === "actual-dishes" ? "block" : "hidden"}
        `}>
            {children}
        </div>
    );
}
