import { useState, useEffect, Dispatch, SetStateAction} from "react";


const useFontVolumeSet = (): [
    { fontWeight: string, fontStyle: string },
    Dispatch<SetStateAction<{ fontWeight: string, fontStyle: string }>>
] => {

    const [fontvolume, setFontVolume] = useState(() => {
        if (typeof window !== 'undefined') {
            const setVolume = localStorage.getItem("font_volume");
            return setVolume ? JSON.parse(setVolume) : { fontWeight: "normal", fontStyle: "normal" };
        }
        return "10px";
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.style.setProperty("--font-volume-weight", fontvolume.fontWeight);
            document.documentElement.style.setProperty("--font-volume-style", fontvolume.fontStyle);
            localStorage.setItem("font_volume", JSON.stringify(fontvolume));
        }
    }, [fontvolume]);

    return [fontvolume, setFontVolume];
}

export default useFontVolumeSet;
