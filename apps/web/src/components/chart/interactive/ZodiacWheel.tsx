"use client";

import { useState } from "react";
import { WheelRing } from "./WheelRing";
import { HouseDivisions } from "./HouseDivisions";
import { PlanetGlyph } from "./PlanetGlyph";
import { AspectLines } from "./AspectLines";
import { PlanetTooltip } from "./PlanetTooltip";
import type { ChartData, ChartPlanet } from "@/types";

interface ZodiacWheelProps {
  data: ChartData;
  onPlanetClick?: (planet: ChartPlanet) => void;
  size?: number;
}

const CENTER = 200;
const OUTER_R = 190;
const SIGN_R = 170;
const INNER_R = 150;
const PLANET_R = 120;

export function ZodiacWheel({ data, onPlanetClick, size = 400 }: ZodiacWheelProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<ChartPlanet | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  function handlePlanetHover(planet: ChartPlanet | null, x: number, y: number) {
    setHoveredPlanet(planet);
    setTooltipPos({ x, y });
  }

  return (
    <div className="relative inline-block">
      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className="drop-shadow-lg"
      >
        {/* Outer ring with zodiac signs */}
        <WheelRing cx={CENTER} cy={CENTER} outerR={OUTER_R} innerR={SIGN_R} />

        {/* Inner ring with house numbers */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_R}
          fill="none"
          stroke="var(--ap-border)"
          strokeWidth={0.5}
        />

        {/* House divisions */}
        <HouseDivisions
          cx={CENTER}
          cy={CENTER}
          houses={data.houses}
          innerR={60}
          outerR={INNER_R}
        />

        {/* Aspect lines */}
        <AspectLines
          cx={CENTER}
          cy={CENTER}
          radius={PLANET_R}
          planets={data.planets}
          aspects={data.aspects}
        />

        {/* Planet glyphs */}
        {data.planets.map((planet, i) => (
          <PlanetGlyph
            key={planet.name}
            planet={planet}
            cx={CENTER}
            cy={CENTER}
            radius={PLANET_R}
            index={i}
            onHover={handlePlanetHover}
            onClick={onPlanetClick}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredPlanet && (
        <PlanetTooltip
          planet={hoveredPlanet}
          x={tooltipPos.x}
          y={tooltipPos.y}
        />
      )}
    </div>
  );
}
