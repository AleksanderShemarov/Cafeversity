import { NextResponse } from "next/server";
import prisma from "@/../../lib/utils/prismaClient";
import { hashPassword } from "../../../../lib/utils/passwordUtils";


const POST = async (request: Request) => {
    const { firstName, lastName, email, phone, role, lang, password, secretword } = await request.json();

    const isAdminExist = await prisma.adminUsers.findUnique({
        where: {
            Email: email,
            SecretWord: secretword
        }
    });

    if (isAdminExist !== null) {
        return NextResponse.json(
            {
                status: "Error",
                message: "This admin is already existed!"
            },
            { status: 409 }
        );
    }

    const hashedPassword = await hashPassword(password);

    await prisma.adminUsers.create({
        data: {
            Name: firstName,
            Surname: lastName,
            Email: email,
            EmailConfirmed: true,
            Telephone: phone,
            Role: role,
            Language: lang,
            Password: hashedPassword,
            SecretWord: secretword
        }
    });
    
    return NextResponse.json(
        {
            status: "Success",
            message: "You have been signed up as admin!",
            redirect: "/admiN_Login"
        },
        { status: 200 }
    );
}

export { POST };
