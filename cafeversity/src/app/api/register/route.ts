import prisma from "../../../../lib/utils/prismaClient";
import { NextResponse } from "next/server";
import { hashPassword } from "../../../../lib/utils/passwordUtils";


const POST = async (request: Request) => {
    const { firstName, lastName, nickName, email, password } = await request.json();

    const hashedWord = await hashPassword(password);


    const sameUserEmail = await prisma.users.findUnique({
        where: {
            email: email
        },
    });

    if (sameUserEmail !== null) {
        return NextResponse.json(
            {
                message: `This User is already existed\nwith this email: ${email}!`,
                status: "Error" 
            },
            { status: 409 }
        );
    }

    const sameUserNickName = await prisma.users.findFirst({
        where: {
            nickName: nickName
        },
    });

    if (sameUserNickName !== null) {
        return NextResponse.json(
            {
                message: `This User is already existed\nwith this nickname: ${nickName}!`,
                status: "Error" 
            },
            { status: 409 }
        );
    }


    await prisma.$transaction(async (prisma) => {
        const user = await prisma.users.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                nickName: nickName,
                email: email,
                password: hashedWord,
            }
        });
    
        await prisma.customSets.create({
            data: {
                userId: user.id,
            }
        });
    });
    
    return NextResponse.json(
        {
            message: "User Registration is successfully ended!\nEnter through Sign In page.",
            status: "Success"
        },
        { status: 201 }
    );
}

export { POST };
