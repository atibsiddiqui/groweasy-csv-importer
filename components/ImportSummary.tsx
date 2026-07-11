"use client";

interface ImportSummaryProps {
  summary: {
    total: number;
    imported: number;
    skipped: number;
  };
}

export default function ImportSummary({
  summary,
}: ImportSummaryProps) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-400">
          Total Records
        </h3>

        <p className="mt-3 text-4xl font-bold text-blue-400">
          {summary.total}
        </p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-400">
          Imported
        </h3>

        <p className="mt-3 text-4xl font-bold text-green-400">
          {summary.imported}
        </p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-400">
          Skipped
        </h3>

        <p className="mt-3 text-4xl font-bold text-red-400">
          {summary.skipped}
        </p>
      </div>
    </div>
  );
}