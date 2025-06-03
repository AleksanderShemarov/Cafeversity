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


export function UsersAdminTable({ data }: { data: any[] }) {

    const columns: ColumnConfig<any>[] = [
        { name: 'ID', selector: (u) => u.id, sortable: true, omit: false },
        { name: 'FirstName', selector: (u) => u.firstName, sortable: true, omit: false },
        { name: 'LastName', selector: (u) => u.lastName, sortable: true, omit: false },
        { name: 'NickName', selector: (u) => u.nickName, sortable: true, omit: false },
        { name: 'UserPhoto', selector: (u) => u.userPhoto, sortable: false, omit: false },
        { name: 'Email', selector: (u) => u.email, sortable: false, omit: false, type: "email" },
        { name: 'Password', selector: (u) => u.password, sortable: false, omit: false },
        { name: 'SessionId', selector: (u) => u.sessionId, sortable: false, omit: false },
        { name: 'ResetToken', selector: (u) => u.resetToken, sortable: false, omit: false },
        { name: 'ResetTokenExpiry', selector: (u) => u.resetTokenExpiry, sortable: false, omit: false },
        { name: 'CustomSets', selector: (u) => u.customSets.id, sortable: true, omit: false },
    ];

    return (
        <TableOnParts
            initialData={data}
            initialColumns={columns}
            loading={false}
            title="Users Data Table (Divided on Parts)"
        />
    );
}
