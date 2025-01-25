import navbarPartStyle from "./StickyNavbarPart.module.css";
import { useTranslations } from "next-intl";


type NavbarPartTypes = {
    actionIndex: number,
    partName: string,
    pageTranslate: string,
    checkingBools: boolean[],
    switchFunc: (index: number) => void,
    // isSticky?: boolean,// an idea for using this navbar parts not only as sticky
}


export default function StickyNavbarPart({
    actionIndex,
    partName,
    pageTranslate,
    checkingBools,
    switchFunc
}: NavbarPartTypes) {

    const t = useTranslations(pageTranslate);

    return (
        <p
            onClick={(event) => {
                event.preventDefault();
                document.querySelector(`#section${actionIndex}`)?.scrollIntoView({ behavior: "smooth" });
                switchFunc(actionIndex);
            }}
            className={navbarPartStyle.bar_link}
            style={{
                borderBottom: checkingBools[actionIndex] ? "3px solid #714efe" : "none",
                pointerEvents: checkingBools[actionIndex] ? "none" : "auto",
            }}
        >
            <a
                href={`#section${actionIndex}`}
                style={{ textDecoration: "none", color: checkingBools[actionIndex] ? "#714efe" : "var(--text-color)", }}
            >
                {t(partName)}
            </a>
        </p>
    )
}
