import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async (request: NextRequest) => {
    const adminSession = request.cookies.get("adminSessionId");

    if (!adminSession) {
        return NextResponse.json(
            { message: "Session hasn't been found. Already logged out" },
            { status: 200 }
        );
    }

    try {
        await prisma.$transaction(async (tx) => {
            const admin = await tx.adminUsers.findUnique({
                where: {
                    SessionId: adminSession.value
                }
            });

            if (!admin) {
                const response = NextResponse.json(
                    { message: "User is not found, but exit is accessed." },
                    { status: 201 }
                );
                response.cookies.delete('adminSessionId');
                return response;
            }

            await tx.adminUsers.update({
                where: {
                    ID: admin.ID
                },
                data: {
                    SessionId: null
                }
            });
        });
        
        const response = NextResponse.json(
            { message: "Exit have been done!" },
            { status: 200 }
        );
        response.cookies.delete('adminSessionId');
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
