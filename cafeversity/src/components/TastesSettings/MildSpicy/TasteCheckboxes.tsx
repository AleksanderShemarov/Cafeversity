import tasteCheckboxStyle from "@/components/TastesSettings/MildSpicy/TasteCheckboxes.module.css";


const TastesCheckboxes = () => {
    return (
        <>
            <div className={tasteCheckboxStyle.checkboxLine}>
                <p className={tasteCheckboxStyle.questionPart}>
                    Do you want to eat spicy dishes?
                </p>
                <Checkbox checkboxId="check1" />
            </div>

            <div className={tasteCheckboxStyle.checkboxLine}>
                <p className={tasteCheckboxStyle.questionPart}>
                    Do you prefer to eat vegetarian dishes?
                </p>
                <Checkbox checkboxId="check2" />
            </div>

            <div className={tasteCheckboxStyle.checkboxLine}>
                <p className={tasteCheckboxStyle.questionPart}>
                    Are you vegan?
                </p>
                <Checkbox checkboxId="check3" />
            </div>
        </>
    )
}


interface CheckboxParams {
    checkboxId: string,
    checkboxName?: string,
}

const Checkbox = ({ checkboxId, checkboxName = "" }: CheckboxParams) => {
    return (
        <div>
            <label className={tasteCheckboxStyle.box} htmlFor={checkboxId}>
                <input type="checkbox" id={checkboxId} name={checkboxName} />
                <div className={tasteCheckboxStyle.runner}></div>
            </label>
        </div>
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