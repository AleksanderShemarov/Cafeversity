import { use } from 'react';
import { CafesAdminTable } from '@/components/AdminTables/CafesAdminTable/CafeTableColumns';


export type CafesTableTypes = {
    id: number,
    cafeName: string,
    openHour: string,
    city: string,
    street: string,
    country: string,
    phone: string,
}


async function fetchData() {
    const response = await fetch("http://localhost:3000/api/admin/cafesTable?page=dashboard/cafesPanel", { cache: "no-store" });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const users = await response.json();

    return users;
}


export default function AdminPanel() {

    const data: CafesTableTypes[] = use(fetchData());
    // console.log("cafes' data -->", data);

    return (
        <div style={{ width: "95%", margin: "2rem auto", padding: "0.5rem", border: "2px solid", borderRadius: "1rem" }}>
            <CafesAdminTable data={data} />
        </div>
    );
}
