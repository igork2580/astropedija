"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ChartData } from "@/types";

interface ChartShareButtonProps {
  chartType: string;
  inputData: Record<string, unknown>;
  chartData: ChartData;
  svg: string;
}

export function ChartShareButton({
  chartType,
  inputData,
  chartData,
  svg,
}: ChartShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [shareUrl, setShareUrl] = useState<string>("");

  async function handleShare() {
    setStatus("saving");
    try {
      const res = await fetch("/api/share/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chart_type: chartType,
          input_data: inputData,
          chart_data: chartData,
          svg,
        }),
      });
      if (!res.ok) throw new Error("Failed to save chart");
      const data = await res.json();
      const url = `${window.location.origin}/chart/${data.share_slug}`;
      setShareUrl(url);
      setStatus("saved");
      // Copy to clipboard
      await navigator.clipboard.writeText(url);
    } catch {
      setStatus("error");
    }
  }

  if (status === "saved") {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-4">
        <p className="text-sm font-medium text-primary">Link kopiran u clipboard!</p>
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-center text-sm text-text-secondary"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
          }}
          className="text-xs text-primary hover:text-primary-light transition-colors"
        >
          Kopiraj ponovo
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleShare}
      disabled={status === "saving"}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-all",
        "hover:border-primary/50 hover:bg-surface-hover hover:text-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
      )}
    >
      {status === "saving" ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Cuvanje...
        </>
      ) : status === "error" ? (
        "Greska - pokusajte ponovo"
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Podeli kartu
        </>
      )}
    </button>
  );
}
