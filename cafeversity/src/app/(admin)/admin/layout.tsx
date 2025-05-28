import Link from "next/link";
import AdminHeaderBlock from "@/components/AdminHeader/AdminHeaderBlock";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";


export default function AdminPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div style={{ margin: "2rem 0" }}>
                {/* Часовае рашэнне (Temporary Solution) */}
                    <Link href="/" style={{ fontSize: "2.5rem" }}>Common Greeting Page</Link>
                {/*  */}
                <h1 style={{ marginTop: 0, marginBottom: 0 }}>Admin Page</h1>
                <div style={{ position: "relative" }}>
                    <AdminHeaderBlock />
                </div>
            </div>
            <div>
                {children}
            </div>
            <ToastContainer />
        </>
    );
}
