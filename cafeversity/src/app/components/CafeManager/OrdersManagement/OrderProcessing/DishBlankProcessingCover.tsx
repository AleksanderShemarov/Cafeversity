"use client";

import { useProcessContext } from "./ProcessContext";
import { useEffect } from "react";


export default function DishBlankProcessingCover({ dishName, dishReady, onProcessingComplete, children }: { dishName: string, dishReady: boolean, onProcessingComplete?: () => void, children: React.ReactNode }) {
    
    const { updateProcessingTime, completeProcessing, getProcessingDish } = useProcessContext();

    const currentDish = getProcessingDish(dishName);


    useEffect(() => {
        if (dishReady && currentDish && !currentDish.dishReady) {
            completeProcessing(dishName);
        }
    }, [dishReady, currentDish, completeProcessing, dishName]);


    useEffect(() => {
        if (!currentDish?.isProcessingStart) return;

        const processTimeId = setInterval(() => {
            const newTime = currentDish.processingTime - 1;

            if (newTime <= 0) {
                clearInterval(processTimeId);
                completeProcessing(dishName);
                onProcessingComplete?.();
            } else {
                updateProcessingTime(dishName, newTime);
            }
        }, 1000);

        return () => clearInterval(processTimeId);
    }, [
        currentDish?.isProcessingStart, currentDish?.processingTime,
        dishName, updateProcessingTime,
        completeProcessing, onProcessingComplete
    ]);

    const minutes = Math.floor((currentDish?.processingTime || 0) / 60);
    const seconds = Math.floor((currentDish?.processingTime || 0) % 60);
    
    const getStyle = () => {
        if (dishReady || currentDish?.dishReady) {
            return "w-[98%] mx-auto rounded-[0.75rem] relative";
        }

        if (!currentDish?.isProcessingStart) {
            return "w-[98%] mx-auto";
        }

        if (currentDish.processingDishName === dishName) {
            return "w-[98%] mx-auto z-20 bg-orange-200/80 rounded-[0.75rem] pointer-events-none relative";
        }

        return "w-[98%] mx-auto z-20 bg-[lightgray]/50 rounded-[0.75rem] pointer-events-none";
    }

    return (
        <div className={getStyle()}>
            {
                currentDish?.isProcessingStart && currentDish?.processingDishName === dishName
                ?
                <p className="
                    w-[100%] h-[100%] absolute m-0 p-0
                    left-1/2 top-0 -translate-x-[50%]
                    flex items-center justify-center
                    bg-[lightgray]/25 backdrop-blur-[2px] rounded-[0.75rem]
                    text-[3.5rem] text-[#a2a2a2]
                    font-[Consolas_monospace] font-extrabold
                ">
                    {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
                </p>
                :
                null
            }
            {children}
        </div>
    );
}
