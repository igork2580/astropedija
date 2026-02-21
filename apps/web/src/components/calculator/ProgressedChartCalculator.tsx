"use client";

import { useState } from "react";
import { WizardCalculatorForm } from "./wizard";
import { ChartDataTable, ElementDistribution, QualityDistribution, ChartShareButton, ChartInterpretation } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function ProgressedChartCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      {!result ? (
        <WizardCalculatorForm
          apiEndpoint="/api/charts/progressed"
          storageKey="progressed_birth_data"
          onResult={setResult}
        />
      ) : (
        <>
          <div className="flex justify-center">
            <ChartShareButton
              chartType="progressed"
              inputData={{}}
              chartData={result.chart_data}
              svg={result.svg}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ElementDistribution elements={result.chart_data.elements} />
            <QualityDistribution qualities={result.chart_data.qualities} />
          </div>
          <ChartDataTable data={result.chart_data} />
          <ChartInterpretation planets={result.chart_data.planets} />
        </>
      )}
    </div>
  );
}
