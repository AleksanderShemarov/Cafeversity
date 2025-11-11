"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


type FoodDatumWithAmountTypes = {
    id: number,
    food_name: string,
    imagePath: string,
    cost: number,
    food_portion: number,
    dishTypeId: number,
    amount: number,
} 


interface BuyingContextType {
    buyingData: FoodDatumWithAmountTypes[],
    setBuyingData: Dispatch<SetStateAction<FoodDatumWithAmountTypes[]>>,    
}


export const BuyingContext = createContext<BuyingContextType>(null!);


export default function BuyingContextProvider({ children }: { children: React.ReactNode }) {

    const [buyingData, setBuyingData] = useState<FoodDatumWithAmountTypes[]|[]>([]);

    return (
        <BuyingContext.Provider value={{ buyingData, setBuyingData }}>
            {children}
        </BuyingContext.Provider>
    );
}


export const useBuyingContext = () => useContext(BuyingContext);
