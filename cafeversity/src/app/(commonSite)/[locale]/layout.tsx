import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import CommonLayout from "@/components/CommonLayout";

import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cafeversity Creation",
  description: "The Part for Common Users",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale} now={new Date()}>
          {/* I use "locale" in NextIntlClientProvider as the mistakes protection */}
          <CommonLayout>
            {children}
          </CommonLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
