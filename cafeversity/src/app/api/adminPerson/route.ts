import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async (request: NextRequest) => {
    const searchParams = new URL(request.url).searchParams;
    const adminName = searchParams.get("adminName");
    
    if (adminName !== null) {
        const nameSurname: string[] = adminName.split("_");

        const adminPerson = await prisma.adminUsers.findFirst({
            where: {
                AND: [
                    { Name: nameSurname[0] },
                    { Surname: nameSurname[1] }
                ]
            },
            select: {
                ID: true,
                Name: true,
                Surname: true,
                Email: true,
                EmailConfirmed: true,
                Telephone: true,
                Photo: true,
                Language: true,
                SecretWord: true
            }
        });

        return NextResponse.json(
            adminPerson,
            { status: 201 }
        );
    }
}

export { GET };
