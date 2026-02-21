"use client";

import { useState, useEffect } from "react";

interface CompatibilityData {
  sign1: string;
  sign2: string;
  score: number;
  element_score: number;
  quality_score: number;
  ruler_score: number;
  description: string;
}

interface CompatibilityMeterProps {
  sign1: string;
  sign2: string;
}

export function CompatibilityMeter({ sign1, sign2 }: CompatibilityMeterProps) {
  const [data, setData] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/charts/compatibility/${sign1}/${sign2}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sign1, sign2]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 animate-pulse">
        <div className="h-20 w-20 rounded-full bg-border mx-auto" />
      </div>
    );
  }

  if (!data) return null;

  // SVG circular gauge
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (data.score / 100) * circumference;

  const color =
    data.score >= 70 ? "#22c55e" :
    data.score >= 40 ? "#eab308" :
    "#ef4444";

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col items-center gap-4">
        {/* Circular gauge */}
        <div className="relative">
          <svg width={100} height={100} viewBox="0 0 100 100">
            <circle
              cx={50}
              cy={50}
              r={radius}
              fill="none"
              stroke="var(--ap-border)"
              strokeWidth={6}
            />
            <circle
              cx={50}
              cy={50}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold" style={{ color }}>
              {data.score}%
            </span>
          </div>
        </div>

        <h4 className="text-sm font-semibold text-text-primary">Kompatibilnost</h4>
        <p className="text-sm text-text-secondary text-center leading-relaxed">
          {data.description}
        </p>

        {/* Score breakdown */}
        <div className="w-full grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <p className="text-text-muted">Element</p>
            <p className="font-semibold text-text-primary">{data.element_score}/40</p>
          </div>
          <div>
            <p className="text-text-muted">Kvalitet</p>
            <p className="font-semibold text-text-primary">{data.quality_score}/30</p>
          </div>
          <div>
            <p className="text-text-muted">Vladar</p>
            <p className="font-semibold text-text-primary">{data.ruler_score}/30</p>
          </div>
        </div>
      </div>
    </div>
  );
}
