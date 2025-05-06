// import { useState, useEffect, Dispatch, SetStateAction} from "react";
//
//
// const useFontVolumeSet = (): [
//     { fontWeight: string, fontStyle: string },
//     Dispatch<SetStateAction<{ fontWeight: string, fontStyle: string }>>
// ] => {
//
//     const [fontvolume, setFontVolume] = useState(() => {
//         if (typeof window !== 'undefined') {
//             const setVolume = localStorage.getItem("font_volume");
//             return setVolume ? JSON.parse(setVolume) : { fontWeight: "normal", fontStyle: "normal" };
//         }
//         return "10px";
//     });
//
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             document.documentElement.style.setProperty("--font-volume-weight", fontvolume.fontWeight);
//             document.documentElement.style.setProperty("--font-volume-style", fontvolume.fontStyle);
//             localStorage.setItem("font_volume", JSON.stringify(fontvolume));
//         }
//     }, [fontvolume]);
//
//     return [fontvolume, setFontVolume];
// }

import { useEffect } from "react";

function parseFontVolume(str: string): { fontWeight: string, fontStyle: string } {
    const parts = str.split(', ');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    
    parts.forEach(part => {
      const [key, value] = part.split(': ');
      result[key] = value;
    });
    
    return result as { fontWeight: string, fontStyle: string };
}

const useFontVolumeSet = (fontVolume: string) => {
    useEffect(() => {
        const fontVolumeObject = parseFontVolume(fontVolume);

        document.documentElement.style.setProperty("--font-volume-weight", fontVolumeObject.fontWeight);
        document.documentElement.style.setProperty("--font-volume-style", fontVolumeObject.fontStyle);
        localStorage.setItem("font_volume", fontVolume);
    }, [fontVolume]);
}

export default useFontVolumeSet;
export {parseFontVolume};
