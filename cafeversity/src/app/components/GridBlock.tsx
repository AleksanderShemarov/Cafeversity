export default function GridBlock({ column, row, children }: { column: number|string, row: number|string, children: React.ReactNode }) {
    return (
        <div style={{
            gridColumn: column,
            gridRow: row,
            padding: "1rem",
            borderRadius: "1.5rem",
            backgroundColor: "var(--admin-dashboard-chart-section-background)",
            boxShadow: "0 0 0.7rem 0.25rem var(--admin-dashboard-chart-section-box-shadow-color)"
        }}>
            {children}
        </div>
    );
}
