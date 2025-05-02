"use client";

import tasteCheckboxStyle from "@/components/TastesSettings/MildSpicy/TasteCheckboxes.module.css";
import { useState, startTransition } from "react";
import Paragraph from "@/components/PageBlocks/Paragraphs/Paragraph";
import { updateTastePreferences } from "@/app/actions/settings";


const checkboxesAttrs: { id: number|string, attr: string[], field: 'spicy'|'vegetarian'|'vegan' }[] = [
    {
        id: "spicyCheckbox",
        attr: [ "Do you want to eat spicy dishes?", "check1", "tastes" ],
        field: "spicy" as const,
    },
    {
        id: "vegetarianCheckbox",
        attr: [ "Do you prefer to eat vegetarian dishes?", "check2", "tastes" ],
        field: "vegetarian" as const,
    },
    {
        id: "veganCheckbox",
        attr: [ "Are you vegan?", "check3", "tastes" ],
        field: "vegan" as const,
    },
];

type TasteCheckboxesProps = {
    questions: string[],
    props?: boolean[],
    userId: number,
}

/* spicy=${user.isSpicy}&veget=${user.isVegetarian}
    &vegan=${user.isVegan}&calory=${user.caloriesRange}
    &lang=${user.language}&faceC=${user.interfaceColor}
    &choice=${user.choiceColor}&fontF=${user.fonFamily}
    &fontS=${user.fontSize}&fontW=${user.fontWeight}`, */

const TastesCheckboxes = ({ questions, props, userId }: TasteCheckboxesProps) => {

    return (
        <>
            {
                checkboxesAttrs.map((checkboxAttrs, index) => (
                    <Paragraph key={index} question={`${questions[index]}`} paragraphCSS={{ paddingBottom: "10px" }}>
                        <Checkbox key={checkboxAttrs.id}
                            checkboxId={checkboxAttrs.attr[1]}
                            checkboxName={checkboxAttrs.attr[2]}
                            choisen={props && props[index]}
                            userId={userId}
                            fieldName={checkboxAttrs.field}
                        />
                    </Paragraph>
                ))
            }
        </>
    )
}


interface CheckboxParams {
    checkboxId: string,
    checkboxName?: string,
    choisen?: boolean,
    userId: number,
    fieldName: 'spicy'|'vegetarian'|'vegan',
}

const Checkbox = ({ checkboxId, checkboxName = "", choisen = false, userId, fieldName }: CheckboxParams) => {

    const [isChecked, setIsChecked] = useState<boolean>(choisen);

    const handleChange = async () => {
        const newValue = !isChecked;

        setIsChecked(newValue);

        startTransition(() => {
            updateTastePreferences(userId, { [fieldName]: newValue })
                .then(result => {
                    if(!result.success) {
                        setIsChecked(prev => !prev);
                    }
                    else console.log("Checkbox is changed.", result.success);
                });
        });
    }

    return (
        <>
            <label className={tasteCheckboxStyle.box} htmlFor={checkboxId}>
                <input type="checkbox" id={checkboxId} name={checkboxName}
                checked={isChecked} onChange={handleChange} />
                <div className={tasteCheckboxStyle.runner}></div>
            </label>
        </>
    )
}


export default TastesCheckboxes;
export { Checkbox };


// {/* This code is from "https://getcssscan.com/css-checkboxes-examples" made by #22 Matt Smith */}
// <div className={tasteCheckboxStyle.checkbox_wrapper_22}>
// <label className={tasteCheckboxStyle.switch} htmlFor="checkbox">
//     <input type="checkbox" id="checkbox" />
//     <div className={`${tasteCheckboxStyle.slider} ${tasteCheckboxStyle.round}`}></div>
// </label>
// </div>