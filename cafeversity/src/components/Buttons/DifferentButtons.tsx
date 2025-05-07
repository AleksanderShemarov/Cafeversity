import commonBtnStyle from "@/components/Buttons/Btns.module.css";
import { CSSProperties } from "react";


interface BtnCommonInterface {
    disabled?: boolean,
    additionalStyle?: CSSProperties,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    buttonName: string,
}


export default function AccessBtn({ disabled = false, additionalStyle, onClick, buttonName = "Button" }: BtnCommonInterface) {
    return (
        <button className={commonBtnStyle.accessBtn}
            disabled={disabled}
            style={additionalStyle}// 
            onClick={onClick}
        >
            <span className={commonBtnStyle.btn_name}>{buttonName}</span>
        </button>
    )
}


export function DenyBtn({ disabled = false, additionalStyle, onClick, buttonName = "Button" }: BtnCommonInterface) {
    return (
        <button className={commonBtnStyle.denyBtn}
            disabled={disabled}
            style={additionalStyle}
            onClick={onClick}
        >
            <span className={commonBtnStyle.btn_name}>{buttonName}</span>
        </button>
    )
}
