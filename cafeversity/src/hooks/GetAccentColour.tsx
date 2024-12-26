"use client";

import { useEffect } from "react";
import useAccentColourSet from "./accentColourSet";

const AccentColourManager = () => {
    const [, setAccentColour] = useAccentColourSet();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const accentColour = localStorage.getItem("accent_color");
            if (accentColour) {
                setAccentColour(accentColour);
            }
        }
    }, [setAccentColour]);

    return null;
};

export default AccentColourManager;
