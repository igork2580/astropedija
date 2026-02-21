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

interface AscendantResult {
  sign: string;
  sign_symbol: string;
  degree: number;
}

export function PodznakCalculator() {
  const [data, setData] = useLocalStorage<BirthData>(
    "podznak_calc",
    DEFAULT_BIRTH_DATA,
  );
  const [result, setResult] = useState<AscendantResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/calculate/ascendant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "Greska pri izracunavanju");
      }

      const result: AscendantResult = await res.json();
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
            {loading ? "Izracunavanje..." : "Izracunaj podznak"}
          </Button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">
              Vas podznak (Ascendent)
            </h3>
          </div>
          <CardContent>
            <div className="flex flex-col items-center gap-6 py-4 sm:flex-row">
              {/* Sign symbol */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                <span className="text-5xl" aria-hidden="true">
                  {result.sign_symbol}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <div>
                  <p className="text-sm text-text-muted">Podznak</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {result.sign_symbol} {result.sign}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Stepen</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {result.degree.toFixed(2)}&deg; {result.sign}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
