"use client";

import { useEffect, useState } from "react";

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

export function CurrentPlanetsTable() {
  const [data, setData] = useState<CurrentSkyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSky() {
      try {
        const res = await fetch("/api/sky/current");
        if (res.ok) {
          setData(await res.json());
        } else {
          setError("Greška pri učitavanju podataka");
        }
      } catch {
        setError("API server nije dostupan");
      } finally {
        setLoading(false);
      }
    }
    fetchSky();
    const interval = setInterval(fetchSky, 300000); // Refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8">
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="h-10 w-full rounded-lg bg-surface-hover" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-text-muted">{error || "Nema podataka"}</p>
        <p className="text-xs text-text-muted mt-2">
          Pokrenite API server da biste videli trenutne pozicije planeta.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-hover">
            <th className="px-4 py-3 text-left font-semibold text-text-primary">Planeta</th>
            <th className="px-4 py-3 text-left font-semibold text-text-primary">Znak</th>
            <th className="px-4 py-3 text-left font-semibold text-text-primary">Stepen</th>
            <th className="px-4 py-3 text-left font-semibold text-text-primary">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.planets.map((planet) => (
            <tr key={planet.name} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
              <td className="px-4 py-3 font-medium text-text-primary">{planet.name}</td>
              <td className="px-4 py-3 text-text-secondary">{planet.sign}</td>
              <td className="px-4 py-3 text-text-secondary">{planet.degree.toFixed(2)}°</td>
              <td className="px-4 py-3">
                {planet.retrograde ? (
                  <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                    ℞ Retrogradan
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                    Direktan
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 border-t border-border bg-surface-hover">
        <span className="text-xs text-text-muted">
          Referentna lokacija: Beograd · Poslednje ažuriranje:{" "}
          {new Date(data.timestamp).toLocaleString("sr-RS")}
        </span>
      </div>
    </div>
  );
}
