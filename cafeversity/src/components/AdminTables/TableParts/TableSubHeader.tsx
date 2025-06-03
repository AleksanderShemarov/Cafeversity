"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import {
    IconBaselineDensitySmall,
    IconBaselineDensityLarge,
    IconSearch, IconSearchOff,
    IconPlus, IconTrash,
    IconCheck, IconX,
    IconLayoutColumns,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from "framer-motion";
import { ColumnConfig } from "./TableBody";


interface SubHeaderComponentProps<T> {
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

    onConfirm: (newData: Omit<T, 'id'>) => void,
    onDelete: () => void
}
const SubHeaderComponent = <T extends { id: number }>({
    initialColumns, visibleColumns,

    openSearch, setOpenSearch, searchText, setSearchText, searchType, setSearchType,
    density, setDensity, selectingRows, onClickSelectingRows, columnsMenu, setColumnsMenu,
    addingRow, setAddingRow,

    selectedRows, deleteClicked,
    
    defaultSortField,
    
    onConfirm, onDelete
}: SubHeaderComponentProps<T>) => {

    const dialogRef = useRef<HTMLDialogElement>(null);

    const showDeleteDialog = () => dialogRef.current?.showModal();
    const removeDeleteDialog = () => {
        onDelete();
        dialogRef.current?.close();
    }
    const closeDeleteDialog = () => dialogRef.current?.close();


    const formRef = useRef<HTMLFormElement>(null);

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        
        const formData = new FormData(formRef.current);
        const newData: Record<string, unknown> = {};

        /*const name = formData.get("name") as string;
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
        
        const newData = {
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
                newData[column.name.toLowerCase()] = column.type === "number" && value
                    ? Number(value) : value;
            }
        });
        onConfirm(newData as Omit<T, 'id'>);
    }

    return (
        <div style={{
            width: "100%", display: "flex",
            flexDirection: "column", alignItems: "flex-end"
        }}>
            <div style={{
                display: "flex", justifyContent: "end", alignItems: "center",
                gap: "0.5rem", padding: "0.5rem 0"
            }}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: "3px"
                }}>
                    <AnimatePresence>
                        {openSearch &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}

                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                            // while using a simple <div> the flicking doesn't exist
                            // for this code block I should write CSS-animation at CSS-module file
                        >
                            <input
                                type="text"
                                placeholder={`Search by ${searchType}`}
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                style={{ visibility: openSearch ? "visible" : "collapse" }}
                                autoFocus
                            />

                            <select name="searchTypes" value={searchType}
                                onChange={e => {
                                    setSearchType(e.target.value);
                                    setSearchText("");
                                }}
                                style={{ visibility: openSearch ? "visible" : "collapse" }}
                            >
                                <option value="id">ID</option>
                                {visibleColumns.filter(col => col.name && col.name !== '').map((column, index) => 
                                    (index > 0 && column.name !== "") && <option key={index} value={column.name.toLowerCase()}>{column.name}</option>
                                )}
                            </select>
                        </motion.div>
                        }
                    </AnimatePresence>

                    <button 
                        type="button" 
                        style={{
                            width: "35px",
                            height: "30px",
                            padding: 0,
                            paddingTop: "1px"
                        }}
                        onClick={() => {
                            openSearch && setSearchText("");///!!!!!
                            setOpenSearch(!openSearch);
                            setSearchType(defaultSortField);
                        }}
                    >
                        {openSearch ? <IconSearchOff /> : <IconSearch />}
                    </button>
                </div>

                {/* Table's Columns Showing */}
                <button
                    type="button" 
                    style={{
                        width: "35px",
                        height: "30px",
                        padding: 0,
                        paddingTop: "1px"
                    }}
                    onClick={() => setColumnsMenu(!columnsMenu)}
                >
                    <IconLayoutColumns />
                </button>

                {/* Density Button */}
                <button
                    type="button" 
                    style={{
                        width: "35px",
                        height: "30px",
                        padding: 0,
                        paddingTop: "1px"
                    }}
                    onClick={() => setDensity(!density)}
                >
                    {density ? <IconBaselineDensitySmall /> : <IconBaselineDensityLarge />}
                </button>

                {/* Button for (un)locking to choose rows in a table */}
                <button
                    type="button" 
                    style={{
                        // width: "35px",
                        border: "none",
                        borderRadius: "0.75rem",
                        height: "30px",
                        padding: "2px 5px",
                        color: "white",
                        fontWeight: "600",
                        backgroundColor: selectingRows ? "#FFBA0D" : "green",
                        boxShadow: selectingRows ? "inset 0 0 4px 2px black" : "none"
                    }}
                    // onClick={() => {
                    //     // if there is any amount of checked rows, uncheck them
                    //     if (selectingRows && selectedRows.length > 0) {
                    //         setSelectedRows([]);
                    //         setToggleCleared(!toggleCleared);
                    //     }
                    //     setSelectingRows(!selectingRows);
                    // }}
                    onClick={onClickSelectingRows}
                >
                    Select a Row
                </button>

                {/* Add a new row button */}
                <button type="button"
                    style={{
                        border: "none",
                        borderRadius: "0.75rem",
                        height: "30px",
                        padding: "2px 5px",
                        color: "white",
                        fontWeight: "600",
                        backgroundColor: addingRow ? "gray" : "blue",
                    }}
                    onClick={() => setAddingRow(!addingRow)}
                    disabled={addingRow}
                >
                    <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        <IconPlus />
                        <span style={{ textIndent: "5px" }}>
                            Add
                        </span>
                    </div>
                </button>

                {/* Button for removing from one to many rows */}
                <button type="button"
                    style={{
                        border: "none",
                        borderRadius: "0.75rem",
                        height: "30px",
                        padding: "2px 5px",
                        color: "whitesmoke",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        backgroundColor: selectedRows.length > 0 ? "red" : "gray",
                        boxShadow: deleteClicked ? "inset 0 0 4px 2px black" : "none"
                    }}
                    onClick={showDeleteDialog}
                    disabled={selectedRows.length === 0}
                >
                    <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        <IconTrash />
                        <span style={{ textIndent: "5px" }}>
                            Delete {selectedRows.length} {selectedRows.length === 1 ? "row" : "rows"}
                        </span>
                    </div>
                </button>
                
                {/* Dialog for Removing Confirmation */}
                <dialog ref={dialogRef} style={{ border: "none", borderRadius: "1.2rem" }}>
                    <p style={{ fontSize: "2.2rem", fontWeight: "700", textAlign: "center", marginTop: "1rem" }}>
                        Confirm for Remove
                    </p>
                    <p style={{ margin: "1.5rem 0.5rem", fontSize: "1.8rem", textAlign: "justify", textIndent: "2px" }}>
                        Are you agreed to remove selected rows?
                    </p>
                    <div style={{ width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 auto" }}>
                        <button type="button"
                            style={{
                                border: "none",
                                borderRadius: "0.75rem",
                                height: "30px",
                                padding: "2px 5px",
                                color: "whitesmoke",
                                fontWeight: "600",
                                fontSize: "1.5rem",
                                backgroundColor: "green",
                                cursor: "pointer",
                            }}
                            onClick={removeDeleteDialog}
                        >
                            <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                                <IconCheck />
                                <span style={{ textIndent: "5px" }}>Yes</span>
                            </div>
                        </button>
                        <button type="button"
                            style={{
                                border: "none",
                                borderRadius: "0.75rem",
                                height: "30px",
                                padding: "2px 5px",
                                color: "whitesmoke",
                                fontWeight: "600",
                                fontSize: "1.5rem",
                                backgroundColor: "red",
                                cursor: "pointer",
                            }}
                            onClick={closeDeleteDialog}
                        >
                            <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                                <IconX />
                                <span style={{ textIndent: "5px" }}>No</span>
                            </div>
                        </button>
                    </div>
                </dialog>
            </div>

            <div style={{ width: "100%", overflow: "hidden" }}>
                <AnimatePresence>
                    {addingRow &&
                        <motion.div
                            initial={{ height: 0, opacity: 0, outline: "none" }}
                            animate={{ height: "auto", opacity: 1, outline: "2px solid" }}
                            exit={{ height: 0, opacity: 0, outline: "none" }}
                            transition={{ duration: 1 }}

                            style={{ display: "block" }}
                        >
                            <form style={{
                                margin: "0 auto", display: "flex", flexDirection: "row",
                                flexWrap: "wrap", justifyContent: "space-between",
                            }}
                            ref={formRef}
                            onSubmit={handleConfirm}
                            >
                                {initialColumns.map((column, index) => {
                                    if (column.name && column.name !== "" && column.name.toLowerCase() !== "id") {
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
                                        Confirm
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
                                        onClick={() => {
                                            setAddingRow(!addingRow);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    );
}

export { SubHeaderComponent };
