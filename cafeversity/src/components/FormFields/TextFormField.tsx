interface TextField {
    fieldName: string,
    fieldValue: string,
    fieldPlaceholder: string,
    inputStyles: string,
    labelStyles: string,
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void,
}

export default function TextFormField({ fieldName, fieldValue, fieldPlaceholder, inputStyles, labelStyles, onChange }: TextField) {
    return (
        <div style={{ position: "relative" }}>
            <input type="text"
                name={fieldName}
                value={fieldValue}
                placeholder={fieldPlaceholder}
                className={inputStyles}
                onChange={onChange}
            />
            <label htmlFor={fieldName} className={labelStyles}>{fieldName}</label>
        </div>
    )
}
