"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import { ColumnConfig } from "./TableBody";


interface UpdateExpanderProps<T> {
    initialColumns: ColumnConfig<T>[],
    setUpdateClicked: Dispatch<SetStateAction<number>>,

    data: T,
    onSave: (id: number, updatedData: Partial<T>) => void,
}
const TableRowExpander = <T extends { id: number }>({
    initialColumns, setUpdateClicked,
    data, onSave
}: UpdateExpanderProps<T>) => {
    const formRef = useRef<HTMLFormElement>(null);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        
        const formData = new FormData(formRef.current);
        const updatedData: Record<string, unknown> = {};

        /* const name = formData.get("name") as string;
        if (name === "") {
            toast.error("User's name is empty!",
                { position: "top-right", style: { fontSize: "1.5rem" } }
            );
            return;
        }
        const age = parseInt(formData.get("age") as string);
        if (isNaN(age)) {
            toast.error("Please, input a correct age (the only numbers are available)!",
                { position: "top-right", style: { fontSize: "1.5rem" } }
            );
            return;
        }
        if (age < 0) {
            toast.error("Please, input a correct age (starting with 0)!",
                { position: "top-right", style: { fontSize: "1.5rem" } }
            );
            return;
        }
        const email = formData.get("email") as string;
        if (email === "") {
            toast.error("User's email is empty!",
                { position: "top-right", style: { fontSize: "1.5rem" } }
            );
            return;
        }
        const city = formData.get("city") as string;
        const country = formData.get("country") as string;
        const phone = formData.get("phone") as string;
        
        const updatedData = {
            name: name,
            age: age,
            email: email,
            city: city,
            country: country,
            phone: phone
        } */

        initialColumns.forEach(column => {
            if (column.name && column.name !== "") {
                const value = formData.get(column.name.toLowerCase());
                updatedData[column.name.toLowerCase()] = column.type === "number" && value
                    ? Number(value) : value;
            }
        })
        onSave(data.id, updatedData as Partial<T>);
    }

    console.log(data);
    
    return (
        <div style={{ border: "2px solid orange", borderRadius: "1.5rem", padding: "0.5rem 1rem", maxHeight: "50rem", overflowY: "auto" }}>
            <form style={{
                margin: "0 auto", display: "flex", flexDirection: "row",
                flexWrap: "wrap", justifyContent: "space-between",
            }}
            ref={formRef}
            onSubmit={handleSubmit}
            >
                {initialColumns.map((column, index) => {
                    if (column.name && column.name !== "" && column.name.toLowerCase() !== "id") {
                        const value = data[column.name.charAt(0).toLowerCase() + column.name.slice(1) as keyof T];
                        console.log(value);
                        return (
                            <div key={index} style={{
                                display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
                                alignItems: "center", justifyContent: "center", gap: "1.5rem",
                                padding: "0.5rem 1rem", width: "48%",
                            }}>
                                <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem" }}>
                                    {column.name}:
                                </label>
                                <input id={column.name.toLowerCase()} placeholder={`${column.name.toLowerCase()}...`}
                                    style={{
                                        fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem"
                                    }}
                                    name={column.name.toLowerCase()}
                                    type={column.type || "text"}
                                    defaultValue={String(value)}
                                />
                            </div>
                        )
                    }
                    
                    return null;
                })}

                <div style={{
                    width: "100%", padding: "8px 6px", display: "inline-flex", gap: "0.5rem",
                    alignItems: "center", flexDirection: "row", justifyContent: "flex-start",
                }}>
                    <button type="submit"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            backgroundColor: "green",
                            fontSize: "1.5rem",
                        }}
                    >
                        Save
                    </button>
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            backgroundColor: "red",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                        }}
                        onClick={() => setUpdateClicked(0)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export { TableRowExpander };
