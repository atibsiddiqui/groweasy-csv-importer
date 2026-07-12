"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import UploadBox from "@/components/UploadBox";
import PreviewTable from "@/components/PreviewTable";

import Loader from "@/components/Loader";
import AIResultTable from "@/components/AIResultTable";
import DashboardCards from "@/components/DashboardCards";
import ImportSummary from "@/components/ImportSummary";
import ImportedRecordsTable from "@/components/ImportedRecordsTable";

import MappingEditor from "@/components/MappingEditor";
import MappedTable from "@/components/MappedTable";
import DownloadCSV from "@/components/DownloadCSV";

export default function Home() {
  // CSV Data
  const [csvData, setCsvData] = useState<Record<string, any>[]>([]);

  // Loading State
  const [isImporting, setIsImporting] = useState(false);

  // AI Response
  const [aiResult, setAiResult] = useState<any>(null);

  // Editable Mapping
  const [mapping, setMapping] = useState<Record<string, string | null>>({});

  // Import Summary
  const [summary, setSummary] = useState<any>(null);

  // Parsed Records
  const [records, setRecords] = useState<any[]>([]);

  /**
   * Send CSV to backend
   */
  const handleImport = async () => {
    try {
      setIsImporting(true);

      const response = await fetch(
         "https://groweasy-csv-importer-fiy1.onrender.com/api/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(csvData),
        }
      );

      const result = await response.json();

      console.log("Backend Response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || "Backend Error"
        );
      }

      setAiResult(result.aiResult);

      setMapping(result.aiResult.mapping);

      setSummary(result.summary);

      setRecords(result.records);
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "AI Mapping Failed. Please try again."
      );
    } finally {
      setIsImporting(false);
    }
  };

  /**
   * Download mapped CSV
   */
  const handleDownload = () => {
    if (!mapping || csvData.length === 0) return;

    const transformed = csvData.map((row) => {
      const obj: Record<string, any> = {};

      Object.keys(mapping).forEach((crmField) => {
        const csvColumn = mapping[crmField];

        obj[crmField] = csvColumn
          ? row[csvColumn]
          : "";
      });

      return obj;
    });

    const headers = Object.keys(transformed[0]);

    const csv = [
      headers.join(","),

      ...transformed.map((row) =>
        headers
          .map((header) =>
            JSON.stringify(row[header] ?? "")
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "groweasy_mapped.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return ( <main className="min-h-screen bg-slate-950 text-white">
  <Navbar />

  <section className="mx-auto max-w-7xl px-6 py-16">

    {/* Hero Section */}

    <div className="mb-12 text-center">

      <h1 className="text-5xl font-extrabold tracking-tight">
        AI CSV Importer
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
        Upload any CRM CSV and let AI automatically detect,
        map and transform your data into the GrowEasy CRM
        format.
      </p>

    </div>

    {/* Upload */}

    <UploadBox onDataLoaded={setCsvData} />

    {/* CSV Preview */}

    {csvData.length > 0 && (
      <>
        <div className="mt-10">

          <PreviewTable data={csvData} />

        </div>

        {/* Confirm Button */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={handleImport}
            disabled={isImporting}
            className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-green-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isImporting
              ? "Importing..."
              : "✅ Confirm Import"}
          </button>

        </div>

        {/* Loader */}

        {isImporting && (
          <Loader />
        )}

        {/* Everything below will appear only after AI finishes */}

        {aiResult && (
          <> 
                      {/* ================= AI RESULT ================= */}

            <div className="mt-12">
              <AIResultTable aiResult={aiResult} />
            </div>

            {/* ================= IMPORT SUMMARY ================= */}

            {summary && (
              <div className="mt-10">
                <ImportSummary summary={summary} />
              </div>
            )}

            {/* ================= IMPORTED RECORDS ================= */}

            {records.length > 0 && (
              <div className="mt-10">
                <ImportedRecordsTable records={records} />
              </div>
            )}

            {/* ================= DASHBOARD ================= */}

            <div className="mt-10">
              <DashboardCards
                totalRows={csvData.length}
                mappedFields={
                  Object.values(mapping).filter(Boolean).length
                }
                confidence={aiResult.confidence}
              />
            </div>

            {/* ================= MANUAL MAPPING ================= */}

            <div className="mt-12">

              <h2 className="mb-5 text-2xl font-bold text-white">
                 Edit Field Mapping
              </h2>

              <MappingEditor
                headers={Object.keys(csvData[0])}
                mapping={mapping}
                setMapping={setMapping}
              />

            </div>
                        {/* ================= GROWEASY PREVIEW ================= */}

            <div className="mt-12">

              <h2 className="mb-5 text-2xl font-bold text-white">
                GrowEasy CRM Preview
              </h2>

              <MappedTable
                data={csvData}
                mapping={mapping}
              />

            </div>

            {/* ================= DOWNLOAD CSV ================= */}

            <div className="mt-10 flex justify-center">
  <button
    onClick={handleDownload}
    className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
  >
    ⬇ Download GrowEasy CSV
  </button>
</div>

          </>
        )}

      </>
    )}

  </section>

  {/* ================= FOOTER ================= */}

  <footer className="mt-24 border-t border-slate-800 bg-slate-950">

    <div className="mx-auto max-w-7xl px-6 py-10">

      <h2 className="text-center text-3xl font-bold text-white">
        GrowEasy AI CSV Importer
      </h2>

      <p className="mt-4 text-center text-slate-400">
        Upload • Preview • AI Mapping • Manual Editing • Download
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <span className="rounded-full bg-slate-800 px-5 py-2 text-blue-400">
          Next.js
        </span>

        <span className="rounded-full bg-slate-800 px-5 py-2 text-green-400">
          Express.js
        </span>

        <span className="rounded-full bg-slate-800 px-5 py-2 text-purple-400">
          Gemini AI
        </span>

        <span className="rounded-full bg-slate-800 px-5 py-2 text-pink-400">
          Tailwind CSS
        </span>

      </div>

      <div className="mt-10 border-t border-slate-800 pt-6">

        <p className="text-center text-slate-500">
          © 2026 GrowEasy AI CSV Importer
        </p>

        <p className="mt-2 text-center text-slate-600">
          Built with  using Next.js, Express.js and Google Gemini AI
        </p>

      </div>

    </div>

  </footer>

</main>
  );
}

    