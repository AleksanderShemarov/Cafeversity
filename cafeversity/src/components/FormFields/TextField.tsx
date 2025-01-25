import { CSSProperties } from "react";
import TextFieldStyles from "./TextField.module.css";


interface TextField {
    fieldName: string,
    fieldValue: string,
    fieldPlaceholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    inputStyles?: CSSProperties,
    labelStyles?: CSSProperties,
}


export default function TextField({
    fieldName, fieldValue, fieldPlaceholder, onChange, disabled, inputStyles, labelStyles
}: TextField) {
    return (
        <div style={{ position: "relative" }}>
            <input type="text"
                name={fieldName}
                value={fieldValue}
                placeholder={fieldPlaceholder}
                className={TextFieldStyles.textInput}
                onChange={onChange}
                disabled={disabled}
                style={inputStyles}
            />
            <label htmlFor={fieldName}
                className={TextFieldStyles.inputLabel}
                style={labelStyles}
            >
                {fieldName}
            </label>
        </div>
    )
}
