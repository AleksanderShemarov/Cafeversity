"use client";

import stylesOfOptions from "@/components/OptionsChoice/CustomSelect.module.css";
import { CSSProperties, useState, useRef, useEffect } from "react";
import Image from "next/image";


interface CustomSelect {
    labelName: string,
    selectorName: string,
    options: [string, string, string][],
    styleDIV?: CSSProperties,
    styleLABEL?: CSSProperties,
    dbOption?: string,
}

export default function CustomSelect(
    {
        labelName,
        selectorName,
        options,
        styleDIV,
        styleLABEL,
        dbOption
    }: CustomSelect
) {

    const [selectedOptionValue, setSelectedOptionValue] = useState<string>(options[0][0]);
    const [selectedOptionImage, setSelectedOptionImage] = useState<string>(options[0][2]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
    console.log(selectedOptionIndex);

    useEffect(() => {
        if (dbOption) {
            for (let i = 0; i < options.length; i++) {
                if (options[i][1].includes(dbOption)) {
                    setSelectedOptionValue(options[i][0]);
                    setSelectedOptionImage(options[i][2]);
                    setSelectedOptionIndex(i);
                    break;
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbOption]);

    const handleOptionClick = (option: [string, string, string], index: number) => {
        setSelectedOptionValue(option[0]);
        setSelectedOptionImage(option[2]);
        setIsOpen(false);

        setSelectedOptionIndex(index);
    }


    // Set the maximum width for the custom select by the longest word in options
    const [maxWidth, setMaxWidth] = useState<number>(0);
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const widths = optionRefs.current.map(optionRef => optionRef?.offsetWidth || 0);
        if (widths.length > 0) setMaxWidth(Math.max(...widths));
        else setMaxWidth(10);
    }, [options]);


    // If the custom select is open and you click in other places on a webpage, it will be closed.
    const selectBoxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        document.body.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.body.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // The custom select checks a webpage space below. If it is enough, the custom select will be dropped down; if not, then it will be dropped up.
    const [selectDropping, setSelectDropping] = useState<string>("down");

    useEffect(() => {
        if (selectBoxRef.current) {
            const rect = selectBoxRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            // console.dir(rect);
            // console.log(window.innerHeight);
            // console.log(spaceAbove, spaceBelow);

            if (spaceBelow < 345 && spaceAbove > spaceBelow) {
                setSelectDropping("up");
            } else {
                setSelectDropping("down");
            }
        }
    }, [isOpen]);


    return (
        <div className={stylesOfOptions.optionsBlock} style={styleDIV}>
            <label htmlFor={selectorName} className={stylesOfOptions.optionsBlockName} style={styleLABEL}>
                {labelName}
            </label>

            <div className={stylesOfOptions.selectorBox} onClick={() => setIsOpen(!isOpen)} ref={selectBoxRef}>
                <div className={stylesOfOptions.selectedOption}
                style={{ width: (maxWidth + 225) }}
                >
                    {/* <img src={selectedOptionImage} alt={selectedOptionImage} width={35} height={35} /> */}
                    <Image src={selectedOptionImage} alt={selectedOptionImage} width={35} height={35}></Image>
                    <p>{selectedOptionValue}</p>
                    &#x2B9F;
                </div>

                {isOpen && (
                <div className={`${stylesOfOptions.optionsList} 
                ${selectDropping === "up" ? stylesOfOptions.optionsList_up : stylesOfOptions.optionsList_down}`}>
                    {options.map((option, index) => (
                        <div key={option[0]}
                            className={stylesOfOptions.option}
                            onClick={() => handleOptionClick(option, index)}
                            ref={el => { optionRefs.current[index] = el; }}
                        >
                            {/* <img src={option[2]} alt={option[2]} width={25} height={25} /> */}
                            <Image src={option[2]} alt={option[2]} width={25} height={25}></Image>
                            <p>{option[0]}</p>
                        </div>
                    ))}
                </div>
                )}

            </div>
        </div>
    )
}
