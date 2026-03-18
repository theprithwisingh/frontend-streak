import React from "react";
import { memo, useCallback } from "react";

function DataGrid({ columns, data }) {
  const renderCell = useCallback((row, col) => {
    return row[col];
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          {columns.map(c => <th key={c}>{c}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <Row key={row.id} row={row} columns={columns} renderCell={renderCell} />
        ))}
      </tbody>
    </table>
  );
}

const Row = memo(({ row, columns, renderCell }) => {
  return (
    <tr>
      {columns.map(c => (
        <td key={c}>{renderCell(row, c)}</td>
      ))}
    </tr>
  );
});

export default memo(DataGrid);
