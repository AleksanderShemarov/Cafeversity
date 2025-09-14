"use server";

import prisma from "../../../lib/utils/prismaClient";
import { cookies } from "next/headers";
import orderCode from "../../../lib/utils/orderCode";


export default async function orderSaving(choisenDishes: { id: number, checkedDish: boolean|null }[], idCafe: number, telephone: string, orderComment: string) {
    const userCookie = cookies().get("sessionId");

    if (!userCookie) return {code: false, message: "User's Cookie isn't found!"};
    
    const user = await prisma.users.findUnique({
        where: {
            sessionId: userCookie.value
        },
        select: {
            id: true
        }
    });

    if (!user) return { code: false, message: "User isn't found!" };

    const codeForOrder = orderCode();

    const sentTime = new Date().toISOString();

    const checkedDishes = choisenDishes.filter(dish => dish.checkedDish).map(dish => dish.id);

    // await prisma.$transaction(async (tx) => {
    //     const order = await tx.orders.create({
    //         data: {
    //             orderNumber: Number(codeForOrder),
    //             userID: user.id,
    //             cafeID: idCafe,
    //             sentTime: sentTime,
    //             phone: telephone,
    //             comment: orderComment,
    //         },
    //         select: {
    //             ID: true
    //         }
    //     });
    
    //     for (const dishId of checkedDishes) {
    //         await tx.dishesByOrders.create({
    //             data: {
    //                 orderID: order.ID,
    //                 dishID: dishId
    //             }
    //         });
    //     }
    // });

    await prisma.orders.create({
        data: {
            orderNumber: Number(codeForOrder),
            userID: user.id,
            cafeID: idCafe,
            sentTime: sentTime,
            phone: telephone,
            comment: orderComment,
            dishes: {
                create: checkedDishes.map(dishId =>
                    ({ dishID: dishId })
                )
            }
        }
    });

    return { code: true, message: `Your order #${codeForOrder} has been done!` };
}
