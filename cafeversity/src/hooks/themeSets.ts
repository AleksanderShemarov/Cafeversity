import { useState, useEffect, Dispatch, SetStateAction} from "react";


const useThemeSets = (initialTheme?: "light"|"dark"): ["light"|"dark", Dispatch<SetStateAction<"light"|"dark">>] => {

    const [theme, setTheme] = useState(() => {
        if (initialTheme) return initialTheme;
        if (typeof window !== 'undefined') {
            return localStorage.getItem("theme") as "light"|"dark" || "light";
        }
        return 'light';
    });

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme] as const;
}

export default useThemeSets;
