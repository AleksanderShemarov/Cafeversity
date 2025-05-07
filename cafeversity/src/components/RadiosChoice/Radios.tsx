import radioStyle from "@/components/RadiosChoice/Radios.module.css";
import RadioBtn from "./RadioBtn";


const radioBtns: {id: string, value: string, classLine: string}[] = [
    { id: "LimePointer", value: "lime", classLine: radioStyle.radioLime },
    { id: "GoldPointer", value: "gold", classLine: radioStyle.radioGold },
    { id: "PurplePointer", value: "purple", classLine: radioStyle.radioPurple },
    { id: "SkybluePointer", value: "skyblue", classLine: radioStyle.radioSkyblue },
    { id: "OrangePointer", value: "orange", classLine: radioStyle.radioOrange },
];


type RadiosChoiceTypes = {
    currentColor: string,
    onColorChange: (color: string) => void,
}


export default function RadiosBlock({ currentColor, onColorChange }: RadiosChoiceTypes) {   

    return (
        <form className={radioStyle.radios}>
            {radioBtns.map((option) => 
                <RadioBtn key={option.id}
                    radioClass={`${radioStyle.radio} ${option.classLine}`}
                    radioId={option.id}
                    radioName="color_pointer"
                    radioValue={option.value}
                    isChecked={currentColor === option.value}
                    onChange={() => onColorChange(option.value)}
                />
            )}
        </form>
    )
}
