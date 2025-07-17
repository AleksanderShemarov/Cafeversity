import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";


export default getRequestConfig(async ({ requestLocale: routeLocale }) => {
    
    const foundLocale = await routeLocale;
    console.log("getRequestConfig", foundLocale);

    const session = cookies().get("sessionId");
    // console.log("Available locale files:", await fs.readdir(path.join(process.cwd(), 'languages')));

    if (session) {
        const userLanguage = await fetch("http://localhost:3000/api/lookingForLanguage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(session)
        })
        .then(res => res.json());
        // const locale = session ? (userLanguage?.language || 'en') : routeLocale;
        const locale = userLanguage ? userLanguage.language : 'by';
        // console.log("Found User Locale ->", locale);

        // const locale = 'by';
        // const locale = 'cz';
        // const locale = 'en';

        console.log("const locale =", locale);

        return {
            locale,
            messages: (await import(`../languages/${locale}.json`)).default
        };
    }

    // Temporary locale's stub for (admin) route group
    if (foundLocale === undefined) {
        return {
            locale: "by",
            messages: (await import(`../languages/by.json`)).default
        };
    }
    //

    return {
        locale: foundLocale,
        messages: (await import(`../languages/${foundLocale}.json`)).default
    };
});
