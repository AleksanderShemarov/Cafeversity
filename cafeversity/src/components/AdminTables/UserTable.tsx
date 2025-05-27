"use client";

import DataTable from 'react-data-table-component';
import {
    IconBaselineDensitySmall,
    IconBaselineDensityLarge,
    IconSearch, IconSearchOff
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";


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
            name: 'Actions',
            cell: (row: { id: number }) => (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "400",
                            backgroundColor: selectedRows?.some(selectedRow => selectedRow?.id === row.id) ? "gold" : "grey",
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
                            fontWeight: "400",
                            backgroundColor: selectedRows?.some(selectedRow => selectedRow?.id === row.id) ? "red" : "gray",
                            boxShadow: deleteClicked === row.id ? "inset 0 0 4px 2px black" : "none"
                        }}
                        onClick={() =>{
                            setDeleteClicked(row.id);
                            
                            setTimeout(() => {
                                setDeleteClicked(0);
                            }, 3000);
                        }}
                        disabled={!selectedRows?.some(selectedRow => selectedRow?.id === row.id)}
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];
    
    const data = [
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

    const UpdateExpander = ({ data }: { data: { id: number, name: string, age: number } }) => {
        return (
            <div style={{ border: "2px solid orange", borderRadius: "1.5rem", padding: "0.5rem 1rem" }}>
                <p style={{ fontSize: "2rem" }}>ID: {data.id}</p>
                <p style={{ fontSize: "2rem" }}>Name: {data.name}</p>
                <p style={{ fontSize: "2rem" }}>Age: {data.age}</p>
                <button type="button"
                    style={{
                        border: "none",
                        borderRadius: "0.75rem",
                        height: "30px",
                        padding: "2px 5px",
                        color: "whitesmoke",
                        fontWeight: "400",
                        backgroundColor: "green",
                    }}
                    onClick={() => {
                        setUpdateClicked(0);
                    }}
                >
                    Save
                </button>
            </div>
        );
    }
    
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState<string>("id");
    
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [density, setDensity] = useState<boolean>(false);

    const [selectingRows, setSelectingRows] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<{ id: number, name: string, age: number }[]>([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const [updateClicked, setUpdateClicked] = useState<number>(0);
    const [deleteClicked, setDeleteClicked] = useState<number>(0);

    // const [saveClicked, setSaveClicked] = useState<number>(0)

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
                subHeaderComponent={
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px"
                        }}>
                            <AnimatePresence>
                                {openSearch &&
                                <>
                                    <motion.input
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}

                                        type="text"
                                        placeholder={`Search by ${searchType}`}
                                        value={searchText}
                                        onChange={e => setSearchText(e.target.value)}
                                        style={{ visibility: openSearch ? "visible" : "collapse" }}
                                    />

                                    <motion.select name="searchTypes" defaultValue="id"
                                        value={searchType}
                                        onChange={e => {
                                            setSearchType(e.target.value);
                                            setSearchText("");
                                        }}
                                        style={{ visibility: openSearch ? "visible" : "collapse" }}

                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <option value="id">ID</option>
                                        {columns.map((column, index) => 
                                            index > 0 && <option key={index} value={column.name.toLowerCase()}>{column.name}</option>
                                        )}
                                    </motion.select>
                                </>
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
                    </div>
                }
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
                expandableRowsComponent={UpdateExpander}
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
