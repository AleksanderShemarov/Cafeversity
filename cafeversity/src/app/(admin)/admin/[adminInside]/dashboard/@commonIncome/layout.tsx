import React, { Suspense } from "react";
import LoadingCommonIncome from "./loading";


export default function CommonIncomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    fontPalette: "light",
                }}>
                    Прыбытак усіх кафэ з агульным прыбыткам
                </p>
            </div>

            <Suspense fallback={<LoadingCommonIncome />}>
                {children}
            </Suspense>
        </>
    );
}
