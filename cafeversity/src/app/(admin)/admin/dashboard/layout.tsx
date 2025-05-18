export default function DashboardLayout({
    popularDishes,
    dishesTypes,
    commonIncome
}: Readonly<{
    popularDishes: React.ReactNode,
    dishesTypes: React.ReactNode,
    commonIncome: React.ReactNode
}>) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", height: "85vh", gap: "1rem" }}>
            <div style={{ gridColumn: 1, gridRow: 1, border: "2px solid black", borderRadius: "5%/10%" }}>
                {popularDishes}
            </div>
            <div style={{ gridColumn: 1, gridRow: 2, border: "2px solid black", borderRadius: "5%/10%" }}>
                {dishesTypes}
            </div>
            <div style={{ gridColumn: 2, gridRow: "1/3", border: "2px solid black", borderRadius: "10%/5%" }}>
                {commonIncome}
            </div>
        </div>
    );
}
