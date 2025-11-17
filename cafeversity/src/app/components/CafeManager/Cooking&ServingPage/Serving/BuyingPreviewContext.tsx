"use client";

import { createContext, RefObject, useContext, useRef } from "react";


interface BuyingPreviewContextPros {
    buyingPreviewRef: RefObject<HTMLDialogElement>,
    buyingRef: RefObject<HTMLDivElement>,
    paymentRef: RefObject<HTMLDivElement>,
}


export const BuyingPreviewContext = createContext<BuyingPreviewContextPros>(null!);


export default function BuyingPreviewProvider({ children }: { children: React.ReactNode }) {
    
    const buyingPreviewRef = useRef<HTMLDialogElement>(null);
    const buyingRef = useRef<HTMLDivElement>(null);
    const paymentRef = useRef<HTMLDivElement>(null);

    return (
        <BuyingPreviewContext.Provider value={{ buyingPreviewRef, buyingRef, paymentRef }}>
            {children}
        </BuyingPreviewContext.Provider>
    );
}


export const useBuyingPreviewContext = () => useContext(BuyingPreviewContext);
