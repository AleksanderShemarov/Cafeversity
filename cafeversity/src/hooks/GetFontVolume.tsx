"use client";

import { useEffect } from "react";
import useFontVolumeSet from "./fontVolume";


const GetFontVolume = () => {
    const [, setFontVolume] = useFontVolumeSet();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fontvolume = localStorage.getItem("font_volume");
            if (fontvolume) {
                setFontVolume(JSON.parse(fontvolume));
            }
        }
    }, [setFontVolume]);

    return null;
};

export default GetFontVolume;
