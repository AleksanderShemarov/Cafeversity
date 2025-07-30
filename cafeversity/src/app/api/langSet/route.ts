import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const POST = async (request: NextRequest) => {
    const { userName, newLang } = await request.json();
    const [name, surname]: [string, string] = userName.split("_");
    const userSessionId = request.cookies.get('sessionId');

    const answer = await prisma.$transaction(async (tx) => {
        const user = await tx.users.findUnique({
            where: {
                firstName: name,
                lastName: surname,
                sessionId: userSessionId?.value
            },
            include: {
                customSets: true,
            }
        });

        if (!user) {
            return false;
        }

        await tx.customSets.update({
            where: {
                userId: user?.id,
            },
            data: {
                language: newLang
            }
        });

        return true;
    });

    if (answer)
        return NextResponse.json(
            { message: "Language has been changed!" },
            { status: 200 }
        );
    else
        return NextResponse.json(
            { error: "It is highly possible your session cookie-file has ended. Please, relogging in." },
            { status: 400 }
        );
}

export { POST };
