"use client";

interface MappingEditorProps {
  headers: string[];
  mapping: Record<string, string | null>;
  setMapping: (mapping: Record<string, string | null>) => void;
}

export default function MappingEditor({
  headers,
  mapping,
  setMapping,
}: MappingEditorProps) {
  return (
    <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        ✏ Review AI Mapping
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        {Object.keys(mapping).map((field) => (
          <div key={field}>
            <label className="mb-2 block text-sm font-semibold capitalize text-slate-300">
              {field}
            </label>

            <select
              value={mapping[field] || ""}
              onChange={(e) =>
                setMapping({
                  ...mapping,
                  [field]: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            >
              <option value="">Not Mapped</option>

              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}