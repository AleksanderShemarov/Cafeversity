import { NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";
import { cookies } from "next/headers";


const GET = async () => {
    const adminSession = cookies().get("adminSessionId");
    
    const adminPerson = await prisma.adminUsers.findFirst({
        where: {
            SessionId: adminSession?.value,
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

export { GET };
