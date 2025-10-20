import type { Metadata } from "next";
import "../../globals.css";
import { Inter } from "next/font/google";
import Toolbar from "@/app/components/CafeManager/CommonParts/Toolbar";

import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cafeversity Creation",
  description: "Cafe Management Part",
};


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>){

    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages} locale={locale} now={new Date()}>
                    <Toolbar />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
