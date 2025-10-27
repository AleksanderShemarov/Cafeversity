import { CSSProperties } from "react";


const CardTitle = ({ title, style, className }: { title: string, style: CSSProperties, className?: string }) => {
    return (
        <div className={className} style={style}>
            {title}
        </div>
    )
}

export default CardTitle;
