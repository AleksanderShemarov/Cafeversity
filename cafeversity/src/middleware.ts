import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


function checkAuthorizedPath (pathname: string): boolean {
    const userPathRegex = /^[A-Z][a-z]*_[A-Z][a-z]*$/;
    pathname = pathname.slice(
        1,
        pathname.split("/").length - 1 > 1 ?
        pathname.lastIndexOf("/") :
        pathname.length
    );
    // console.log(pathname);
    return userPathRegex.test(pathname);
}


export async function middleware(request: NextRequest) {
    const browserSessionId = request.cookies.get("sessionId");
    const isRequestPath = checkAuthorizedPath(request.nextUrl.pathname);
    if (!browserSessionId && isRequestPath) {
        return NextResponse.redirect(new URL("/login/signin", request.url));
    }
    
    if (browserSessionId && isRequestPath) {
        let truth;
        await fetch(new URL("/api/user_checking", request.url), {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session: browserSessionId.value, userPath: request.nextUrl.pathname }),
        })
        .then((res) => res.json())
        .then((data) => {
            // Fetching data from Users table (user_checking.ts api)
            truth = data.session;
        })
        .catch((error) => console.error(error));

        if (truth) {
            return NextResponse.next();
        } else {
            const response = NextResponse.redirect(new URL("/login/signin", request.url));
            response.cookies.delete('sessionId');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/:path*',
        // '/:path*/settings',
        // '/:path*/menu',
        // '/:path*/mapPoints',
        // '/:path*/activities',
    ],
}
