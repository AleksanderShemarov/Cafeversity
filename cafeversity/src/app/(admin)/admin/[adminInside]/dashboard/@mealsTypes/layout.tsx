import React, { Suspense } from "react";
import LoadingMealsTypes from "./loading";


export default function MealsTypesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                }}>
                    MealsTypes Component
                </p>
            </div>

            <Suspense fallback={<LoadingMealsTypes />}>
                {children}
            </Suspense>
        </>
    );
}
