"use client";

import DataTable from 'react-data-table-component';
import {
    IconBaselineDensitySmall,
    IconBaselineDensityLarge,
    IconSearch, IconSearchOff,
    IconPlus, IconTrash,
    IconCheck, IconX,
    IconLayoutColumns
} from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';


const TableComponent = () => {

    const columnsSet = [
        {
            name: 'ID',
            selector: (row: { id: number; }) => row.id,
            sortable: true,
            omit: false
        },
        {
            name: 'Name',
            selector: (row: { name: string }) => row.name,
            sortable: true,
            omit: false
        },
        {
            name: 'Age',
            selector: (row: { age: number }) => row.age,
            sortable: true,
            omit: false
        },
        {
            name: '',
            cell: (row: { id: number }) => (
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
                            backgroundColor: selectedRows?.some(selectedRow => selectedRow?.id === row.id) ? "#FFBA0D" : "grey",
                            boxShadow: updateClicked === row.id ? "inset 0 0 4px 2px black" : "none"
                        }}
                        onClick={() => {
                            setUpdateClicked(row.id);
                        }}
                        disabled={!selectedRows?.some(selectedRow => selectedRow?.id === row.id)}
                    >
                        Update
                    </button>
                </div>
            ),
            omit: false
        }
    ];
    
    const initialData = [
        { id: 1, name: 'John', age: 20 }, { id: 2, name: 'Jane', age: 29 }, { id: 3, name: 'Abraham', age: 30 },
        { id: 4, name: 'Kate', age: 19 }, { id: 5, name: 'Alexander', age: 26 }, { id: 6, name: 'Chloe', age: 25 },
        { id: 7, name: 'Alghary', age: 28 }, { id: 8, name: 'Filicia', age: 21 }, { id: 9, name: 'Mario', age: 22 },
    ];
    
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
            },
        },
        expanderButton: {
            style: {
                display: "none",
            }
        }
    };


    interface HeaderComponentProps {
        onConfirm: (
            newData: { name: string, age: number }
        ) => void,
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
            const name = formData.get("name") as string;
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

            const newData = {
                name: name,
                age: age,
            }
            onConfirm(newData);
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
                                    {columns.map((column, index) => 
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
                                setSearchType("id");
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
                            backgroundColor: "green",
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
                            backgroundColor: "blue",
                            // boxShadow: selectingRows ? "inset 0 0 4px 2px black" : "none"
                        }}
                        onClick={() => setAddingRow(!addingRow)}
                    >
                        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                            <IconPlus /><span style={{ textIndent: "5px" }}>Add</span>
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
                                    <div style={{
                                        display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
                                        alignItems: "center", justifyContent: "center", gap: "1.5rem",
                                        padding: "0.5rem 1rem", width: "48%",
                                    }}>
                                        <label htmlFor="name" style={{ fontSize: "1.5rem" }}>Name:</label>
                                        <input id="name" placeholder="John" style={{
                                            fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem"
                                        }} name="name" />
                                    </div>
                                    <div style={{
                                        display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
                                        alignItems: "center", justifyContent: "center", gap: "1.5rem",
                                        padding: "0.5rem 1rem", width: "48%",
                                    }}>
                                        <label htmlFor="age" style={{ fontSize: "1.5rem" }}>Age:</label>
                                        <input id="age" placeholder="25" style={{
                                            fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem"
                                        }} name="age" />
                                    </div>

                                    <div style={{
                                        width: "100%", padding: "8px 6px", display: "inline-flex",
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
        data: { id: number, name: string, age: number },
        onSave: (
            id: number,
            updatedData: Partial<{ name: string, age: number }>
        ) => void,
    }
    
    const UpdateExpander = ({ data, onSave }: UpdateExpanderProps) => {
        
        const formRef = useRef<HTMLFormElement>(null);
        
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            
            if (!formRef.current) return;
            
            const formData = new FormData(formRef.current);
            const name = formData.get("name") as string;
            if (name === "") {
                toast.error("User's name is empty!",
                    { position: "top-right", style: { fontSize: "1.5rem" } }
                );
                return;
            }
            const age = parseInt(formData.get("age") as string);
            if (age < 0) {
                toast.error("Please, input a correct age (starting with 0)!",
                    { position: "top-right", style: { fontSize: "1.5rem" } }
                );
                return;
            }

            const updatedData = {
                name: name,
                age: age,
            }
            onSave(data.id, updatedData);
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
                    <div style={{
                        display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
                        alignItems: "center", justifyContent: "center", gap: "1.5rem",
                        padding: "0.5rem 1rem", width: "48%",
                    }}>
                        <label htmlFor="name" style={{ fontSize: "1.5rem" }}>Name:</label>
                        <input id="name" defaultValue={data.name} style={{
                            fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem"
                        }} name="name" />
                    </div>
                    <div style={{
                        display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
                        alignItems: "center", justifyContent: "center", gap: "1.5rem",
                        padding: "0.5rem 1rem", width: "48%",
                    }}>
                        <label htmlFor="age" style={{ fontSize: "1.5rem" }}>Age:</label>
                        <input id="age" defaultValue={data.age} style={{
                            fontSize: "1.8rem", flex: 1, padding: "4px 8px", borderRadius: "1.5rem"
                        }} name="age" />
                    </div>

                    <div style={{
                        width: "100%", padding: "8px 6px", display: "inline-flex",
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
                    </div>
                </form>
            </div>
        );
    }
    
    
    // State for DataTable data values
    const [data, setData] = useState(initialData);
    
    // State for table's searching line
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState<string>("id");
    
    // State for opening the table's searching line 
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [density, setDensity] = useState<boolean>(false);
    
    // State for availability for rows' selecting; state for selecting (a) row(-s); state for rows' leaving 
    const [selectingRows, setSelectingRows] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<{ id: number, name: string, age: number }[]>([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    
    // State for row's updating; state for row's deletion
    const [updateClicked, setUpdateClicked] = useState<number>(0);

    // const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [deleteClicked, setDeleteClicked] = useState<number>(0);

    // State for opening the adding row zone
    const [addingRow, setAddingRow] = useState<boolean>(false);

    // State for opening the columns menu; state for changing visibility of table's columns
    const [columnsMenu, setColumnsMenu] = useState<boolean>(false);
    const [columns, setColumns] = useState(columnsSet);
    
    
    // Searching value in table's data rows by column's name
    const searchedData = useMemo(() => {
        return data.filter(item => {
            if (!searchText) return true;
            
            if (searchType === 'id') {
                return String(item.id).includes(searchText);
            }
            
            const column = columns.find(col => 
                col.name.toLowerCase() === searchType
            );
        
            if (column?.selector) {
                const value = column.selector(item);
                return String(value).toLowerCase().includes(searchText.toLowerCase());
            }
            
            return true;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchText, searchType]);
    

    // Saving data in updated row
    const handleSave = useCallback((id: number, updatedData: Partial<{ name: string; age: number }>) => {
        setData(prevData => prevData.map(item => item.id === id ? { ...item, ...updatedData } : item));
        
        toast.success("The row has been updated!", { position: "top-right", style: { fontSize: "1.5rem" } });
        
        setUpdateClicked(0);
    }, []);


    // Removing of selected rows
    const handleDelete = () => {
        
        const len = selectedRows.length;

        const idsSet = new Set(selectedRows.map(obj => obj.id));
        setData(prevData => prevData.filter(item => !idsSet.has(item.id)));

        toast.success(`${len} ${len > 1 ? "rows have" : "row has"} been deleted!`, { position: "top-right", style: { fontSize: "1.5rem" } });
        
        setDeleteClicked(0);

        setSelectedRows([]);
        setToggleCleared(!toggleCleared);
        setSelectingRows(!selectingRows);
    };


    // Adding a new row
    const handleSaveConfirm = (newData: { name: string; age: number }) => {
        setData(prevData => {
            // ID by the last row
            const maxId = prevData.length > 0 ? Math.max(...prevData.map(item => item.id)) : 0;
            
            return [
                ...prevData,
                {
                    id: maxId + 1,
                    name: newData.name,
                    age: newData.age
                }
            ];
        });

        toast.success("A new row has been added!", { position: "top-right", style: { fontSize: "1.5rem" } });

        setAddingRow(false);
    }


    // Changing visibility of table's columns
    const toggleColumnsVisibility = (columnName: string) => {
        setColumns(prev => prev.map(col => col.name === columnName ? { ...col, omit: !col.omit } : col));
    }


    // Closing columns visibility box when mouse clicks outside it
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.column-menu-container')) {
                setColumnsMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div style={{ position: "relative" }}>
            <DataTable
                title="Table Under Construction"
                columns={columns}
                data={searchedData}
                pagination
                highlightOnHover
                paginationPerPage={5}
                responsive
                fixedHeader
                // progressPending //!
                // progressComponent //!
                
                subHeader
                subHeaderComponent={<SubHeaderComponent onConfirm={handleSaveConfirm} onDelete={handleDelete} />}
                dense={density}
                paginationRowsPerPageOptions={[5, 10]}
                customStyles={customStyles}
                
                selectableRows={selectingRows}
                // selectableRowsSingle
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
                }}>
                    {columns.filter(column => column.name !== "").map(column => (
                        <label key={column.name}
                            style={{ display: 'flex', alignItems: 'center', fontSize: "1.5rem" }}
                            htmlFor={`column-${column.name}`}
                        >
                            <input
                                id={`column-${column.name}`}
                                type="checkbox"
                                checked={!column.omit}
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
