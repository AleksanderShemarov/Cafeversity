import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminHeaderBlock from "@/components/AdminHeader/AdminHeaderBlock";
import getAdminHeader from "../actions/getAdminHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { LocalStoragePageThemeStyle } from "@/components/LocalStorage/LocalStorage";


const inter = Inter({ subsets: ["latin"] });


export type AdminHeaderTypes = {
    Email: string,
    Photo: string,
    Language: string,
    Theme: "light"|"dark",
}


export const metadata: Metadata = {
    title: "Cafeversity: Admin",
    description: "Admin's Part",
};


export default async function RootAdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data: AdminHeaderTypes = await getAdminHeader();

    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages} locale={locale} now={new Date()}>
                    <div style={{ margin: "2rem 0" }}>
                        <div style={{ position: "relative" }}>
                            <AdminHeaderBlock data={data} />
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>
                    <ToastContainer />
                    <LocalStoragePageThemeStyle pageTheme={data.Theme} />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
