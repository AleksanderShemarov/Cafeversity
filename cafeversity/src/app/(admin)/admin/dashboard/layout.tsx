export default async function DashboardLayout({
    popularDishes,
    dishesTypes,
    mealsTypes,
    commonIncome
}: Readonly<{
    children: React.ReactNode
    popularDishes: React.ReactNode,
    dishesTypes: React.ReactNode,
    mealsTypes: React.ReactNode,
    commonIncome: React.ReactNode
}>) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", height: "85vh", gap: "3rem" }}>
            <div style={{
                gridColumn: "1/3",
                gridRow: 1,
                padding: "1rem",
                borderRadius: "1.5rem",
                backgroundColor: "whitesmoke",
                boxShadow: "0.2rem 0.3rem 0.7rem 0.25rem #5F5F5F"
            }}>
                {popularDishes}
            </div>

            <div style={{
                gridColumn: 3,
                gridRow: 1,
                padding: "1rem",
                borderRadius: "1.5rem",
                backgroundColor: "whitesmoke",
                boxShadow: "0.2rem 0.3rem 0.7rem 0.25rem #5F5F5F"
            }}>
                {dishesTypes}
            </div>

            <div style={{
                gridColumn: 1,
                gridRow: 2,
                padding: "1rem",
                borderRadius: "1.5rem",
                backgroundColor: "whitesmoke",
                boxShadow: "0.2rem 0.3rem 0.7rem 0.25rem #5F5F5F"
            }}>
                {mealsTypes}
            </div>

            <div style={{
                gridColumn: "2/4",
                gridRow: 2,
                padding: "1rem",
                borderRadius: "1.5rem",
                backgroundColor: "whitesmoke",
                boxShadow: "0.2rem 0.3rem 0.7rem 0.25rem #5F5F5F"
            }}>
                {commonIncome}
            </div>
        </div>
    );
}
