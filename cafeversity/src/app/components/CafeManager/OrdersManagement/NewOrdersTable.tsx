"use client";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconInfoCircle } from "@tabler/icons-react";
import { useRouter, useSearchParams } from 'next/navigation';


export type OrderTypes = {
    orderNumber: number,
    sentTime: Date,
    orderStatus: "SENT"|"PREPARING"|"READY"|"TAKEN"|"CANCELLED",
    phone: string,
    comment: string,
    dishes: {
        dishes: {
            food_name: string,
        }
    }[]
}


export default function NewOrdersTable({ data, weekdays }: { data: OrderTypes[], weekdays: string[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();


    const orderNumberBodyTemplate = (rowData: OrderTypes) => {
        return (
            <p className="w-[9rem] text-[1.8rem] font-medium">
                #{rowData.orderNumber}
            </p>
        );
    };

    const dishesBodyTemplate = (rowData: OrderTypes) => {
        return (
            <p className="text-[1.6rem] font-normal text-balance">
                {rowData.dishes.map(dish => dish.dishes.food_name).join(", ")}
            </p>
        );
    };

    const sentTimeBodyTemplate = (rowData: OrderTypes) => {
        const date = rowData.sentTime;
        return (
            <p className="text-[1.4rem] font-light">
                {date.getFullYear()}-{String(date.getMonth()+1).padStart(2, "0")}-{String(date.getDate()).padStart(2, "0")}, {weekdays[date.getDay()]} ({date.getHours()}:{date.getMinutes().toString().padStart(2, "0")})
            </p>
        );
    };

    const orderStatusBodyTemplate = (rowData: OrderTypes) => {
        const orderStatus = rowData.orderStatus;
        switch (orderStatus) {
            case "SENT":
                return (<p className="bg-blue-100 text-blue-800 text-[1.8rem] text-center font-extralight">{orderStatus}</p>);
            case "PREPARING":
                return (<p className="bg-yellow-100 text-[goldenrod] text-[1.8rem] text-center font-medium">{orderStatus}</p>);
            case "READY":
                return (<p className="bg-green-100 text-green-800 text-[1.8rem] text-center font-semibold">{orderStatus}</p>);
            case "TAKEN":
                return (<p className="bg-purple-100 text-purple-800 text-[1.8rem] text-center font-bold">{orderStatus}</p>);
            case "CANCELLED":
                return (<p className="bg-red-100 text-red-800 text-[1.8rem] text-center font-medium">{orderStatus}</p>);
            default:
                return (<p className="bg-gray-100 text-gray-800 text-[1.8rem] text-center font-thin">UNKNOWN</p>);
        }
    }

    const phoneBodyTemplate = (rowData: OrderTypes) => {
        return (
            <p className="text-[1.4rem] font-light">
                {rowData.phone}
            </p>
        );
    };

    const commentBodyTemplate = (rowData: OrderTypes) => {
        return (
            <p className="text-[1.4rem] font-light text-balance">
                {rowData.comment}
            </p>
        );
    };

    const actionsBodyTemplate = (rowData: OrderTypes) => {
        function handleSelectedOrder(orderNumber: number) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("selected", String(orderNumber));
            router.replace(`?${params.toString()}`, { scroll: false });
        }

        return (
            <button onClick={() => handleSelectedOrder(rowData.orderNumber)}>
                <IconInfoCircle className="w-[3.5rem] h-[3.5rem] rounded-[50%] no-underline text-[gray] hover:text-[darkgray] transition-colors" />
            </button>
        );
    };

    return (
        <DataTable 
            value={data}
            emptyMessage="Няма замоў"
            style={{ fontSize: "1.9rem", fontFamily: "Arial", fontWeight: 600, width: "calc(75dvw - 3rem)" }}
            tableStyle={{ width: "calc(75dvw - 3rem)" }}
            removableSort
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
                        className: "absolute left-0 top-0 translate-x-[100%]"
                    },
                }}
            />
            <Column 
                field="phone" 
                header="Тэлефон" 
                body={phoneBodyTemplate}
                style={{ width: '12rem', paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                headerStyle={{ height: "3rem" }}
            />
            <Column 
                field="comment" 
                header="Каментар" 
                body={commentBodyTemplate}
                style={{ width: '10rem', paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                headerStyle={{ height: "3rem" }}
            />
            <Column 
                body={actionsBodyTemplate}
                style={{ width: '4rem' }}
                headerStyle={{ height: "3rem" }}
            />
        </DataTable>
    );
}
