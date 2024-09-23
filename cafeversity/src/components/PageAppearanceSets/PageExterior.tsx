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
            {/* <p className={exteriorStyle.temporaryPLines}>Language</p> */}
            <p className={exteriorStyle.temporaryPLines}>Colorsets</p>
            <p className={exteriorStyle.temporaryPLines}>Brand Color (?maybe?)</p>
            <p className={exteriorStyle.temporaryPLines}>Text Font CSS (Font Family, Font Size)</p>
        </div>
    )
}
