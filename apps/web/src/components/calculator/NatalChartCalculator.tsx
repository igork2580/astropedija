"use client";

import { useState } from "react";
import { CalculatorForm } from "./CalculatorForm";
import { ChartViewer, ChartDataTable, ElementDistribution, QualityDistribution, ChartShareButton } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function NatalChartCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <CalculatorForm
          apiEndpoint="/api/charts/natal"
          storageKey="natal_birth_data"
          onResult={setResult}
        />
      </div>

      {result && (
        <>
          <div className="flex justify-center">
            <ChartShareButton
              chartType="natal"
              inputData={{}}
              chartData={result.chart_data}
              svg={result.svg}
            />
          </div>
          <ChartViewer svg={result.svg} />
          <div className="grid gap-4 md:grid-cols-2">
            <ElementDistribution elements={result.chart_data.elements} />
            <QualityDistribution qualities={result.chart_data.qualities} />
          </div>
          <ChartDataTable data={result.chart_data} />
        </>
      )}
    </div>
  );
}
