/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, Dispatch, SetStateAction, useState } from "react";
import { ColumnConfig } from "../TableParts/TableBody";
import { CafesType, DishesType } from "@/app/(admin)/admin/[adminInside]/ordersPanel/page";


export interface OrdersExpanderProps<T> {
    initialColumns: ColumnConfig<T>[];
    setUpdateClicked: Dispatch<SetStateAction<number>>;
    data: T;
    onSave: (id: number, updatedData: Partial<T>) => void;
    cafes?: CafesType[];
    allDishes?: DishesType[];
}

const OrdersExpander = <T extends { id: number }>({
    initialColumns,
    setUpdateClicked,
    data,
    onSave,
    cafes = [],
    allDishes = []
}: OrdersExpanderProps<T>) => {
    const [selectedCafeID, setSelectedCafeID] = useState<number>((data as any).cafeID || 0);
    const [selectedDishIds, setSelectedDishIds] = useState<number[]>((data as any).dishesIds || []);
    const [readyStatus, setReadyStatus] = useState<boolean>((data as any).ready);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        
        const updatedData: Record<string, unknown> = {};

        updatedData.cafeID = selectedCafeID;
        updatedData.dishesIds = selectedDishIds;
        updatedData.ready = readyStatus;

        initialColumns.forEach(column => {
            if (column.name && !column.name.startsWith('_') && 
                column.name !== 'id' && column.name !== 'cafeID' && column.name !== 'dishesIds') {
                if (column.name !== "ID" && column.name !== "Ready") {
                    const value = data[column.name.charAt(0).toLowerCase() + column.name.slice(1) as keyof T];
                    updatedData[column.name.charAt(0).toLowerCase() + column.name.slice(1)] = column.type === "number" && value
                    ? Number(value) : value === "null" ? null : value;
                }
            }
        });

        // console.log(updatedData);
        onSave(data.id, updatedData as Partial<T>);
    };

    const toggleDish = (dishId: number) => {
        setSelectedDishIds(prev =>
            prev.includes(dishId)
                ? prev.filter(id => id !== dishId)
                : [...prev, dishId]
        );
    };

    // console.log("data OrdersExpander -->", data);

    return (
        <div style={{ border: "2px solid orange", borderRadius: "1.5rem", padding: "1rem", maxHeight: "50rem", overflowY: "auto" }}>
            <form ref={formRef} onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>
                        Cafes:
                    </label>
                    <select
                        value={selectedCafeID}
                        onChange={(e) => setSelectedCafeID(Number(e.target.value))}
                        style={{ fontSize: "1.5rem", padding: "0.5rem", width: "100%" }}
                        required
                    >
                        {cafes.map(cafe => (
                            <option key={cafe.ID} value={cafe.ID} style={{ fontSize: "1.5rem" }}>
                                {cafe.cafeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>
                        Dishes:
                    </label>
                    <div style={{
                        maxHeight: "200px", overflowY: "auto", border: "1px solid #ccc", padding: "0.5rem",
                        display: "grid", gridTemplateColumns: "1fr 1fr 1fr"
                    }}>
                        {allDishes.sort((a, b) => a.food_name.localeCompare(b.food_name)).map(dish => (
                            <label key={dish.id} style={{
                                display: "inline-flex", alignContent: "center",
                                marginBottom: "0.25rem", marginTop: "0.25rem",
                                marginLeft: "0.125rem", marginRight: "0.125rem",
                                // outline: "1px solid", 
                            }}>
                                <input
                                    type="checkbox"
                                    checked={selectedDishIds.includes(dish.id)}
                                    onChange={() => toggleDish(dish.id)}
                                    style={{ marginRight: "0.5rem" }}
                                />
                                <p style={{ fontSize: "1.5rem", margin: 0 }}>{dish.food_name} - {dish.cost} BYN</p>
                            </label>
                        ))}
                    </div>
                </div>

                {initialColumns.map(column => column.name.startsWith("_") ? { ...column, name: column.name.slice(1) } : column)
                .map(column => {
                    if (column.name && column.type === "bool") {
                        return (
                            <div key={`field-${column.name}`} style={{
                                display: "inline-flex", alignItems: "center", gap: "0.5rem", 
                                padding: "0.5rem 1rem", marginBottom: "0.5rem",
                            }}>
                                <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem" }}>
                                    {column.name}:
                                </label>
                                <input id={column.name.toLowerCase()}
                                    type="checkbox"
                                    name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
                                    defaultChecked={readyStatus}
                                    onChange={() => setReadyStatus(prev => !prev)}
                                />
                            </div>
                        )
                    }
                    
                    return null;
                })}

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button type="submit" style={buttonStyle("green")}>
                        Save
                    </button>
                    <button type="button" onClick={() => setUpdateClicked(0)} style={buttonStyle("red")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

const buttonStyle = (color: string) => ({
    border: "none",
    borderRadius: "0.75rem",
    padding: "0.5rem 1rem",
    color: "white",
    fontWeight: "600",
    backgroundColor: color,
    fontSize: "1.2rem",
    cursor: "pointer"
});

export { OrdersExpander };