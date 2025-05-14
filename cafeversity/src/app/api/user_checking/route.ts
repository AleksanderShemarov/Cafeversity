import { NextResponse } from "next/server";
import isUserByRequestCookieAndUserPath from "../../../../lib/utils/isUserPath";


const POST = async (request: Request) => {
    const { session, userPath } = await request.json();
    
    const isSessionTrue: boolean = await isUserByRequestCookieAndUserPath(session, userPath);
    
    return NextResponse.json(
        { session: isSessionTrue },
        { status: 200 }
    );
}

export { POST };
