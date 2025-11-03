"use server";

import prisma from "../../../lib/utils/prismaClient";


export default async function saveDishReadyInDB (orderNumber: string, dishName: string) {
    const order = await prisma.orders.findUnique({
        where: {
            orderNumber: Number(orderNumber)
        },
        select: {
            ID: true,
            dishes: {
                select: {
                    dishID: true,
                    dishes: {
                        select: {
                            food_name: true
                        }
                    }
                }
            }
        }
    });

    if (order === null) return { status: false, text: `Order #${orderNumber} doesn't exist!` };

    const orderID = order.ID;
    const dish = order.dishes.find(dishInfo => dishInfo.dishes.food_name === dishName);

    if (dish === undefined) return { status: false, text: `Dish "${dishName}" isn't found at the order #${orderNumber}!` };

    const dishID = dish.dishID;

    await prisma.dishesByOrders.update({
        where: {
            dishID_orderID: {
                orderID: orderID,
                dishID: dishID
            }
        },
        data: {
            dishReady: true
        }
    });

    return { status: true, text: `Dish "${dishName}" is ready.` };
}
