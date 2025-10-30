import ReactSelect, { CSSObjectWithLabel } from "react-select";
import Select from "react-select";
import Paragraph from "../PageBlocks/Paragraphs/Paragraph";
import HorizontalLine from "../OtherParts/HorizontalLine";
import { parseFontVolume } from "@/hooks/fontVolume";


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
    familyChange: (
        fontFamily: string
    ) => void,

    fontset2: string,
    fontSize: string,
    sizeChange: (
        fontSize: string
    ) => void,

    fontset3: string,
    fontVolume: string,
    volumeChange: (
        fontVolume: string
    ) => void
}


export default function FontsFamilySizeWeight({
    fontset1, fontFamily, familyChange, fontset2, fontSize, sizeChange, fontset3, fontVolume, volumeChange
}: FontsTypes) {

    const currentFontFamily = FontsFamilies.find(font => font.value === fontFamily);
    const currentFontSize = FontSizes.find(font => font.value === fontSize);
    
    const fontVolumeObject = parseFontVolume(fontVolume);
    const key = fontVolumeObject.fontWeight === "bold" ? "bold" : fontVolumeObject.fontStyle === "italic" ? "italic" : "normal";
    const currentFontWeight = FontVolumes.find(font => font.value === key);

    const familySelectOptionWidth = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "max-content",
            // minWidth: "15em", // 1em = 16px
            minWidth: "24rem", // 1rem = 10px in global.css file
            fontSize: "1.8rem",
            height: "3rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            height: "6rem",
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
            fontSize: "1.8rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            // minWidth: "5em",
            minWidth: "8rem",
            fontSize: "1.8rem",
            height: "5rem",
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
            fontSize: "1.8rem",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            // minWidth: "7.5em",
            minWidth: "12rem",
            fontSize: "1.8rem",
            height: "5rem",
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
                    defaultValue={currentFontFamily}
                    onChange={selectedOption => {
                            familyChange(selectedOption?.value as string);
                        }
                    }
                    isSearchable={false}
                />
            </Paragraph>
            <HorizontalLine />
            <Paragraph question={fontset2} paragraphCSS={{ paddingBottom: "10px" }}>
                <ReactSelect options={FontSizes}
                    instanceId="custom-select"
                    menuPlacement="auto"
                    styles={sizeSelectOptionWidth}
                    defaultValue={currentFontSize}
                    onChange={selectedOption => {
                            sizeChange(selectedOption?.value as string);
                        }
                    }
                />
            </Paragraph>
            <HorizontalLine />
            <Paragraph question={fontset3} paragraphCSS={{ paddingBottom: "10px" }}>
                <ReactSelect options={FontVolumes}
                    instanceId="custom-select"
                    menuPlacement="auto"
                    styles={weightSelectOptionWidth}
                    defaultValue={currentFontWeight}
                    onChange={selectedOption => {
                        if (selectedOption?.value === "bold") {
                            volumeChange(JSON.stringify({ fontWeight: selectedOption?.value, fontStyle: "normal" }));
                        } else if (selectedOption?.value === "italic") {
                            volumeChange(JSON.stringify({ fontWeight: "normal", fontStyle: selectedOption?.value }));
                        } else {
                            volumeChange(JSON.stringify({ fontWeight: "normal", fontStyle: "normal" }));
                        }
                    }}
                />
            </Paragraph>
        </>
    )
}
