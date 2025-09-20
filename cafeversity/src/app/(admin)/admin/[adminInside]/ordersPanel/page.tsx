import { use } from 'react';
import { OrdersAdminTable } from '@/components/AdminTables/OrdersAdminTable/OrderTableColumns';


export type DishesTableTypes = {
    id: number,
    order: number,
    user: string,
    cafe: string,
    cafeID: number,
    dishes: string,
    dishesIds: number[],
    sentTime: string,
    ready: boolean,
    phone: string,
    comment: string,
}


export type CafesType = {
    ID: number;
    cafeName: string;
}

export type DishesType = {
    id: number;
    food_name: string;
    cost: number;
}


async function fetchData() {
    const response = await fetch("http://localhost:3000/api/admin/ordersTable", { cache: "no-store" });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const users = await response.json();

    return users;
}


export default function AdminPanel() {

    const data = use(fetchData());
    // console.log("orders' data -->", data);

    return (
        <div style={{ width: "95%", margin: "2rem auto", padding: "0.5rem", border: "2px solid", borderRadius: "1rem" }}>
            <OrdersAdminTable data={data} />
        </div>
    );
}
