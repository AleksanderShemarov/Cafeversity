import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";//


const publicLocales = [ "by", "cz", "en", "pl", "ru", "tr", "ua" ];//!!!
const defaultLocale = "by";//!!!


const intlMiddleware = createIntlMiddleware({
    locales: publicLocales,
    defaultLocale,
    localePrefix: "always",
});


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.match(/^\/(by|cz|en|pl|ru|tr|ua)(\/|$)/)) {//!!!
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
    }

    if (pathname.split("/")[1] === "authorized") {
        console.log("'authorized' is in the pathname");

        const session = request.cookies.get('sessionId');

        if (!session) {
            return NextResponse.redirect(new URL('/en/login/signin', request.url));
        }

        try {
            // console.log("middleware user_checking has started!");
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
    } else if (pathname.split("/")[1] === "admin") {
        console.log("'admin' is in the pathname");

        const adminSession = request.cookies.get('adminSessionId');
        
        if (!adminSession) {
            return NextResponse.redirect(new URL('/en/login/signin', request.url));
        }

        try {
            console.log("middleware user_checking has started!");
            const res = await fetch(new URL('/api/user_checking', request.url), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session: adminSession.value,
                    userPath: request.nextUrl.pathname
                })
            });
        
            if (!res.ok) throw new Error('Auth failed');
        
            return NextResponse.next();
        } catch (error) {
            console.log("error(-s) is (are) found during user_checking!");
            const response = NextResponse.redirect(new URL('en/login/signin', request.url));
            response.cookies.delete('adminSessionId');
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
