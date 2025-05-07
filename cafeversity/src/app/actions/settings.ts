"use server";

import prisma from "../../../lib/utils/prismaClient";
import { SetsState } from "@/components/SettingsPage/SettingsPage";


export async function allSetsUpdate(userID: number, settings: SetsState) {
    try {
        await prisma.customSets.update({
            where: {
                userId: userID
            },
            data: settings
        })
        
        return { success: true };
    } catch (error) {
        console.log("Update failed:", error);
        return { success: false, error: "Failed to update all settings" };
    }
}
