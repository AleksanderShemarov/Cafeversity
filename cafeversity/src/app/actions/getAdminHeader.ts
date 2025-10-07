"use server";

import { cookies } from "next/headers";
import prisma from "../../../lib/utils/prismaClient";
import { AdminHeaderTypes } from "../(admin)/layout";


export default async function getAdminHeader() {
    const sessionForAdmin = cookies().get("adminSessionId");

    const admin = await prisma.adminUsers.findUnique({
        where: {
            SessionId: sessionForAdmin?.value,
        },
        select: {
            Email: true,
            Photo: true,
            Language: true,
            Theme: true
        }
    }) as AdminHeaderTypes;
    return admin;
}
