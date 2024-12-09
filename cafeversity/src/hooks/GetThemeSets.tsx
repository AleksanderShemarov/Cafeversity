"use client";

import { useEffect } from "react";
import useThemeSets from "@/hooks/themeSets";

const ThemeManager = () => {
    const [, setTheme] = useThemeSets();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [setTheme]);

    return null;
};

export default ThemeManager;
