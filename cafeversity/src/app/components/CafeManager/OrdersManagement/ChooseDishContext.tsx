"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


const ChooseDishContext = createContext<{
    selectedDish: string,
    setSelectedDish: Dispatch<SetStateAction<string>>
}>(null!);


export default function ChooseDishProvider({ children }: { children: React.ReactNode }) {

    const [selectedDish, setSelectedDish] = useState<string>('');

    return (
        <ChooseDishContext.Provider value={{ selectedDish, setSelectedDish }}>
            {children}
        </ChooseDishContext.Provider>
    );
}


export const useDishContext = () => useContext(ChooseDishContext);
