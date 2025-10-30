import coloursSetStyle from "@/components/ColoursPageSets/ColourSets.module.css";


const divStyles: [string, string, string][] = [
    [coloursSetStyle.colourExampleWhite, coloursSetStyle.whiteDiv, "Light Theme"],
    [coloursSetStyle.colourExampleDark, coloursSetStyle.lightdarkDiv, "Dark Theme"],
];

type ColourSetsTypes = {
    theme: string,
    switcher: (index: number) => void,
    themeTypes: string[] 
}


const ColourSets = ({ theme, switcher, themeTypes }: ColourSetsTypes) => {

    return (
        <div id={coloursSetStyle.colours_examples}>
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
                        <p className={coloursSetStyle.colourExampleName}>{themeTypes[index]}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ColourSets;
