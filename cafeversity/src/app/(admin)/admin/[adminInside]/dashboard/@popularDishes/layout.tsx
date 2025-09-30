import React, { Suspense } from "react";
import LoadingPopularDishes from "./loading";
import { useTranslations } from "next-intl";


export default function PopularDishesLayout({ children }: { children: React.ReactNode }) {
    
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
                    {chartName("chart1")}
                </p>
            </div>
            
            <Suspense fallback={<LoadingPopularDishes />}>
                {children}
            </Suspense>
        </>
    );
}
