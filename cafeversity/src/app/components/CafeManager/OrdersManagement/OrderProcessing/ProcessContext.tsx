"use client";

import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";


interface ProcessingDish {
    processingDishName: string,
    processingTime: number,
    isProcessingStart: boolean,
    isProcessingEnd: boolean,
    dishReady: boolean,
}


interface ProcessContextType {
    processingDishes: ProcessingDish[],
    setProcessingDishes: Dispatch<SetStateAction<ProcessingDish[]>>,
    startProcessing: (dishName: string, initialTime: number) => void,
    stopProcessing: (dishName: string) => void,
    completeProcessing: (dishName: string) => void,
    updateProcessingTime: (dishName: string, newTime: number) => void,
    getProcessingDish: (dishName: string) => ProcessingDish|undefined,
}


const ProcessContext = createContext<ProcessContextType>(null!);


export default function ProcessContextProvider({ children }: { children: React.ReactNode }) {

    const [processingDishes, setProcessingDishes] = useState<ProcessingDish[]>([]);

    const startProcessing = useCallback((dishName: string, initialTime: number) => {
        setProcessingDishes(
            prev => {
                const existing = prev.find(dish => dish.processingDishName === dishName);
                if (existing) {
                    return prev.map(dish =>
                        dish.processingDishName === dishName
                        ? { ...dish, processingTime: initialTime, isProcessingStart: true, isProcessingEnd: false }
                        : dish
                    );
                }
                return [
                    ...prev,
                    {
                        processingDishName: dishName,
                        processingTime: initialTime,
                        isProcessingStart: true,
                        isProcessingEnd: false,
                        dishReady: false,
                    }
                ];
            }
        );
    }, []);

    const stopProcessing = useCallback((dishName: string) => {
        setProcessingDishes(prev =>
            prev.map(dish =>
                dish.processingDishName === dishName
                ? { ...dish, isProcessingStart: false }
                : dish
            )
        );
    }, []);

    const completeProcessing = useCallback((dishName: string) => {
        setProcessingDishes(prev =>
            prev.map(dish =>
                dish.processingDishName === dishName
                ? { ...dish, isProcessingStart: false, isProcessingEnd: true, dishReady: true }
                : dish
            )
        )
    }, []);

    const updateProcessingTime = useCallback((dishName: string, newTime: number) => {
        setProcessingDishes(prev =>
            prev.map(dish =>
                dish.processingDishName === dishName
                ? { ...dish, processingTime: newTime }
                : dish
            )
        )
    }, []);

    const getProcessingDish = useCallback((dishName: string) => {
        return processingDishes.find(dish => dish.processingDishName === dishName);
    }, [processingDishes]);

    return (
        <ProcessContext.Provider value={{
            processingDishes, setProcessingDishes,
            startProcessing, stopProcessing,
            completeProcessing, updateProcessingTime,
            getProcessingDish
        }}>
            {children}
        </ProcessContext.Provider>
    );
}


export const useProcessContext = () => useContext(ProcessContext);
