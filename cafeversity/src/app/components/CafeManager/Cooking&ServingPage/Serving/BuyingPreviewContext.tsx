"use client";

import { createContext, RefObject, useContext, useRef } from "react";


interface BuyingPreviewContextPros {
    buyingPreviewRef: RefObject<HTMLDialogElement>
}


export const BuyingPreviewContext = createContext<BuyingPreviewContextPros>(null!);


export default function BuyingPreviewProvider({ children }: { children: React.ReactNode }) {
    
    const buyingPreviewRef = useRef<HTMLDialogElement>(null);

    return (
        <BuyingPreviewContext.Provider value={{ buyingPreviewRef }}>
            {children}
        </BuyingPreviewContext.Provider>
    );
}


export const useBuyingPreviewContext = () => useContext(BuyingPreviewContext);
