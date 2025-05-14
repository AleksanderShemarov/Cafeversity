import prisma from "../../../../lib/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";


const GET = async (request: NextRequest) => {
    const userSessionId = request.cookies.get('sessionId');
    
    if (!userSessionId) {
        return NextResponse.json(
            { message: "Session hasn't been found. Already logged out", redirect: "/" },
            { status: 200 }
        );
    }

    try {
        await prisma.$transaction(async (tx) => {
            const user = await tx.users.findUnique({
                where: {
                    sessionId: userSessionId.value
                }
            });

            if (!user) {
                const response = NextResponse.json(
                    {
                        message: "User is not found, but exit is accessed.",
                        redirect: `/`,
                    },
                    { status: 201 }
                );
                response.cookies.delete('sessionId');
                return response;
            }

            await tx.users.update({
                where: {
                    id: user.id
                },
                data: {
                    sessionId: null
                }
            });
        });
        
        const response = NextResponse.json(
            {
                message: "Exit have been done!",
                redirect: `/`,
            },
            { status: 200 }
        );
        response.cookies.delete('sessionId');
        return response;
    } catch (error) {
        console.error(`Exit Error: ${error}`);
        return NextResponse.json(
            {
                message: "Error during exiting!",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

export { GET };
