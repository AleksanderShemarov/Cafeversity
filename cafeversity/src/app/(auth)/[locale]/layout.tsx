import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import LangSwitcher from "@/components/PublicLangSwitcher/LangSwitcher";
import { ToastContainer } from "react-toastify";
import "../../globals.css";
import styles from "@/app/(auth)/[locale]/LoginPage.module.css";


export const metadata = {
    title: 'Cafeversity Application',
    description: 'Authorization',
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {

    const locale = await getLocale();
    const messages = await getMessages();
    
    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages} locale={locale} now={new Date()}>
                    <div style={{ position: "relative" }}>
                        <div style={{
                            position: "absolute", top: 0, left: "50%", fontFamily: "Consolas, monospace",
                            transform: "translate(-50%, 0)"
                        }}>
                            <LangSwitcher color="black" />
                        </div>
                    </div>
                    <div className={styles.login_field}>
                        {children}
                    </div>
                    <div>
                        <ToastContainer theme="light" />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
