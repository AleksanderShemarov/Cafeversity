import exteriorStyle from "@/components/PageAppearanceSets/PageExterior.module.css";
import { ReactNode } from "react";


interface PageExteriorInterface {
    id: string,
    name: string,
    children: ReactNode,
}

export default function PageExterior({ id, name, children }: PageExteriorInterface) {
    return (
        <div id={id} className={exteriorStyle.appearanceBox}>
            <p id={exteriorStyle.appearanceBoxName}>{name}</p>
            {children}
        </div>
    )
}
