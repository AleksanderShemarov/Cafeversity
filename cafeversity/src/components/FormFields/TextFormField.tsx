interface TextField {
    fieldName: string,
    fieldValue: string,
    fieldPlaceholder: string,
    inputStyles: string,
    labelStyles: string,
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void,
    disabled?: boolean,
}

export default function TextFormField({ fieldName, fieldValue, fieldPlaceholder, inputStyles, labelStyles, onChange, disabled }: TextField) {
    return (
        <div style={{ position: "relative" }}>
            <input type="text"
                name={fieldName}
                value={fieldValue}
                placeholder={fieldPlaceholder}
                className={inputStyles}
                onChange={onChange}
                disabled={disabled}
            />
            <label htmlFor={fieldName} className={labelStyles}>{fieldName}</label>
        </div>
    )
}
