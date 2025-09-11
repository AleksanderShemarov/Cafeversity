"use client";

import dynamic from "next/dynamic";
const SortableArea = dynamic(() => import("./SortableArea"), { ssr: false });


export type UserFavouriteDishes = {
    dishID: number, dishes: {
        food_name: string,
        imagePath: string
    }
}


export default function SortableAreaComponent({ favouriteDishes }: { favouriteDishes: UserFavouriteDishes[] }) {
    return (
        <>
            {/* {favouriteDishes.map((favouriteDish, index) =>
                <div key={index}>
                    <p>Dish ID: {favouriteDish.dishID}</p>
                    <p>Dish Name: {favouriteDish.dishes.food_name}</p>
                    <p>Dish Imagepath: {favouriteDish.dishes.imagePath}</p>
                </div>
            )} */}
            <SortableArea favouriteDishes={favouriteDishes} />
        </>
    );
}
