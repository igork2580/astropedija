"use client";

import { pointOnCircle, astroToScreen, signToIndex, PLANET_GLYPHS } from "@/lib/chart-math";
import type { ChartPlanet } from "@/types";

interface PlanetGlyphProps {
  planet: ChartPlanet;
  cx: number;
  cy: number;
  radius: number;
  index: number;
  onHover: (planet: ChartPlanet | null, x: number, y: number) => void;
  onClick?: (planet: ChartPlanet) => void;
}

export function PlanetGlyph({
  planet,
  cx,
  cy,
  radius,
  index,
  onHover,
  onClick,
}: PlanetGlyphProps) {
  const signIdx = signToIndex(planet.sign);
  const absDeg = signIdx * 30 + planet.degree;
  const screenAngle = astroToScreen(absDeg);
  const pos = pointOnCircle(cx, cy, radius, screenAngle);
  const glyph = PLANET_GLYPHS[planet.name] || planet.name.charAt(0);

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => onHover(planet, pos.x, pos.y)}
      onMouseLeave={() => onHover(null, 0, 0)}
      onClick={() => onClick?.(planet)}
    >
      <circle
        cx={pos.x}
        cy={pos.y}
        r={12}
        fill="var(--ap-bg-start)"
        stroke="var(--color-primary)"
        strokeWidth={1.5}
        className="transition-all duration-200 hover:fill-[var(--color-primary)] hover:fill-opacity-20"
      />
      <text
        x={pos.x}
        y={pos.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fill="var(--ap-text-primary)"
        className="select-none pointer-events-none"
      >
        {glyph}
      </text>
      {planet.retrograde && (
        <text
          x={pos.x + 10}
          y={pos.y - 8}
          fontSize={7}
          fill="var(--color-secondary)"
          className="select-none pointer-events-none"
        >
          R
        </text>
      )}
    </g>
  );
}
