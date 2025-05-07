// import { useState, useEffect, Dispatch, SetStateAction} from "react";
//
//
// const useFontSizeSet = (): [string, Dispatch<SetStateAction<string>>] => {
//
//     const [fontsize, setFontSize] = useState(() => {
//         if (typeof window !== 'undefined') {
//             const setSize = localStorage.getItem("common_font_size");
//             return setSize ? setSize : "10px";
//         }
//         return "10px";
//     });
//
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             document.documentElement.style.setProperty("--common-font-size", fontsize);
//             localStorage.setItem("common_font_size", fontsize);
//         }
//     }, [fontsize]);
//
//     return [fontsize, setFontSize];
// }

import { useEffect } from "react";


const useFontSizeSet = (fontSize: string) => {
    useEffect(() => {
        document.documentElement.style.setProperty("--common-font-size", fontSize);
        localStorage.setItem("common_font_size", fontSize);
    }, [fontSize]);
}

export default useFontSizeSet;
