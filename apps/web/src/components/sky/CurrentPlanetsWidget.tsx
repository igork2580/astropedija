"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SkyPlanet {
  name: string;
  sign: string;
  degree: number;
  retrograde: boolean;
}

interface CurrentSkyData {
  planets: SkyPlanet[];
  timestamp: string;
}

interface CurrentPlanetsWidgetProps {
  compact?: boolean;
}

export function CurrentPlanetsWidget({ compact = false }: CurrentPlanetsWidgetProps) {
  const [data, setData] = useState<CurrentSkyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSky() {
      try {
        const res = await fetch("/api/sky/current");
        if (res.ok) {
          setData(await res.json());
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchSky();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-4 animate-pulse">
        <div className="h-4 w-32 rounded bg-surface-hover mb-3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-3 w-full rounded bg-surface-hover mb-2" />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-4 text-center text-sm text-text-muted">
        Trenutne pozicije nedostupne
      </div>
    );
  }

  const displayPlanets = compact ? data.planets.slice(0, 5) : data.planets;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-primary">Trenutno nebo</h3>
        {compact && (
          <Link href="/trenutne-planete" className="text-xs text-primary hover:text-primary-light">
            Sve planete →
          </Link>
        )}
      </div>
      <div className="space-y-2">
        {displayPlanets.map((planet) => (
          <div key={planet.name} className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              {planet.name}
              {planet.retrograde && <span className="ml-1 text-secondary text-xs">℞</span>}
            </span>
            <span className="font-medium text-text-primary">
              {planet.sign} {planet.degree.toFixed(1)}°
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-border">
        <span className="text-xs text-text-muted">
          Beograd · {new Date(data.timestamp).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
