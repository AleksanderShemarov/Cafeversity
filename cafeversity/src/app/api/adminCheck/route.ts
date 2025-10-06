import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../../lib/utils/prismaClient";
import comparePasswords from "../../../../lib/utils/passwordUtils";
import createSessionsIdAndCookies from "../../../../lib/utils/sessionID";
import isInternet from "../../../../lib/utils/isInternet";
import uniqueGeneratedCode from "../../../../lib/utils/uniqueGenCode";
import nodemailer from "nodemailer";


const POST = async (request: NextRequest) => {
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get("page");

    if (page === null) {
        const { firstName, lastName, email, password } = await request.json();

        const adminUser = await prisma.adminUsers.findUnique({
            where: {
                Name: firstName,
                Surname: lastName,
                Email: email
            },
        });

        if (!adminUser) {
            return NextResponse.json(
                {
                    message: "This Admin User isn't registrated!",
                    status: "Error",
                },
                { status: 409 }
            );
        }

        if (adminUser.Email !== email) {
            return NextResponse.json(
                {
                    message: `This Admin doesn't exist\nwith this email: ${email}!`,
                    status: "Error" 
                },
                { status: 409 }
            );
        }

        if (adminUser.Name !== firstName && adminUser.Surname !== lastName) {
            return NextResponse.json(
                {
                    message: `This Admin doesn't exist\nwith this name: ${firstName} ${lastName}!`,
                    status: "Error" 
                },
                { status: 409 }
            );
        }

        const isTheSamePassword = await comparePasswords(password, adminUser ? adminUser.Password : "");
        if (!isTheSamePassword) {
            return NextResponse.json(
                {
                    message: "The password is input incorrectly!",
                    status: "Error",
                },
                { status: 409 }
            );
        }

        console.log("Checked before internet connection checking!");

        if (await isInternet()) {
            // nodemailer sends a generated code when the Internet connection exists.
            const code: string = uniqueGeneratedCode();

            const dateNow = Date.now();
            const dateTime = new Date(dateNow);
        
            await prisma.adminUsers.update({
                where: {
                    Email: email,
                },
                data: {
                    SentCode: code
                }
            });
        
            const emailTransporter = nodemailer.createTransport({
                service: "Gmail",
                port: 587,
                secure: false,// it would be "true" (boolean) if connecting to port 465
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });
    
            const mailOptions = {
                from: process.env.EMAIL_USERNAME as string,
                to: email,
                subject: "Cafeversity Admins",
                html: `<h1>Generated Code for Cafeversity Admin's Account</h1>
                <h2>Welcome, ${adminUser.Name} ${adminUser.Surname}</h2>
                <p>You watch this letter because you have requested it for getting a generated code for your Cafeversity's Admin Account.</p>
                <br />
                <p>Your code: ${code}</p>
                <br />
                <p>This letter has been sent at ${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}</p>`,
            }
    
            const info = await emailTransporter.sendMail(mailOptions);
            console.log('Email with a generated code has sent: ' + info.response);

            const response = NextResponse.json(
                {
                    message: "Check your email address. The entrance code has been sent.",
                    redirect: "/admiN_Login/codeConfirm",
                    adminId: adminUser.ID,
                    status: "Success"
                },
                { status: 201 }
            );
            return response;
        } else {
            console.log("checking when internet is off");
            const response = NextResponse.json(
                {
                    message: "There is no Internet connection. Please, wait a moment!",
                    redirect: "/admiN_Login/word",
                    adminId: adminUser.ID,
                    status: "Success"
                },
                { status: 201 }
            );
            return response;
        }
    } else if (page === "emailCode") {
        const { adminId, emailCode } = await request.json();
        
        const adminUser = await prisma.adminUsers.findUnique({
            where: {
                ID: Number(adminId)
            }
        });

        if(!adminUser || adminUser?.SentCode !== emailCode) {
            return NextResponse.json(
                {
                    message: "Incorrect input code!",
                    status: "Error",
                },
                { status: 409 }
            );
        }

        const sessionId = createSessionsIdAndCookies();
        await prisma.adminUsers.update({
            where: {
                ID: adminId,
            },
            data: {
                SessionId: sessionId,
                SentCode: null
            }
        });

        const response = NextResponse.json({
                message: "Entrance is accepted!",
                redirect: `/admin/${adminUser?.Name}_${adminUser?.Surname}/dashboard`,
                status: "Success"
            },
            { status: 201 }
        );
        response.cookies.set({
            name: 'adminSessionId',
            value: sessionId,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600 * 6,// 6 hours
            path: '/',
            sameSite: 'strict'
        });
        return response;
    }
}

export { POST };
