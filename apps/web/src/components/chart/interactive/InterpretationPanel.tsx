"use client";

import { useState, useEffect } from "react";
import type { ChartPlanet } from "@/types";

interface InterpretationPanelProps {
  planet: ChartPlanet;
  onClose: () => void;
}

export function InterpretationPanel({ planet, onClose }: InterpretationPanelProps) {
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setInterpretation(null);

    fetch("/api/ai/interpret", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planets: [planet] }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.planets?.[0]?.interpretation) {
          setInterpretation(data.planets[0].interpretation);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [planet]);

  return (
    <div className="rounded-2xl border border-primary/30 bg-surface p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-text-primary">{planet.name}</h4>
        <button
          type="button"
          onClick={onClose}
          className="text-text-muted hover:text-text-primary transition-colors text-sm"
        >
          &#10005;
        </button>
      </div>
      <p className="text-sm text-text-secondary mb-2">
        {planet.degree.toFixed(1)}° {planet.sign} • {planet.house}. kuća
        {planet.retrograde && " • ℞"}
      </p>
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-3 w-full bg-border rounded" />
          <div className="h-3 w-3/4 bg-border rounded" />
        </div>
      ) : interpretation ? (
        <p className="text-sm text-text-secondary leading-relaxed">
          {interpretation}
        </p>
      ) : (
        <p className="text-sm text-text-muted italic">
          Interpretacija nije dostupna
        </p>
      )}
    </div>
  );
}
