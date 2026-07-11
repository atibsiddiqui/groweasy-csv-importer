"use client";

interface MappedTableProps {
  data: Record<string, any>[];
  mapping: Record<string, string | null>;
}

export default function MappedTable({
  data,
  mapping,
}: MappedTableProps) {
  if (!data.length) return null;

  const transformedData = data.map((row) => ({
    name: mapping.name ? row[mapping.name] || "" : "",
    email: mapping.email ? row[mapping.email] || "" : "",
    phone: mapping.phone ? row[mapping.phone] || "" : "",
    company: mapping.company ? row[mapping.company] || "" : "",
    city: mapping.city ? row[mapping.city] || "" : "",
  }));

  return (
    <div className="mt-12">
      <h2 className="mb-5 text-2xl font-bold text-white">
        ✅ GrowEasy CRM Preview
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr>
              {Object.keys(transformedData[0]).map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 text-left text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transformedData.slice(0, 10).map((row, index) => (
              <tr
                key={index}
                className="border-t border-slate-700 hover:bg-slate-900"
              >
                {Object.values(row).map((value, idx) => (
                  <td
                    key={idx}
                    className="px-5 py-3 text-slate-300"
                  >
                    {String(value)}
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