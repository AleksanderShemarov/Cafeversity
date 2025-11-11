"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


interface ViewContextType {
    partActive: string,
    setPartActive: Dispatch<SetStateAction<"actual-dishes"|"ready-orders">>,
}


export const ViewContext = createContext<ViewContextType>(null!);


export default function ViewContextProvider({ children }: { children: React.ReactNode }) {
    
    const [partActive, setPartActive] = useState<"actual-dishes"|"ready-orders">("actual-dishes");
    
    return (
        <ViewContext.Provider value={{ partActive, setPartActive }}>
            {children}
        </ViewContext.Provider>
    );
}


export const useViewContext = () => useContext(ViewContext);
