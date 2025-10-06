import { CSSProperties } from "react";


const CardButtonsZone = ({ style, children }: { style?: CSSProperties, children: React.ReactNode }) => {
    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default CardButtonsZone;
