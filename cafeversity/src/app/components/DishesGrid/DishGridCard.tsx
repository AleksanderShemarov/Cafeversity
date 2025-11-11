import { CSSProperties } from "react";


interface DishGridCardProps {
    key?: string|number,
    actionStyles: CSSProperties,
    onMouseEnterGridCard?: () => void,
    onMouseLeaveGridCard?: () => void,
    onClickGridCard?: () => void,
    children: React.ReactNode,
}


export default function DishGridCard({
    key,
    actionStyles,
    onMouseEnterGridCard = () => {},
    onMouseLeaveGridCard = () => {},
    onClickGridCard = () => {},
    children
}: DishGridCardProps) {
    return (
        <div key={key} style={{
            display: "flex", flexDirection: "column",
            width: 'fit-content', height: 'fit-content',
            borderRadius: "1.5rem", backgroundColor: "lightgray",
            position: "relative",
            ...actionStyles
        }}
            onMouseEnter={onMouseEnterGridCard}
            onMouseLeave={onMouseLeaveGridCard}
            onClick={onClickGridCard}
        >
            {children}
        </div>
    );
}
