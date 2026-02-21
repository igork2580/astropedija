"use client";

import { pointOnCircle, astroToScreen } from "@/lib/chart-math";
import type { ChartHouse } from "@/types";

interface HouseDivisionsProps {
  cx: number;
  cy: number;
  houses: ChartHouse[];
  innerR: number;
  outerR: number;
}

export function HouseDivisions({ cx, cy, houses, innerR, outerR }: HouseDivisionsProps) {
  if (!houses || houses.length === 0) return null;

  return (
    <g>
      {houses.map((house, i) => {
        const angle = astroToScreen(house.degree);
        const p1 = pointOnCircle(cx, cy, innerR, angle);
        const p2 = pointOnCircle(cx, cy, outerR, angle);

        // House number label (midpoint between this cusp and next)
        const nextDeg = houses[(i + 1) % 12]?.degree ?? house.degree + 30;
        let midDeg = (house.degree + nextDeg) / 2;
        if (nextDeg < house.degree) midDeg = (house.degree + nextDeg + 360) / 2;
        const labelAngle = astroToScreen(midDeg % 360);
        const labelR = (innerR + outerR) / 2;
        const labelPos = pointOnCircle(cx, cy, labelR * 0.55, labelAngle);

        const isAngular = i === 0 || i === 3 || i === 6 || i === 9;

        return (
          <g key={house.number}>
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="var(--ap-border)"
              strokeWidth={isAngular ? 1.5 : 0.5}
              strokeDasharray={isAngular ? undefined : "3,3"}
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={9}
              fill="var(--ap-text-muted)"
              className="select-none"
            >
              {house.number}
            </text>
          </g>
        );
      })}
    </g>
  );
}
