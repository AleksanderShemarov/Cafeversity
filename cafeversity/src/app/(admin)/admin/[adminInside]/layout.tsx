import AdminHeaderBlock from "@/components/AdminHeader/AdminHeaderBlock";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { use } from "react";
import { cookies } from "next/headers";


export type AdminHeaderTypes = {
    Email: string,
    Photo: string,
    Language: string,
    Theme: string
}


async function fetchData(params: { adminInside: string }) {
    const { adminInside } = params;

    const sessionForAdmin = await cookies().get("adminSessionId");
    console.log("sessionForAdmin", sessionForAdmin);

    const response = await fetch(`http://localhost:3000/api/adminData?adminName=${adminInside}`, { cache: "no-store" });
    const userData = await response.json();

    if (userData?.message) throw new Error(userData?.message);

    return userData;
}


export default function AdminPageLayout({ params, children }: Readonly<{ params: { adminInside: string }, children: React.ReactNode }>) {
    
    const data: AdminHeaderTypes = use(fetchData(params));
    
    return (
        <>
            <div style={{ margin: "2rem 0" }}>
                <div style={{ position: "relative" }}>
                    <AdminHeaderBlock data={data} />
                </div>
            </div>
            <div>
                {children}
            </div>
            <ToastContainer />
        </>
    );
}
