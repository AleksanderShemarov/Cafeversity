import { use } from "react";
import prisma from "../../../../../lib/utils/prismaClient";
import NewOrdersTable, { OrderTypes } from "@/app/components/CafeManager/OrdersManagement/OrdersPreview/NewOrdersTable";
import NewOrderPreview from "@/app/components/CafeManager/OrdersManagement/OrdersPreview/NewOrderPreview";


const weekdays: string[] = [ "Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота" ] as const;


async function fetchOrders() {
    const orders = await prisma.orders.findMany({
        where: { cafeID: 1 },
        select: {
            orderNumber: true,
            sentTime: true,
            orderStatus: true,
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
        },
        orderBy: [
            { orderStatus: 'asc' },
        ]
    });

    const statusPriority = ["TAKEN", "CANCELLED", "READY", "PREPARING", "SENT"];

    const sortedOrders = orders.sort((a, b) => {
        return statusPriority.indexOf(a.orderStatus) - statusPriority.indexOf(b.orderStatus);
    });

    return sortedOrders;
}


export default function Orders({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

    const data: OrderTypes[] = use(fetchOrders()) as OrderTypes[];
    const selectedOrder = searchParams.selected as string | undefined;

    return (
        <div className="w-[100dvw]">
            {/* <div className="w-[100%] h-[15dvh] px-[1.5rem] outline-2 outline-emerald-400">
                Ready Orders
            </div> */}
            <div className="h-[85dvh] px-[1.5rem] flex flex-row gap-[1.5rem]">
                <NewOrdersTable data={data} weekdays={weekdays} />
                <NewOrderPreview orderNumber={selectedOrder} />
            </div>
        </div>
    );
}
