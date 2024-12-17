"use client";

import { useEffect } from "react";
import useFontFamilySet from "./fontFamilySet";

const AccentColourManager = () => {
    const [, setFontFamily] = useFontFamilySet();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fontFamily = localStorage.getItem("font_family");
            if (fontFamily) {
                setFontFamily(fontFamily);
            }
        }
    }, [setFontFamily]);

    return null;
};

export default AccentColourManager;
