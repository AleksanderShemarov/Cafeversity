// import { useState, useEffect, Dispatch, SetStateAction} from "react";
//
//
// const useAccentColourSet = (): [string, Dispatch<SetStateAction<string>>] => {
//
//     const [accentColour, setAccentColour] = useState(() => {
//         if (typeof window !== 'undefined') {
//             const chosenAccentColour = localStorage.getItem("accent_color");
//             return chosenAccentColour ? chosenAccentColour : 'lime';
//         }
//         return 'lime';
//     });
//
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             document.documentElement.style.setProperty('--accent-color', accentColour);
//             localStorage.setItem("accent_color", accentColour);
//         }
//     }, [accentColour]);
//
//     return [accentColour, setAccentColour];
// }

import { useEffect } from "react";


const useAccentColourSet = (accentColour: string) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--accent-color', accentColour);
        localStorage.setItem("accent_color", accentColour);
    }, [accentColour]);
}

export default useAccentColourSet;
