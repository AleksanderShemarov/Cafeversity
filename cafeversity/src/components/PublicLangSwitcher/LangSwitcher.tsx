"use client";

import { usePathname, useRouter } from "next/navigation";
import ReactSelect, { CSSObjectWithLabel } from "react-select";
import { CSSProperties } from "react";


const LangSwitcher = ({ color = "whitesmoke", fontSize = "1.8rem" }: CSSProperties) => {

    const pathname = usePathname();
    const router = useRouter();

    const langLinks2 = [
        { label: "BY", value: "by" },
        { label: "CZ", value: "cz" },
        { label: "EN", value: "en" },
        { label: "PL", value: "pl" },
        { label: "RU", value: "ru" },
        { label: "TR", value: "tr" },
        { label: "UA", value: "ua" },
    ];//!!!

    const changeLanguage = (locale: string) => {
        console.log("changeLanguage is called! locale -->", locale);
        const segments = pathname.split("/");
        segments[1] = locale;
        router.push(segments.join("/"));
    }

    const languageSelectOption = {
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            backgroundColor: "whitesmoke",
            borderRadius: "0.25rem",
            maxHeight: "15rem",
            overflow: "hidden",
            zIndex: 1000,
        }),
        menuList: (base: CSSObjectWithLabel) => ({
            ...base,
            maxHeight: "15rem",
            overflow: "auto"
        }),
        control: (base: CSSObjectWithLabel) => ({
            ...base,
            width: "auto",
            minWidth: "8.5rem",
            fontSize: fontSize,
            backgroundColor: "none",
            color: "none",
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: color
        }),
        dropdownIndicator: (base: CSSObjectWithLabel) => ({
            ...base,
            color: color,
            '&:hover': {
                color: "gold",
            },
        }),
        option: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
            ...base,
            backgroundColor: state.isFocused ? "lightgray" : "whitesmoke",
            filter: "none",
            color: state.isFocused ? "whitesmoke" : "orange"
        })
    }

    return (
        <div style={{
            display: "inline-flex", alignItems: "center", fontSize: "1.8rem", fontWeight: "600", textAlign: "center"
        }}>
            <ReactSelect options={langLinks2.filter((link) => link.value !== pathname.split("/")[1])}
                defaultValue={langLinks2.filter((link) => link.value === pathname.split("/")[1])}
                instanceId="langLink" menuPlacement="auto"
                onChange={selectedOption => changeLanguage(selectedOption?.value as string)}
                isSearchable={false}
                styles={languageSelectOption}
            />
        </div>
    )
}

export default LangSwitcher;
