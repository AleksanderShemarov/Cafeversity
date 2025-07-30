"use server";

import { randomBytes } from "crypto";
import prisma from "../../../lib/utils/prismaClient";
import nodemailer from "nodemailer";


export async function letterForEmailConfirmation(email: string) {
    const admin = await prisma.adminUsers.findUnique({
        where: {
            Email: email
        }
    });

    if (!admin) return { success: false };

    const emailTransporter = nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        secure: false,// it would be "true" (boolean) if connecting to port 465
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const dateNow = Date.now();
    const dateTime = new Date(dateNow);

    const reseToken = randomBytes(20).toString('hex');

    await prisma.adminUsers.update({
        where: {
            ID: admin.ID
        },
        data: {
            ResetToken: reseToken
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME as string,
        to: admin.Email,
        subject: "Cafeversity Admins",
        html: `<h1>Generated Code for Cafeversity Admin's Account</h1>
        <h2>Welcome, ${admin.Name} ${admin.Surname}</h2>
        <p>We have sent this letter because you want to confirm your email address at your Cafeversity's Admin Account.</p>
        <br />
        <p>Please, copy this reset token and input into a field on the right side of your email address: ${reseToken}</p>
        <br />
        <p>This letter has been sent at ${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}</p>`,
    }

    const info = await emailTransporter.sendMail(mailOptions);
    console.log("info.response from 'letterForEmailConfirmation' -->", info.response);

    return { success: true };
}


export async function emailTokenConfirm(token: string) {
    const admin = await prisma.adminUsers.findUnique({
        where: {
            ResetToken: token
        }
    });

    if (!admin) return { success: false };

    await prisma.adminUsers.update({
        where: {
            ID: admin.ID
        },
        data: {
            ResetToken: null,
            EmailConfirmed: true
        }
    });

    return { success: true };
}
