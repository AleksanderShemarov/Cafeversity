import { useState, useEffect, Dispatch, SetStateAction} from "react";


const useFontFamilySet = (): [string, Dispatch<SetStateAction<string>>] => {

    const [fontFamily, setFontFamily] = useState(() => {
        if (typeof window !== 'undefined') {
            const setFontFamily = localStorage.getItem("font_family");
            return setFontFamily ? setFontFamily : "Consolas, monospace";
        }
        return "Consolas, monospace";
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.style.setProperty("--font-family", fontFamily);
            localStorage.setItem("font-family", fontFamily);
        }
    }, [fontFamily]);

    return [fontFamily, setFontFamily];
}

export default useFontFamilySet;
