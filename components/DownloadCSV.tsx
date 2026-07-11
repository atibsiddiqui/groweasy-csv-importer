"use client";

interface DownloadCSVProps {
  data: Record<string, any>[];
  mapping: Record<string, string | null>;
}

export default function DownloadCSV({
  data,
  mapping,
}: DownloadCSVProps) {
  const handleDownload = () => {
    if (!data.length) return;

    const transformed = data.map((row) => {
      const obj: Record<string, any> = {};

      Object.keys(mapping).forEach((crmField) => {
        const csvColumn = mapping[crmField];
        obj[crmField] = csvColumn ? row[csvColumn] : "";
      });

      return obj;
    });

    const headers = Object.keys(transformed[0]);

    const csv = [
      headers.join(","),
      ...transformed.map((row) =>
        headers
          .map((header) => JSON.stringify(row[header] ?? ""))
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
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

  return (
    <button
      onClick={handleDownload}
      className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
    >
      ⬇ Download GrowEasy CSV
    </button>
  );
}