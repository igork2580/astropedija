"use client";

import { useEffect, useState } from "react";
import type { Horoscope } from "@/types";

interface HoroscopeContentProps {
  sign: string;
  type: "daily" | "weekly" | "monthly";
}

function formatContent(content: string) {
  // Split by double newline or bold markdown headers into paragraphs
  return content.split(/\n\n+/).map((paragraph, i) => {
    // Handle **bold** markdown
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="mb-4 last:mb-0">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="font-semibold text-text-primary">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    );
  });
}

export function HoroscopeContent({ sign, type }: HoroscopeContentProps) {
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHoroscope() {
      setLoading(true);
      try {
        const res = await fetch(`/api/horoscopes/${type}/${sign}`);
        if (res.ok) {
          setHoroscope(await res.json());
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchHoroscope();
  }, [sign, type]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 w-3/4 rounded bg-surface-hover" />
          <div className="h-4 w-full rounded bg-surface-hover" />
          <div className="h-4 w-5/6 rounded bg-surface-hover" />
          <div className="h-4 w-2/3 rounded bg-surface-hover" />
        </div>
      </div>
    );
  }

  if (!horoscope) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-text-muted">Horoskop trenutno nije dostupan.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
      <div className="prose-horoscope text-lg leading-loose tracking-wide text-text-secondary">
        {formatContent(horoscope.content)}
      </div>
      <div className="mt-6 pt-4 border-t border-border flex justify-between text-xs text-text-muted">
        <span>
          Period: {new Date(horoscope.period_start).toLocaleDateString("sr-RS")} –{" "}
          {new Date(horoscope.period_end).toLocaleDateString("sr-RS")}
        </span>
      </div>
    </div>
  );
}
