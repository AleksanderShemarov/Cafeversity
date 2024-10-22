"use client";
import radioStyle from "@/components/RadiosChoice/Radios.module.css";
import { useState } from "react";


const radioBtns: {id: string, value: string, classLine: string}[] = [
    { id: "LimePointer", value: "Lime", classLine: radioStyle.radioLime },
    { id: "GoldPointer", value: "Gold", classLine: radioStyle.radioGold },
    { id: "PurplePointer", value: "Purple", classLine: radioStyle.radioPurple },
    { id: "SkybluePointer", value: "SkyBlue", classLine: radioStyle.radioSkyblue },
    { id: "OrangePointer", value: "Orange", classLine: radioStyle.radioOrange },
];


export default function RadiosChoice({ choseRadio }: { choseRadio?: string }) {

    let startRadioBtns: boolean[] = [ true, false, false, false, false ];

    if (choseRadio) {
        for (let i = 0; i < radioBtns.length; i++) {
            if (choseRadio === radioBtns[i].value) {
                const newBools: boolean[] = Array(5).fill(false);
                newBools[i] = !startRadioBtns[i];
                startRadioBtns = newBools;
                break;
            }
        }
    }

    const [checkedRadioBtn, setCheckedRadioBtn] = useState<boolean[]>(startRadioBtns);

    function switchingRadioBtns (index: number) {
        const newBools: boolean[] = Array(5).fill(false);
        newBools[index] = !checkedRadioBtn[index];
        setCheckedRadioBtn(newBools);
    }

    return (
        <>
            <div id={radioStyle.radiosBlock}>
                <p id={radioStyle.describe_radios_name}>Choose one of the colours</p>
                <form className={radioStyle.radios}>
                    {radioBtns.map((radioBtn, index) => 
                        <input key={index} type="radio" className={`${radioStyle.radio} ${radioBtn.classLine}`}
                        id={radioBtn.id} name="color_pointer" value={radioBtn.value} checked={checkedRadioBtn[index]}
                        onChange={() => switchingRadioBtns(index)} />
                    )}                    
                </form>
            </div>
        </>
    )
}
