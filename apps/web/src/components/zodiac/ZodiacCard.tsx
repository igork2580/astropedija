"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ZodiacSign } from "@/types";

interface ZodiacCardProps {
  sign: ZodiacSign;
  href?: string;
  compact?: boolean;
}

export function ZodiacCard({ sign, href, compact = false }: ZodiacCardProps) {
  const content = (
    <div
      className={cn(
        "group flex flex-col items-center rounded-2xl border border-border bg-surface p-4 transition-all duration-300",
        "hover:border-primary/50 hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/10",
        "hover:-translate-y-1",
        compact && "p-3",
      )}
    >
      <span className={cn("text-4xl mb-2", compact && "text-3xl mb-1")}>
        {sign.symbol}
      </span>
      <span
        className={cn(
          "text-sm font-semibold text-text-primary",
          compact && "text-xs",
        )}
      >
        {sign.name}
      </span>
      {!compact && (
        <span className="mt-1 text-xs text-text-muted">{sign.dateRange}</span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
