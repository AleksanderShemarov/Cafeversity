"use client";

import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { useTranslations } from "next-intl";


interface OrderButtonProps {
    isOrderOpen: boolean,
    onClick: () => void
}


export default function OrderButton({ isOrderOpen, onClick }: OrderButtonProps) {

    const orderViewButton = useTranslations("MainUserPage.orderView.makeOrderButton");

    return (
        <button onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                margin: '20px auto',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                width: "20rem"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0056b3';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#007bff';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
        {!isOrderOpen ? (
            <>
                <IconArrowUp style={{ height: "3rem", width: "3rem" }} />
                <span style={{ fontSize: "1.5rem" }}>{orderViewButton("closed")}</span>
            </>
        ) : (
            <>
                <IconArrowDown style={{ height: "3rem", width: "3rem" }} />
                <span style={{ fontSize: "1.5rem", textWrap: "pretty" }}>{orderViewButton("opened")}</span>
            </>
        )}
        </button>
    );
}
