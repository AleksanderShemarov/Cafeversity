import { useState, useEffect, Dispatch, SetStateAction} from "react";


const useThemeSets = (): [string, Dispatch<SetStateAction<string>>] => {

    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem("theme");
            return savedTheme ? savedTheme : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') { 
            document.body.dataset.theme = theme;
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return [theme, setTheme];
}

export default useThemeSets;
