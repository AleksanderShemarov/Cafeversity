"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


export type FoodDatumWithAmountTypes = {
    id: number,
    food_name: string,
    imagePath: string,
    cost: number,
    food_portion: number,
    dishTypeId: number,
    amount: number,
};


interface BuyingContextType {
    buyingData: FoodDatumWithAmountTypes[],
    setBuyingData: Dispatch<SetStateAction<FoodDatumWithAmountTypes[]>>,
    clickedDishes: number[],
    setClickedDishes: Dispatch<SetStateAction<number[]>>,
}


export const BuyingContext = createContext<BuyingContextType>(null!);


export default function BuyingContextProvider({ children }: { children: React.ReactNode }) {

    const [buyingData, setBuyingData] = useState<FoodDatumWithAmountTypes[]|[]>([]);
    const [clickedDishes, setClickedDishes] = useState<number[]|[]>([]);

    return (
        <BuyingContext.Provider value={{ buyingData, setBuyingData, clickedDishes, setClickedDishes }}>
            {children}
        </BuyingContext.Provider>
    );
}


export const useBuyingContext = () => useContext(BuyingContext);
