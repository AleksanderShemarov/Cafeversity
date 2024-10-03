import tastyNbodyStyles from "@/components/TastesSettings/Taste&BodyConst.module.css";
import { ReactNode } from "react";


interface TastyNBody {
    id: string,
    children: ReactNode,
}

const TastesNBodyConstition = ({ id, children }: TastyNBody) => {
    return (
        <div id={id} className={tastyNbodyStyles.tastyNbodyBlock}>
            <p id={tastyNbodyStyles.tastyNbodyBlockName}>Tasties & Body Constitution</p>
            {children}
        </div>
    )
}

export default TastesNBodyConstition;