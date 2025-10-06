"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import {
    IconBaselineDensitySmall,
    IconBaselineDensityLarge,
    IconSearch, IconSearchOff,
    IconPlus, IconTrash,
    IconCheck, IconX,
    IconLayoutColumns,
    IconSelector,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from "framer-motion";
import { ColumnConfig } from "./TableBody";


export interface SubHeaderComponentProps<T> {
    initialColumns: ColumnConfig<T>[],
    visibleColumns: ColumnConfig<T>[],

    openSearch: boolean,
    setOpenSearch: Dispatch<SetStateAction<boolean>>,
    searchText: string,
    setSearchText: Dispatch<SetStateAction<string>>,
    searchType: string,
    setSearchType: Dispatch<SetStateAction<string>>,
    density: boolean,
    setDensity: Dispatch<SetStateAction<boolean>>,
    selectingRows: boolean,
    onClickSelectingRows: React.MouseEventHandler<HTMLButtonElement>,
    columnsMenu: boolean,
    setColumnsMenu: Dispatch<SetStateAction<boolean>>,
    addingRow: boolean,
    setAddingRow: Dispatch<SetStateAction<boolean>>,

    selectedRows: T[],
    deleteClicked: number,

    defaultSortField: string,

    // onConfirm: (newData: Omit<T, 'id'>) => void,
    onConfirm: (newData: Partial<T>) => void,
    onDelete: () => void
}
const SubHeaderComponent = <T extends { id: number }>({
    initialColumns, visibleColumns,

    openSearch, setOpenSearch, searchText, setSearchText, searchType, setSearchType,
    density, setDensity, selectingRows, onClickSelectingRows, columnsMenu, setColumnsMenu,
    addingRow, setAddingRow,

    selectedRows,
    // deleteClicked,
    
    defaultSortField,
    
    onConfirm, onDelete
}: SubHeaderComponentProps<T>) => {

    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);


    const showDeleteDialog = () => dialogRef.current?.showModal();
    const removeDeleteDialog = () => {
        onDelete();
        dialogRef.current?.close();
    }
    const closeDeleteDialog = () => dialogRef.current?.close();


    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        
        const formData = new FormData(formRef.current);
        const newData: Record<string, unknown> = {};

        
        initialColumns.forEach(column => {
            if (column.name && column.name !== "" && column.name.toLowerCase() !== "id") {
                const value = formData.get(column.name.charAt(0).toLowerCase() + column.name.slice(1));
                newData[column.name.charAt(0).toLowerCase() + column.name.slice(1)] = column.type === "number" && value
                    ? Number(value) : value === "" ? null : value;
            }
        });

        onConfirm(newData as Partial<T>);
    }

    const buttonStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "0.5rem",
        fontSize: "1.4rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s ease",
        minHeight: "36px"
    };

    const iconButtonStyle = {
        ...buttonStyle,
        padding: "0.5rem",
        minWidth: "36px"
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#3b82f6",
        color: "white",
    };

    const dangerButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#ef4444",
        color: "white",
    };

    const successButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#10b981",
        color: "white",
    };

    const warningButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#f59e0b",
        color: "white",
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#6b7280",
        color: "white",
    };

    // console.log("initialColumns -->", initialColumns);

    return (
        // <div style={{
        //     width: "100%", display: "flex",
        //     flexDirection: "column", alignItems: "flex-end"
        // }}>
        //     <div style={{
        //         display: "flex", justifyContent: "end", alignItems: "center",
        //         gap: "0.5rem", padding: "0.5rem 0"
        //     }}>
        //         <div style={{
        //             display: "inline-flex", alignItems: "center", gap: "3px"
        //         }}>
        //             <AnimatePresence>
        //                 {openSearch &&
        //                 <motion.div
        //                     initial={{ opacity: 0 }}
        //                     animate={{ opacity: 1 }}
        //                     exit={{ opacity: 0 }}
        //                     transition={{ duration: 0.5 }}

        //                     style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        //                     // while using a simple <div> the flicking doesn't exist
        //                     // for this code block I should write CSS-animation at CSS-module file
        //                 >
        //                     <input
        //                         type="text"
        //                         placeholder={`Search by ${searchType}`}
        //                         value={searchText}
        //                         onChange={e => setSearchText(e.target.value)}
        //                         style={{ visibility: openSearch ? "visible" : "collapse" }}
        //                         autoFocus
        //                     />

        //                     <select name="searchTypes" value={searchType}
        //                         onChange={e => {
        //                             setSearchType(e.target.value);
        //                             setSearchText("");
        //                         }}
        //                         style={{ visibility: openSearch ? "visible" : "collapse" }}
        //                     >
        //                         <option value="id">ID</option>
        //                         {visibleColumns.filter(col => col.name && col.name !== '').map((column, index) => 
        //                             (index > 0 && column.name !== "") && <option key={index} value={column.name.toLowerCase()}>{column.name}</option>
        //                         )}
        //                     </select>
        //                 </motion.div>
        //                 }
        //             </AnimatePresence>

        //             <button 
        //                 type="button" 
        //                 style={{
        //                     width: "35px",
        //                     height: "30px",
        //                     padding: 0,
        //                     paddingTop: "1px"
        //                 }}
        //                 onClick={() => {
        //                     openSearch && setSearchText("");///!!!!!
        //                     setOpenSearch(!openSearch);
        //                     setSearchType(defaultSortField);
        //                 }}
        //             >
        //                 {openSearch ? <IconSearchOff /> : <IconSearch />}
        //             </button>
        //         </div>

        //         {/* Table's Columns Showing */}
        //         <button
        //             type="button" 
        //             style={{
        //                 width: "35px",
        //                 height: "30px",
        //                 padding: 0,
        //                 paddingTop: "1px"
        //             }}
        //             onClick={() => setColumnsMenu(!columnsMenu)}
        //         >
        //             <IconLayoutColumns />
        //         </button>

        //         {/* Density Button */}
        //         <button
        //             type="button" 
        //             style={{
        //                 width: "35px",
        //                 height: "30px",
        //                 padding: 0,
        //                 paddingTop: "1px"
        //             }}
        //             onClick={() => setDensity(!density)}
        //         >
        //             {density ? <IconBaselineDensitySmall /> : <IconBaselineDensityLarge />}
        //         </button>

        //         {/* Button for (un)locking to choose rows in a table */}
        //         <button
        //             type="button" 
        //             style={{
        //                 // width: "35px",
        //                 border: "none",
        //                 borderRadius: "0.75rem",
        //                 height: "30px",
        //                 padding: "2px 5px",
        //                 color: "white",
        //                 fontWeight: "600",
        //                 backgroundColor: selectingRows ? "#FFBA0D" : "green",
        //                 boxShadow: selectingRows ? "inset 0 0 4px 2px black" : "none"
        //             }}
        //             // onClick={() => {
        //             //     // if there is any amount of checked rows, uncheck them
        //             //     if (selectingRows && selectedRows.length > 0) {
        //             //         setSelectedRows([]);
        //             //         setToggleCleared(!toggleCleared);
        //             //     }
        //             //     setSelectingRows(!selectingRows);
        //             // }}
        //             onClick={onClickSelectingRows}
        //         >
        //             Select a Row
        //         </button>

        //         {/* Add a new row button */}
        //         <button type="button"
        //             style={{
        //                 border: "none",
        //                 borderRadius: "0.75rem",
        //                 height: "30px",
        //                 padding: "2px 5px",
        //                 color: "white",
        //                 fontWeight: "600",
        //                 backgroundColor: addingRow ? "gray" : "blue",
        //             }}
        //             onClick={() => setAddingRow(!addingRow)}
        //             disabled={addingRow}
        //         >
        //             <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
        //                 <IconPlus />
        //                 <span style={{ textIndent: "5px" }}>
        //                     Add
        //                 </span>
        //             </div>
        //         </button>

        //         {/* Button for removing from one to many rows */}
        //         <button type="button"
        //             style={{
        //                 border: "none",
        //                 borderRadius: "0.75rem",
        //                 height: "30px",
        //                 padding: "2px 5px",
        //                 color: "whitesmoke",
        //                 fontWeight: "600",
        //                 fontSize: "1.5rem",
        //                 backgroundColor: selectedRows.length > 0 ? "red" : "gray",
        //                 boxShadow: deleteClicked ? "inset 0 0 4px 2px black" : "none"
        //             }}
        //             onClick={showDeleteDialog}
        //             disabled={selectedRows.length === 0}
        //         >
        //             <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
        //                 <IconTrash />
        //                 <span style={{ textIndent: "5px" }}>
        //                     Delete {selectedRows.length} {selectedRows.length === 1 ? "row" : "rows"}
        //                 </span>
        //             </div>
        //         </button>
                
        //         {/* Dialog for Removing Confirmation */}
        //         <dialog ref={dialogRef} style={{ border: "none", borderRadius: "1.2rem" }}>
        //             <p style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginTop: "1rem" }}>
        //                 Confirm for Remove
        //             </p>
        //             <p style={{ margin: "1.5rem 0.5rem", fontSize: "1.8rem", textAlign: "justify", textIndent: "2px" }}>
        //                 Are you agreed to remove selected rows?
        //             </p>
        //             <div style={{ width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 auto" }}>
        //                 <button type="button"
        //                     style={{
        //                         border: "none",
        //                         borderRadius: "0.75rem",
        //                         height: "30px",
        //                         padding: "2px 5px",
        //                         color: "whitesmoke",
        //                         fontWeight: "600",
        //                         fontSize: "1.5rem",
        //                         backgroundColor: "green",
        //                         cursor: "pointer",
        //                     }}
        //                     onClick={removeDeleteDialog}
        //                 >
        //                     <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
        //                         <IconCheck />
        //                         <span style={{ textIndent: "5px" }}>Yes</span>
        //                     </div>
        //                 </button>
        //                 <button type="button"
        //                     style={{
        //                         border: "none",
        //                         borderRadius: "0.75rem",
        //                         height: "30px",
        //                         padding: "2px 5px",
        //                         color: "whitesmoke",
        //                         fontWeight: "600",
        //                         fontSize: "1.5rem",
        //                         backgroundColor: "red",
        //                         cursor: "pointer",
        //                     }}
        //                     onClick={closeDeleteDialog}
        //                 >
        //                     <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
        //                         <IconX />
        //                         <span style={{ textIndent: "5px" }}>No</span>
        //                     </div>
        //                 </button>
        //             </div>
        //         </dialog>
        //     </div>

        //     <div style={{ width: "100%", overflow: "hidden" }}>
        //         <AnimatePresence>
        //             {addingRow &&
        //                 <motion.div
        //                     initial={{ height: 0, opacity: 0, outline: "none" }}
        //                     animate={{ height: "auto", opacity: 1, outline: "2px solid" }}
        //                     exit={{ height: 0, opacity: 0, outline: "none" }}
        //                     transition={{ duration: 1 }}

        //                     style={{ display: "block" }}
        //                 >
        //                     <form style={{
        //                         margin: "0 auto", display: "flex", flexDirection: "row",
        //                         flexWrap: "wrap", justifyContent: "space-between",
        //                     }}
        //                     ref={formRef}
        //                     onSubmit={handleConfirm}
        //                     >
        //                         {initialColumns.map((column, index) => {
        //                             if (column.name && column.name !== ""
        //                                 && column.name !== "ID" && !column.name.endsWith("Id")
        //                                 && !column.name.startsWith("_") && !column.name.endsWith("s")) {
        //                                 return (
        //                                     <div key={index} style={{
        //                                         display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
        //                                         alignItems: "center", justifyContent: "center", gap: "1.5rem",
        //                                         padding: "0.5rem 1rem", width: "48%",
        //                                     }}>
        //                                         <label htmlFor={column.name.toLowerCase()} style={{ fontSize: "1.5rem" }}>
        //                                             {column.name}:
        //                                         </label>
        //                                         <input id={column.name.toLowerCase()} placeholder={`${column.name.toLowerCase()}...`}
        //                                             style={{
        //                                                 fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem"
        //                                             }}
        //                                             name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
        //                                             type={column.type || "text"}
        //                                         />
        //                                     </div>
        //                                 )
        //                             }

        //                             return null;
        //                         })}

        //                         <div style={{
        //                             width: "100%", padding: "8px 6px", display: "inline-flex", gap: "0.5rem",
        //                             alignItems: "center", flexDirection: "row", justifyContent: "flex-start",
        //                         }}>
        //                             <button type="submit"
        //                                 style={{
        //                                     border: "none",
        //                                     borderRadius: "0.75rem",
        //                                     height: "30px",
        //                                     padding: "2px 5px",
        //                                     color: "whitesmoke",
        //                                     fontWeight: "600",
        //                                     backgroundColor: "green",
        //                                     fontSize: "1.5rem",
        //                                 }}
        //                             >
        //                                 Confirm
        //                             </button>
        //                             <button type="button"
        //                                 style={{
        //                                     border: "none",
        //                                     borderRadius: "0.75rem",
        //                                     height: "30px",
        //                                     padding: "2px 5px",
        //                                     color: "whitesmoke",
        //                                     fontWeight: "600",
        //                                     backgroundColor: "red",
        //                                     fontSize: "1.5rem",
        //                                     cursor: "pointer",
        //                                 }}
        //                                 onClick={() => {
        //                                     setAddingRow(!addingRow);
        //                                 }}
        //                             >
        //                                 Cancel
        //                             </button>
        //                         </div>
        //                     </form>
        //                 </motion.div>
        //             }
        //         </AnimatePresence>
        //     </div>
        // </div>

        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "0.75rem",
            marginBottom: "1rem"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <AnimatePresence>
                            {openSearch && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                                >
                                    <div style={{ position: "relative" }}>
                                        <input
                                            type="text"
                                            placeholder={`Search by ${searchType}...`}
                                            value={searchText}
                                            onChange={e => setSearchText(e.target.value)}
                                            style={{
                                                padding: "0.5rem 1rem 0.5rem 2.5rem",
                                                border: "1px solid #d1d5db",
                                                borderRadius: "0.5rem",
                                                fontSize: "1.4rem",
                                                width: "200px",
                                                backgroundColor: "white"
                                            }}
                                            autoFocus
                                        />
                                        <IconSearch 
                                            size={18} 
                                            style={{ 
                                                position: "absolute", 
                                                left: "0.75rem", 
                                                top: "50%", 
                                                transform: "translateY(-50%)",
                                                color: "#6b7280"
                                            }} 
                                        />
                                    </div>

                                    <select 
                                        value={searchType}
                                        onChange={e => {
                                            setSearchType(e.target.value);
                                            setSearchText("");
                                        }}
                                        style={{
                                            padding: "0.5rem 2rem 0.5rem 1rem",
                                            border: "1px solid #d1d5db",
                                            borderRadius: "0.5rem",
                                            fontSize: "1.4rem",
                                            backgroundColor: "white",
                                            appearance: "none",
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                            backgroundPosition: "right 0.5rem center",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "1.5em 1.5em"
                                        }}
                                    >
                                        <option value="id">ID</option>
                                        {visibleColumns
                                            .filter(col => col.name && col.name !== '')
                                            .map((column, index) => 
                                                (index > 0 && column.name !== "") && 
                                                <option key={index} value={column.name.toLowerCase()}>
                                                    {column.name}
                                                </option>
                                            )
                                        }
                                    </select>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button 
                            type="button" 
                            style={{
                                ...iconButtonStyle,
                                backgroundColor: openSearch ? "#e5e7eb" : "white",
                                border: "1px solid #d1d5db",
                            }}
                            onClick={() => {
                                openSearch && setSearchText("");
                                setOpenSearch(!openSearch);
                                setSearchType(defaultSortField);
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = openSearch ? "#d1d5db" : "#f3f4f6";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = openSearch ? "#e5e7eb" : "white";
                            }}
                        >
                            {openSearch ? <IconSearchOff size={20} /> : <IconSearch size={20} />}
                        </button>
                    </div>

                    <button
                        type="button" 
                        style={{
                            ...iconButtonStyle,
                            backgroundColor: columnsMenu ? "#e5e7eb" : "white",
                            border: "1px solid #d1d5db",
                        }}
                        onClick={() => setColumnsMenu(!columnsMenu)}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = columnsMenu ? "#d1d5db" : "#f3f4f6";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = columnsMenu ? "#e5e7eb" : "white";
                        }}
                    >
                        <IconLayoutColumns size={20} />
                    </button>

                    <button
                        type="button" 
                        style={{
                            ...iconButtonStyle,
                            backgroundColor: density ? "#e5e7eb" : "white",
                            border: "1px solid #d1d5db",
                        }}
                        onClick={() => setDensity(!density)}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = density ? "#d1d5db" : "#f3f4f6";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = density ? "#e5e7eb" : "white";
                        }}
                    >
                        {density ? <IconBaselineDensitySmall size={20} /> : <IconBaselineDensityLarge size={20} />}
                    </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <button
                        type="button" 
                        style={{
                            ...buttonStyle,
                            ...(selectingRows ? warningButtonStyle : successButtonStyle)
                        }}
                        onClick={onClickSelectingRows}
                    >
                        <IconSelector size={18} />
                        {selectingRows ? "Cancel Selection" : "Select Rows"}
                    </button>

                    <button 
                        type="button"
                        style={{
                            ...buttonStyle,
                            ...primaryButtonStyle,
                            opacity: addingRow ? 0.6 : 1
                        }}
                        onClick={() => setAddingRow(!addingRow)}
                        disabled={addingRow}
                    >
                        <IconPlus size={18} />
                        Add Row
                    </button>

                    <button 
                        type="button"
                        style={{
                            ...buttonStyle,
                            ...(selectedRows.length > 0 ? dangerButtonStyle : secondaryButtonStyle)
                        }}
                        onClick={showDeleteDialog}
                        disabled={selectedRows.length === 0}
                    >
                        <IconTrash size={18} />
                        Delete ({selectedRows.length})
                    </button>
                </div>
            </div>

            <dialog 
                ref={dialogRef} 
                style={{ 
                    border: "none", 
                    borderRadius: "1rem",
                    padding: "2rem",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    maxWidth: "400px"
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "1.8rem", fontWeight: "600", marginBottom: "1rem", color: "#1f2937" }}>
                        Confirm Deletion
                    </h3>
                    <p style={{ fontSize: "1.5rem", color: "#6b7280", marginBottom: "2rem" }}>
                        Are you sure you want to delete {selectedRows.length} selected {selectedRows.length === 1 ? 'row' : 'rows'}? 
                        This action cannot be undone.
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                        <button 
                            type="button"
                            style={{ ...buttonStyle, ...secondaryButtonStyle }}
                            onClick={closeDeleteDialog}
                        >
                            <IconX size={18} />
                            Cancel
                        </button>
                        <button 
                            type="button"
                            style={{ ...buttonStyle, ...dangerButtonStyle }}
                            onClick={removeDeleteDialog}
                        >
                            <IconCheck size={18} />
                            Delete
                        </button>
                    </div>
                </div>
            </dialog>

            <AnimatePresence>
                {addingRow && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ 
                            overflow: "hidden",
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            backgroundColor: "white"
                        }}
                    >
                        <div style={{ padding: "1.5rem" }}>
                            <h4 style={{ 
                                fontSize: "1.6rem", 
                                fontWeight: "600", 
                                marginBottom: "1rem",
                                color: "#1f2937"
                            }}>
                                Add New Row
                            </h4>
                            <form 
                                ref={formRef}
                                onSubmit={handleConfirm}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                                    gap: "1rem"
                                }}
                            >
                                {initialColumns
                                    .filter(column => 
                                        column.name && column.name !== "" &&
                                        column.name !== "ID" && 
                                        !column.name.endsWith("Id") &&
                                        !column.name.startsWith("_") && 
                                        !column.name.endsWith("s")
                                    )
                                    .map((column, index) => (
                                        <div key={index} style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0.5rem"
                                        }}>
                                            <label 
                                                htmlFor={column.name.toLowerCase()}
                                                style={{ 
                                                    fontSize: "1.4rem", 
                                                    fontWeight: "500",
                                                    color: "#374151",
                                                    textAlign: "left"
                                                }}
                                            >
                                                {column.name}
                                            </label>
                                            <input 
                                                id={column.name.toLowerCase()} 
                                                placeholder={`Enter ${column.name.toLowerCase()}...`}
                                                style={{
                                                    padding: "0.75rem",
                                                    border: "1px solid #d1d5db",
                                                    borderRadius: "0.375rem",
                                                    fontSize: "1.4rem",
                                                    width: "100%",
                                                    boxSizing: "border-box"
                                                }}
                                                name={column.name.charAt(0).toLowerCase() + column.name.slice(1)}
                                                type={column.type || "text"}
                                            />
                                        </div>
                                    ))
                                }

                                <div style={{
                                    gridColumn: "1 / -1",
                                    display: "flex",
                                    gap: "1rem",
                                    justifyContent: "flex-end",
                                    paddingTop: "1rem",
                                    borderTop: "1px solid #e5e7eb"
                                }}>
                                    <button 
                                        type="button"
                                        style={{ ...buttonStyle, ...secondaryButtonStyle }}
                                        onClick={() => setAddingRow(false)}
                                    >
                                        <IconX size={18} />
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        style={{ ...buttonStyle, ...successButtonStyle }}
                                    >
                                        <IconCheck size={18} />
                                        Add Row
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export { SubHeaderComponent };
