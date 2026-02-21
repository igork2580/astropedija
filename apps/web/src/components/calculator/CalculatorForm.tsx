"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { BirthDataFields } from "./BirthDataFields";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { BirthData, ChartResponse } from "@/types";

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

interface CalculatorFormProps {
  apiEndpoint: string;
  storageKey: string;
  onResult: (result: ChartResponse) => void;
  title?: string;
}

export function CalculatorForm({
  apiEndpoint,
  storageKey,
  onResult,
  title,
}: CalculatorFormProps) {
  const [data, setData] = useLocalStorage<BirthData>(storageKey, DEFAULT_BIRTH_DATA);
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
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "Greška pri izradi karte");
      }

      const result: ChartResponse = await res.json();
      onResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Došlo je do greške");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      <BirthDataFields data={data} onChange={setData} />
      {error && (
        <div className="rounded-xl border border-secondary/50 bg-secondary/10 px-4 py-3 text-sm text-secondary">
          {error}
        </div>
      )}
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        {loading ? "Izračunavanje..." : "Izradi kartu"}
      </Button>
    </form>
  );
}
