"use client";

interface AIResultTableProps {
  aiResult: {
    mapping: Record<string, string | null>;
    confidence: Record<string, number>;
  };
}

export default function AIResultTable({
  aiResult,
}: AIResultTableProps) {
  return (
    <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            🤖 AI Field Mapping
          </h2>

          <p className="mt-2 text-slate-400">
            AI analyzed your CSV and matched each CRM field.
          </p>
        </div>

        <div className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
          Mapping Complete
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-white">
                CRM Field
              </th>

              <th className="px-6 py-4 text-left text-white">
                CSV Column
              </th>

              <th className="px-6 py-4 text-left text-white">
                Confidence
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(aiResult.mapping).map((field) => {
              const confidence =
                aiResult.confidence[field] || 0;

              const badge =
                confidence >= 90
                  ? "bg-green-600"
                  : confidence >= 60
                  ? "bg-yellow-500"
                  : "bg-red-600";

              return (
                <tr
                  key={field}
                  className="border-t border-slate-700 transition hover:bg-slate-800"
                >
                  <td className="px-6 py-4 font-semibold capitalize text-blue-400">
                    {field}
                  </td>

                  <td className="px-6 py-4 text-green-400">
                    {aiResult.mapping[field] || "Not Found"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold text-white ${badge}`}
                    >
                      {confidence}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-slate-800 p-5 text-center">
          <h3 className="text-3xl font-bold text-blue-400">
            {Object.keys(aiResult.mapping).length}
          </h3>

          <p className="mt-2 text-slate-400">
            Fields Identified
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-5 text-center">
          <h3 className="text-3xl font-bold text-green-400">
            {
              Object.values(aiResult.mapping).filter(Boolean)
                .length
            }
          </h3>

          <p className="mt-2 text-slate-400">
            Successfully Mapped
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-5 text-center">
          <h3 className="text-3xl font-bold text-yellow-400">
            {Math.round(
              Object.values(
                aiResult.confidence
              ).reduce((a, b) => a + b, 0) /
                Object.values(aiResult.confidence).length
            )}
            %
          </h3>

          <p className="mt-2 text-slate-400">
            Average Confidence
          </p>
        </div>
      </div>
    </div>
  );
}