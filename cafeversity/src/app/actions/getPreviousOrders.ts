"use server";

import { cookies } from "next/headers";
import prisma from "../../../lib/utils/prismaClient";


export default async function getPreviousOrders() {
    const cookieFile = cookies().get("sessionId");
    if (!cookieFile) return [];

    const user = await prisma.users.findUnique({
        where: {
            sessionId: cookieFile.value
        },
        select: {
            id: true
        }
    });
    if (!user) return [];

    const orders = await prisma.orders.findMany({
        where: {
            userID: user.id
        },
        select: {
            ID: true,
            orderNumber: true,
            cafe: {
                select: {
                    cafeName: true
                }
            },
            sentTime: true,
            readyStatus: true,
            dishes: {
                select: {
                    dishes: {
                        select: {
                            id: true,
                            food_name: true,
                            imagePath: true,
                            food_portion: true,
                            cost: true
                        }
                    }
                }
            }
        }
    });

    return orders.map(order => {
        const { ID, orderNumber, cafe, sentTime, readyStatus, dishes } = order;

        const sentDate = new Date(sentTime);
        
        return {
            id: ID,
            orderNumber,
            cafeName: cafe.cafeName,
            date: sentDate.toLocaleDateString('en-CA'),
            time: sentDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            }),
            readyStatus,
            total: dishes.length,
            dishes: dishes.map(({ dishes: dish }) => ({
                id: dish.id,
                food_name: dish.food_name,
                imagePath: dish.imagePath.substring(8),
                food_portion: Number(dish.food_portion),
                cost: Number(dish.cost)
            }))
        };
    });
}
