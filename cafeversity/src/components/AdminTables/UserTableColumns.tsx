/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { ColumnConfig } from "@/components/AdminTables/TableParts/TableBody";
import { TableLoadingComponent } from "./TableParts/TableLoading";
const TableOnParts = dynamic(
    () => import("@/components/AdminTables/TableParts/TableBody").then(mod => mod.TableBody),
    {
        ssr: false,
        loading: () => <TableLoadingComponent loadingText="Users Table Loading..." />
    }
);

import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";


export function UsersAdminTable({ data }: { data: any[] }) {

    const columns: ColumnConfig<any>[] = [
        { name: 'ID', selector: (u) => u.id, sortable: true, omit: false },
        { name: 'FirstName', selector: (u) => u.firstName, sortable: true, omit: false },
        { name: 'LastName', selector: (u) => u.lastName, sortable: true, omit: false },
        { name: 'NickName', selector: (u) => u.nickName, sortable: true, omit: false },
        { name: '_UserPhoto', selector: (u) => u.userPhoto, sortable: false, omit: false },
        { name: 'Email', selector: (u) => u.email, sortable: false, omit: false, type: "email" },
        { name: 'Password', selector: (u) => u.password, sortable: false, omit: false },
        { name: '_SessionId', selector: (u) => u.sessionId, sortable: false, omit: false },
        { name: '_ResetToken', selector: (u) => u.resetToken, sortable: false, omit: false },
        { name: '_ResetTokenExpiry', selector: (u) => u.resetTokenExpiry, sortable: false, omit: false },
        { name: 'CustomSets', selector: (u) => u.customSets, sortable: true, omit: false, type: "number" },
    ];

    async function addingNewRow<T>(newRow: Partial<T>) {
        const response = await fetch("http://localhost:3000/api/register?page=dashboard/panel", {
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
        // .then((res) => {
        //     console.log(res.status);
        //     return res.json();
        // })
        // .then((data) => {
        //     if (data.status === "Success") {
        //         toast.success(data.message.split("\n")[0], { position: "top-right", style: { fontSize: "1.8rem" } });
        //         return data.newTableRow;
        //     }
        //     if (data.status === "Error") {
        //         toast.error(data.message, { position: "top-right", style: { fontSize: "1.8rem" } });
        //         return {};
        //     }
        // })
        // .catch((error) => console.error(error));
    }

    async function updateRow(id: number, updatedRow: any) {

        console.dir(updatedRow);

        await fetch("http://localhost:3000/api/admin/usersTable", {
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

        await fetch("http://localhost:3000/api/admin/usersTable", {
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
            title="Users Data Table (Divided on Parts)"
        />
    );
}
