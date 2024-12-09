import { useState, useEffect, Dispatch, SetStateAction} from "react";


const useThemeSets = (): [string, Dispatch<SetStateAction<string>>] => {

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : 'light';
    });

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme];
}

export default useThemeSets;
