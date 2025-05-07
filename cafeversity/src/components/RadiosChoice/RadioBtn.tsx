import { ChangeEvent } from "react";


interface RadioBtnTypes {
    radioClass: string,
    radioId: string,
    radioName: string,
    radioValue: string,
    isChecked: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}


export default function RadioBtn ({ radioClass, radioId, radioName, radioValue, isChecked, onChange }: RadioBtnTypes) {
    return (
        <input type="radio" className={radioClass}
        id={radioId} name={radioName} value={radioValue} checked={isChecked}
        onChange={onChange} />
    )
}
