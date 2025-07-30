import prisma from "../../../../lib/utils/prismaClient";
import { NextResponse } from "next/server";
import { hashPassword } from "../../../../lib/utils/passwordUtils";


const POST = async (request: Request) => {
    const { receivedToken, password } = await request.json();

    try {
        const user = await prisma.users.findUnique({
            where: {
                resetToken: receivedToken,
            }
        });

        if (user === null) {
            return NextResponse.json(
                {
                    message: "The user by token isn't found!",
                    messageType: "Error"
                },
                { status: 409 }
            );
        }

        const todayDateTime = new Date().getTime();
        const userTokenTime = user.resetTokenExpiry ? user.resetTokenExpiry.getTime() : 0;

        if (userTokenTime === 0 && todayDateTime > userTokenTime) {
            return NextResponse.json(
                {
                    message: "Reset Key isn't already active or isn't found!",
                    messageType: "Error"
                },
                { status: 409 }
            );
        }

        const newHashedPass = await hashPassword(password);

        await prisma.users.update({
            where: {
                resetToken: receivedToken,
            },
            data: {
                password: newHashedPass,
            }
        })

        return NextResponse.json(
            {
                message: "Your password is successfully updated! Move in Signing In page.",
                messageType: "Success"
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: `An error during token initialization: ${error}.`,
                messageType: "Error"
            },
            { status: 500 }
        );
    }
}

export { POST };
