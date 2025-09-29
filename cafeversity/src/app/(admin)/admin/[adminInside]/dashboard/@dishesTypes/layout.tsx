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
                    Колькасць страў па катыгорыях
                </p>
            </div>

            <Suspense fallback={<LoadingDishesTypes />}>
                {children}
            </Suspense>
        </>
    );
}
