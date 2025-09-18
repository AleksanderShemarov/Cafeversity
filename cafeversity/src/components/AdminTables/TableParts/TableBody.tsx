/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataTable from "react-data-table-component";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { TableRowExpanderProps } from "./TableExpander";
import { NoDataComponentProps } from "./TableNoData";
import { SubHeaderComponentProps } from "./TableSubHeader";
import { SubHeaderComponent } from "./TableSubHeader";
import { TableRowExpander } from "./TableExpander";
import { NoDataComponent } from "./TableNoData";
import { TableLoadingComponent } from "./TableLoading";


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

type TableComponents<T> = {
    SubHeader?: React.ComponentType<SubHeaderComponentProps<T>>,
    Expander?: React.ComponentType<TableRowExpanderProps<T>>,
    Loading?: React.ComponentType<{ loadingText?: string }>,
    NoData?: React.ComponentType<NoDataComponentProps<T>>,
}

type TableBodyProps<T> = {
    initialData: T[],
    initialColumns: ColumnConfig<T>[],
    loading?: boolean,
    title?: string,
    components?: TableComponents<T>,
    onRowAdd?: (newData: Partial<T>) => Promise<T | undefined>,
    onRowUpdate?: (id: number, updatedData: Partial<T>) => Promise<void>,
    onRowsDelete?: (ids: Set<number>) => Promise<void>,
    defaultSortField?: string
};


const TableBody = <T extends { id: number }>({
    initialData,
    initialColumns,
    loading = false,
    title= "Data Table",
    components = {},
    onRowAdd,
    onRowUpdate,
    onRowsDelete,
    defaultSortField = "id"
}: TableBodyProps<T>) => {
    
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
    const [columns, setColumns] = useState<ColumnConfig<T>[]>(initialColumns);

    
    //
    useEffect(() => {
        setData(initialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialData]);

    useEffect(() => {
        setTableLoad(loading);
    }, [loading]);
    //


    const visibleColumns = useMemo(() => {
        const actionColumn = {
            name: '',
            selector: () => '',
            cell: (row: T) => {
                const isSelected = selectedRows.some(s => s.id === row.id);
                const isSingleSelection = selectedRows.length === 1;
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
                                cursor: isSelected && isSingleSelection ? "pointer" : "not-allowed",
                                backgroundColor: isSelected && isSingleSelection ? "#FFBA0D" : "grey",
                                boxShadow: updateClicked === row.id ? "inset 0 0 4px 2px black" : "none",
                            }}
                            onClick={() => setUpdateClicked(row.id)}
                            disabled={!isSelected || !isSingleSelection}
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
        return [...columns.filter(col => !col.omit), actionColumn];
    }, [columns, selectedRows, updateClicked]);

    
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
    // const visibleColumns = useMemo(
    //     () => columns.filter(col => !col.omit),
    //     [columns]
    // );

    
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
    }, [data, searchText, searchType, columns]);
    

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
    const handleSaveConfirm = async (newData: Partial<T>) => {
        try {
            if (onRowAdd) {
                const row = await onRowAdd(newData);
                if (row !== undefined) {
                    setData(prevData => [...prevData, row]);
                    toast.success("A new row has been added!", { position: "top-right", style: { fontSize: "1.5rem" } });
                    setAddingRow(false);
                }
                else toast.error("Failed to add row", { position: "top-right", style: { fontSize: "1.5rem" } });
            }
            else toast.error("Failed to add row because 'onRowAdd' isn't declared in TableBody", { position: "top-right", style: { fontSize: "1.5rem" } });
        } catch (error) {
            toast.error("Failed to add row", { position: "top-right", style: { fontSize: "1.5rem" } });
        }        
    }


    // Changing visibility of table's columns
    const toggleColumnsVisibility = (columnName: string) => {
        setColumns(prev => prev.map(col => col.name === columnName ? { ...col, omit: !col.omit } : col));
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


    // Refactoring for additional TableBody's parts
    const {
        SubHeader = SubHeaderComponent,
        Expander = TableRowExpander,
        Loading = TableLoadingComponent,
        NoData = NoDataComponent,
    } = components;


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
                progressPending={tableLoad}
                progressComponent={
                    <Loading loadingText="Users Rows are loading..." />
                }
                
                subHeader
                subHeaderComponent={
                    <SubHeader
                        initialColumns={initialColumns}
                        visibleColumns={visibleColumns}

                        openSearch={openSearch} setOpenSearch={setOpenSearch}
                        searchText={searchText} setSearchText={setSearchText}
                        searchType={searchType} setSearchType={setSearchType}
                        density={density} setDensity={setDensity}
                        selectingRows={selectingRows} onClickSelectingRows={
                            () => {
                                if (selectingRows && selectedRows.length > 0) {
                                    setSelectedRows([]);
                                    setToggleCleared(!toggleCleared);
                                    setUpdateClicked(0);
                                }
                                setSelectingRows(!selectingRows);
                            }
                        }
                        columnsMenu={columnsMenu} setColumnsMenu={setColumnsMenu}
                        addingRow={addingRow} setAddingRow={setAddingRow}

                        selectedRows={selectedRows}
                        deleteClicked={deleteClicked}

                        defaultSortField={defaultSortField}

                        onConfirm={handleSaveConfirm} onDelete={handleDelete}
                    />
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
                        setUpdateClicked(0);
                    }
                }}
                selectableRowsHighlight
                clearSelectedRows={toggleCleared}

                expandableRows
                expandableRowsHideExpander
                expandableRowsComponent={({ data }) => (
                    <Expander initialColumns={initialColumns}
                        setUpdateClicked={setUpdateClicked}
                        data={data} onSave={handleSave}
                    />
                )}
                expandableRowExpanded={row => updateClicked === row.id}

                noDataComponent={
                    <NoData tableLoad={tableLoad} data={data} searchType={searchType} />
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
                    {columns.filter(column => column.name && column.name !== "").map(column => (
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

export { TableBody };
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
