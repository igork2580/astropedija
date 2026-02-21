"use client";

import { useEffect, useState } from "react";
import type { Horoscope } from "@/types";

interface HoroscopeContentProps {
  sign: string;
  type: "daily" | "weekly" | "monthly";
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
    <div className="rounded-2xl border border-border bg-surface p-8">
      <p className="text-text-secondary leading-relaxed text-lg">{horoscope.content}</p>
      <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs text-text-muted">
        <span>
          Period: {new Date(horoscope.period_start).toLocaleDateString("sr-RS")} -{" "}
          {new Date(horoscope.period_end).toLocaleDateString("sr-RS")}
        </span>
      </div>
    </div>
  );
}
