"use client";

import Button from "@/app/components/Button";
import { Field, FieldType } from "@/types/SchemaTypes";
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
  const [rows, setRows] = useState<Field[]>([]);

  const addRow = () => setRows([...rows, { id: Date.now().toString(), name: "", type: "" }]);

  const deleteRow = (index: number) =>
    setRows(rows.filter((_, i) => i !== index));

  const handleChange = (
    index: number,
    key: "name" | "type",
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
      <table className="w-full border border-(--light-gray) bg-(--dark-gray) rounded-lg overflow-hidden text-(--white)">
        <thead className="bg-(--blue-dark) text-left">
          <tr>
            <th className="p-3 font-medium">Field Name</th>
            <th className="p-3 font-medium">Type</th>
            <th className="p-3 font-medium">Actions</th>
            <th className="p-3 text-center font-medium">Delete</th>
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
                  value={row.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="Enter field name"
                  className="w-full"
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
                  className="w-full"
                />
              </td>
              <td>
                {row.type === ""}
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
