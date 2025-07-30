import React, { Suspense } from "react";
import LoadingPopularDishes from "./loading";


export default function PopularDishesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                }}>
                    PopularDishes Component
                </p>
            </div>
            
            <Suspense fallback={<LoadingPopularDishes />}>
                {children}
            </Suspense>
        </>
    );
}
