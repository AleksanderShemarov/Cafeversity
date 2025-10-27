"use server";

import prisma from "../../../lib/utils/prismaClient";
import { OrderXTypes } from "../components/CafeManager/OrdersManagement/NewOrderPreview";


export default async function orderPreview(orderNumber: string) {
    const order = await prisma.orders.findUnique({
        where: {
            orderNumber: Number(orderNumber)
        },
        select: {
            sentTime: true,
            orderStatus: true,
            phone: true,
            comment: true,
            dishes: {
                select: {
                    dishes: {
                        select: {
                            food_name: true,
                            cost: true,
                            imagePath: true,
                        }
                    }
                }   
            }
        }
    });

    const dishes = order!.dishes.map(dish => {
        return {
            ...dish,
            dishes: { ...dish.dishes, cost: Number(dish.dishes.cost) }
        }
    });
    
    return {
        ...order,
        dishes: dishes
    } as OrderXTypes;
}
