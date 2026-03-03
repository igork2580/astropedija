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
        "group flex flex-col items-center rounded-2xl border border-border bg-surface transition-all duration-300",
        "hover:border-primary/50 hover:bg-surface-hover hover:shadow-lg hover:shadow-primary/10",
        "hover:-translate-y-1",
        "focus-within:ring-2 focus-within:ring-primary/50",
        compact ? "p-3" : "p-4",
      )}
    >
      <span
        className={cn(
          "transition-transform duration-300 group-hover:scale-110",
          compact ? "text-3xl mb-1" : "text-4xl mb-2",
        )}
        role="img"
        aria-label={sign.name}
      >
        {sign.symbol}
      </span>
      <span
        className={cn(
          "font-semibold text-text-primary group-hover:text-primary transition-colors",
          compact ? "text-xs" : "text-sm",
        )}
      >
        {sign.name}
      </span>
      {!compact && (
        <span className="mt-1 text-xs text-text-muted">Rođeni: {sign.dateRange}</span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
