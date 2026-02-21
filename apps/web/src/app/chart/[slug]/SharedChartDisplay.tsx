"use client";

import { useEffect, useState } from "react";
import { ChartViewer, ChartDataTable, ElementDistribution, QualityDistribution } from "@/components/chart";
import type { SharedChart } from "@/types";

const CHART_TYPE_LABELS: Record<string, string> = {
  natal: "Natalna karta",
  synastry: "Uporedna karta (Sinastija)",
  composite: "Kompozit horoskop",
  transit: "Tranziti",
  "solar-return": "Solarni horoskop",
};

export function SharedChartDisplay({ slug }: { slug: string }) {
  const [chart, setChart] = useState<SharedChart | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChart() {
      try {
        const res = await fetch(`/api/share/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Karta nije pronadjena.");
          } else if (res.status === 410) {
            setError("Ova karta je istekla.");
          } else {
            setError("Greska pri ucitavanju karte.");
          }
          return;
        }
        const data = await res.json();
        setChart(data);
      } catch {
        setError("Greska pri povezivanju sa serverom.");
      } finally {
        setLoading(false);
      }
    }
    fetchChart();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-text-secondary">Ucitavanje karte...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-lg font-medium text-text-primary">{error}</p>
        <p className="mt-2 text-text-secondary">
          Kartu mozete ponovo kreirati koristeci nase kalkulatore.
        </p>
      </div>
    );
  }

  if (!chart) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {CHART_TYPE_LABELS[chart.chart_type] || "Astroloska karta"}
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Kreirano: {new Date(chart.created_at).toLocaleDateString("sr-Latn")}
        </p>
      </div>

      <ChartViewer svg={chart.svg} />

      {chart.chart_data.elements && chart.chart_data.qualities && (
        <div className="grid gap-4 md:grid-cols-2">
          <ElementDistribution elements={chart.chart_data.elements} />
          <QualityDistribution qualities={chart.chart_data.qualities} />
        </div>
      )}

      <ChartDataTable data={chart.chart_data} />
    </div>
  );
}
