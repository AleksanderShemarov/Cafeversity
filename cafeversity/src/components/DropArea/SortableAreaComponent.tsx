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
        <SortableArea favouriteDishes={favouriteDishes} />
    );
}
