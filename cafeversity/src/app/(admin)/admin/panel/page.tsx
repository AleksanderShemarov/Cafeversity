import dynamic from 'next/dynamic';
const AdminTable = dynamic(
    () => import("@/components/AdminTables/UserTable").then(mod => mod.TableComponent),
    {
        ssr: false,
        loading: () => <p style={{ fontSize: "2rem" }}>Admin&#39;s Users Table Loading...</p>
    }
);


export default async function AdminPanel() {

    // Another data rows
    /* const rowData = [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Škoda", model: "Caroq", price: 28000 },
        { make: "AstonMartin", model: "AM V5", price: 60000 },
        { make: "BMW", model: "Stortage", price: 75000 },
        { make: "Dacia", model: "Lightning", price: 20000 },
        { make: "Shemper", model: "WaterFlow", price: 31500 },
        { make: "Mitsubishi", model: "Hepard", price: 72000 },
        { make: "Fiat", model: "Smart", price: 12000 },
    ];*/


    // Mantine React Table
    // const data = [
    //     { id: 1, fullName: "Jayson Steitem", email: "steitem@example.com", role: "Main Admin" },
    //     { id: 2, fullName: "John Doe", email: "doe@example.com", role: "Senior Admin" },
    //     { id: 3, fullName: "Tomašek Aleksander", email: "aleksander@example.com", role: "Support Admin" },
    //     { id: 4, fullName: "Alghary Metallicus", email: "metalicus@example.com", role: "Route Admin" },
    //     { id: 5, fullName: "Václav Havel", email: "havel@example.com", role: "User" },
    //     { id: 6, fullName: "Francysk Skaryna", email: "skaryna@example.com", role: "User" },
    //     { id: 7, fullName: "Aelita Schaffer", email: "schaffer@example.com", role: "User" }
    // ];

    // const mantineColumns = [
    //     { accessorKey: 'id', header: "ID" },
    //     { accessorKey: 'fullName', header: "FullName", editable: true },
    //     { accessorKey: 'email', header: "Email", editable: true },
    //     { accessorKey: 'role', header: "Role", editable: true }
    // ];

    return (
        <>
            <p style={{ fontSize: "2rem" }}>Admin&#39;s Panel Page</p>
            <div style={{ width: "95%", margin: "2rem auto", padding: "0.5rem", border: "2px solid", borderRadius: "1rem" }}>
                <AdminTable />
            </div>
        </>
    );
}
