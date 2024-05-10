import React from "react";
import { Card, Typography } from "@material-tailwind/react";


export default function LargeTable() {
  // Generate sample data
  const rows = [];
  const cols = 10;
  const rowsCount = 50;
  for (let i = 0; i < rowsCount; i++) {
    rows.push(
      <tr key={i}>
        {[...Array(cols)].map((_, j) => (
          <td key={j} className="border px-4 py-2">
            Row {i + 1}, Col {j + 1}
          </td>
        ))}
      </tr>
    );
  }

  return (
    <div className="overflow-x-auto z-40 ">
      <table className="table-auto border-collapse border">
        <thead>
          <tr>
            {[...Array(cols)].map((_, i) => (
              <th key={i} className="px-4 py-2">
                Header {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
