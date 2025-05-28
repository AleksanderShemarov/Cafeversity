"use client";

import DataTable from 'react-data-table-component';
import {
    IconBaselineDensitySmall,
    IconBaselineDensityLarge,
    IconSearch, IconSearchOff,
    IconPlus
} from '@tabler/icons-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';


const TableComponent = () => {

    const columns = [
        {
            name: 'ID',
            selector: (row: { id: number; }) => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row: { name: string }) => row.name,
            sortable: true,
        },
        {
            name: 'Age',
            selector: (row: { age: number }) => row.age,
            sortable: true,
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
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                            backgroundColor: selectedRows?.some(selectedRow => selectedRow?.id === row.id) ? "red" : "gray",
                            boxShadow: deleteClicked === row.id ? "inset 0 0 4px 2px black" : "none"
                        }}
                        onClick={() =>{
                            setDeleteClicked(row.id);
                            
                            handleDelete(row.id);
                        }}
                        disabled={!selectedRows?.some(selectedRow => selectedRow?.id === row.id)}
                    >
                        Delete
                    </button>
                </div>
            )
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
    }

    const HeaderComponent = ({ onConfirm }: HeaderComponentProps) => {

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
                    <button
                        // Density Button
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
                    <button
                        type="button" 
                        style={{
                            // width: "35px",
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "white",
                            fontWeight: "400",
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
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "white",
                            fontWeight: "400",
                            backgroundColor: "blue",
                            boxShadow: selectingRows ? "inset 0 0 4px 2px black" : "none"
                        }}
                        onClick={() => setAddingRow(!addingRow)}
                    >
                        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                            <IconPlus /><span style={{ textIndent: "5px" }}>Add</span>
                        </div>
                    </button>
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
    const [deleteClicked, setDeleteClicked] = useState<number>(0);

    // State for opening the adding row zone
    const [addingRow, setAddingRow] = useState<boolean>(false);
    
    
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
    

    // Deletion a selected row
    const handleDelete = (id: number) => {
        setData(prevData => prevData.filter(item => item.id !== id));

        toast.success("The row has been deleted!", { position: "top-right", style: { fontSize: "1.5rem" } });
        
        setDeleteClicked(0);
        if (selectedRows.length === 1) {
            setSelectedRows([]);
            setToggleCleared(!toggleCleared);
            setSelectingRows(!selectingRows);
        }
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


    return (
        <>
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
                subHeaderComponent={<HeaderComponent onConfirm={handleSaveConfirm} />}
                dense={density}
                paginationRowsPerPageOptions={[5, 10]}
                customStyles={customStyles}
                
                selectableRows={selectingRows}
                selectableRowsSingle
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
        </>
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
