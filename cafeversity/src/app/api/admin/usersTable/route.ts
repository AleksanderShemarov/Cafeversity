import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/utils/prismaClient";


const GET = async (request: NextRequest) => {
    try {
        const searchParams = new URL(request.url).searchParams;
        const page = searchParams.get("page");

        if (page === "dashboard/panel") {
            const users = await prisma.users.findMany({
                include: {
                    customSets: { select: { id: true } }
                }
            });

            const serializedUsers = users.map(user => ({
                ...user,
                resetTokenExpiry: user.resetTokenExpiry?.toISOString() !== undefined
                    ? user.resetTokenExpiry?.toISOString() : null,
            }));

            return NextResponse.json(serializedUsers, { status: 200 });
        } else {
            return NextResponse.json(
                { message: "Incorrect connect to 'admin/usersTable/GET'." },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("usersTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export { GET };
