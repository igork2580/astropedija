"use client";

import { useState, useEffect } from "react";

interface TransitWeather {
  date: string;
  content: string;
  planetary_data: {
    planets: Array<{
      name: string;
      sign: string;
      degree: number;
      retrograde: boolean;
    }>;
  };
}

export function TransitWeatherWidget() {
  const [weather, setWeather] = useState<TransitWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/ai/transit-weather");
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        }
      } catch {
        // Silently fail — widget is optional
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 animate-pulse">
        <div className="h-4 w-40 bg-border rounded mb-3" />
        <div className="h-3 w-full bg-border rounded mb-2" />
        <div className="h-3 w-3/4 bg-border rounded" />
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">&#9728;</span>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
          Astrološko vreme
        </h3>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">
        {weather.content}
      </p>
    </div>
  );
}
