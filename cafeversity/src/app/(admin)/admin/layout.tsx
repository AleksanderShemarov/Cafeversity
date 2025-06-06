import AdminHeaderBlock from "@/components/AdminHeader/AdminHeaderBlock";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";


export default function AdminPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div style={{ margin: "2rem 0" }}>
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
