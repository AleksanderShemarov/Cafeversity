import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";


export default getRequestConfig(async () => {
    
    const session = cookies().get("sessionId");
    console.log("user's cookie after signing in ->", session);
    
    let userLanguage;
    if (session) {
        userLanguage = await fetch("http://localhost:3000/api/lookingForLanguage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(session)
        })
        .then(res => res.json());
    }
    const locale = userLanguage ? userLanguage.language : 'en';
    console.log("Found User Locale ->", locale);

    // const locale = 'by';
    // const locale = 'cz';
    // const locale = 'en';

    return {
        locale,
        messages: (await import(`../languages/${locale}.json`)).default
    };
});
