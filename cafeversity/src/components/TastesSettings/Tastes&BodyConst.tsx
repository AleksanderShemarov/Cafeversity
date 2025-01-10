import tastyNbodyStyles from "@/components/TastesSettings/Taste&BodyConst.module.css";
import { ReactNode } from "react";


interface TastyNBody {
    id: string,
    name: string,
    children: ReactNode,
}

const TastesNBodyConstition = ({ id, name, children }: TastyNBody) => {
    return (
        <div id={id} className={tastyNbodyStyles.tastyNbodyBlock}>
            <p id={tastyNbodyStyles.tastyNbodyBlockName}>{name}</p>
            {children}
        </div>
    )
}

export default TastesNBodyConstition;