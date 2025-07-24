"use server";

import prisma from "../../../lib/utils/prismaClient";
import { revalidateTag } from "next/cache";
import { Prisma } from "@prisma/client";


export type UpdateAdminData = {
    [K in keyof Prisma.AdminUsersUpdateInput]?: Prisma.AdminUsersUpdateInput[K];
};


export async function adminUpdate(updateAdminData: UpdateAdminData, adminID: number) {
    try {
        await prisma.adminUsers.update({
            where: {
                ID: adminID
            },
            data: updateAdminData
        });

        if (updateAdminData.Name && updateAdminData.Surname) {
            revalidateTag("admin-data");
            return { success: true, redirect: `/admin/${updateAdminData.Name}_${updateAdminData.Surname}/setups` };
        }

        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
