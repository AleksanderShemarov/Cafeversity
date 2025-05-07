import pageBlockStyles from "./PageBlockName.module.css";
import { CSSProperties, ReactNode } from "react";


interface PageBlockNameTypes {
    id: string,
    name: string,
    children: ReactNode,
    pageBlockCSS?: CSSProperties,
    pageBlockNameCSS?: CSSProperties,
}


const PageBlockName = ({ id, name, children, pageBlockCSS, pageBlockNameCSS }: PageBlockNameTypes) => {
    return (
        <div id={id} className={pageBlockStyles.pageBlock} style={pageBlockCSS}>
            <p id={pageBlockStyles.pageBlockName} style={pageBlockNameCSS}>{name}</p>
            {children}
        </div>
    )
}

export default PageBlockName;