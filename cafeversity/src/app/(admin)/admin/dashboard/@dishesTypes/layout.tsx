import React, { Suspense } from "react";
import LoadingDishesTypes from "./loading";
import { useTranslations } from "next-intl";


export default function DishesTypesLayout({ children }: { children: React.ReactNode }) {
    
    const chartName = useTranslations("AdminDashboard.ChartsNames");
    
    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                    textAlign: "center",
                }}>
                    {chartName("chart3")}
                </p>
            </div>

            <Suspense fallback={<LoadingDishesTypes />}>
                {children}
            </Suspense>
        </>
    );
}
