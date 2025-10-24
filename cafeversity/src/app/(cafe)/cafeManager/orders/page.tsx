import { use } from "react";
import prisma from "../../../../../lib/utils/prismaClient";
import NewOrdersTable from "@/app/components/CafeManager/OrdersManagement/NewOrdersTable";


const weekdays: string[] = [ "Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота" ] as const;


async function fetchOrders() {
    const orders = await prisma.orders.findMany({
        where: {
            AND: [
                { cafeID: 1 },
                { readyStatus: false },
            ]
        },
        select: {
            orderNumber: true,
            sentTime: true,
            phone: true,
            comment: true,
            dishes: {
                select: {
                    dishes: {
                        select: {
                            food_name: true,
                        }
                    }
                }
            }
        }
    });

    return orders;
}


export default function Orders() {

    const data = use(fetchOrders());

    return (
        <div className="w-[100dvw]">
            {/* <div className="w-[100%] h-[15dvh] px-[1.5rem] outline-2 outline-emerald-400">
                Ready Orders
            </div> */}
            <div className="w-[100%] h-[85dvh] px-[1.5rem] outline-2 outline-orange-400">
                <NewOrdersTable data={data} weekdays={weekdays} />
            </div>
        </div>
    );
}
