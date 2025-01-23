import ReactSelect, { CSSObjectWithLabel } from "react-select";
import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
import Paragraph from "../PageBlocks/Paragraphs/Paragraph";
import HorizontalLine from "../OtherParts/HorizontalLine";


const FontsFamilies: {label: string, value: string}[] = [
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Calibri", value: "Calibri, sans-serif" },
    { label: "Consolas", value: "Consolas, monospace" },
    { label: "Helvetica", value: "Georgia, serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
];

const FontSizes: { label: string, value: string }[] = [
    { label: "8px", value: "8px" }, { label: "10px", value: "10px" }, { label: "12px", value: "12px" },
    { label: "14px", value: "14px" }, { label: "16px", value: "16px" }, { label: "18px", value: "18px" },
];

const FontVolumes: { label: string, value: string }[] = [
    { label: "Bold", value: "bold" },
    { label: "Normal", value: "normal" },
    { label: "Italic", value: "italic" },
];


type FontsTypes = {
    fontset1: string,
    fontFamily: string,
    hookFamily: Dispatch<SetStateAction<string>>,
    fontset2: string,
    fontSize: string,
    hookSize: Dispatch<SetStateAction<string>>,
    // fontWeight?: string,
    fontset3: string,
    fontVolume: { fontWeight: string, fontStyle: string },
    hookVolume: Dispatch<SetStateAction<{ fontWeight: string, fontStyle: string }>>,
}


export default function FontsFamilySizeWeight({
    fontset1, fontFamily, hookFamily, fontset2, fontSize, hookSize, fontset3, fontVolume, hookVolume
}: FontsTypes) {

    let startFontFamily = { label: "Consolas", value: "Consolas, monospace" };
    let startFontSize = { label: "10px", value: "10px" };
    let startFontWeight = { label: "Normal", value: "normal" };

    if (fontFamily) {
        for (let i = 0; i < FontsFamilies.length; i++) {
            if (fontFamily === FontsFamilies[i].value) {
                startFontFamily = FontsFamilies[i];
                break;
            }
        }
    }
    if (fontSize) {
        for (let j = 0; j < FontSizes.length; j++) {
            if (fontSize === FontSizes[j].value) {
                startFontSize = FontSizes[j];
                break;
            }
        }
    }
    if (fontVolume) {
        let volumeType = ""
        if (fontVolume.fontWeight !== "normal" && fontVolume.fontStyle === "normal") volumeType = "bold"
        else if (fontVolume.fontWeight === "normal" && fontVolume.fontStyle !== "normal") volumeType = "italic"
        else volumeType = "normal"
        for (let y = 0; y < FontVolumes.length; y++) {
            if (volumeType === FontVolumes[y].value) {
                startFontWeight = FontVolumes[y];
                break;
            }
        }
    }


    const familySelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            // minWidth: "15em", // 1em = 16px
            minWidth: "24rem", // 1rem = 10px in global.css file
            fontSize: "1.6rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            // minWidth: "15em",
            minWidth: "24rem",
            fontSize: "1.8rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
        dropdownIndicator: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
            '&:hover': {
                color: "gold",
            },
        }),
        option: (base: CSSObjectWithLabel, state: { isFocused: boolean, isSelected: boolean }) => ({
            ...base,
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "darkgrey" : "var(--background-color)",
            color: state.isSelected ? "gold" : state.isFocused ? "gold" : "var(--text-color)",
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
    }

    const sizeSelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            // minWidth: "5em",
            minWidth: "8rem",
            fontSize: "1.6rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            // minWidth: "5em",
            minWidth: "8rem",
            fontSize: "1.8rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
        dropdownIndicator: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
            '&:hover': {
                color: "gold",
            },
        }),
        option: (base: CSSObjectWithLabel, state: { isFocused: boolean, isSelected: boolean }) => ({
            ...base,
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "darkgrey" : "var(--background-color)",
            color: state.isSelected ? "gold" : state.isFocused ? "gold" : "var(--text-color)",
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
    }

    const weightSelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            // minWidth: "7.5em",
            minWidth: "12rem",
            fontSize: "1.6rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            // minWidth: "7.5em",
            minWidth: "12rem",
            fontSize: "1.8rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
        dropdownIndicator: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
            '&:hover': {
                color: "gold",
            },
        }),
        option: (base: CSSObjectWithLabel, state: { isFocused: boolean, isSelected: boolean }) => ({
            ...base,
            backgroundColor: state.isSelected ? "rgb(48, 151, 255)" : state.isFocused ? "darkgrey" : "var(--background-color)",
            color: state.isSelected ? "gold" : state.isFocused ? "gold" : "var(--text-color)",
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: "var(--text-color)",
        }),
    }

    return (
        <>
            <Paragraph question={fontset1} paragraphCSS={{ paddingBottom: "10px" }}>
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
                    onChange={selectedOption => hookFamily(selectedOption?.value as string)}
                    isSearchable={false}
                />
            </Paragraph>
            <HorizontalLine />
            <Paragraph question={fontset2} paragraphCSS={{ paddingBottom: "10px" }}>
                <ReactSelect options={FontSizes}
                    instanceId="custom-select"
                    menuPlacement="auto"
                    styles={sizeSelectOptionWidth}
                    defaultValue={startFontSize}
                    onChange={selectedOption => hookSize(selectedOption?.value as string)}
                />
            </Paragraph>
            <HorizontalLine />
            <Paragraph question={fontset3} paragraphCSS={{ paddingBottom: "10px" }}>
                <ReactSelect options={FontVolumes}
                    instanceId="custom-select"
                    menuPlacement="auto"
                    styles={weightSelectOptionWidth}
                    defaultValue={startFontWeight}
                    onChange={selectedOption => {
                        if (selectedOption?.value === "bold") {
                            hookVolume({ fontWeight: selectedOption?.value, fontStyle: "normal" });
                        } else if (selectedOption?.value === "italic") {
                            hookVolume({ fontWeight: "normal", fontStyle: selectedOption?.value });
                        } else {
                            hookVolume({ fontWeight: "normal", fontStyle: "normal" });
                        }
                    }}
                />
            </Paragraph>
        </>
    )
}
