import { Suspense } from "react";
import LoadingCommonIncome from "./@commonIncome/loading";
import LoadingDishesTypes from "./@dishesTypes/loading";
import LoadingMealsTypes from "./@mealsTypes/loading";
import LoadingPopularDishes from "./@popularDishes/loading";


export default function DashboardLayout({
    popularDishes, dishesTypes, mealsTypes, commonIncome, children
}: Readonly<{
    popularDishes: React.ReactNode,
    dishesTypes: React.ReactNode,
    mealsTypes: React.ReactNode,
    commonIncome: React.ReactNode,
    children: React.ReactNode
}>) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", height: "85vh", gap: "3rem" }}>
            <div style={{
                gridColumn: "1/3",
                gridRow: 1,
                padding: "1rem",
                borderRadius: "1.5rem",
                backgroundColor: "var(--admin-dashboard-chart-section-background)",
                boxShadow: "0 0 0.7rem 0.25rem var(--admin-dashboard-chart-section-box-shadow-color)"
            }}>
                <Suspense fallback={<LoadingPopularDishes />}>
                    {popularDishes}
                </Suspense>
            </div>

            <div style={{
                gridColumn: 3,
                gridRow: 1,
                padding: "1rem",
                borderRadius: "1.5rem",
                backgroundColor: "var(--admin-dashboard-chart-section-background)",
                boxShadow: "0 0 0.7rem 0.25rem var(--admin-dashboard-chart-section-box-shadow-color)"
            }}>
                <Suspense fallback={<LoadingDishesTypes />}>
                    {dishesTypes}
                </Suspense>
            </div>

            <div style={{
                gridColumn: 1,
                gridRow: 2,
                padding: "1rem",
                borderRadius: "1.5rem",
                backgroundColor: "var(--admin-dashboard-chart-section-background)",
                boxShadow: "0 0 0.7rem 0.25rem var(--admin-dashboard-chart-section-box-shadow-color)"
            }}>
                <Suspense fallback={<LoadingMealsTypes />}>
                    {mealsTypes}
                </Suspense>
            </div>

            <div style={{
                gridColumn: "2/4",
                gridRow: 2,
                padding: "1rem",
                borderRadius: "1.5rem",
                backgroundColor: "var(--admin-dashboard-chart-section-background)",
                boxShadow: "0 0 0.7rem 0.25rem var(--admin-dashboard-chart-section-box-shadow-color)"
            }}>
                <Suspense fallback={<LoadingCommonIncome />}>
                    {commonIncome}
                </Suspense>
            </div>

            {children}
        </div>
    );
}
