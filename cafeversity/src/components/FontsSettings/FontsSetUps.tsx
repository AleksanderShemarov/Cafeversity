import ReactSelect, { CSSObjectWithLabel } from "react-select";
import Select from "react-select";
import FontsSetUpStyle from "@/components/FontsSettings/FontsSetUps.module.css";    


const FontsFamilies: {label: string, value: string}[] = [
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Helvetica", value: "Georgia, serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
    { label: "Calibri", value: "Calibri, sans-serif" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
    { label: "Consolas", value: "Consolas, monospace" },
];

const FontSizes: { label: string, value: string }[] = [
    { label: "8px", value: "8px" }, { label: "10px", value: "10px" }, { label: "12px", value: "12px" },
    { label: "14px", value: "14px" }, { label: "16px", value: "16px" }, { label: "18px", value: "18px" },
    { label: "20px", value: "20px" }, { label: "22px", value: "22px" }, { label: "26px", value: "26px" },
    { label: "28px", value: "28px" }, { label: "36px", value: "36px" }, { label: "40px", value: "40px" },
    { label: "48px", value: "48px" }, { label: "52px", value: "52px" }, { label: "56px", value: "56px" },
];

const FontWeights: { label: string, value: string }[] = [
    { label: "Bold", value: "bold" },
    { label: "Normal", value: "normal" },
    { label: "Italic", value: "italuic" },
];


type FontsTypes = {
    fontFamily?: string,
    fontSize?: string,
    fontWeight?: string,
}


export default function FontsFamilySizeWeight({ fontFamily, fontSize, fontWeight }: FontsTypes) {

    let startFontFamily = { label: "Consolas", value: "Consolas, monospace" };
    let startFontSize = { label: "20px", value: "20px" };
    let startFontWeight = { label: "Normal", value: "normal" };

    if (fontFamily) {
        for (let i = 0; i < FontsFamilies.length; i++) {
            if (fontFamily === FontsFamilies[i].label) {
                startFontFamily = FontsFamilies[i];
                break;
            }
        }
    }
    if (fontSize) {
        for (let j = 0; j < FontSizes.length; j++) {
            if (fontSize === FontSizes[j].label) {
                startFontSize = FontSizes[j];
                break;
            }
        }
    }
    if (fontWeight) {
        for (let y = 0; y < FontWeights.length; y++) {
            if (fontWeight === FontWeights[y].label) {
                startFontWeight = FontWeights[y];
                break;
            }
        }
    }


    const familySelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "15em",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            minWidth: "15em",
        }),
    }

    const sizeSelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "5em",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            minWidth: "5em",
        }),
    }

    const weightSelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            minWidth: "7.5em",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            minWidth: "7.5em",
        }),
    }

    return (
        <>
            <div className={FontsSetUpStyle.fontsSetUpBlocks}>
                <p id={FontsSetUpStyle.describe_name}>Choose a Font Family</p>
                <Select options={FontsFamilies}
                    instanceId="custom-select"
                    menuPlacement="auto"
                    styles={familySelectOptionWidth}
                    formatOptionLabel={FontFamily => (
                        <div style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap",
                        }}>
                            <p style={{ fontFamily: FontFamily.value, paddingTop: 0, marginRight: "5px" }}>A</p>
                            <p style={{ paddingTop: 0, marginLeft: "5px" }}>{FontFamily.label}</p>
                        </div>
                    )}
                    defaultValue={startFontFamily}
                />
            </div>
            <hr />
            <div className={FontsSetUpStyle.fontsSetUpBlocks}>
                <p id={FontsSetUpStyle.describe_name}>Choose a Font Size</p>
                <ReactSelect options={FontSizes}
                    instanceId="custom-select"
                    menuPlacement="auto"
                    styles={sizeSelectOptionWidth}
                    defaultValue={startFontSize}
                />
            </div>
            <hr />
            <div className={FontsSetUpStyle.fontsSetUpBlocks}>
                <p id={FontsSetUpStyle.describe_name}>Choose a Font Weight</p>
                <ReactSelect options={FontWeights}
                    instanceId="custom-select"
                    menuPlacement="auto"
                    styles={weightSelectOptionWidth}
                    defaultValue={startFontWeight}
                />
            </div>
        </>
    )
}
