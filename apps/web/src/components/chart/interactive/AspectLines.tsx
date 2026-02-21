"use client";

import { pointOnCircle, astroToScreen, signToIndex } from "@/lib/chart-math";
import type { ChartPlanet, ChartAspect } from "@/types";

interface AspectLinesProps {
  cx: number;
  cy: number;
  radius: number;
  planets: ChartPlanet[];
  aspects: ChartAspect[];
}

const ASPECT_COLORS: Record<string, string> = {
  Konjunkcija: "var(--color-primary)",
  Opozicija: "var(--color-secondary)",
  Trigon: "#22c55e",
  Kvadrat: "var(--color-secondary)",
  Sekstil: "#22c55e",
};

export function AspectLines({ cx, cy, radius, planets, aspects }: AspectLinesProps) {
  if (!aspects || aspects.length === 0) return null;

  const planetPositions = new Map<string, { x: number; y: number }>();
  for (const p of planets) {
    const signIdx = signToIndex(p.sign);
    const absDeg = signIdx * 30 + p.degree;
    const angle = astroToScreen(absDeg);
    const pos = pointOnCircle(cx, cy, radius, angle);
    planetPositions.set(p.name, pos);
  }

  return (
    <g opacity={0.3}>
      {aspects.map((aspect, i) => {
        const p1 = planetPositions.get(aspect.planet1);
        const p2 = planetPositions.get(aspect.planet2);
        if (!p1 || !p2) return null;

        const color = ASPECT_COLORS[aspect.aspect] || "var(--ap-border)";
        const isHard = aspect.aspect === "Opozicija" || aspect.aspect === "Kvadrat";

        return (
          <line
            key={i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={color}
            strokeWidth={0.8}
            strokeDasharray={isHard ? "4,3" : undefined}
          />
        );
      })}
    </g>
  );
}
