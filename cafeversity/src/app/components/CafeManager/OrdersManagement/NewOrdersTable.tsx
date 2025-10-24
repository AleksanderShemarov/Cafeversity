"use client";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Link from 'next/link';
import { IconArrowRight } from "@tabler/icons-react";


type OrderTypes = {
    orderNumber: number;
    sentTime: Date;
    phone: string;
    comment: string;
    dishes: {
        dishes: {
            food_name: string;
        };
    }[];
}


export default function NewOrdersTable({ data, weekdays }: { data: OrderTypes[], weekdays: string[] }) {
    const dishesBodyTemplate = (rowData: OrderTypes) => {
        return (
            <p className="text-[1.6rem] font-normal text-balance">
                {rowData.dishes.map(dish => dish.dishes.food_name).join(", ")}
            </p>
        );
    };

    const dateTimeBodyTemplate = (rowData: OrderTypes) => {
        const date = rowData.sentTime;
        return (
            <p className="text-[1.4rem] font-light">
                {date.getFullYear()}-{String(date.getMonth()+1).padStart(2, "0")}-{String(date.getDate()).padStart(2, "0")}, {weekdays[date.getDay()]} ({date.getHours()}:{date.getMinutes().toString().padStart(2, "0")})
            </p>
        );
    };

    const orderNumberBodyTemplate = (rowData: OrderTypes) => {
        return (
            <p className="w-[9rem] text-[1.8rem] font-medium">
                #{rowData.orderNumber}
            </p>
        );
    };

    const phoneBodyTemplate = (rowData: OrderTypes) => {
        return (
            <p className="text-[1.4rem] font-light">
                {rowData.phone}
            </p>
        );
    };

    const commentBodyTemplate = (rowData: OrderTypes) => {
        return (
            <p className="text-[1.4rem] font-light">
                {rowData.comment}
            </p>
        );
    };

    const actionsBodyTemplate = (rowData: OrderTypes) => {
        return (
            <Link href={`/cafeManager/orders/${rowData.orderNumber}`}>
                <IconArrowRight className="w-[3.5rem] h-[3.5rem] rounded-[50%] no-underline text-[gray] hover:text-[darkgray] transition-colors" />
            </Link>
        );
    };

    return (
        <DataTable 
            value={data}
            emptyMessage="Няма замоў"
            style={{ fontSize: "1.9rem", fontFamily: "Arial", fontWeight: 600, width: "calc(100dvw - 3rem)" }}
            removableSort
        >
            <Column 
                field="orderNumber" 
                header="Замова №" 
                body={orderNumberBodyTemplate}
                style={{ minWidth: '12rem' }}
            />
            <Column 
                field="dishes" 
                header="Стравы" 
                body={dishesBodyTemplate}
                style={{ minWidth: '30rem' }}
            />
            <Column 
                field="sentTime" 
                header="Час Замовы" 
                body={dateTimeBodyTemplate}
                style={{ minWidth: '25rem' }}
                sortable
            />
            <Column 
                field="phone" 
                header="Тэлефон" 
                body={phoneBodyTemplate}
                style={{ minWidth: '15rem' }}
            />
            <Column 
                field="comment" 
                header="Каментар" 
                body={commentBodyTemplate}
                style={{ minWidth: '20rem' }}
            />
            <Column 
                body={actionsBodyTemplate}
                style={{ width: '4rem' }}
            />
        </DataTable>
    );
}
