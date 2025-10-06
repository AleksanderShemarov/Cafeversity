import { use } from 'react';
import { DishesAdminTable } from '@/components/AdminTables/DishesAdminTable/DishTableColumns';


export type DishesTableTypes = {
    id: number,
    name: string,
    include: string,
    spicy: boolean,
    veget: boolean,
    vegan: boolean,
    protein: string,
    fat: string,
    carbo: string,
    amino: string,
    portion: string,
    cost: string,
    image: string,
}


async function fetchData() {
    const response = await fetch("http://localhost:3000/api/admin/dishesTable", { cache: "no-store" });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const users = await response.json();

    return users;
}


export default function AdminPanel() {

    const data: DishesTableTypes[] = use(fetchData());
    // console.log("dishes' data -->", data);

    return (
        <div style={{ width: "95%", margin: "2rem auto", padding: "0.5rem", border: "2px solid", borderRadius: "1rem" }}>
            <DishesAdminTable data={data} />
        </div>
    );
}
