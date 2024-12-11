"use client";

import { useEffect } from "react";
import useThemeSets from "@/hooks/themeSets";

const ThemeManager = () => {
    const [, setTheme] = useThemeSets();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                setTheme(savedTheme);
            }
        }
    }, [setTheme]);

    return null;
};

export default ThemeManager;
