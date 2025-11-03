"use client";

import { OrderXTypes } from "../OrdersPreview/NewOrderPreview";
import DishBlank from "../DishBlanks/DishBlank";
import { useDishContext } from "./ChooseDishContext";
import { useState, startTransition, useEffect } from "react";
import DishBlankProcessingCover from "./DishBlankProcessingCover";
import { useProcessContext } from "./ProcessContext";
import saveDishReadyInDB from "@/app/actions/saveDishReady";
import { toast } from "react-toastify";


export default function DishesInOrder({ orderNumber, orderInfo }: { orderNumber: string, orderInfo: OrderXTypes }) {

    const [choisen, setChoisen] = useState<string>("");
    
    const { setSelectedDish, setSelectedDishTypeId } = useDishContext();
    const { getProcessingDish, setProcessingDishes } = useProcessContext();

    useEffect(() => {
        const preparedDishes = orderInfo.dishes.map(dishInfo => ({ 
            processingDishName: dishInfo.dishes.food_name,
            processingTime: 0,
            isProcessingStart: false,
            isProcessingEnd: dishInfo.dishReady,
            dishReady: dishInfo.dishReady,
        }));
        setProcessingDishes(preparedDishes);
    }, [orderInfo, setProcessingDishes]);
    
    const dishUpdateHandle = (dishName: string) => {
        startTransition(async () => {
            const result = await saveDishReadyInDB(orderNumber, dishName);
            if (result.status) toast.success(result.text, { position: "top-right", style: { fontSize: "1.6rem" } });
            else toast.error(result.text, { position: "top-right", style: { fontSize: "1.6rem" } });
        });
    }

    return (
        <div className="w-[33%] flex flex-col">
            <p className="shrink-0 text-[1.8rem] text-left font-bold m-0 p-0">
                <span>Стравы </span>
                <span className="text-[1.8rem] text-left text-gray-400 font-medium m-0 p-0">
                    ({orderInfo.dishes.length})
                </span>
            </p>
            <div className="flex-1 overflow-y-auto">
                {orderInfo.dishes.map((dish, index) => {
                    const currentDish = getProcessingDish(dish.dishes.food_name);
                    const isReady = dish.dishReady || currentDish?.dishReady;

                    return (
                        <DishBlankProcessingCover key={`dish-in-order-${index}`}
                            dishName={dish.dishes.food_name}
                            dishReady={isReady!}
                            onProcessingComplete={() => dishUpdateHandle(dish.dishes.food_name)}
                        >
                            <DishBlank 
                                image={dish.dishes.imagePath}
                                dishName={dish.dishes.food_name}
                                dishCost={dish.dishes.cost}
                                dishReady={isReady!}
                                onDishBlankClick={() => {
                                    setSelectedDish(dish.dishes.food_name);
                                    setSelectedDishTypeId(dish.dishes.dishTypeId);
                                    setChoisen(`dish-in-order-${index}`);
                                }}
                                optionalStyle={`
                                    w-[100%] z-10
                                    ${choisen === `dish-in-order-${index}` ? "outline-3 outline-[goldenrod]" : "outline-1 outline-[lightgray]"}
                                    ${isReady ? "bg-green-100" : ""}
                                `}
                            />
                        </DishBlankProcessingCover>
                    )
                })}
            </div>
            <div className="
                shrink-0 px-[1rem] py-[0.75rem] mt-auto
                outline-1 outline-[lightgray] rounded-[1.25rem]
            ">
                <p className="
                    text-[1.6rem] text-justify font-normal m-0 p-0
                    text-wrap h-[7.5dvh] overflow-y-auto
                ">
                    <span className="text-[1.8rem] text-left font-bold">Каментар: </span>{orderInfo.comment}.
                </p>
            </div>
        </div>
    );
}
