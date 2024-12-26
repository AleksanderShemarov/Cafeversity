import coloursSetStyle from "@/components/ColoursPageSets/ColourSets.module.css";
//import { useState } from "react";


const divStyles: [string, string, string][] = [
    [coloursSetStyle.colourExampleWhite, coloursSetStyle.whiteDiv, "Light Theme"],
    [coloursSetStyle.colourExampleDark, coloursSetStyle.lightdarkDiv, "Dark Theme"],
];

type ColourSetsTypes = {
    name: string,
    theme: string,
    switcher: (index: number) => void   
}


const ColourSets = ({ name, theme, switcher }: ColourSetsTypes) => {

    // const [themeClicked, setThemeClicked] = useState<boolean[]>([true, false]);
    // 
    // function switchBetweenColourThemes (key: string) {
    //     const newBools: boolean[] = Array(2).fill(false);
    //     const keyNum: number = Number(key[key.length - 1]);
    //     console.log(keyNum);
    //     newBools[keyNum] = !themeClicked[keyNum];
    //     setThemeClicked(newBools);
    // }


    return (
        <>
            <p id={coloursSetStyle.describe_name}>{name}</p>
            <div id={coloursSetStyle.colours_examples}>
                {/* {themeClicked.map((theme, index) => (
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
                ))} */}
                {divStyles.map((style, index) => (
                    <div key={`theme-${index}`}>
                        <div className={coloursSetStyle.colourExampleBlock}>
                            <div className={`${coloursSetStyle.colourExample} ${style[0]}`}
                                onClick={() => switcher(index)}
                                style={{
                                    outline: theme === (index === 0 ? 'light' : 'dark') ? "5px solid var(--accent-color)" : "none",
                                    pointerEvents: theme === (index === 0 ? 'light' : 'dark') ? "none" : "auto",
                                }}
                            >
                                <div className={`${coloursSetStyle.firstlineDiv1} ${style[1]}`}></div>
                                <div className={`${coloursSetStyle.firstlineDiv2} ${style[1]}`}></div>
                                <div className={`${coloursSetStyle.firstlineDiv3} ${style[1]}`}></div>
                                <div className={`${coloursSetStyle.firstlineDiv4} ${style[1]}`}></div>
                                <div className={`${coloursSetStyle.secondlineDiv} ${style[1]}`}></div>
                                <div className={`${coloursSetStyle.thirdlineDiv} ${style[1]}`}></div>
                                <div className={`${coloursSetStyle.thirdlineDiv} ${style[1]}`}></div>
                            </div>
                            <p className={coloursSetStyle.colourExampleName}>{style[2]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ColourSets;