import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";//


const publicLocales = [ "by", "cz", "en" ];//
const defaultLocale = "by";//


// function checkAuthorizedPath (pathname: string): boolean {
//     const userPathRegex = /^[A-Z][a-z]*_[A-Z][a-z]*$/;
//     pathname = pathname.slice(
//         1,
//         pathname.split("/").length - 1 > 1 ?
//         pathname.lastIndexOf("/") :
//         pathname.length
//     );
//     // console.log(pathname);
//     return userPathRegex.test(pathname);
// }


const intlMiddleware = createIntlMiddleware({
    locales: publicLocales,
    defaultLocale,
    localePrefix: "always",
});


export async function middleware(request: NextRequest) {
    // const browserSessionId = request.cookies.get("sessionId");
    // const isRequestPath = checkAuthorizedPath(request.nextUrl.pathname);
    // if (!browserSessionId && isRequestPath) {
    //     return NextResponse.redirect(new URL("/login/signin", request.url));
    // }
    
    // if (browserSessionId && isRequestPath) {
    //     let truth;
    //     await fetch(new URL("/api/user_checking", request.url), {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ session: browserSessionId.value, userPath: request.nextUrl.pathname }),
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         // Fetching data from Users table (user_checking.ts api)
    //         truth = data.session;
    //     })
    //     .catch((error) => console.error(error));

    //     if (!truth) {
    //         const response = NextResponse.redirect(new URL("/login/signin", request.url));
    //         response.cookies.delete('sessionId');
    //         return response;
    //     }

    //     return NextResponse.next();
    // }

    //return intlMiddleware(request);


    // const intlMiddleware = createIntlMiddleware({
    //     locales: publicLocales,
    //     defaultLocale,
    //     localePrefix: "never",
    // });
    // const response = intlMiddleware(request);

    // return response;


    const { pathname } = request.nextUrl;

    if (pathname.match(/^\/(by|cz|en)(\/|$)/)) {
        // console.log("Local found! -->", pathname);
        return intlMiddleware(request);
    }

    if (pathname.startsWith("/authorized/")) {
        const username = pathname.split('/')[2];
        console.log("middleware full pathname -->", pathname);
        console.log("middleware username -->", username);
        console.log("middleware request.url -->", request.url);

        if (!/^[A-Z][a-z]*_[A-Z][a-z]*$/.test(username)) {
            return NextResponse.redirect(new URL('/en', request.url));
        }

        const session = request.cookies.get('sessionId');
        if (!session) {
            return NextResponse.redirect(new URL('/en/login/signin', request.url));
        }

        try {
            console.log("middleware user_checking has started!");
            const res = await fetch(new URL('/api/user_checking', request.url), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session: session.value,
                    userPath: request.nextUrl.pathname
                })
            });
        
            if (!res.ok) throw new Error('Auth failed');
        
            return NextResponse.next();
        } catch (error) {
            console.log("error(-s) is (are) found during user_checking!");
            const response = NextResponse.redirect(new URL('en/login/signin', request.url));
            response.cookies.delete('sessionId');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/:path*',
        '/((?!api|_next|.*\\..*).*)',
        // '/:path*/settings',
        // '/:path*/menu',
        // '/:path*/mapPoints',
        // '/:path*/activities',
    ],
}
