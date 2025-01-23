import { CSSProperties, ReactNode } from "react";
import paragraphStyles from "./Paragraph.module.css";


interface ParagraphTypes {
    question: string,
    children: ReactNode,
    paragraphBlockCSS?: CSSProperties,
    paragraphCSS?: CSSProperties,
}


const Paragraph = ({ question, children, paragraphBlockCSS, paragraphCSS }: ParagraphTypes) => {
  return (
    <div className={paragraphStyles.paragraphBlock} style={paragraphBlockCSS}>
        <p className={paragraphStyles.paragraph} style={paragraphCSS}>
            {question}
        </p>
        {children}
    </div>
  )
}

export default Paragraph;
