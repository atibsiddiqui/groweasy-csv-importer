"use client";

interface PreviewTableProps {
  data: Record<string, any>[];
}

export default function PreviewTable({ data }: PreviewTableProps) {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-slate-700">
      <table className="min-w-full">
        <thead className="bg-slate-800">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.slice(0, 10).map((row, index) => (
            <tr
              key={index}
              className="border-t border-slate-700 hover:bg-slate-900"
            >
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-4 py-3 text-sm text-slate-300"
                >
                  {String(row[header] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}