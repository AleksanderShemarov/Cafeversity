import Link from "next/link";


export default function Entrance() {

    return (
        <>
            <Link href="/login/LoginPage" style={{
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
                    }}>Ўваход</p>
                </div>
            </Link>
        </>
    )
}
