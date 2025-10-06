import { CSSProperties } from "react";


const CardBlock = ({ height, width, style, children }: {
    height: string|number, width: string|number, style?: CSSProperties, children: React.ReactNode
}) => {
    return (
        <div style={{
            height: height,
            width: width,
            position: "relative",
            borderRadius: "1.5rem",
            overflow: "hidden",
            ...style
        }}>
            {children}
        </div>
    )
}

export default CardBlock;
