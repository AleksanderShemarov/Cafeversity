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
    console.log(pathname);
    return userPathRegex.test(pathname);
}


export async function middleware(request: NextRequest) {
    const browserSessionId = request.cookies.get("sessionId");
    // console.log("From middleware.ts", browserSessionId);
    const isRequestPath = checkAuthorizedPath(request.nextUrl.pathname);
    // console.log(request.nextUrl.pathname, isRequestPath);
    if (!browserSessionId && isRequestPath) {
        return NextResponse.redirect(new URL("/login/signin", request.url));
    }
    
    if (browserSessionId && isRequestPath) {
        let truth;
        await fetch("http://localhost:3000/api/user_checking", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session: browserSessionId.value, userPath: request.nextUrl.pathname }),
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log("Data from user_checking.ts api route:");
            // console.log(data);
            truth = data.session;
        })
        .catch((error) => console.error(error));

        if (truth) {
            return NextResponse.next();
        } else {
            const response = NextResponse.redirect(new URL("/login/signin", request.url));
            response.headers.set('Set-Cookie', 'sessionId=; Path=/; HttpOnly; Secure; Max-Age=0; SameSite=Strict');
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
