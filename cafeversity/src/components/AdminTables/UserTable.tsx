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
                fontWeight: '500',
            },
        },
        cells: {
            style: {
                fontSize: '18px',
            },
        },
    };
    
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState<string>("id");

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

    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [density, setDensity] = useState<boolean>(false);

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
                    </div>
                }
                dense={density}
                paginationRowsPerPageOptions={[5, 10]}
                customStyles={customStyles}
                // defaultSortAsc={true}
                // expandableRowsComponent={ExpandedComponent}
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
