import { use } from "react";
import orderPreview from "@/app/actions/orderPreview";
import { OrderTypes } from "./NewOrdersTable";
import PreviewDetails from "./PreviewDetails";


export type OrderXTypes = Omit<OrderTypes, 'orderNumber'|'dishes'> & {
    dishes: {
        dishes: {
            food_name: string,
            cost: number,
            imagePath: string,
        }
    }[];
}


export default function NewOrderPreview({ orderNumber }: { orderNumber: string|undefined }) {

    let componentPart = <></>;
    if (orderNumber) {
        const orderData: OrderXTypes = use(orderPreview(orderNumber));
        componentPart = <PreviewDetails orderNumber={orderNumber} data={orderData} />
    } else {
        componentPart = <p className="
            h-[100%] content-center
            text-center text-[1.8rem] font-semibold
        ">
            Абяры адну з замоў
        </p>
    }
    
    return (
        <div className="
            h-[85dvh] w-[25dvw]
            bg-[white] border-[lightgray]
            border-2 rounded-[1.4rem]
        ">
            {componentPart}
        </div>
    );
}
