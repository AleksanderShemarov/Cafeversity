import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";


interface CategoryCardInterface {
    name: string,
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>,
    isVisible?: boolean,
    children?: React.ReactNode
}

export default function CategoryCard({ name, icon: Icon, isVisible = true, children }: CategoryCardInterface) {
    return (
        <div style={{
            marginTop: "3.5rem", marginBottom: "3.5rem", borderRadius: "3rem",
            padding: "1.2rem 1.5rem", boxShadow: "var(--menu-category-box-shadow)",
            display: isVisible ? "block" : "none"
        }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", gap: "1rem", marginBottom: "2rem" }}>
                <Icon style={{ height: "5rem", width: "5rem" }} />
                <p style={{
                    fontSize: "4rem", padding: 0, margin: 0,
                    height: "4.5rem", fontWeight: 600, cursor: "auto"
                }}>
                    {name}
                </p>
            </div>
            {children}
        </div>
    );
}
