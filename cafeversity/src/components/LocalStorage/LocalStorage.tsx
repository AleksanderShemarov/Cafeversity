"use client";

import { useEffect } from "react";
import useThemeSets from "@/hooks/themeSets";
import { SetsState } from "@/components/SettingsPage/SettingsPage";
import useAccentColourSet from "../../hooks/accentColourSet";
import useFontFamilySet from "../../hooks/fontFamilySet";
import useFontSizeSet from "../../hooks/fontSizeSet";
import useFontVolumeSet from "../../hooks/fontVolume";


const LocalStorageStyles = (initialStyles: SetsState) => {
    const [theme, setTheme] = useThemeSets(initialStyles.pageTheme);
    useAccentColourSet(initialStyles.brandColor);
    useFontFamilySet(initialStyles.fontFamily);
    useFontSizeSet(initialStyles.fontSize);
    useFontVolumeSet(initialStyles.fontVolume);
    
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

export default LocalStorageStyles;
