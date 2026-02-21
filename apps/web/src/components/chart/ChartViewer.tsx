"use client";

import { cn } from "@/lib/utils";

interface ChartViewerProps {
  svg: string;
  className?: string;
}

export function ChartViewer({ svg, className }: ChartViewerProps) {
  if (!svg) return null;

  return (
    <div
      className={cn(
        "w-full max-w-[600px] mx-auto rounded-2xl border border-border bg-surface p-4",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
