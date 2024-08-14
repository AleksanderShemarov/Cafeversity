import Link from "next/link";


export default function TemporaryPage() {

    const paths: [string, string][] = [
        ["/", "Да Галоўнай Старонцы"],
        ["/login/signin", "Да Формы Ўваходу"],
    ]; 

    return (
        <div style={{
            fontSize: "25px",
            fontFamily: "Consolas, monaco, monospace",
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <p style={{
                    textAlign: "justify",
                }}>Гэта – тэхнічная старонка, якая выкарыстоўваецца замест невыкананага яшчэ кантэнту і функцыяналу</p>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-around"
            }}>
                {paths.map((path, index) => <Link key={index} href={path[0]}>{path[1]}</Link>)}
            </div>
        </div>
    )
}
