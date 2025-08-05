import { CSSProperties } from "react";


const CardTitle = ({ title, style }: { title: string, style: CSSProperties }) => {
    return (
        <div style={style}>
            {title}
        </div>
    )
}

export default CardTitle;
