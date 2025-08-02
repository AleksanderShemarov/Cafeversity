"use client";

import dynamic from "next/dynamic";
const SortableArea = dynamic(() => import("./SortableArea"), { ssr: false });


export default function SortableAreaComponent() {
    return (
        <SortableArea />
    );
}
