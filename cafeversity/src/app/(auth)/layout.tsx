import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";


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
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
