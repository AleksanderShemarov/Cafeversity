"use client";

import { useEffect } from "react";
import useThemeSets from "@/hooks/themeSets";


const ThemeManager = ({ initialTheme }: { initialTheme: "light"|"dark" }) => {
    const [theme, setTheme] = useThemeSets(initialTheme);
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "theme") setTheme(e.newValue as "light"|"dark");
        }
    
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [theme, setTheme]);
    
    return null;
};

export default ThemeManager;
