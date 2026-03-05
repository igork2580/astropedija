"use client";

import { cn } from "@/lib/utils";

interface ChartViewerProps {
  svg: string;
  className?: string;
  /** Optional label shown above the chart */
  label?: string;
}

export function ChartViewer({ svg, className, label }: ChartViewerProps) {
  if (!svg) return null;

  return (
    <div
      className={cn(
        "w-full max-w-[600px] mx-auto",
        "rounded-2xl border border-border bg-surface",
        "p-4 sm:p-6",
        "shadow-lg shadow-black/5",
        "transition-all duration-300",
        className,
      )}
    >
      {label && (
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-text-muted">
          {label}
        </p>
      )}
      <div
        className="chart-svg-container [&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
