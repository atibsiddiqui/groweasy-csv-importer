"use client";

export default function Loader() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 p-10 shadow-lg">
      {/* Spinner */}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        AI is Processing Your CSV...
      </h2>

      <p className="mt-2 text-slate-400">
        Please wait while GrowEasy AI analyzes your data.
      </p>

      {/* Progress Bar */}
      <div className="mt-8 h-3 w-full max-w-md overflow-hidden rounded-full bg-slate-700">
        <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
      </div>

      {/* Steps */}
      <div className="mt-8 w-full max-w-md space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">📄 Reading CSV</span>
          <span className="text-green-400">✔</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-300">🤖 Detecting CRM Fields</span>
          <span className="text-blue-400 animate-pulse">
            Processing...
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-300">⚡ Generating Mapping</span>
          <span className="text-slate-500">Waiting...</span>
        </div>
      </div>
    </div>
  );
}