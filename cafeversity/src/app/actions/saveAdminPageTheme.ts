"use server";

import { cookies } from "next/headers";
import prisma from "../../../lib/utils/prismaClient";
import { revalidateTag } from "next/cache";


export default async function saveAdminPageTheme(theme: "light"|"dark") {
    const session = cookies().get("adminSessionId");

    if (!session) return { success: false };
    
    if (theme === "light") {
        await prisma.adminUsers.update({
            where: {
                SessionId: session.value
            },
            data: {
                Theme: "dark"
            }
        });
    } else if (theme === "dark") {
        await prisma.adminUsers.update({
            where: {
                SessionId: session.value
            },
            data: {
                Theme: "light"
            }
        });
    }

    revalidateTag("admin-page-theme");

    return { success: true };
}
