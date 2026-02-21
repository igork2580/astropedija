"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface HoroscopeTypeTabsProps {
  sign: string;
  activeType: "dnevni" | "nedeljni" | "mesecni";
}

const types = [
  { id: "dnevni" as const, label: "Dnevni", prefix: "dnevni-horoskop" },
  { id: "nedeljni" as const, label: "Nedeljni", prefix: "nedeljni-horoskop" },
  { id: "mesecni" as const, label: "Mesečni", prefix: "mesecni-horoskop" },
];

export function HoroscopeTypeTabs({ sign, activeType }: HoroscopeTypeTabsProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl bg-surface p-1 border border-border">
      {types.map((type) => (
        <Link
          key={type.id}
          href={`/${type.prefix}/${sign}`}
          className={cn(
            "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
            activeType === type.id
              ? "bg-primary text-white shadow-md shadow-primary/25"
              : "text-text-muted hover:text-text-primary hover:bg-surface-hover",
          )}
        >
          {type.label}
        </Link>
      ))}
    </div>
  );
}
