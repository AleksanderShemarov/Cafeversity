import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async (request: NextRequest) => {
    const searchParams = new URL(request.url).searchParams;
    const adminName = searchParams.get("adminName");

    if (adminName !== null) {
        const nameSurname: string[] = adminName.split("_");
        
        const admin = await prisma.adminUsers.findFirst({
            where: {
                AND: [
                    {
                        Name: nameSurname[0]
                    },
                    {
                        Surname: nameSurname[1]
                    },
                ],
            },
            select: {
                Email: true,
                Photo: true,
                Language: true,
                Theme: true
            }
        });

        return NextResponse.json(
            admin,
            { status: 200 }
        );
    }
}

export { GET };
