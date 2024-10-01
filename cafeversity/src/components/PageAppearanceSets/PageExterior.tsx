import exteriorStyle from "@/components/PageAppearanceSets/PageExterior.module.css";
import { ReactNode } from "react";


interface PageExteriorInterface {
    id: string,
    children: ReactNode,
}

export default function PageExterior({ id, children }: PageExteriorInterface) {
    return (
        <div id={id} className={exteriorStyle.appearanceBox}>
            {children}
        </div>
    )
}
