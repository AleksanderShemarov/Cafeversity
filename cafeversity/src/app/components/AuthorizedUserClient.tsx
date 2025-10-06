"use client";

import { DishProps, UserDataTypes } from "../(userPage)/authorized/[authorizedUser]/page";
import OrderButton from "./OrderComponent/OrderButton";
import UserAndOrder from "./UserAndOrder";
import SortableAreaComponent from "@/components/DropArea/SortableAreaComponent";
import { useRef, useState } from "react";


interface AuthorizedUserClient {
    userData: UserDataTypes,
    dataOfDishes: DishProps[]
}

export type SelectedDish = {
    dishID: number,
    food_name: string,
    imagePath: string,
    food_portion: number,
    cost: number,
    checkedDish: boolean|null,
}

export default function AuthorizedUserClient({ userData, dataOfDishes }: AuthorizedUserClient) {
    
    const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);

    const toggleDishSelection = (dishId: number, dishData: Omit<SelectedDish, 'dishID'>) => {
        setSelectedDishes(prev => {
                const existingDish = prev.find(dish => dish.dishID === dishId);
                
                if (existingDish) {
                    return prev.filter(dish => dish.dishID !== dishId);
                } else {
                    return [...prev, { dishID: dishId, ...dishData }];
                }
            }
        );
    }

    const removeDish = (dishId: number) => {
        setSelectedDishes(prev => prev.filter(dish => dish.dishID !== dishId));
    }

    const selectedDishIds = selectedDishes.map(dish => dish.dishID);


    const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const orderHandler = () => {
        setIsOrderOpen(!isOrderOpen);

        if (!isOrderOpen) {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    return (
    <>
        <UserAndOrder imagePath={userData.userPhoto}
            name={userData.firstName}
            surname={userData.lastName}
            nickname={userData.nickName}
            email={userData.email}
            selectedDishes={selectedDishes}
            setDishSelection={setSelectedDishes}
            onRemoveDish={removeDish}
            isOrderOpen={isOrderOpen}
        />

        <OrderButton isOrderOpen={isOrderOpen} onClick={orderHandler} />

        <div ref={contentRef}>
            <SortableAreaComponent
                favouriteDishes={userData.favouriteDish}
                otherDishes={dataOfDishes}
                selectedDishIds={selectedDishIds}
                onDishSelection={toggleDishSelection}
            />
        </div>
    </>
    );
}