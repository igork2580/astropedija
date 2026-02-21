"use client";

import { pointOnCircle, astroToScreen, ZODIAC_GLYPHS } from "@/lib/chart-math";

interface WheelRingProps {
  cx: number;
  cy: number;
  outerR: number;
  innerR: number;
}

export function WheelRing({ cx, cy, outerR, innerR }: WheelRingProps) {
  const signDividers = Array.from({ length: 12 }, (_, i) => {
    const angle = astroToScreen(i * 30);
    const p1 = pointOnCircle(cx, cy, innerR, angle);
    const p2 = pointOnCircle(cx, cy, outerR, angle);
    return { p1, p2 };
  });

  const signLabels = Array.from({ length: 12 }, (_, i) => {
    const midAngle = astroToScreen(i * 30 + 15);
    const labelR = (outerR + innerR) / 2;
    const pos = pointOnCircle(cx, cy, labelR, midAngle);
    return { pos, glyph: ZODIAC_GLYPHS[i] };
  });

  return (
    <g>
      {/* Outer circle */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="var(--ap-border)"
        strokeWidth={1}
      />
      {/* Inner circle */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke="var(--ap-border)"
        strokeWidth={1}
      />

      {/* Sign dividers */}
      {signDividers.map((d, i) => (
        <line
          key={i}
          x1={d.p1.x}
          y1={d.p1.y}
          x2={d.p2.x}
          y2={d.p2.y}
          stroke="var(--ap-border)"
          strokeWidth={0.5}
        />
      ))}

      {/* Sign glyphs */}
      {signLabels.map((s, i) => (
        <text
          key={i}
          x={s.pos.x}
          y={s.pos.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
          fill="var(--ap-text-secondary)"
          className="select-none"
        >
          {s.glyph}
        </text>
      ))}
    </g>
  );
}
