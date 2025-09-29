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
        // <div style={{ border: "2px solid orange", borderRadius: "1.5rem", padding: "0.5rem 1rem", maxHeight: "50rem", overflowY: "auto" }}>
        //     <form style={{
        //         margin: "0 auto", display: "flex", flexDirection: "row",
        //         flexWrap: "wrap", justifyContent: "space-between",
        //     }}
        //     ref={formRef}
        //     onSubmit={handleSubmit}
        //     >
        //         {initialColumns.map(column => column.name.startsWith("_") ? { ...column, name: column.name.slice(1) } : column)
        //         .map((column, index) => {
        //             if (column.name && column.name !== "" && column.type !== "bool"
        //                 && column.name !== "ID" && !column.name.endsWith("Id") || column.name.startsWith("Session")) {
        //                 const value = data[column.name.charAt(0).toLowerCase() + column.name.slice(1) as keyof T];
        //                 return (
        //                     <div key={index} style={{
        //                         display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
        //                         alignItems: "center", justifyContent: "center", gap: "1.5rem",
        //                         padding: "0.5rem 1rem", width: "48%",
        //                     }}>
        //                         <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem" }}>
        //                             {column.name}:
        //                         </label>
        //                         <input id={column.name.toLowerCase()} placeholder={`${column.name.toLowerCase()}...`}
        //                             style={{
        //                                 fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem"
        //                             }}
        //                             name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
        //                             type={column.type || "text"}
        //                             defaultValue={String(value)}
        //                         />
        //                     </div>
        //                 )
        //             } else if (column.name && column.name.endsWith("Id") && column.type !== "bool") {
        //                 const value = data[column.name.charAt(0).toLowerCase() + column.name.slice(1, -2) as keyof T];
        //                 return (
        //                     <div key={index} style={{
        //                         display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
        //                         alignItems: "center", justifyContent: "center", gap: "1.5rem",
        //                         padding: "0.5rem 1rem", width: "48%",
        //                     }}>
        //                         <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem",
        //                                 visibility: "collapse"
        //                         }}>
        //                             {column.name}:
        //                         </label>
        //                         <input id={column.name.toLowerCase()} placeholder={`${column.name.toLowerCase()}...`}
        //                             style={{
        //                                 fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem",
        //                                 visibility: "collapse"
        //                             }}
        //                             name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
        //                             type={column.type || "text"}
        //                             defaultValue={String(value)}
        //                         />
        //                     </div>
        //                 )
        //             } else if (column.name && column.type === "bool") {
        //                 const value = data[column.name.charAt(0).toLowerCase() + column.name.slice(1) as keyof T];
        //                 return (
        //                     <div key={index} style={{
        //                         display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
        //                         alignItems: "center", justifyContent: "center", gap: "1.5rem",
        //                         padding: "0.5rem 1rem", width: "48%",
        //                     }}>
        //                         <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem" }}>
        //                             {column.name}:
        //                         </label>
        //                         <input id={column.name.toLowerCase()}
        //                             type="checkbox"
        //                             name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
        //                             defaultChecked={Boolean(value)}
        //                         />
        //                     </div>
        //                 )
        //             }
                    
        //             return null;
        //         })}

        //         <div style={{
        //             width: "100%", padding: "8px 6px", display: "inline-flex", gap: "0.5rem",
        //             alignItems: "center", flexDirection: "row", justifyContent: "flex-start",
        //         }}>
        //             <button type="submit"
        //                 style={{
        //                     border: "none",
        //                     borderRadius: "0.75rem",
        //                     height: "30px",
        //                     padding: "2px 5px",
        //                     color: "whitesmoke",
        //                     fontWeight: "600",
        //                     backgroundColor: "green",
        //                     fontSize: "1.5rem",
        //                 }}
        //             >
        //                 Save
        //             </button>
        //             <button type="button"
        //                 style={{
        //                     border: "none",
        //                     borderRadius: "0.75rem",
        //                     height: "30px",
        //                     padding: "2px 5px",
        //                     color: "whitesmoke",
        //                     fontWeight: "600",
        //                     backgroundColor: "red",
        //                     fontSize: "1.5rem",
        //                     cursor: "pointer",
        //                 }}
        //                 onClick={() => setUpdateClicked(0)}
        //             >
        //                 Cancel
        //             </button>
        //         </div>
        //     </form>
        // </div>

        // <div style={{ 
        //     border: "2px solid #e67e22", 
        //     borderRadius: "1rem", 
        //     padding: "1.5rem",
        //     backgroundColor: "#f9f9f9",
        //     margin: "0.5rem 0"
        // }}>
        //     <form 
        //         ref={formRef}
        //         onSubmit={handleSubmit}
        //         style={{
        //             display: "flex",
        //             flexDirection: "row",
        //             flexWrap: "wrap",
        //             gap: "1rem",
        //             maxWidth: "500px",
        //             margin: "0 auto"
        //         }}
        //     >
        //         {filteredColumns.map((column, index) => {
        //             const fieldName = column.name.charAt(0).toLowerCase() + column.name.slice(1);
        //             const value = data[fieldName as keyof T];
                    
        //             if (column.type === "bool") {
        //                 return (
        //                     <div key={index} style={{
        //                         display: "flex",
        //                         alignItems: "center",
        //                         gap: "1rem",
        //                         padding: "0.75rem",
        //                         backgroundColor: "white",
        //                         borderRadius: "0.5rem",
        //                         border: "1px solid #ddd"
        //                     }}>
        //                         <label htmlFor={fieldName} style={{ 
        //                             fontSize: "1.4rem", 
        //                             fontWeight: "500",
        //                             minWidth: "150px"
        //                         }}>
        //                             {column.name}:
        //                         </label>
        //                         <input 
        //                             id={fieldName}
        //                             type="checkbox"
        //                             name={fieldName}
        //                             defaultChecked={Boolean(value)}
        //                             style={{
        //                                 width: "20px",
        //                                 height: "20px",
        //                                 cursor: "pointer"
        //                             }}
        //                         />
        //                     </div>
        //                 );
        //             } else {
        //                 return (
        //                     <div key={index} style={{
        //                         display: "flex",
        //                         flexDirection: "column",
        //                         gap: "0.5rem",
        //                         padding: "0.75rem",
        //                         backgroundColor: "white",
        //                         borderRadius: "0.5rem",
        //                         border: "1px solid #ddd"
        //                     }}>
        //                         <label htmlFor={fieldName} style={{ 
        //                             fontSize: "1.4rem", 
        //                             fontWeight: "500" 
        //                         }}>
        //                             {column.name}
        //                         </label>
        //                         <input 
        //                             id={fieldName}
        //                             placeholder={`Enter ${column.name.toLowerCase()}...`}
        //                             style={{
        //                                 fontSize: "1.4rem",
        //                                 padding: "0.75rem",
        //                                 borderRadius: "0.375rem",
        //                                 border: "1px solid #ccc",
        //                                 width: "100%",
        //                                 boxSizing: "border-box"
        //                             }}
        //                             name={fieldName}
        //                             type={column.type === "number" ? "number" : "text"}
        //                             defaultValue={String(value || "")}
        //                             step={column.type === "number" ? "any" : undefined}
        //                         />
        //                     </div>
        //                 );
        //             }
        //         })}

        //         <div style={{
        //             display: "flex",
        //             gap: "1rem",
        //             justifyContent: "flex-end",
        //             paddingTop: "1rem",
        //             borderTop: "1px solid #e0e0e0",
        //             marginTop: "1rem"
        //         }}>
        //             <button 
        //                 type="button"
        //                 onClick={() => setUpdateClicked(0)}
        //                 style={{
        //                     padding: "0.75rem 1.5rem",
        //                     borderRadius: "0.5rem",
        //                     border: "1px solid #dc2626",
        //                     backgroundColor: "white",
        //                     color: "#dc2626",
        //                     fontWeight: "600",
        //                     fontSize: "1.4rem",
        //                     cursor: "pointer",
        //                     transition: "all 0.2s"
        //                 }}
        //                 onMouseOver={(e) => {
        //                     e.currentTarget.style.backgroundColor = "#dc2626";
        //                     e.currentTarget.style.color = "white";
        //                 }}
        //                 onMouseOut={(e) => {
        //                     e.currentTarget.style.backgroundColor = "white";
        //                     e.currentTarget.style.color = "#dc2626";
        //                 }}
        //             >
        //                 Cancel
        //             </button>
        //             <button 
        //                 type="submit"
        //                 style={{
        //                     padding: "0.75rem 1.5rem",
        //                     borderRadius: "0.5rem",
        //                     border: "none",
        //                     backgroundColor: "#16a34a",
        //                     color: "white",
        //                     fontWeight: "600",
        //                     fontSize: "1.4rem",
        //                     cursor: "pointer",
        //                     transition: "background-color 0.2s"
        //                 }}
        //                 onMouseOver={(e) => {
        //                     e.currentTarget.style.backgroundColor = "#15803d";
        //                 }}
        //                 onMouseOut={(e) => {
        //                     e.currentTarget.style.backgroundColor = "#16a34a";
        //                 }}
        //             >
        //                 Save Changes
        //             </button>
        //         </div>
        //     </form>
        // </div>

        <div style={{ 
            border: "2px solid #e67e22", 
            borderRadius: "1rem", 
            padding: "1.5rem",
            backgroundColor: "#f9f9f9",
            margin: "0.5rem 0"
        }}>
            {/* Форма с полями в несколько колонок */}
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
                    const fieldName = column.name.charAt(0).toLowerCase() + column.name.slice(1);
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
                                gridColumn: "1 / -1" // Чекбоксы на всю ширину
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

            {/* Кнопки отдельно от формы */}
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
                    type="button" // Изменено на type="button", но привязано к форме
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

export { TableRowExpander };
