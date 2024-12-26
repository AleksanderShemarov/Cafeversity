import commonBtnStyle from "@/components/Buttons/Btns.module.css";
import { CSSProperties } from "react";


interface BtnCommonInterface {
    uniqueStyle?: CSSProperties,
    onClick: (
        event: React.MouseEvent<HTMLButtonElement>
    ) => void,
    buttonName: string,
}

export default function AccessBtn({ uniqueStyle, onClick, buttonName = "Button" }: BtnCommonInterface) {
    return (
        <button className={commonBtnStyle.accessBtn}
            style={uniqueStyle}// 
            onClick={onClick}
        >
            <span className={commonBtnStyle.btn_name}>{buttonName}</span>
        </button>
    )
}


export function DenyBtn({ uniqueStyle, onClick, buttonName = "Button" }: BtnCommonInterface) {
    return (
        <button className={commonBtnStyle.denyBtn}
            style={uniqueStyle}
            onClick={onClick}
        >
            <span className={commonBtnStyle.btn_name}>{buttonName}</span>
        </button>
    )
}
