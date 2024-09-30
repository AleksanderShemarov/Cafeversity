"use client";

import coloursSetStyle from "@/components/ColoursPageSets/ColourSets.module.css";
import { useState } from "react";


interface ColourSetsInterface {
    name: string,
}

const divStyles: [string, string, string][] = [
    [coloursSetStyle.colourExampleWhite, coloursSetStyle.whiteDiv, "Light Theme"],
    [coloursSetStyle.colourExampleDark, coloursSetStyle.lightdarkDiv, "Dark Theme"],
];

const ColourSets = ({ name }: ColourSetsInterface) => {

    const [themeClicked, setThemeClicked] = useState<boolean[]>([ true, false, ]);

    function switchBetweenColourThemes (key: string) {
        const newBools: boolean[] = Array(2).fill(false);
        const keyNum: number = Number(key[key.length - 1]);
        console.log(keyNum);
        newBools[keyNum] = !themeClicked[keyNum];
        setThemeClicked(newBools);
    }

    return (
        <>
            <p id={coloursSetStyle.describe_name}>{name}</p>
            <div id={coloursSetStyle.colours_examples}>
                {themeClicked.map((theme, index) => (
                    <div key={`theme-${index}`}>
                        <div className={coloursSetStyle.colourExampleBlock}>
                            <div className={`${coloursSetStyle.colourExample} ${divStyles[index][0]}`} key={`ColourTheme${index}`}
                                onClick={() => { switchBetweenColourThemes(`ColourTheme${index}`); }}
                                style={{
                                    outline: theme ? "5px solid lime" : "none",
                                    pointerEvents: theme ? "none" : "auto",
                                }}
                            >
                                <div className={`${coloursSetStyle.firstlineDiv1} ${divStyles[index][1]}`}></div>
                                <div className={`${coloursSetStyle.firstlineDiv2} ${divStyles[index][1]}`}></div>
                                <div className={`${coloursSetStyle.firstlineDiv3} ${divStyles[index][1]}`}></div>
                                <div className={`${coloursSetStyle.firstlineDiv4} ${divStyles[index][1]}`}></div>
                                <div className={`${coloursSetStyle.secondlineDiv} ${divStyles[index][1]}`}></div>
                                <div className={`${coloursSetStyle.thirdlineDiv} ${divStyles[index][1]}`}></div>
                                <div className={`${coloursSetStyle.thirdlineDiv} ${divStyles[index][1]}`}></div>
                            </div>
                            <p className={coloursSetStyle.colourExampleName}>{divStyles[index][2]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ColourSets;