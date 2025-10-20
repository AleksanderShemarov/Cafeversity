import { CSSProperties } from "react";


export default function GridBlock({ column, row, children, style }: { column: number|string, row: number|string, children: React.ReactNode, style?: CSSProperties }) {
    const baseStyles = {
        gridColumn: column,
        gridRow: row,
        padding: "1rem",
        borderRadius: "1.5rem",
        backgroundColor: "var(--admin-dashboard-chart-section-background)",
        boxShadow: "0 0 0.7rem 0.25rem var(--admin-dashboard-chart-section-box-shadow-color)",
    };
    
    return (
        <div style={style ? { ...baseStyles, ...style } : baseStyles}>
            {children}
        </div>
    );
}
