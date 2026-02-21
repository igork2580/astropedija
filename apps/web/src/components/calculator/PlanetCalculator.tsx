"use client";

import { useState } from "react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { BirthDataFields } from "./BirthDataFields";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { BirthData } from "@/types";

const DEFAULT_BIRTH_DATA: BirthData = {
  name: "",
  year: 0,
  month: 0,
  day: 0,
  hour: 12,
  minute: 0,
  latitude: 44.8176,
  longitude: 20.4633,
  timezone: "Europe/Belgrade",
  city: "",
};

interface PlanetPositionResult {
  planet: string;
  sign: string;
  sign_symbol: string;
  degree: number;
  house: number;
  retrograde: boolean;
}

interface PlanetCalculatorProps {
  planet: string;
  planetName: string;
  apiEndpoint: string;
}

export function PlanetCalculator({
  planet,
  planetName,
  apiEndpoint,
}: PlanetCalculatorProps) {
  const [data, setData] = useLocalStorage<BirthData>(
    `planet_calc_${planet}`,
    DEFAULT_BIRTH_DATA,
  );
  const [result, setResult] = useState<PlanetPositionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, planet }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "Greska pri izracunavanju");
      }

      const result: PlanetPositionResult = await res.json();
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Doslo je do greske");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <BirthDataFields data={data} onChange={setData} />
          {error && (
            <div className="rounded-xl border border-secondary/50 bg-secondary/10 px-4 py-3 text-sm text-secondary">
              {error}
            </div>
          )}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Izracunavanje..." : `Izracunaj ${planetName}`}
          </Button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">
              Rezultat
            </h3>
          </div>
          <CardContent>
            <div className="flex flex-col items-center gap-6 py-4 sm:flex-row sm:items-start">
              {/* Planet symbol */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                <span className="text-5xl" aria-hidden="true">
                  {result.sign_symbol}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <div>
                  <p className="text-sm text-text-muted">Planeta</p>
                  <p className="text-xl font-bold text-text-primary">
                    {result.planet}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-text-muted">Znak</p>
                    <p className="text-lg font-semibold text-text-primary">
                      {result.sign_symbol} {result.sign}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Stepen</p>
                    <p className="text-lg font-semibold text-text-primary">
                      {result.degree.toFixed(2)}&deg;
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Kuca</p>
                    <p className="text-lg font-semibold text-text-primary">
                      {result.house}. kuca
                    </p>
                  </div>
                </div>

                {result.retrograde && (
                  <Badge variant="fixed">
                    &#8483; Retrogradna
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
