"use client";

import { useState } from "react";

interface PdfExportButtonProps {
  /** ID of the DOM element to capture */
  targetId: string;
  /** Filename without extension */
  filename?: string;
}

export function PdfExportButton({
  targetId,
  filename = "astroput-karta",
}: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const { exportChartToPdf } = await import("@/lib/pdf-export");
      await exportChartToPdf(targetId, filename);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors disabled:opacity-50"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {loading ? "Preuzimanje..." : "Preuzmi PDF"}
    </button>
  );
}
