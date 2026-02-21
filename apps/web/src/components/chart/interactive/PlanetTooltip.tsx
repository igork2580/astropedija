"use client";

import type { ChartPlanet } from "@/types";

interface PlanetTooltipProps {
  planet: ChartPlanet;
  x: number;
  y: number;
}

export function PlanetTooltip({ planet, x, y }: PlanetTooltipProps) {
  return (
    <div
      className="absolute z-50 pointer-events-none rounded-xl border border-border bg-bg-end/95 backdrop-blur-xl shadow-xl px-4 py-3 text-sm"
      style={{
        left: `${(x / 400) * 100}%`,
        top: `${(y / 400) * 100}%`,
        transform: "translate(-50%, -120%)",
      }}
    >
      <p className="font-semibold text-text-primary">{planet.name}</p>
      <p className="text-text-secondary">
        {planet.degree.toFixed(1)}° {planet.sign}
      </p>
      <p className="text-text-muted">
        {planet.house}. kuća{planet.retrograde ? " • ℞ Retrogradna" : ""}
      </p>
    </div>
  );
}
