"use client";

import Button from "@/app/components/Button";
import { Input, Select } from "antd";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const TYPES = [
  "string",
  "number",
  "boolean",
  "uuid",
  "date",
  "email",
  "object",
  "array",
];

const SchemaTable = () => {
  const [rows, setRows] = useState<{ field: string; type: string }[]>([
    { field: "", type: "" },
  ]);

  const addRow = () => setRows([...rows, { field: "", type: "" }]);

  const deleteRow = (index: number) =>
    setRows(rows.filter((_, i) => i !== index));

  const handleChange = (
    index: number,
    key: "field" | "type",
    value: string
  ) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  return (
    <div className="my-6">
      <table className="w-full border border-(--light-gray) rounded-lg overflow-hidden text-(--white)">
        <thead className="bg-(--blue-dark) text-left">
          <tr>
            <th className="p-3 font-medium">Field Name</th>
            <th className="p-3 font-medium">Type</th>
            <th className="p-3 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-t border-(--light-gray) hover:bg-(--white-05) transition"
            >
              <td className="p-3">
                <Input
                  size="large"
                  value={row.field}
                  onChange={(e) => handleChange(index, "field", e.target.value)}
                  placeholder="Enter field name"
                  className="w-full"
                  style={{
                    background: "var(--blue-dark)",
                    color: "var(--white)",
                    borderColor: "var(--light-gray)",
                  }}
                />
              </td>
              <td className="p-3">
                <Select
                  size="large"
                  value={row.type || undefined}
                  onChange={(value) => handleChange(index, "type", value)}
                  placeholder="Select Type"
                  options={TYPES.map((type) => ({
                    value: type,
                    label: type,
                  }))}
                  className="w-full custom-select"
                />
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => deleteRow(index)}
                  className="text-red-500 hover:text-red-400 text-lg"
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        className="mt-4 bg-(--blue) hover:bg-(--blue-2) text-white px-5 py-2 rounded"
        onClick={addRow}
      >
        + Add Field
      </Button>
    </div>
  );
};

export default SchemaTable;
