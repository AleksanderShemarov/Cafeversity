import Link from "next/link";


export default function TemporaryPage() {
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
                <Link href="/login/LoginPage">Да Формы Ўваходу</Link>
                <Link href="/">Да Галоўнай Старонцы</Link>
            </div>
        </div>
    )
}
