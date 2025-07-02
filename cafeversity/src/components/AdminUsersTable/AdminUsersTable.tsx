/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { ColumnConfig } from "@/components/AdminTables/TableParts/TableBody";
import { TableLoadingComponent } from "../AdminTables/TableParts/TableLoading";
const AdminRoles = dynamic(
    () => import("@/components/AdminTables/TableParts/TableBody").then(mod => mod.TableBody),
    {
        ssr: false,
        loading: () => <TableLoadingComponent loadingText="Admins Table Loading..." />
    }
);


export function AdminUsersTable({ data }: { data: any[] }) {

    const columns: ColumnConfig<any>[] = [
        { name: 'ID', selector: (a) => a.ID, sortable: true, omit: false },
        { name: 'Name', selector: (a) => a.Name, sortable: true, omit: false },
        { name: 'Surname', selector: (a) => a.Surname, sortable: true, omit: false },
        { name: 'Email', selector: (a) => a.Email, sortable: false, omit: false, type: "email" },
        { name: 'EmailConfirmed', selector: (a) => a.EmailConfirmed, sortable: true, omit: false },
        { name: 'Telephone', selector: (a) => a.Telephone, sortable: false, omit: false },
        { name: 'Role', selector: (a) => a.Role, sortable: false, omit: false },
        { name: 'Photo', selector: (a) => a.Photo, sortable: false, omit: false },
        { name: 'Language', selector: (a) => a.Language, sortable: false, omit: false },
        { name: 'SessionId', selector: (a) => a.SessionId, sortable: false, omit: false },
        { name: 'Password', selector: (a) => a.Password, sortable: false, omit: false },
        { name: 'SecretWord', selector: (a) => a.SecretWord, sortable: true, omit: false },
        { name: 'ResetToken', selector: (a) => a.resetToken, sortable: false, omit: false },
        { name: 'ResetTokenExpiry', selector: (a) => a.resetTokenExpiry, sortable: false, omit: false },        
    ];

    return (
        <AdminRoles
            initialData={data}
            initialColumns={columns}
            loading={false}
            title="Admins' Role (Table) Page"
        />
    )
}