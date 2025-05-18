import Link from "next/link";


export default function AdminPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div style={{ margin: "2rem 0" }}>
                <h1 style={{ marginTop: 0, marginBottom: 0 }}>Admin Page</h1>
                <div style={{ fontSize: "3rem", border: "1px solid gray" }}>Admin&#39;s Menu</div>
            </div>
            <div>
                {children}

                {/* Часовае рашэнне (Temporary Solution) */}
                <Link href="/" style={{ fontSize: "2.5rem" }}>Common Greeting Page</Link>
                {/*  */}
            </div>
        </>
    );
}
