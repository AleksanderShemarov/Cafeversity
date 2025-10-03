"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import { ColumnConfig } from "../AdminTables/TableParts/TableBody";


export interface AdminUsersExpanderProps<T> {
    initialColumns: ColumnConfig<T>[],
    setUpdateClicked: Dispatch<SetStateAction<number>>,

    data: T,
    onSave: (id: number, updatedData: Partial<T>) => void,
}
const AdminUsersExpander = <T extends { id: number }>({
    initialColumns, setUpdateClicked,
    data, onSave
}: AdminUsersExpanderProps<T>) => {
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

    const filteredColumns = initialColumns
        .map(column => column.name.startsWith("_") ? { ...column, name: column.name.slice(1) } : column)
        .filter(column => 
            column.name && column.name !== "" && 
            column.name !== "ID" && 
            !column.name.endsWith("Id") && 
            column.name !== "id"
        );

    // console.log("Expander initial columns -->", initialColumns);
    // console.log("Expander row data -->", data);
    
    return (
        <div style={{ 
            border: "2px solid #e67e22", 
            borderRadius: "1rem", 
            padding: "1.5rem",
            backgroundColor: "#f9f9f9",
            margin: "0.5rem 0"
        }}>
            <form 
                ref={formRef}
                onSubmit={handleSubmit}
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1rem",
                    marginBottom: "1.5rem"
                }}
            >
                {filteredColumns.map((column, index) => {
                    const fieldName = column.name;
                    const value = data[fieldName as keyof T];
                    
                    if (column.type === "bool") {
                        return (
                            <div key={index} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                padding: "1rem",
                                backgroundColor: "white",
                                borderRadius: "0.5rem",
                                border: "1px solid #ddd",
                                gridColumn: "1 / -1"
                            }}>
                                <label htmlFor={fieldName} style={{ 
                                    fontSize: "1.4rem", 
                                    fontWeight: "500",
                                    minWidth: "200px"
                                }}>
                                    {column.name}
                                </label>
                                <input 
                                    id={fieldName}
                                    type="checkbox"
                                    name={fieldName}
                                    defaultChecked={Boolean(value)}
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer"
                                    }}
                                />
                                <span style={{ 
                                    fontSize: "1.3rem", 
                                    color: "#666",
                                    marginLeft: "auto"
                                }}>
                                    {value ? "Enabled" : "Disabled"}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                                padding: "1rem",
                                backgroundColor: "white",
                                borderRadius: "0.5rem",
                                border: "1px solid #ddd"
                            }}>
                                <label htmlFor={fieldName} style={{ 
                                    fontSize: "1.4rem", 
                                    fontWeight: "500",
                                    color: "#333"
                                }}>
                                    {column.name}
                                </label>
                                <input 
                                    id={fieldName}
                                    placeholder={`Enter ${column.name.toLowerCase()}...`}
                                    style={{
                                        fontSize: "1.4rem",
                                        padding: "0.75rem",
                                        borderRadius: "0.375rem",
                                        border: "1px solid #ccc",
                                        width: "100%",
                                        boxSizing: "border-box",
                                        transition: "border-color 0.2s"
                                    }}
                                    name={fieldName}
                                    type={column.type === "number" ? "number" : "text"}
                                    defaultValue={String(value || "")}
                                    step={column.type === "number" ? "any" : undefined}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#e67e22";
                                        e.target.style.outline = "none";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#ccc";
                                    }}
                                />
                            </div>
                        );
                    }
                })}
            </form>

            <div style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingTop: "1rem",
                borderTop: "2px solid #e0e0e0"
            }}>
                <span style={{ 
                    fontSize: "1.3rem", 
                    color: "#666",
                    marginRight: "auto"
                }}>
                    Editing ID: <strong>{data.id}</strong>
                </span>
                
                <button 
                    type="button"
                    onClick={() => setUpdateClicked(0)}
                    style={{
                        padding: "0.75rem 1.5rem",
                        borderRadius: "0.5rem",
                        border: "1px solid #dc2626",
                        backgroundColor: "white",
                        color: "#dc2626",
                        fontWeight: "600",
                        fontSize: "1.4rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        minWidth: "120px"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#dc2626";
                        e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.color = "#dc2626";
                    }}
                >
                    Cancel
                </button>
                
                <button 
                    type="button"
                    onClick={() => formRef.current?.requestSubmit()}
                    style={{
                        padding: "0.75rem 1.5rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        backgroundColor: "#16a34a",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "1.4rem",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        minWidth: "120px"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#15803d";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#16a34a";
                    }}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export { AdminUsersExpander };
