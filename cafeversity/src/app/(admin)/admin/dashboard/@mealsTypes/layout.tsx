import React, { Suspense } from "react";
import LoadingMealsTypes from "./loading";
import { useTranslations } from "next-intl";


export default function MealsTypesLayout({ children }: { children: React.ReactNode }) {
    
    const chartName = useTranslations("AdminDashboard.ChartsNames");
    
    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                }}>
                    {chartName("chart2")}
                </p>
            </div>

            <Suspense fallback={<LoadingMealsTypes />}>
                {children}
            </Suspense>
        </>
    );
}
