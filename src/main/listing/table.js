import React from "react";
import { useTable, useFilters, useGlobalFilter, useRowSelect} from 'react-table'


export default function Table({ columns, data, onRowSelect }) {

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
      );
      
      function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
      }) {
        const count = preFilteredRows.length
      
        return (
          <input
            value={filterValue || ''}
            onChange={e => {
              setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
          />
        )
      }

      const filterTypes = React.useMemo(
        () => ({
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
          },
        }),
        []
      )

    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        toggleAllRowsSelected,
        selectedFlatRows
    } = useTable({
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    useRowSelect );

    React.useEffect(() => {
      onRowSelect(selectedFlatRows);
    });
    //}, [onRowSelect, selectedFlatRows]);
  
    /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
        <div>
        <button className="btn btn-primary" onClick={() => toggleAllRowsSelected(true)}>
            Select All Rows
        </button>
        <button className="btn btn-primary" onClick={() => toggleAllRowsSelected(false)}>
            Deselect All Rows
        </button>
        
        <table {...getTableProps()} className="table">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps)}>
                        {column.render("Header")}
                        <div>{column.canFilter ? column.render("Filter") : null}</div> 
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                <tr {...row.getRowProps()}  className={row.isSelected ? "table-active" : ""} onClick={() => row.toggleRowSelected()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                </tr>
                );
            })}
            </tbody>
        </table>
      </div>
    );
  }