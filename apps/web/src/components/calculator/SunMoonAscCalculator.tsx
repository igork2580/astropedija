"use client";

import { useState } from "react";
import { Button, Card, CardContent } from "@/components/ui";
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

interface TripleResult {
  sun: {
    sign: string;
    sign_symbol: string;
    degree: number;
  };
  moon: {
    sign: string;
    sign_symbol: string;
    degree: number;
  };
  ascendant: {
    sign: string;
    sign_symbol: string;
    degree: number;
  };
}

export function SunMoonAscCalculator() {
  const [data, setData] = useLocalStorage<BirthData>(
    "sun_moon_asc_calc",
    DEFAULT_BIRTH_DATA,
  );
  const [result, setResult] = useState<TripleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/calculate/sun-asc-moon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "Greska pri izracunavanju");
      }

      const result: TripleResult = await res.json();
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Doslo je do greske");
    } finally {
      setLoading(false);
    }
  }

  const tripleItems = result
    ? [
        { label: "Sunce (Znak)", data: result.sun, icon: "\u2609" },
        { label: "Mesec (Znak)", data: result.moon, icon: "\u263D" },
        { label: "Podznak (Ascendent)", data: result.ascendant, icon: "Asc" },
      ]
    : [];

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
            {loading ? "Izracunavanje..." : "Izracunaj Sunce, Mesec i Podznak"}
          </Button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          {tripleItems.map((item) => (
            <Card key={item.label} className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary">
                  {item.label}
                </h3>
              </div>
              <CardContent>
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                    <span className="text-3xl" aria-hidden="true">
                      {item.data.sign_symbol}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-text-primary">
                    {item.data.sign_symbol} {item.data.sign}
                  </p>
                  <p className="text-sm text-text-muted">
                    {item.data.degree.toFixed(2)}&deg;
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
