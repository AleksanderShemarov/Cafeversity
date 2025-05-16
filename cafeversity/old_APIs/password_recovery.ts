import prisma from "../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";


const RecoveryHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const userEmail: string = req.body.email;

        const isUserExisted = await prisma.users.findUnique({
            where: {
                email: userEmail,
            }
        });

        if (isUserExisted === null) {
            return res.status(409).json({ message: `The user with ${userEmail} isn't existed!` });
        } else {
            const reseToken = randomBytes(20).toString('hex');
            const dateNow = Date.now();
            const reseTokenTime = new Date(dateNow + 60 * 60 * 1000 * 12);// 60 * 60 * 1000 * 12 = 43.200.000 milliseconds = 12 hours
            console.log(`reset token = ${reseToken}\nreset token time = ${reseTokenTime}`);
            const dateTime = new Date(dateNow);

            await prisma.users.update({
                where: {
                    email: userEmail,
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
                    to: userEmail,
                    subject: "Password Recovery",
                    html: `<h1>Password Recovery for Cafeversity Account</h1>
                    <h2>Good time, ${isUserExisted.firstName} ${isUserExisted.lastName}</h2>
                    <p>You watch this letter because you have requested it for the recovering password for Cafeversity Account.</p>
                    <p>This letter has been sent at ${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}</p>
                    <p>Please, click on <a href=${resetUrl}>this link</a> to reset your password (it will be active next 12 hours after sending).</p>
                    <p>If you haven't requested any letter for password recovering, just ignore it.</p>`,
                }
                emailTransporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.error(error.message);
                        return res.status(500).json({
                            message: "Error during sending mail.",
                            error: error.message,
                        });
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.status(200).json({ message: "The special Recovery Key Letter has been sent on your email." });
                    }
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Server problems." });
            }
            // return res.status(200).json({ message: "The special Recovery Key Letter has been sent on your email." });
        }
    } else {
        return res.setHeader("Allow", ["POST"]).status(405).end(`Method ${req.method} is not allowed!`);
    }
}

export default RecoveryHandler;
