"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import {
    IconBaselineDensitySmall,
    IconBaselineDensityLarge,
    IconSearch, IconSearchOff,
    // IconPlus,
    IconTrash,
    IconCheck, IconX,
    IconLayoutColumns,
    IconSelector,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from "framer-motion";
import { ColumnConfig } from "../TableParts/TableBody";



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


const OrdersSubHeader = <T extends { id: number }>({
    // initialColumns,
    visibleColumns,

    openSearch, setOpenSearch, searchText, setSearchText, searchType, setSearchType,
    density, setDensity, selectingRows, onClickSelectingRows, columnsMenu, setColumnsMenu,
    // addingRow,
    // setAddingRow,

    selectedRows,
    // deleteClicked,
    
    defaultSortField,
    
    // onConfirm,
    onDelete
}: SubHeaderComponentProps<T>) => {
    const dialogRef = useRef<HTMLDialogElement>(null);


    const showDeleteDialog = () => dialogRef.current?.showModal();
    const removeDeleteDialog = () => {
        onDelete();
        dialogRef.current?.close();
    }
    const closeDeleteDialog = () => dialogRef.current?.close();


    // const handleConfirm = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!formRef.current) return;
    //  
    //     const formData = new FormData(formRef.current);
    //     const newData: Record<string, unknown> = {};
    //
    //  
    //     initialColumns.forEach(column => {
    //         if (column.name && column.name !== "" && column.name.toLowerCase() !== "id") {
    //             const value = formData.get(column.name.charAt(0).toLowerCase() + column.name.slice(1));
    //             newData[column.name.charAt(0).toLowerCase() + column.name.slice(1)] = column.type === "number" && value
    //                 ? Number(value) : value === "" ? null : value;
    //         }
    //     });
    //
    //     onConfirm(newData as Partial<T>);
    // }

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
    
    return (
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
        </div>
    );
}

export default OrdersSubHeader;