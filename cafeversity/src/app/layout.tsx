import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/CommonLayout";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cafeversity Creation",
  description: "The Part for Common Users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommonLayout>
          {children}
        </CommonLayout>
      </body>
    </html>
  );
}
