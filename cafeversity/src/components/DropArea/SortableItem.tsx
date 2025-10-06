"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, useState } from "react";
import { IconGridDots } from "@tabler/icons-react";


interface SortableItemInterface {
    idName: string|number,
    itemName: string,
    children: React.ReactNode
}

export function SortableItem({ idName, itemName, children }: SortableItemInterface) {
    const [clicked, setClicked] = useState<boolean>(false);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging, setActivatorNodeRef } = useSortable({ id: idName });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        border: "1.5px solid gray",
        borderRadius: "1rem",
        backgroundColor: "var(--background-color-sortable)",
        color: "black",
        fontSize: "2rem",
        padding: "1rem 1.5rem",
        fontWeight: "400",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: isDragging ? 999 : 1,
        position: "relative",
        backdropFilter: "blur(3px)"
    };

    return (
        <div ref={setNodeRef} style={style}>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    height: "3vh", marginBottom: "2rem"
                }}>
                    <p style={{ fontSize: "1.8rem", fontWeight: 500, color: "var(--text-color)" }}>{itemName}</p>
                    <button {...listeners} {...attributes}
                        ref={setActivatorNodeRef}
                        style={{
                            borderRadius: "1rem",
                            border: clicked ? "none" : "2px solid gray",
                            boxShadow: clicked ? "0px 0px 6px 2px rgba(0,0,0,0.4)" : "none",
                            fontSize: "1.5rem",
                            fontWeight: "400",
                            height: "3rem",
                            width: "3rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white"
                        }}
                        onMouseDown={() => setClicked(true)}
                        onMouseUp={() => setClicked(false)}
                    >
                        <IconGridDots style={{ height: "1.5rem", width: "1.5rem", color: clicked ? "gray" : "black" }} />
                    </button>
                </div>
            {children}
        </div>
    );
}
