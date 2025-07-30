import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../../lib/utils/prismaClient";


const POST = async (request: NextRequest) => {
    const { value } = await request.json();
    
    const answer = await prisma.$transaction(async (tx) => {
        const user = await tx.users.findUnique({
            where: {
                sessionId: value,
            },
            include: {
                customSets: true,
            }
        });

        const adminUser = await tx.adminUsers.findUnique({
            where: {
                SessionId: value
            }
        });

        if (!user) {
            if (!adminUser)
                return undefined;
            else {
                return adminUser.Language;
            }
        } else {
            const userLanguage = user.customSets?.language;
            return userLanguage;
        }
    });

    return NextResponse.json(
        { language: answer },
        { status: 200 }
    );
}

export { POST };
