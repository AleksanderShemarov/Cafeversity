"use client";

import tasteCheckboxStyle from "@/components/TastesSettings/MildSpicy/TasteCheckboxes.module.css";
import { useState } from "react";


const checkboxesAttrs: { id: number|string, attr: string[] }[] = [
    { id: "spicyCheckbox", attr: [ "Do you want to eat spicy dishes?", "check1", "tastes" ], },
    { id: "vegetarianCheckbox", attr: [ "Do you prefer to eat vegetarian dishes?", "check2", "tastes" ], },
    { id: "veganCheckbox", attr: [ "Are you vegan?", "check3", "tastes" ], },
];

type TasteCheckboxesProps = {
    questions: string[],
    props?: boolean[],
}

/* spicy=${user.isSpicy}&veget=${user.isVegetarian}
    &vegan=${user.isVegan}&calory=${user.caloriesRange}
    &lang=${user.language}&faceC=${user.interfaceColor}
    &choice=${user.choiceColor}&fontF=${user.fonFamily}
    &fontS=${user.fontSize}&fontW=${user.fontWeight}`, */

const TastesCheckboxes = ({ questions, props }: TasteCheckboxesProps) => {

    return (
        <>
            {
                checkboxesAttrs.map((checkboxAttrs, index) => (
                    <ParagraphFor key={index} sentence={`${questions[index]}`}>
                        <Checkbox key={checkboxAttrs.id} checkboxId={checkboxAttrs.attr[1]}
                        checkboxName={checkboxAttrs.attr[2]} choisen={props && props[index]}/>
                    </ParagraphFor>
                ))
            }
        </>
    )
}


interface ParagraphForTypes {
    sentence: string,
    children: React.ReactNode,
}

const ParagraphFor = ({ sentence, children }: ParagraphForTypes) => {
    return (
        <div className={tasteCheckboxStyle.checkboxLine}>
            <p className={tasteCheckboxStyle.questionPart}>
                {sentence}
            </p>
            {children}
        </div>
    )
}


interface CheckboxParams {
    checkboxId: string,
    checkboxName?: string,
    choisen?: boolean,
}

const Checkbox = ({ checkboxId, checkboxName = "", choisen = false }: CheckboxParams) => {

    const [isChecked, setIsChecked] = useState<boolean>(choisen);

    return (
        <>
            <label className={tasteCheckboxStyle.box} htmlFor={checkboxId}>
                <input type="checkbox" id={checkboxId} name={checkboxName}
                checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <div className={tasteCheckboxStyle.runner}></div>
            </label>
        </>
    )
}


export default TastesCheckboxes;
export { ParagraphFor, Checkbox };


// {/* This code is from "https://getcssscan.com/css-checkboxes-examples" made by #22 Matt Smith */}
// <div className={tasteCheckboxStyle.checkbox_wrapper_22}>
// <label className={tasteCheckboxStyle.switch} htmlFor="checkbox">
//     <input type="checkbox" id="checkbox" />
//     <div className={`${tasteCheckboxStyle.slider} ${tasteCheckboxStyle.round}`}></div>
// </label>
// </div>