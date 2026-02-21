"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
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

  if (interpreted.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">AI Interpretacija</h3>
        <p className="text-sm text-text-secondary mb-4">
          Dobijte personalizovanu interpretaciju svake planete u vašoj karti
        </p>
        {error && (
          <p className="text-sm text-secondary mb-4">{error}</p>
        )}
        <Button
          variant="primary"
          onClick={handleInterpret}
          disabled={loading}
        >
          {loading ? "Interpretiram..." : "Generiši interpretaciju"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">AI Interpretacija</h3>
      {interpreted.map((planet, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-primary">
              {planet.name}
            </span>
            <span className="text-xs text-text-muted">
              u {planet.sign} • {planet.house}. kuća
              {planet.retrograde && " • ℞"}
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
