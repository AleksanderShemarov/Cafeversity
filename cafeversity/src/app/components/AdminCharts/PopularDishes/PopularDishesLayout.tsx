import React, { Suspense } from "react";
import PopularDishesLoading from "./PopularDishesLoading";
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
                    textAlign: "center",
                }}>
                    {chartName("chart1")}
                </p>
            </div>
            
            <Suspense fallback={<PopularDishesLoading />}>
                {children}
            </Suspense>
        </>
    );
}
