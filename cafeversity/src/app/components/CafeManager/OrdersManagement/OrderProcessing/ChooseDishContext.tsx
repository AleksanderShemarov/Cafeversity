"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


const ChooseDishContext = createContext<{
    selectedDish: string,
    setSelectedDish: Dispatch<SetStateAction<string>>
    selectedDishTypeId: number,
    setSelectedDishTypeId: Dispatch<SetStateAction<number>>
}>(null!);


export default function ChooseDishProvider({ children }: { children: React.ReactNode }) {

    const [selectedDish, setSelectedDish] = useState<string>('');
    const [selectedDishTypeId, setSelectedDishTypeId] = useState<number>(0);

    return (
        <ChooseDishContext.Provider value={{ selectedDish, setSelectedDish, selectedDishTypeId, setSelectedDishTypeId }}>
            {children}
        </ChooseDishContext.Provider>
    );
}


export const useDishContext = () => useContext(ChooseDishContext);
