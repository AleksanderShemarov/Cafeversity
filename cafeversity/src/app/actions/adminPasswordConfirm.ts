"use server";

import prisma from "../../../lib/utils/prismaClient";
import comparePasswords from "../../../lib/utils/passwordUtils";


export default async function adminPasswordConfirm(email: string, password: string) {

    const admin = await prisma.adminUsers.findUnique({
        where: {
            Email: email,
        }
    });

    const isTheSameAdminPassword = await comparePasswords(password, admin ? admin.Password : "");

    if (!isTheSameAdminPassword) {
        return { success: false };
    }

    return { success: true };
}
