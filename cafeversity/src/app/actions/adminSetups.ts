"use server";

import prisma from "../../../lib/utils/prismaClient";
import { revalidateTag } from "next/cache";
import { Prisma } from "@prisma/client";
import fs, { writeFile, unlink } from "node:fs/promises";
import path from "node:path";


const MAX_FILE_SIZE = 10 * 1024 * 1024;


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


export async function newAdminPhotoDbServer(avatar: FormData, avatarRealName: string) {
    try {
        const file = avatar.get("adminAvatar") as File;
        if (!file) return { success: false, error: "No file provided" };
        if (file.size > MAX_FILE_SIZE) return { success: false, error: "The file is more than 10MB!" }

        const uploadDir = path.join(process.cwd(), "public/adminPhotos");
        await fs.mkdir(uploadDir, { recursive: true });

        // const timestamp = Date.now();
        // const ext = path.extname(file.name);
        // const filename = `admin_${timestamp}${ext}`;
        // const filePath = path.join(uploadDir, filename);
        const filePath = path.join(uploadDir, avatarRealName);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await writeFile(filePath, buffer);

        return { success: true };
    } catch (error) {
        console.error("Upload failed:", error);
        return { success: false, error: "Problem with 'newAdminPhotoDbServer'!" };
    }
}

export async function deleteAdminPhotoDbServer(avatarPath: string) {
    try {
        const filePath = path.join(process.cwd(), 'public', avatarPath);

        await unlink(filePath);

        return { success: true };
    } catch (error) {
        console.error("Delete failed:", error);
        return { success: false, error: error instanceof Error ? error.message : "Deletion failed" };
    }
}
