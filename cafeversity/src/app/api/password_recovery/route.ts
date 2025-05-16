import prisma from "../../../../lib/utils/prismaClient";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";


const POST = async (request: Request) => {
    const { email } = await request.json();

    const isUserExisted = await prisma.users.findUnique({
        where: {
            email: email,
        }
    });

    if (isUserExisted === null) {
        return NextResponse.json(
            {
                message: `The user with ${email} isn't existed!`,
                messageType: "Error"
            },
            { status: 409 }
        );
    }

    const reseToken = randomBytes(20).toString('hex');
    const dateNow = Date.now();
    const reseTokenTime = new Date(dateNow + 60 * 60 * 1000 * 12);// 60 * 60 * 1000 * 12 = 43.200.000 milliseconds = 12 hours
    const dateTime = new Date(dateNow);

    await prisma.users.update({
        where: {
            email: email,
        },
        data: {
            resetToken: reseToken,
            resetTokenExpiry: reseTokenTime,
        }
    });

    try {
        const emailTransporter = nodemailer.createTransport({
            service: "Gmail",
            port: 587,
            secure: false,// it would be "true" (boolean) if connecting to port 465
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const resetUrl = `http://localhost:3000/login/resetPassword?token=${reseToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USERNAME as string,
            to: email,
            subject: "Password Recovery",
            html: `<h1>Password Recovery for Cafeversity Account</h1>
            <h2>Good time, ${isUserExisted.firstName} ${isUserExisted.lastName}</h2>
            <p>You watch this letter because you have requested it for the recovering password for Cafeversity Account.</p>
            <br />
            <p>This letter has been sent at ${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}</p>
            <p>Please, click on <a href=${resetUrl}>this link</a> to reset your password (it will be active next 12 hours after sending).</p>
            <br />
            <p>If you haven't requested any letter for password recovering, just ignore it.</p>`,
        }

        const info = await emailTransporter.sendMail(mailOptions);
        
        console.log('Email sent: ' + info.response);
        return NextResponse.json(
            {
                message: "The special Recovery Key Letter has been sent on your email.",
                messageType: "Success"
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: `Server problems: ${error}`,
                messageType: "Error"
            },
            { status: 500 }
        );
    }
}

export { POST };
