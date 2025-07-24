import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async (request: NextRequest) => {
    const searchParams = new URL(request.url).searchParams;
    const adminName = searchParams.get("adminName");

    if (adminName !== null) {
        const nameSurname: string[] = adminName.split("_");
        
        const result = await prisma.$transaction(async (tx) => {
            const admin = await tx.adminUsers.findFirst({
                where: {
                    AND: [
                        { Name: nameSurname[0] },
                        { Surname: nameSurname[1] }
                    ],
                }
            });

            if (!admin) return false;
            
            const foundAdmin = await tx.adminUsers.findUnique({
                where: {
                    ID: admin.ID
                },
                select: {
                    Email: true,
                    Photo: true,
                    Language: true,
                    Theme: true
                }
            });

            return foundAdmin;
        });

        if (result !== false) {
            return NextResponse.json(
                result,
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: `Your new fullname was saved into database, but the app watches you as "${adminName}"` },
                { status: 409 }
            );
        }
    }
}

export { GET };
