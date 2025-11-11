"use server";

import prisma from "../../../lib/utils/prismaClient";
import { ReadyOrderTypes } from "@/app/components/CafeManager/Cooking&ServingPage/Serving/ReadyOrdersTable";


export default async function readyOrdersGetter() {
    const readyOrders = await prisma.orders.findMany({
        where: {
            cafeID: 1,
            OR: [
                { orderStatus: "READY" },
                { orderStatus: "TAKEN" }
            ]
        },
        select: {
            orderNumber: true,
            sentTime: true,
            orderStatus: true,
            dishes: {
                select: {
                    dishes: {
                        select: {
                            food_name: true,
                        }
                    }
                }
            }
        },
        orderBy: [
            { orderStatus: 'asc' },
        ]
    });
    
    const statusPriority = [ "TAKEN", "READY" ];

    const sortedReadyOrders = readyOrders.sort((a, b) => {
        return statusPriority.indexOf(a.orderStatus) - statusPriority.indexOf(b.orderStatus);
    });

    return sortedReadyOrders as ReadyOrderTypes[];
}
