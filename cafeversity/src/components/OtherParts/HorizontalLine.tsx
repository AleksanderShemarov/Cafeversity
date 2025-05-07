import { CSSProperties } from "react";


const HorizontalLine = ({ cssProps }: { cssProps?: CSSProperties }) => {
    return (
        <hr style={cssProps} />
    )
}


export default HorizontalLine;
