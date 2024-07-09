import React from "react";


type FormField = {
    label: string,
    inputType?: string,
    inputName: string,
    styleId: string,
    placeholder: string,
    value: string,
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void,
    style?: React.CSSProperties,
}

export default function TextFormField (
    { label, inputType = "text", inputName, styleId, placeholder, value, onChange, style }: FormField
) {
    return (
        <>
            <label>{label}</label>
                <input
                    type={inputType}
                    name={inputName}
                    id={styleId}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={style}
                    required={inputType === "email" && true}
                />
        </>
    )
}
