/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { ColumnConfig } from "@/components/AdminTables/TableParts/TableBody";
import { TableLoadingComponent } from "../TableParts/TableLoading";
const TableOnParts = dynamic(
    () => import("@/components/AdminTables/TableParts/TableBody").then(mod => mod.TableBody),
    {
        ssr: false,
        loading: () => <TableLoadingComponent loadingText="Cafes Table Loading..." />
    }
);

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";


export function CafesAdminTable({ data }: { data: any[] }) {

    const columns: ColumnConfig<any>[] = [
        { name: 'ID', selector: (u) => u.id, sortable: false, omit: true },
        { name: 'CafeName', selector: (u) => u.cafeName, sortable: true, omit: false },
        { name: 'OpenHour', selector: (u) => u.openHour, sortable: false, omit: true },
        { name: 'City', selector: (u) => u.city, sortable: false, omit: true },
        { name: 'Street', selector: (u) => u.street, sortable: false, omit: true },
        { name: 'Country', selector: (u) => u.country, sortable: false, omit: true },
        { name: 'Phone', selector: (u) => u.phone, sortable: true, omit: true },
    ];

    async function addingNewRow<T>(newRow: Partial<T>) {
        const response = await fetch("http://localhost:3000/api/admin/cafesTable", {
            method: "POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(newRow),
        });

        const data = await response.json();

        if (data.status === "Success") {
            toast.success(data.message.split("\n")[0], { position: "top-right", style: { fontSize: "1.8rem" } });
            return data.newTableRow;
        }
        if (data.status === "Error") {
            toast.error(data.message, { position: "top-right", style: { fontSize: "1.8rem" } });
            return undefined;
        }
    }

    async function updateRow(id: number, updatedRow: any) {

        console.dir(updatedRow);

        await fetch("http://localhost:3000/api/admin/cafesTable", {
            method: "PATCH",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, updatedRow }),
        })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then((data) => {
            if (data.status === "Success") toast.success(data.message, { position: "top-right", style: { fontSize: "1.8rem" } });
            if (data.status === "Error") toast.error(data.message, { position: "top-right", style: { fontSize: "1.8rem" } });
        })
        .catch((error) => console.error(error));
    }

    async function deleteRows(ids: Set<number>) {

        const idsArray = Array.from(ids);
        console.log("ids -->", ids);

        await fetch("http://localhost:3000/api/admin/cafesTable", {
            method: "DELETE",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(idsArray),
        })
        .then((res) => {
            console.log(res.status);
            return res.json();
        })
        .then((data) => {
            if (data.status === "Success") toast.success(data.message, { position: "top-right", style: { fontSize: "1.8rem" } });
            if (data.status === "Error") toast.error(data.message, { position: "top-right", style: { fontSize: "1.8rem" } });
        })
        .catch((error) => console.error(error));
    }

    return (
        <TableOnParts
            initialData={data}
            initialColumns={columns}
            loading={false}
            onRowAdd={addingNewRow}
            onRowUpdate={updateRow}
            onRowsDelete={deleteRows}
            title="Cafes Data Table"
        />
    );
}
