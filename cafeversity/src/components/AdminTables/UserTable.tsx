/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataTable from 'react-data-table-component';
import {
    IconBaselineDensitySmall,
    IconBaselineDensityLarge,
    IconSearch, IconSearchOff,
    IconPlus, IconTrash,
    IconCheck, IconX,
    IconLayoutColumns,
    IconClock
} from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';


export type ColumnConfig<T> = {
    name: string,
    selector: (row: T) => any,
    format?: (value: any) => React.ReactNode,
    sortable?: boolean,
    omit?: boolean,
    width?: string,
    grow?: number,
    type?: string,
};

type TableComponentProps<T> = {
    initialData: T[],
    initialColumns: ColumnConfig<T>[],
    loading?: boolean,
    title?: string,
    onRowAdd?: (newData: Omit<T, 'id'>) => Promise<void>,
    onRowUpdate?: (id: number, updatedData: Partial<T>) => Promise<void>,
    onRowsDelete?: (ids: Set<number>) => Promise<void>,
    defaultSortField?: string
};


const TableComponent = <T extends { id: number }>({
    initialData,
    initialColumns,
    loading = false,
    title= "Data Table",
    onRowAdd,
    onRowUpdate,
    onRowsDelete,
    defaultSortField = "id"
}: TableComponentProps<T>) => {
    
    // State for table's data loading; simulation of 3 second table's data loading
    const [tableLoad, setTableLoad] = useState<boolean>(loading);

    // State for DataTable data values
    const [data, setData] = useState<T[]>(initialData);
    
    // State for table's searching line
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState<string>(defaultSortField);
    
    // State for opening the table's searching line 
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [density, setDensity] = useState<boolean>(false);
    
    // State for availability for rows' selecting; state for selecting (a) row(-s); state for rows' leaving 
    const [selectingRows, setSelectingRows] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    
    // State for row's updating; state for row's deletion
    const [updateClicked, setUpdateClicked] = useState<number>(0);
    const [deleteClicked, setDeleteClicked] = useState<number>(0);

    // State for opening the adding row zone
    const [addingRow, setAddingRow] = useState<boolean>(false);

    // State for opening the columns menu; state for changing visibility of table's columns
    const [columnsMenu, setColumnsMenu] = useState<boolean>(false);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

    
    //
    useEffect(() => {
        setData(initialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialData]);

    useEffect(() => {
        setTableLoad(loading);
    }, [loading]);
    //

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    /* const columnsSet = [
        {
            name: 'ID',
            selector: (row: { id: number; }) => row.id,
            sortable: true,
            omit: false,
            width: "10rem",
            grow: 0.25
        },
        {
            name: 'Name',
            selector: (row: { name: string }) => row.name,
            sortable: true,
            omit: false,
            width: "20rem",
            grow: 1
        },
        {
            name: 'Email',
            selector: (row: { email: string }) => row.email,
            sortable: false,
            omit: false,
            width: "32rem",
            grow: 1.5
        },
        {
            name: 'City',
            selector: (row: { city: string }) => row.city,
            omit: false,
            width: "25rem",
            grow: 1 
        },
        {
            name: 'Country',
            selector: (row: { country: string }) => row.country,
            sortable: true,
            omit: false,
            width: "25rem",
            grow: 1
        },
        {
            name: 'Phone',
            selector: (row: { phone: string }) => row.phone,
            omit: false,
            width: "22rem",
            grow: 1
        },
        {
            name: 'Age',
            selector: (row: { age: number }) => row.age,
            sortable: true,
            omit: false,
            width: "10rem",
            grow: 0.5
        },
        {
            name: '',
            cell: (row: { id: number }) => {
                const isSelected = selectedRows.some(s => s.id === row.id);
                return (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                        <button type="button"
                            style={{
                                border: "none",
                                borderRadius: "0.75rem",
                                height: "30px",
                                padding: "2px 5px",
                                color: "whitesmoke",
                                fontWeight: "600",
                                fontSize: "1.5rem",
                                backgroundColor: isSelected ? "#FFBA0D" : "grey",
                                boxShadow: updateClicked === row.id ? "inset 0 0 4px 2px black" : "none",
                            }}
                            onClick={() => {
                                setUpdateClicked(row.id);
                            }}
                            disabled={!isSelected}
                        >
                            Update
                        </button>
                    </div>
                )
            },
            omit: false,
            width: "10rem",
            grow: 0.25
        }
    ]; */


    const columnsSet = useMemo(() => {
        const actionColumn = {
            name: '',
            selector: () => '',
            cell: (row: T) => {
                const isSelected = selectedRows.some(s => s.id === row.id);
                return (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                        <button type="button"
                            style={{
                                border: "none",
                                borderRadius: "0.75rem",
                                height: "30px",
                                padding: "2px 5px",
                                color: "whitesmoke",
                                fontWeight: "600",
                                fontSize: "1.5rem",
                                backgroundColor: isSelected ? "#FFBA0D" : "grey",
                                boxShadow: updateClicked === row.id ? "inset 0 0 4px 2px black" : "none",
                            }}
                            onClick={() => setUpdateClicked(row.id)}
                            disabled={!isSelected}
                        >
                            Update
                        </button>
                    </div>
                )
            },
            sortable: false,
            omit: false,
            width: "10rem",
            grow: 0.25
        };

        return [...initialColumns, actionColumn];
    }, [initialColumns, selectedRows, updateClicked]);

    
    /* const initialData = [
        { id: 1, name: 'John', email: 'john@example.com', city: 'New York', country: 'USA', phone: '+1 212 986-36-15', age: 20 },
        { id: 2, name: 'Jane', email: "jane@example.com", city: "Liverpool", country: "UK", phone: "+44 151 07-29-83", age: 29 },
        { id: 3, name: 'Abraham', email: "abraham@example.com", city: "Lyon", country: "France", phone: "+33 47 146-99-06", age: 30 },
        { id: 4, name: 'Kate', email: "kate@example.com", city: "Milan", country: "Italy", phone: "+39 02 671-54-01", age: 19 },
        { id: 5, name: 'Alexander', email: "alexander@example.com", city: "Hrodna", country: "Belarus", phone: "+375 15 278-20-91", age: 26 },
        { id: 6, name: 'Chloe', email: "chloe@example.com", city: "Wloclawek", country: "Poland", phone: "+48 54 767-12-65", age: 25 },
        { id: 7, name: 'Alghary', email: "alghary@example.com", city: "České Budějovice", country: "Czech Republic", phone: "+420 38 719-86-27", age: 28 },
        { id: 8, name: 'Filicia', email: "filicia@example.com", city: "San Paulo", country: "Brasil", phone: "+55 11 5128-0893", age: 21 },
        { id: 9, name: 'Mario', email: "mario@example.com", city: "Osaka", country: "Japan", phone: "+81 6 4912-9073", age: 22 },
    ]; */
    
    const customStyles = {
        headCells: {
            style: {
                fontSize: '2rem',
                fontWeight: '700',
            },
        },
        cells: {
            style: {
                fontSize: '18px',
                overflow: 'auto',
                textOverflow: 'ellipsis'
            },
        },
        expanderButton: {
            style: {
                display: "none",
            }
        }
    };


    // Filtering of visible and non-visible columns
    const visibleColumns = useMemo(
        () => columnsSet.filter(col => !hiddenColumns.includes(col.name || '')),
        [hiddenColumns, columnsSet]
    );

    
    // Searching value in table's data rows by column's name
    const searchedData = useMemo(() => {
        return data.filter(item => {
            if (!searchText) return true;
            
            if (searchType === 'id') {
                return String(item.id).includes(searchText);
            }
            
            const column = columnsSet.find(col => 
                col.name.toLowerCase() === searchType
            );
        
            if (column?.selector) {
                const value = column.selector(item);
                return String(value).toLowerCase().includes(searchText.toLowerCase());
            }
            
            return true;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchText, searchType, columnsSet]);
    

    // Saving data in updated row
    const handleSave = useCallback(async (id: number, updatedData: Partial<T>) => {
        try {
            if (onRowUpdate) {
                await onRowUpdate(id, updatedData);
            }

            setData(prevData => prevData.map(item => item.id === id ? { ...item, ...updatedData }: item));

            toast.success("The row has been updated!", { position: "top-right", style: { fontSize: "1.5rem" } });
        
            setUpdateClicked(0);
        } catch (error) {
            toast.error("Failed to update row", { position: "top-right", style: { fontSize: "1.5rem" } });
        }
    }, [onRowUpdate]);


    // Removing of selected rows
    const handleDelete = async () => {
        try {
            const len = selectedRows.length;
            const ids = new Set(selectedRows.map(obj => obj.id));
            
            if (onRowsDelete) {
                await onRowsDelete(ids);
            }
            setData(prevData => prevData.filter(item => !ids.has(item.id)));
        
            toast.success(`${len} ${len > 1 ? "rows have" : "row has"} been deleted!`, { position: "top-right", style: { fontSize: "1.5rem" } });
            setDeleteClicked(0);

            setSelectedRows([]);
            setToggleCleared(!toggleCleared);
            setSelectingRows(!selectingRows);
        } catch (error) {
            toast.error("Failed to delete rows", { position: "top-right", style: { fontSize: "1.5rem" } });
        }
    };


    // Adding a new row
    const handleSaveConfirm = async (newData: Omit<T, 'id'>) => {
        try {
            if (onRowAdd) {
                await onRowAdd(newData);
            }

            setData(prevData => {
                const maxId = prevData.length > 0 ? Math.max(...prevData.map(item => item.id)) : 0;
                return [...prevData, { id: maxId + 1, ...newData } as T]
            });

            toast.success("A new row has been added!", { position: "top-right", style: { fontSize: "1.5rem" } });
            setAddingRow(false);
        } catch (error) {
            toast.error("Failed to add row", { position: "top-right", style: { fontSize: "1.5rem" } });
        }        
    }


    // Changing visibility of table's columns
    const toggleColumnsVisibility = (columnName: string) => {
        // setColumns(prev => prev.map(col => col.name === columnName ? { ...col, omit: !col.omit } : col));
        setHiddenColumns(prev => prev.includes(columnName) ? prev.filter(name => name !== columnName) : [...prev, columnName]);
    }


    // Closing columns visibility box when mouse clicks outside it
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as Element).closest('#column-menu-container')) {
                setColumnsMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    interface HeaderComponentProps {
        onConfirm: (newData: Omit<T, 'id'>) => void,
        onDelete: () => void
    }
    const SubHeaderComponent = ({ onConfirm, onDelete }: HeaderComponentProps) => {

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
            // const name = formData.get("name") as string;
            // if (name === "") {
            //     toast.error("User's name is empty!",
            //         { position: "top-right", style: { fontSize: "1.5rem" } }
            //     );
            //     return;
            // }
            // const age = parseInt(formData.get("age") as string);
            // if (isNaN(age)) {
            //     toast.error("Please, input a correct age (the only numbers are available)!",
            //         { position: "top-right", style: { fontSize: "1.5rem" } }
            //     );
            //     return;
            // }
            // if (age < 0) {
            //     toast.error("Please, input a correct age (starting with 0)!",
            //         { position: "top-right", style: { fontSize: "1.5rem" } }
            //     );
            //     return;
            // }
            // const email = formData.get("email") as string;
            // if (email === "") {
            //     toast.error("User's email is empty!",
            //         { position: "top-right", style: { fontSize: "1.5rem" } }
            //     );
            //     return;
            // }
            // const city = formData.get("city") as string;
            // const country = formData.get("country") as string;
            // const phone = formData.get("phone") as string;
            //
            // const newData = {
            //     name: name,
            //     age: age,
            //     email: email,
            //     city: city,
            //     country: country,
            //     phone: phone
            // }
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
                        onClick={() => {
                            // if there is any amount of checked rows, uncheck them
                            if (selectingRows && selectedRows.length > 0) {
                                setSelectedRows([]);
                                setToggleCleared(!toggleCleared);
                            }
                            setSelectingRows(!selectingRows);
                        }}
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


    interface UpdateExpanderProps {
        data: T,
        onSave: (id: number, updatedData: Partial<T>) => void,
    }
    const UpdateExpander = ({ data, onSave }: UpdateExpanderProps) => {
        const formRef = useRef<HTMLFormElement>(null);
        
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!formRef.current) return;
            
            const formData = new FormData(formRef.current);
            const updatedData: Record<string, unknown> = {};
            // const name = formData.get("name") as string;
            // if (name === "") {
            //     toast.error("User's name is empty!",
            //         { position: "top-right", style: { fontSize: "1.5rem" } }
            //     );
            //     return;
            // }
            // const age = parseInt(formData.get("age") as string);
            // if (isNaN(age)) {
            //     toast.error("Please, input a correct age (the only numbers are available)!",
            //         { position: "top-right", style: { fontSize: "1.5rem" } }
            //     );
            //     return;
            // }
            // if (age < 0) {
            //     toast.error("Please, input a correct age (starting with 0)!",
            //         { position: "top-right", style: { fontSize: "1.5rem" } }
            //     );
            //     return;
            // }
            // const email = formData.get("email") as string;
            // if (email === "") {
            //     toast.error("User's email is empty!",
            //         { position: "top-right", style: { fontSize: "1.5rem" } }
            //     );
            //     return;
            // }
            // const city = formData.get("city") as string;
            // const country = formData.get("country") as string;
            // const phone = formData.get("phone") as string;
            //
            // const updatedData = {
            //     name: name,
            //     age: age,
            //     email: email,
            //     city: city,
            //     country: country,
            //     phone: phone
            // }
            initialColumns.forEach(column => {
                if (column.name && column.name !== "") {
                    const value = formData.get(column.name.toLowerCase());
                    updatedData[column.name.toLowerCase()] = column.type === "number" && value
                        ? Number(value) : value;
                }
            })
            onSave(data.id, updatedData as Partial<T>);
        }
        
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
                        if (column.name && column.name !== "") {
                            const value = data[column.name.toLowerCase() as keyof T];
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


    return (
        <div style={{ position: "relative" }}>
            <DataTable
                title={title}
                columns={visibleColumns}
                data={searchedData}
                pagination
                highlightOnHover
                paginationPerPage={5}
                responsive
                fixedHeader
                progressPending={tableLoad} //!
                progressComponent={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '8px'
                    }}>
                        <IconClock size={48} style={{ animation: 'spin 1s linear infinite' }} />
                        <p style={{ fontSize: '1.8rem', margin: '1rem 0 0', fontWeight: 600 }}>
                            Data Loading...
                        </p>
                    </div>
                } //!
                
                subHeader
                subHeaderComponent={<SubHeaderComponent onConfirm={handleSaveConfirm} onDelete={handleDelete} />}
                dense={density}
                paginationRowsPerPageOptions={[5, 10]}
                customStyles={customStyles}
                
                selectableRows={selectingRows}
                selectableRowsNoSelectAll
                onSelectedRowsChange={({ selectedRows }) => {
                    setSelectedRows(selectedRows);
                    if (selectedRows.length === 0) {
                        setSelectingRows(false);
                    }
                }}
                selectableRowsHighlight
                clearSelectedRows={toggleCleared}

                expandableRows
                expandableRowsHideExpander
                expandableRowsComponent={({ data }) => (
                    <UpdateExpander data={data} onSave={handleSave} />
                )}
                expandableRowExpanded={row => updateClicked === row.id}

                noDataComponent={
                    <div style={{ width: "auto" }}>
                        {
                            !tableLoad && data.length === 0
                            ?
                            <p style={{ fontSize: "1.8rem", fontWeight: 600, textAlign: "center" }}>
                                Data aren&apos;t found. Click on the browser&apos;s &#34;Refresh&#34; button
                            </p>
                            :
                            <p style={{ fontSize: "1.8rem", fontWeight: 600, textAlign: "center" }}>
                                No rows are found by &#34;<span style={{ textDecoration: "underline 2.5px" }}>
                                    {searchType === "id"
                                    ? searchType.toUpperCase() :
                                    searchType.charAt(0).toUpperCase() + searchType.slice(1)}
                                </span>&#34; table&apos;s column
                            </p>
                        }
                    </div>
                }
            />

            {/* Columns Visibility Box */}
            {columnsMenu && (
                <div style={{
                    position: 'absolute',
                    right: '20.5%',
                    top: '21.5%',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 100,
                    padding: '0.5rem',
                    borderRadius: "0.5rem",
                }}
                    id="column-menu-container"
                >
                    {columnsSet.filter(column => column.name && column.name !== "").map(column => (
                        <label key={column.name}
                            style={{ display: 'flex', alignItems: 'center', fontSize: "1.5rem" }}
                            htmlFor={`column-${column.name}`}
                        >
                            <input
                                id={`column-${column.name}`}
                                type="checkbox"
                                checked={!hiddenColumns.includes(column.name)}
                                onChange={() => toggleColumnsVisibility(column.name)}
                            />
                            {column.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export { TableComponent };
/*
This is for CSS-responsive styles

.search-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 768px) {
  .search-container {
    flex-direction: row;
    align-items: center;
  }
}
*/

// const ExpandedComponent = () => {
//
//     const data = [
//         { id: 1, name: 'John', age: 20 }, { id: 2, name: 'Jane', age: 29 }, { id: 3, name: 'Abraham', age: 30 },
//         { id: 4, name: 'Kate', age: 19 }, { id: 5, name: 'Alexander', age: 26 }, { id: 6, name: 'Chloe', age: 25 },
//         { id: 7, name: 'Alghary', age: 28 }, { id: 8, name: 'Filicia', age: 21 }, { id: 9, name: 'Mario', age: 22 },
//     ];
//
//     return (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//     );
// }

/*
// For big table
const visibleColumns = useMemo(() => 
  columns.filter(col => !col.omit), 
  [columns]
);
*/
/*
// It is for columns if omit won't work at the future versions
const dynamicColumns = allColumns.map(col => ({
  ...col,
  cell: row => col.hidden ? null : col.selector(row)
}));
*/
