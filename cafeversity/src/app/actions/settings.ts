"use server";

import prisma from "../../../lib/utils/prismaClient";


export async function updateTastePreferences(
    userID: number,
    updates: {
        spicy?: boolean,
        vegetarian?: boolean,
        vegan?: boolean
    }
) {
    try {
        await prisma.$transaction(async (tx) => {
            const user = await tx.users.findFirst({
                where: {
                    id: userID
                },
                select: { customSets: { select: { id: true } } }
            });
        
            if (!user?.customSets) throw new Error("User not found!");
        
            await tx.customSets.update({
                where: {
                    id: user.customSets.id
                },
                data: updates
            });
        });
        
        return { success: true };
    } catch (error) {
        console.log("Update failed:", error);
        return { success: false, error: "Failed to update preferences" };
    }
}
