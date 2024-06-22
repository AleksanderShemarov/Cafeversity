import Link from "next/link";


export default function Entrance({ path, sign }: { path: string, sign: string }) {

    return (
        <>
            <Link href={path} style={{
                textDecoration: "none",
                color: "inherit",
                margin: "auto 0",
            }}>
                <div style={{
                    height: "50px",
                    width: "100px",
                    border: "2px dashed orange",
                    borderRadius: "15px",
                    cursor: "pointer",
                }}>
                    <p style={{
                        color: "antiquewhite",
                        fontSize: "21px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        textAlign: "center",
                        textDecoration: "underline",
                        margin: "0",
                        marginTop: "12px",
                    }}>{sign}</p>
                </div>
            </Link>
        </>
    )
}
