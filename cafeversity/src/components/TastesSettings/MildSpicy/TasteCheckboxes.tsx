import tasteCheckboxStyle from "@/components/TastesSettings/MildSpicy/TasteCheckboxes.module.css";


const TastesCheckboxes = () => {

    const checkboxesAttrs: { id: number|string, attr: string[] }[] = [
        { id: "spicyCheckbox", attr: [ "Do you want to eat spicy dishes?", "check1" ], },
        { id: "vegetarianCheckbox", attr: [ "Do you prefer to eat vegetarian dishes?", "check2" ], },
        { id: "veganCheckbox", attr: [ "Are you vegan?", "check3" ], },
    ];

    return (
        <>
            {
                checkboxesAttrs.map((checkboxAttrs, index) => (
                    <ParagraphFor key={index} sentence={checkboxAttrs.attr[0]}>
                        <Checkbox key={checkboxAttrs.id} checkboxId={checkboxAttrs.attr[1]} />
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
}

const Checkbox = ({ checkboxId, checkboxName = "" }: CheckboxParams) => {
    return (
        <>
            <label className={tasteCheckboxStyle.box} htmlFor={checkboxId}>
                <input type="checkbox" id={checkboxId} name={checkboxName} />
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