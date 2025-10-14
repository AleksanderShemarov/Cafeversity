import React, { Suspense } from "react";
import CommonIncomeLoading from "./CommonIncomeLoading";
import { useTranslations } from "next-intl";


export default function CommonIncomeLayout({ children }: { children: React.ReactNode }) {
    
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
                    {chartName("chart4")}
                </p>
            </div>

            <Suspense fallback={<CommonIncomeLoading />}>
                {children}
            </Suspense>
        </>
    );
}
