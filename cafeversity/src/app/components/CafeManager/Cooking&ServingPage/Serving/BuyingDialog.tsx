"use client";

import { useBuyingPreviewContext } from "./BuyingPreviewContext";


export default function BuyingDialog({ children }: { children: React.ReactNode }) {

    const { buyingPreviewRef } = useBuyingPreviewContext();

    return (
        <dialog ref={buyingPreviewRef}
            className="
                h-[90%] w-[90%] m-[auto] px-[4rem] py-[2rem]
                left-0 top-0 z-20 fixed
                bg-white rounded-[1rem]
            "
        >
            {children}
        </dialog>
    );
}
