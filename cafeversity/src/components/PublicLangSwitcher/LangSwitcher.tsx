import Link from "next/link";
import { usePathname } from "next/navigation";


const LangSwitcher = () => {

    const pathname = usePathname();

    const changeLanguage = (locale: string) => {
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    }

    return (
        <div>
            <Link href={changeLanguage('by')}>Беларуская</Link>
            <Link href={changeLanguage('cz')}>Čeština</Link>
            <Link href={changeLanguage('en')}>English</Link>
        </div>
    )
}

export default LangSwitcher;
