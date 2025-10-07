/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, Dispatch, SetStateAction, useState } from "react";
import { ColumnConfig } from "../TableParts/TableBody";
import { CafesType, DishesType } from "@/app/(admin)/admin/ordersPanel/page";
import { IconCheck, IconX } from '@tabler/icons-react';


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


    const containerStyle = {
        border: "2px solid #e67e22",
        borderRadius: "1rem",
        padding: "1.5rem",
        backgroundColor: "#f9f9f9",
        margin: "0.5rem 0"
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column" as const,
        gap: "1.5rem"
    };

    const sectionStyle = {
        backgroundColor: "white",
        padding: "1.25rem",
        borderRadius: "0.75rem",
        border: "1px solid #e5e7eb"
    };

    const labelStyle = {
        fontSize: "1.4rem",
        fontWeight: "600" as const,
        color: "#1f2937",
        marginBottom: "0.75rem",
        display: "block" as const
    };

    const selectStyle = {
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #d1d5db",
        borderRadius: "0.5rem",
        fontSize: "1.4rem",
        backgroundColor: "white",
        cursor: "pointer"
    };

    const checkboxGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "0.75rem",
        maxHeight: "300px",
        overflowY: "auto" as const,
        padding: "1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        backgroundColor: "#fafafa"
    };

    const checkboxLabelStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.375rem",
        backgroundColor: "white",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "1.3rem"
    };

    const checkboxStyle = {
        width: "18px",
        height: "18px",
        cursor: "pointer"
    };

    const buttonContainerStyle = {
        display: "flex",
        gap: "1rem",
        justifyContent: "flex-end",
        paddingTop: "1rem",
        borderTop: "2px solid #e5e7eb"
    };

    const buttonStyle = (color: string) => ({
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        border: "none",
        borderRadius: "0.5rem",
        color: "white",
        fontWeight: "600" as const,
        fontSize: "1.4rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: color
    });

    const readyStatusStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem"
    };

    const readyStatusLabelStyle = {
        fontSize: "1.4rem",
        fontWeight: "600" as const,
        color: "#1f2937"
    };

    const readyStatusToggleStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    };

    const toggleSwitchStyle = {
        position: "relative" as const,
        display: "inline-block",
        width: "50px",
        height: "24px"
    };

    const toggleSliderStyle = (checked: boolean) => ({
        position: "absolute" as const,
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: checked ? "#10b981" : "#d1d5db",
        transition: "0.4s",
        borderRadius: "24px"
    });

    const toggleKnobStyle = (checked: boolean) => ({
        position: "absolute" as const,
        content: '""',
        height: "16px",
        width: "16px",
        left: checked ? "26px" : "4px",
        bottom: "4px",
        backgroundColor: "white",
        transition: "0.4s",
        borderRadius: "50%"
    });

    // console.log("data OrdersExpander -->", data);

    return (
        // <div style={{ border: "2px solid orange", borderRadius: "1.5rem", padding: "1rem", maxHeight: "50rem", overflowY: "auto" }}>
        //     <form ref={formRef} onSubmit={handleSubmit}>
        //         <div style={{ marginBottom: "1rem" }}>
        //             <label style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>
        //                 Cafes:
        //             </label>
        //             <select
        //                 value={selectedCafeID}
        //                 onChange={(e) => setSelectedCafeID(Number(e.target.value))}
        //                 style={{ fontSize: "1.5rem", padding: "0.5rem", width: "100%" }}
        //                 required
        //             >
        //                 {cafes.map(cafe => (
        //                     <option key={cafe.ID} value={cafe.ID} style={{ fontSize: "1.5rem" }}>
        //                         {cafe.cafeName}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>

        //         <div style={{ marginBottom: "1rem" }}>
        //             <label style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>
        //                 Dishes:
        //             </label>
        //             <div style={{
        //                 maxHeight: "200px", overflowY: "auto", border: "1px solid #ccc", padding: "0.5rem",
        //                 display: "grid", gridTemplateColumns: "1fr 1fr 1fr"
        //             }}>
        //                 {allDishes.sort((a, b) => a.food_name.localeCompare(b.food_name)).map(dish => (
        //                     <label key={dish.id} style={{
        //                         display: "inline-flex", alignContent: "center",
        //                         marginBottom: "0.25rem", marginTop: "0.25rem",
        //                         marginLeft: "0.125rem", marginRight: "0.125rem",
        //                         // outline: "1px solid", 
        //                     }}>
        //                         <input
        //                             type="checkbox"
        //                             checked={selectedDishIds.includes(dish.id)}
        //                             onChange={() => toggleDish(dish.id)}
        //                             style={{ marginRight: "0.5rem" }}
        //                         />
        //                         <p style={{ fontSize: "1.5rem", margin: 0 }}>{dish.food_name} - {dish.cost} BYN</p>
        //                     </label>
        //                 ))}
        //             </div>
        //         </div>

        //         {initialColumns.map(column => column.name.startsWith("_") ? { ...column, name: column.name.slice(1) } : column)
        //         .map(column => {
        //             if (column.name && column.type === "bool") {
        //                 return (
        //                     <div key={`field-${column.name}`} style={{
        //                         display: "inline-flex", alignItems: "center", gap: "0.5rem", 
        //                         padding: "0.5rem 1rem", marginBottom: "0.5rem",
        //                     }}>
        //                         <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem" }}>
        //                             {column.name}:
        //                         </label>
        //                         <input id={column.name.toLowerCase()}
        //                             type="checkbox"
        //                             name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
        //                             defaultChecked={readyStatus}
        //                             onChange={() => setReadyStatus(prev => !prev)}
        //                         />
        //                     </div>
        //                 )
        //             }
                    
        //             return null;
        //         })}

        //         <div style={{ display: "flex", gap: "0.5rem" }}>
        //             <button type="submit" style={buttonStyle("green")}>
        //                 Save
        //             </button>
        //             <button type="button" onClick={() => setUpdateClicked(0)} style={buttonStyle("red")}>
        //                 Cancel
        //             </button>
        //         </div>
        //     </form>
        // </div>

        <div style={containerStyle}>
            <form ref={formRef} onSubmit={handleSubmit} style={formStyle}>
                <div style={sectionStyle}>
                    <label style={labelStyle}>
                        Select Cafe
                    </label>
                    <select
                        value={selectedCafeID}
                        onChange={(e) => setSelectedCafeID(Number(e.target.value))}
                        style={selectStyle}
                        required
                    >
                        <option value={0} style={{ fontSize: "1.4rem" }}>
                            Choose a cafe...
                        </option>
                        {cafes.map(cafe => (
                            <option key={cafe.ID} value={cafe.ID} style={{ fontSize: "1.4rem" }}>
                                {cafe.cafeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={sectionStyle}>
                    <label style={labelStyle}>
                        Select Dishes ({selectedDishIds.length} selected)
                    </label>
                    <div style={checkboxGridStyle}>
                        {allDishes
                            .sort((a, b) => a.food_name.localeCompare(b.food_name))
                            .map(dish => (
                                <label 
                                    key={dish.id} 
                                    style={{
                                        ...checkboxLabelStyle,
                                        borderColor: selectedDishIds.includes(dish.id) ? "#3b82f6" : "#e5e7eb",
                                        backgroundColor: selectedDishIds.includes(dish.id) ? "#eff6ff" : "white"
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = selectedDishIds.includes(dish.id) 
                                            ? "#dbeafe" 
                                            : "#f9fafb";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = selectedDishIds.includes(dish.id) 
                                            ? "#eff6ff" 
                                            : "white";
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedDishIds.includes(dish.id)}
                                        onChange={() => toggleDish(dish.id)}
                                        style={checkboxStyle}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: "500" }}>{dish.food_name}</div>
                                        <div style={{ fontSize: "1.2rem", color: "#6b7280" }}>
                                            {dish.cost} BYN
                                        </div>
                                    </div>
                                </label>
                            ))
                        }
                    </div>
                </div>

                <div style={sectionStyle}>
                    <div style={readyStatusStyle}>
                        <span style={readyStatusLabelStyle}>Order Status</span>
                        <div style={readyStatusToggleStyle}>
                            <span style={{ 
                                fontSize: "1.3rem", 
                                color: readyStatus ? "#10b981" : "#6b7280",
                                fontWeight: "500"
                            }}>
                                {readyStatus ? "Ready" : "Preparing"}
                            </span>
                            <label style={toggleSwitchStyle}>
                                <input
                                    type="checkbox"
                                    checked={readyStatus}
                                    onChange={() => setReadyStatus(prev => !prev)}
                                    style={{ display: "none" }}
                                />
                                <span style={toggleSliderStyle(readyStatus)}>
                                    <span style={toggleKnobStyle(readyStatus)} />
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div style={buttonContainerStyle}>
                    <button 
                        type="button" 
                        onClick={() => setUpdateClicked(0)}
                        style={{
                            ...buttonStyle("#6b7280"),
                            backgroundColor: "#6b7280"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#4b5563";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#6b7280";
                        }}
                    >
                        <IconX size={18} />
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        style={{
                            ...buttonStyle("#10b981"),
                            backgroundColor: "#10b981"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#059669";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#10b981";
                        }}
                    >
                        <IconCheck size={18} />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

// const buttonStyle = (color: string) => ({
//     border: "none",
//     borderRadius: "0.75rem",
//     padding: "0.5rem 1rem",
//     color: "white",
//     fontWeight: "600",
//     backgroundColor: color,
//     fontSize: "1.2rem",
//     cursor: "pointer"
// });

export { OrdersExpander };