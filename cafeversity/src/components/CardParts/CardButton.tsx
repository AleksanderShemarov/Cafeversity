import { CSSProperties, MouseEvent } from "react";


const CardButton = ({ btnName, btnId, clicker, hovering, leaving, style }: {
    btnName: React.ReactNode,
    btnId: number|string,
    clicker: (id: number|string) => void,
    hovering?: (e: MouseEvent<HTMLButtonElement>) => void,
    leaving?: (e: MouseEvent<HTMLButtonElement>) => void,
    style?: CSSProperties
}) => {
    return (
        <button style={{
            border: "none",
            backgroundColor: "whitesmoke",
            borderRadius: "25%", overflow: "hidden",
            height: "3.5rem", width: "3.5rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            ...style
        }}
            onClick={(e) => {
                e.stopPropagation();
                clicker(btnId)
            }}
            onMouseEnter={hovering}
            onMouseLeave={leaving}
        >
            {btnName}
        </button>
    )
}

export default CardButton;
