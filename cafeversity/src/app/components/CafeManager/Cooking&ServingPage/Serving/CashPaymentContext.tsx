"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


interface CashPaymentContextProps {
    cash: string,
    setCash: Dispatch<SetStateAction<string>>,
}


export const CashPaymentContext = createContext<CashPaymentContextProps>(null!);


export default function CashPaymentProvider({ children }: { children: React.ReactNode }) {
    
    const [cash, setCash] = useState<string>("");
    
    return (
        <CashPaymentContext.Provider value={{ cash, setCash }}>
            {children}
        </CashPaymentContext.Provider>
    );
}


export const useCashPaymentContext = () => useContext(CashPaymentContext);
