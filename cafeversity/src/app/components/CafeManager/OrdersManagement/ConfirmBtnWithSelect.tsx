"use client";

import ReactSelect from "react-select";
import { useFormStatus } from "react-dom";
import { useRef } from "react";
import { changeOrderStatus } from "@/app/actions/orderStatusChanging";


const differentBtns = [
    { label: "Пацвердзіць Падрыхтоўку", value: "READY" },
    { label: "Пакінуць Рыхтуемай", value: "PREPARING" },
];


export default function ConfirmButtonWithSelect({ orderNumber, currentStatus }: { orderNumber: number, currentStatus: string }) {

    const { pending } = useFormStatus();

    const formRef = useRef<HTMLFormElement>(null);

    const defaultButton = differentBtns.find(opt => opt.value === currentStatus) || differentBtns[0];

    function handleStatusChange() {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }

    return (
        <form ref={formRef} action={changeOrderStatus} className="flex flex-col gap-4">
            <input type="hidden" name="number-of-order" value={orderNumber} />
            <ReactSelect options={differentBtns}
                defaultValue={defaultButton}
                instanceId="different-buttons"
                menuPlacement="auto"
                name="order-status"
                isDisabled={pending}
                isLoading={pending}
                className="text-[1.6rem]"
                onChange={handleStatusChange}
                styles={{
                    control: (base) => ({
                        ...base,
                        fontSize: '1.4rem',
                        padding: '0.5rem 0.75rem',
                        border: '2px solid #d1d5db',
                        borderRadius: '0.75rem',
                    }),
                    menu: (base) => ({
                        ...base,
                        fontSize: '1.4rem',
                    }),
                    option: (base) => ({
                        ...base,
                        fontSize: '1.4rem',
                        padding: '0.75rem 1rem',
                    })
                }}
            />
        </form>
    );
}
