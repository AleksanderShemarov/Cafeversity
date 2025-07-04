import prisma from "../../../../lib/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import comparePasswords from "../../../../lib/utils/passwordUtils";
import createSessionsIdAndCookies from "../../../../lib/utils/sessionID";


const GET = async (request: NextRequest) => {
    const userSessionId = request.cookies.get('sessionId');

    if (userSessionId === undefined) {
        return NextResponse.json(
            { message: "You need relogging in!", userSessionId: false },
            { status: 201 }
        );
    }

    return NextResponse.json(
        { message: "You are still logged in.", userSessionId: true }, 
        { status: 201 }
    );
}


const POST = async (request: Request) => {
    const { email, password } = await request.json();

    if (!email && !password) {
        return NextResponse.json(
            {
                message: "Email and password are required!",
                status: 400
            },
            { status: 400 }
        );
    }
    if (!email) {
        return NextResponse.json(
            {
                message: "Email is required!",
                status: 400
            },
            { status: 400 }
        );
    }
    if (!password) {
        return NextResponse.json(
            {
                message: "Password is required!",
                status: 400
            },
            { status: 400 }
        );
    }
    /*
        NextResponse.json({ message: "Email and password are required!", status: 400 }); means HTTP returns 200 status-code.
        It includes "status" variable with "400" value inside of JSON body.

        NextResponse.json({ message: "Email and password are required!" }, { status: 400 }); tells HTTP showing 400 status-code
        of the response with "message" variable.
    */

    const user = await prisma.users.findUnique({
        where: {
            email: email,
        }
    });

    if (!user) {
        return NextResponse.json(
            {
                message: "This email is incorrect or isn't registrated!",
                status: 409,
            },
            { status: 409 }
        );
    }

    const isTheSamePassword = await comparePasswords(password, user ? user.password : "");

    if (!isTheSamePassword) {
        return NextResponse.json(
            {
                message: "The password is incorrect!",
                status: 409,
            },
            { status: 409 }
        );
    }

    const sessionId = createSessionsIdAndCookies();
    await prisma.users.update({
        where: {
            email: email,
        },
        data: {
            sessionId: sessionId,
        }
    });

    // const headers = new Headers();
    // headers.append('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly; Secure; Max-Age=3600; SameSite=Strict`);// Cookie-file for an 1 hour

    const response = NextResponse.json({
            message: "Entrance is accepted!",
            redirect: `/authorized/${user.firstName}_${user.lastName}`,
            // redirect: `/${userLanguage}/${user.firstName}_${user.lastName}`,
        },
        { status: 201 }
    );
    response.cookies.set({
        name: 'sessionId',
        value: sessionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        path: '/',
        sameSite: 'strict'
    });
    return response;
}

export { GET, POST };
