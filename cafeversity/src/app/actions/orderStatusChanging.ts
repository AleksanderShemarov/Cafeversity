"use server";

import prisma from "../../../lib/utils/prismaClient";
import { redirect } from "next/navigation";


export default async function orderOnPreparing(orderNumber: number) {
    await prisma.orders.update({
        where: {
            orderNumber: orderNumber
        },
        data: {
            orderStatus: "PREPARING"
        }
    });

    redirect(`/cafeManager/orders/${orderNumber}`);
}

export async function changeOrderStatus(formData: FormData) {

    const orderNumber = Number(formData.get("number-of-order"));
    const newStatus = formData.get("order-status") as string;

    if (newStatus === "PREPARING") redirect(`/cafeManager/orders?selected=${orderNumber}`);

    await prisma.orders.update({
        where: {
            orderNumber: orderNumber
        },
        data: {
            orderStatus: newStatus
        }
    });

    redirect(`/cafeManager/orders?selected=${orderNumber}`);
}
