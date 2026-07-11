"use client";

interface Props {
  records: any[];
}

export default function ImportedRecordsTable({
  records,
}: Props) {
  if (!records.length) return null;

  const headers = Object.keys(records[0]);

  return (
    <div className="mt-10">
      <h2 className="mb-5 text-2xl font-bold text-white">
        ✅ Imported Records
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {records.slice(0, 10).map((row, i) => (
              <tr
                key={i}
                className="border-t border-slate-700"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-3 text-slate-300"
                  >
                    {String(row[header] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}