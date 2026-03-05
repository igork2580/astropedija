"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Skeleton } from "@/components/ui";
import type { ChartPlanet } from "@/types";

interface ChartInterpretationProps {
  planets: ChartPlanet[];
}

interface InterpretedPlanet extends ChartPlanet {
  interpretation?: string;
}

export function ChartInterpretation({ planets }: ChartInterpretationProps) {
  const [interpreted, setInterpreted] = useState<InterpretedPlanet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleInterpret() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planets }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "Greška pri interpretaciji");
      }

      const data = await res.json();
      setInterpreted(data.planets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Došlo je do greške");
    } finally {
      setLoading(false);
    }
  }

  /* Loading state with skeleton cards */
  if (loading) {
    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <h3 className="text-lg font-semibold">AI Interpretacija</h3>
        <p className="text-sm text-text-muted">Generisanje interpretacije...</p>
        {planets.slice(0, 5).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* Initial state — CTA to generate */
  if (interpreted.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-lg shadow-black/5">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">AI Interpretacija</h3>
        <p className="text-sm text-text-secondary mb-5 max-w-md mx-auto">
          Dobijte personalizovanu interpretaciju svake planete u vašoj karti
        </p>
        {error && (
          <div className="mb-4 rounded-lg bg-secondary/10 border border-secondary/20 px-4 py-2">
            <p className="text-sm text-secondary">{error}</p>
          </div>
        )}
        <Button variant="primary" onClick={handleInterpret} disabled={loading}>
          Generiši interpretaciju
        </Button>
      </div>
    );
  }

  /* Results */
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <h3 className="text-lg font-semibold">AI Interpretacija</h3>
      {interpreted.map((planet, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border bg-surface p-5 shadow-lg shadow-black/5 transition-all duration-300 hover:bg-surface-hover"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
              {planet.name}
            </span>
            <span className="text-xs text-text-muted">
              u {planet.sign} &bull; {planet.house}. kuća
              {planet.retrograde && " \u2022 \u211E"}
            </span>
          </div>
          {planet.interpretation && (
            <p className="text-sm text-text-secondary leading-relaxed">
              {planet.interpretation}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
