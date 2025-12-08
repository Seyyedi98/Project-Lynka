"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";

const PersianExcelExporter = ({ data, fileName = "فرم‌های_ارسال_شده" }) => {
  const [loading, setLoading] = useState(false);

  const exportData = async () => {
    if (!data || data.length === 0) {
      alert("هیچ داده‌ای برای خروجی‌گیری وجود ندارد");
      return;
    }

    setLoading(true);

    try {
      // Method 1: Try using xlsx library first
      const XLSX = await import("xlsx");

      // Remove 'id' field from each object
      const dataWithoutId = data.map(({ id, ...rest }) => rest);

      // Simple approach - minimal processing
      const ws = XLSX.utils.json_to_sheet(dataWithoutId);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const dateStr = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(wb, `${fileName}_${dateStr}.xlsx`);
    } catch (err) {
      console.error("Failed to export with xlsx:", err);

      // Method 2: Fallback to CSV with UTF-8 BOM
      const BOM = "\uFEFF";

      // Get headers excluding 'id'
      const headers = Object.keys(data[0]).filter((header) => header !== "id");

      // Create CSV content
      const csvRows = [];

      // Add headers (without id)
      csvRows.push(headers.join(","));

      // Add data rows (without id)
      data.forEach((row) => {
        const values = headers.map((header) => {
          const value = row[header] || "";
          const escaped = String(value).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
      });

      const csvString = BOM + csvRows.join("\n");

      // Create and trigger download
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={exportData}
      disabled={loading || !data || data.length === 0}
      variant="outline"
      className="gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      size="sm"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          در حال پردازش...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          خروجی اکسل
        </>
      )}
    </Button>
  );
};

export default PersianExcelExporter;
