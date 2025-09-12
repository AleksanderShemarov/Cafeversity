"use client";

import { UserDataTypes } from "../(userPage)/authorized/[authorizedUser]/page";
import UserAndOrder from "./UserAndOrder";
import SortableAreaComponent from "@/components/DropArea/SortableAreaComponent";
import { useState } from "react";


interface AuthorizedUserClient {
    userData: UserDataTypes
}

export type SelectedDish = {
    dishID: number,
    food_name: string,
    imagePath: string,
    food_portion: number,
    cost: number
}

export default function AuthorizedUserClient({ userData }: AuthorizedUserClient) {
    
    const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);

    const toggleDishSelection = (dishId: number, dishData: Omit<SelectedDish, 'dishID'>) => {
        setSelectedDishes(prev => {
                const existingDish = prev.find(dish => dish.dishID === dishId);
                
                if (existingDish) {
                    return prev.filter(dish => dish.dishID !== dishId);
                } else {
                    return [...prev, { dishID: dishId, ...dishData }];
                }
                // prev.includes(dishId)
                // ? prev.filter(id => id !== dishId)
                // : [...prev, dishId]
            }
        );
    }

    const removeDish = (dishId: number) => {
        setSelectedDishes(prev => prev.filter(dish => dish.dishID !== dishId));
    }

    const selectedDishIds = selectedDishes.map(dish => dish.dishID);
    
    return (
    <>
        <UserAndOrder imagePath={userData.userPhoto}
            name={userData.firstName}
            surname={userData.lastName}
            nickname={userData.nickName}
            email={userData.email}
            selectedDishes={selectedDishes}
            onRemoveDish={removeDish}
        />

        <SortableAreaComponent
            favouriteDishes={userData.favouriteDish}
            selectedDishIds={selectedDishIds}
            onDishSelection={toggleDishSelection}
        />
    </>
    );
}