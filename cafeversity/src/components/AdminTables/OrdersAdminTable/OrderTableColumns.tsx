/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { ColumnConfig } from "@/components/AdminTables/TableParts/TableBody";
import { TableLoadingComponent } from "../TableParts/TableLoading";
import { CafesType, DishesTableTypes, DishesType } from "@/app/(admin)/admin/[adminInside]/ordersPanel/page";
const TableOnParts = dynamic(
    () => import("@/components/AdminTables/TableParts/TableBody").then(mod => mod.TableBody),
    {
        ssr: false,
        loading: () => <TableLoadingComponent loadingText="Cafes Table Loading..." />
    }
);
import { OrdersExpander } from "./OrdersExpander";
import { TableRowExpanderProps } from "../TableParts/TableExpander";
import { SubHeaderComponentProps } from "./OrdersSubHeader";
import OrdersSubHeader from "./OrdersSubHeader";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";


interface OrdersAdminTableProps {
    data: {
        orders: DishesTableTypes[];
        cafes: CafesType[];
        allDishes: DishesType[];
    };
}


export function OrdersAdminTable({ data }: OrdersAdminTableProps) {
    const {
        orders,
        cafes,
        allDishes
    } = data;
    
    const columns: ColumnConfig<any>[] = [
        { name: 'ID', selector: (u) => u.id, sortable: false, omit: true },
        { name: 'Order', selector: (u) => u.order, sortable: true, omit: false },
        { name: 'User', selector: (u) => u.user, sortable: true, omit: false },
        { name: 'Cafe', selector: (u) => u.cafe, sortable: true, omit: false },
        { name: 'Dishes', selector: (u) => u.dishes, sortable: false, omit: false },
        { name: 'SentTime', selector: (u) => u.sentTime, sortable: false, omit: true },
        { name: 'Ready', selector: (u) => u.ready ? '✅' : '❌', sortable: false, omit: false, type: "bool" },
        { name: 'Phone', selector: (u) => u.phone, sortable: false, omit: true },
        { name: 'Comment', selector: (u) => u.comment, sortable: false, omit: true },

        { name: '_cafeID', selector: (u) => u.cafeID, omit: true },
        { name: '_dishIds', selector: (u) => u.dishIds.join(','), omit: true }
    ];

    const customComponents = {
        Expander: (props: TableRowExpanderProps<any>) => (
            <OrdersExpander
                {...props}
                cafes={cafes}
                allDishes={allDishes}
            />
        ),
        SubHeader: (props: SubHeaderComponentProps<any>) => (
            <OrdersSubHeader {...props} />
        )
    };

    // async function addingNewRow<T>(newRow: Partial<T>) {
    //     const response = await fetch("http://localhost:3000/api/admin/ordersTable", {
    //         method: "POST",
    //         headers:{ 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newRow),
    //     });
    //
    //     const data = await response.json();
    //
    //     if (data.status === "Success") {
    //         toast.success(data.message.split("\n")[0], { position: "top-right", style: { fontSize: "1.8rem" } });
    //         return data.newTableRow;
    //     }
    //     if (data.status === "Error") {
    //         toast.error(data.message, { position: "top-right", style: { fontSize: "1.8rem" } });
    //         return undefined;
    //     }
    // }

    async function updateRow(id: number, updatedRow: any) {
    
        // console.dir(updatedRow);
    
        await fetch("http://localhost:3000/api/admin/ordersTable", {
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
    
        await fetch("http://localhost:3000/api/admin/ordersTable", {
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
            initialData={orders}
            initialColumns={columns}
            loading={false}
            // onRowAdd={addingNewRow}
            onRowUpdate={updateRow}
            onRowsDelete={deleteRows}
            title="Orders Data Table"
            components={customComponents}
        />
    );
}
