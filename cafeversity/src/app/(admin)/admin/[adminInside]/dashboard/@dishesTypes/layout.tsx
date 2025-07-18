import React, { Suspense } from "react";
import LoadingDishesTypes from "./loading";


export default function DishesTypesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                }}>
                    DishesTypes Component
                </p>
            </div>

            <Suspense fallback={<LoadingDishesTypes />}>
                {children}
            </Suspense>
        </>
    );
}
