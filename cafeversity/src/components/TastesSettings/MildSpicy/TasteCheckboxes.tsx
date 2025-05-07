import tasteCheckboxStyle from "@/components/TastesSettings/MildSpicy/TasteCheckboxes.module.css";
import Paragraph from "@/components/PageBlocks/Paragraphs/Paragraph";


const checkboxesAttrs: { id: number|string, attr: string[] }[] = [
    { id: "spicyCheckbox", attr: [ "check1", "tastes" ] },
    { id: "vegetarianCheckbox", attr: [ "check2", "tastes" ] },
    { id: "veganCheckbox", attr: [ "check3", "tastes" ] },
];


type TasteCheckboxesProps = {
    questions: string[],
    props: boolean[],
    funcs: ((
        check: boolean
    ) => void)[]
}


const TastesCheckboxes = ({ questions, props, funcs }: TasteCheckboxesProps) => {

    return (
        <>
            {
                checkboxesAttrs.map((checkboxAttrs, index) => (
                    <Paragraph key={index} question={`${questions[index]}`} paragraphCSS={{ paddingBottom: "10px" }}>
                        <Checkbox key={checkboxAttrs.id}
                            checkboxId={checkboxAttrs.attr[0]}
                            checkboxName={checkboxAttrs.attr[1]}
                            choisen={props && props[index]}
                            onChecked={funcs[index]}
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
    onChecked: (
        check: boolean
    ) => void
}

const Checkbox = ({ checkboxId, checkboxName = "", choisen = false, onChecked }: CheckboxParams) => {

    return (
        <>
            <label className={tasteCheckboxStyle.box} htmlFor={checkboxId}>
                <input type="checkbox" id={checkboxId}
                    name={checkboxName}
                    checked={choisen}
                    onChange={() => onChecked(!choisen)}
                />
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