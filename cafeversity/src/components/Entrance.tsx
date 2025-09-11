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
                    backdropFilter: "blur(5px)",
                    backgroundColor: "#ffffff2b",
                    borderRadius: "15px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <p style={{
                        color: "antiquewhite",
                        fontSize: "21px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        textAlign: "center",
                        textDecoration: "underline"
                    }}>{sign}</p>
                </div>
            </Link>
        </>
    )
}
