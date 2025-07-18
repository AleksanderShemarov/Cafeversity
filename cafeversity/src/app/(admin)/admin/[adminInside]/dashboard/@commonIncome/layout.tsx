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
                    CommonIncome Component
                </p>
            </div>

            <Suspense fallback={<LoadingCommonIncome />}>
                {children}
            </Suspense>
        </>
    );
}
