"use client";

import { SelectedDish } from "@/app/components/AuthorizedUserClient";
import dynamic from "next/dynamic";
const SortableArea = dynamic(() => import("./SortableArea"), { ssr: false });


export type UserFavouriteDishes = {
    dishID: number, dishes: {
        food_name: string,
        imagePath: string,
        food_portion: number,
        cost: number,
        checkedDish: null,
    }
}

export interface SortableAreaComponentProps {
    favouriteDishes: UserFavouriteDishes[],
    otherDishes: UserFavouriteDishes[],
    selectedDishIds: number[],
    onDishSelection: (dishId: number, dishData: Omit<SelectedDish, 'dishID'>) => void
}

export default function SortableAreaComponent({ favouriteDishes, otherDishes, selectedDishIds, onDishSelection }: SortableAreaComponentProps) {
    return (
        <>
            {/* {favouriteDishes.map((favouriteDish, index) =>
                <div key={index}>
                    <p>Dish ID: {favouriteDish.dishID}</p>
                    <p>Dish Name: {favouriteDish.dishes.food_name}</p>
                    <p>Dish Imagepath: {favouriteDish.dishes.imagePath}</p>
                </div>
            )} */}
            <SortableArea favouriteDishes={favouriteDishes}
                otherDishes={otherDishes}
                selectedDishIds={selectedDishIds}
                onDishSelection={onDishSelection}
            />
        </>
    );
}
