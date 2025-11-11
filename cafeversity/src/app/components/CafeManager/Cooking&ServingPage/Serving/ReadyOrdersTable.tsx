"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRouter, useSearchParams } from "next/navigation";
import { IconCashRegister } from "@tabler/icons-react";
import { useState } from "react";
import { useViewContext } from "./ViewContext";


export type ReadyOrderTypes = {
    orderNumber: number,
    sentTime: Date,
    orderStatus: "READY"|"TAKEN",
    dishes: {
        dishes: {
            food_name: string,
        }
    }[]
}


export default function ReadyTakenOrdersTable ({ readyOrders }: { readyOrders: ReadyOrderTypes[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedRow, setSelectedRow] = useState<Record<string, any>|null>(null);

    const { partActive } = useViewContext();

    const orderNumberBodyTemplate = (rowData: ReadyOrderTypes) => {
        return (
            <p className="w-[9rem] text-[1.8rem] font-medium">
                #{rowData.orderNumber}
            </p>
        );
    };

    const dishesBodyTemplate = (rowData: ReadyOrderTypes) => {
        return (
            <p className="text-[1.6rem] font-normal text-balance">
                {rowData.dishes.map(dish => dish.dishes.food_name).join(", ")}
            </p>
        );
    };

    const sentTimeBodyTemplate = (rowData: ReadyOrderTypes) => {
        const date = rowData.sentTime;
        return (
            <p className="text-[1.4rem] font-light">
                {date.getFullYear()}-{String(date.getMonth()+1).padStart(2, "0")}-{String(date.getDate()).padStart(2, "0")}, ({date.getHours()}:{date.getMinutes().toString().padStart(2, "0")})
            </p>
        );
    };

    const orderStatusBodyTemplate = (rowData: ReadyOrderTypes) => {
        const orderStatus = rowData.orderStatus;
        switch (orderStatus) {
            case "READY":
                return (<p className="bg-green-100 text-green-800 text-[1.8rem] text-center font-semibold">{orderStatus}</p>);
            case "TAKEN":
                return (<p className="bg-purple-100 text-purple-800 text-[1.8rem] text-center font-bold">{orderStatus}</p>);
            default:
                return (<p className="bg-gray-100 text-gray-800 text-[1.8rem] text-center font-thin">UNKNOWN</p>);
        }
    }

    const actionsBodyTemplate = (rowData: ReadyOrderTypes) => {
        function handleSelectedOrder(orderNumber: number) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("choisenReady", String(orderNumber));
            router.replace(`?${params.toString()}`, { scroll: false });
        }

        return (
            <div className="w-[100%] h-[100%] flex items-center justify-center">
                <button onClick={() => handleSelectedOrder(rowData.orderNumber)}>
                    <IconCashRegister className="w-[3.5rem] h-[3.5rem] rounded-[50%] no-underline text-[gray] hover:text-[darkgray] transition-colors" />
                </button>
            </div>
        );
    };

    return (
        <DataTable 
            value={readyOrders}
            emptyMessage="Няма замоў"
            style={{
                display: partActive === "ready-orders" ? "block" : "none",
                fontSize: "1.9rem", fontFamily: "Arial", fontWeight: 600,
                width: "calc(100% - 3rem)", outline: "2px solid lightgray",
                margin: "0 auto"
            }}
            tableStyle={{ width: "100%" }}
            removableSort
            showGridlines
            selectionMode="single"
            selection={selectedRow}
            onSelectionChange={(e) => setSelectedRow(e.value)}
        >
            <Column 
                field="orderNumber" 
                header="Замова №" 
                body={orderNumberBodyTemplate}
                style={{ width: '12rem', paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                headerStyle={{ height: "3rem" }}
            />
            <Column 
                field="dishes" 
                header="Стравы" 
                body={dishesBodyTemplate}
                style={{ width: '40rem', paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                headerStyle={{ height: "3rem" }}
            />
            <Column 
                field="sentTime" 
                header="Час Замовы" 
                body={sentTimeBodyTemplate}
                style={{ width: '20rem', paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                headerStyle={{ height: "3rem", position: "relative" }}
                sortable
                pt={{
                    sort: {
                        className: "absolute right-2 top-1/2 transform -translate-y-1/2 inline-flex"
                    },
                    sortIcon: {
                        className: 'w-[1.9rem] h-[1.9rem] ml-2'
                    }
                }}
            />
            <Column 
                field="orderStatus" 
                header="Стан" 
                body={orderStatusBodyTemplate}
                style={{ width: '12rem', paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                headerStyle={{ height: "3rem", position: "relative" }}
                pt={{
                    headerContent: {
                        className: "absolute left-1 top-0"
                    },
                }}
            />
            <Column 
                body={actionsBodyTemplate}
                style={{ width: '4rem' }}
                headerStyle={{ height: "3rem" }}
                pt={{
                    bodyCell: {
                        className: "w=[3rem] p-[0.25rem]"
                    }  
                }}
            />
        </DataTable>
    );
}
