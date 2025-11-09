import Card from "./Card";

type Badge = "active" | "expired";

type Row = (string | Badge)[];

interface TableProps {
  columns: string[];
  rows: Row[];
  title?: string;
}

const Table = ({ columns, rows, title }: TableProps) => {
  const getBadgeColor = (badge: Badge) => {
    return badge === "active"
      ? "bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,1)]"
      : "bg-gray-400 hover:shadow-[0_0_20px_rgba(156,163,175,1)]";
  };

  return (
    <Card>
      {title && (
        <h2 className="text-lg text-(--white) font-semibold mb-3">{title}</h2>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left border-b border-(--white-10) p-2 font-medium text-(--text-light)"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-(--blue-2)">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="p-2 border-b border-(--white-10) text-(--white)"
                >
                  {cell === "active" || cell === "expired" ? (
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full  ${getBadgeColor(
                          cell
                        )}`}
                      ></span>
                      <span
                        className={`capitalize ${
                          cell === "active" ? "text-green-500" : "text-gray-400"
                        }`}
                      >
                        {cell}
                      </span>
                    </div>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
