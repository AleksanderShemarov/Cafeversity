"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import { ColumnConfig } from "./TableBody";


export interface TableRowExpanderProps<T> {
    initialColumns: ColumnConfig<T>[],
    setUpdateClicked: Dispatch<SetStateAction<number>>,

    data: T,
    onSave: (id: number, updatedData: Partial<T>) => void,
}
const TableRowExpander = <T extends { id: number }>({
    initialColumns, setUpdateClicked,
    data, onSave
}: TableRowExpanderProps<T>) => {
    const formRef = useRef<HTMLFormElement>(null);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        
        const formData = new FormData(formRef.current);
        const updatedData: Record<string, unknown> = {};

        initialColumns.map(column => column.name.startsWith("_") ? { ...column, name: column.name.slice(1) } : column)
        .forEach(column => {
            if (column.name && column.name !== "" && column.name.toLowerCase() !== "id") {
                const value = formData.get(column.name.charAt(0).toLowerCase() + column.name.slice(1));
                updatedData[column.name.charAt(0).toLowerCase() + column.name.slice(1)] = column.type === "number" && value
                    ? Number(value) : value === "null" ? null : value;
            }
        })

        console.dir(updatedData);

        onSave(data.id, updatedData as Partial<T>);
    }

    // console.log("Expander initial columns -->", initialColumns);
    // console.log("Expander row data -->", data);
    
    return (
        <div style={{ border: "2px solid orange", borderRadius: "1.5rem", padding: "0.5rem 1rem", maxHeight: "50rem", overflowY: "auto" }}>
            <form style={{
                margin: "0 auto", display: "flex", flexDirection: "row",
                flexWrap: "wrap", justifyContent: "space-between",
            }}
            ref={formRef}
            onSubmit={handleSubmit}
            >
                {initialColumns.map(column => column.name.startsWith("_") ? { ...column, name: column.name.slice(1) } : column)
                .map((column, index) => {
                    if (column.name && column.name !== "" && column.type !== "bool"
                        && column.name !== "ID" && !column.name.endsWith("Id") || column.name.startsWith("Session")) {
                        const value = data[column.name.charAt(0).toLowerCase() + column.name.slice(1) as keyof T];
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
                                    name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
                                    type={column.type || "text"}
                                    defaultValue={String(value)}
                                />
                            </div>
                        )
                    } else if (column.name && column.name.endsWith("Id") && column.type !== "bool") {
                        const value = data[column.name.charAt(0).toLowerCase() + column.name.slice(1, -2) as keyof T];
                        return (
                            <div key={index} style={{
                                display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
                                alignItems: "center", justifyContent: "center", gap: "1.5rem",
                                padding: "0.5rem 1rem", width: "48%",
                            }}>
                                <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem",
                                        visibility: "collapse"
                                }}>
                                    {column.name}:
                                </label>
                                <input id={column.name.toLowerCase()} placeholder={`${column.name.toLowerCase()}...`}
                                    style={{
                                        fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem",
                                        visibility: "collapse"
                                    }}
                                    name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
                                    type={column.type || "text"}
                                    defaultValue={String(value)}
                                />
                            </div>
                        )
                    } else if (column.name && column.type === "bool") {
                        const value = data[column.name.charAt(0).toLowerCase() + column.name.slice(1) as keyof T];
                        return (
                            <div key={index} style={{
                                display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
                                alignItems: "center", justifyContent: "center", gap: "1.5rem",
                                padding: "0.5rem 1rem", width: "48%",
                            }}>
                                <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem" }}>
                                    {column.name}:
                                </label>
                                <input id={column.name.toLowerCase()}
                                    type="checkbox"
                                    name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
                                    defaultChecked={Boolean(value)}
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
