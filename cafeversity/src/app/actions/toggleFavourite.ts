"use server";

import prisma from "../../../lib/utils/prismaClient";


export default async function toggleFavourite(userName: string, dishID: number) {

    const names = userName.split("_");

    const user = await prisma.users.findFirst({
        where: {
            AND: [
                { firstName: names[0] },
                { lastName: names[1] }
            ]
        },
        select: {
            id: true
        }
    });

    if (!user) return { success: false, message: "The User isn't found" };

    const existingFavourite = await prisma.usersDishes.findUnique({
        where: {
            userID_dishID: {
                userID: user.id,
                dishID: dishID
            }
        }
    });

    if (existingFavourite) {
        await prisma.usersDishes.delete({
            where: {
                userID_dishID: {
                    userID: user.id,
                    dishID: dishID
                }
            }
        });
        return { success: true, message: "removed" };
    } else {
        await prisma.usersDishes.create({
            data: {
                userID: user.id,
                dishID: dishID
            }
        });
        return { success: true, message: "added" };
    }
}
