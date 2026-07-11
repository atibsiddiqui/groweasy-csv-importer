"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { UploadCloud, FileSpreadsheet } from "lucide-react";

interface UploadBoxProps {
  onDataLoaded: (data: Record<string, any>[]) => void;
}

export default function UploadBox({ onDataLoaded }: UploadBoxProps) {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log("Accepted Files:", acceptedFiles);

      const file = acceptedFiles[0];

      if (!file) return;

      setFileName(file.name);
      setLoading(true);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,

        complete: (results) => {
          console.log("Results:", results);
          console.log("Data:", results.data);

          onDataLoaded(results.data as Record<string, any>[]);
          setLoading(false);
        },

        error: (error) => {
          console.error(error);
          alert("Failed to parse CSV.");
          setLoading(false);
        },
      });
    },
    [onDataLoaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div className="mx-auto mt-12 max-w-5xl">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition ${
          isDragActive
            ? "border-blue-500 bg-slate-800"
            : "border-slate-700 bg-slate-900 hover:border-blue-500"
        }`}
      >
        <input {...getInputProps()} />

        <UploadCloud className="mx-auto h-16 w-16 text-blue-500" />

        <h2 className="mt-6 text-3xl font-bold text-white">
          Drag & Drop your CSV
        </h2>

        <p className="mt-3 text-slate-400">
          or click anywhere inside this box
        </p>

        <button
          type="button"
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Browse CSV
        </button>

        <p className="mt-5 text-sm text-slate-500">
          Supports CSV files only
        </p>
      </div>

      {fileName && (
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-900 p-4">
          <FileSpreadsheet className="text-green-400" />
          <span className="text-white">{fileName}</span>
        </div>
      )}

      {loading && (
        <div className="mt-6 text-center text-blue-400">
          Parsing CSV...
        </div>
      )}
    </div>
  );
}