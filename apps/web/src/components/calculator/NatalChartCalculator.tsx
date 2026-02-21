"use client";

import { useState } from "react";
import { WizardCalculatorForm } from "./wizard";
import { ChartViewer, ChartDataTable, ElementDistribution, QualityDistribution, ChartShareButton, ChartInterpretation, PdfExportButton } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function NatalChartCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      {!result ? (
        <WizardCalculatorForm
          apiEndpoint="/api/charts/natal"
          storageKey="natal_birth_data"
          onResult={setResult}
        />
      ) : (
        <div id="natal-chart-result">
          <div className="flex justify-center gap-3">
            <ChartShareButton
              chartType="natal"
              inputData={{}}
              chartData={result.chart_data}
              svg={result.svg}
            />
            <PdfExportButton targetId="natal-chart-result" filename="natalna-karta" />
          </div>
          <ChartViewer svg={result.svg} />
          <div className="grid gap-4 md:grid-cols-2">
            <ElementDistribution elements={result.chart_data.elements} />
            <QualityDistribution qualities={result.chart_data.qualities} />
          </div>
          <ChartDataTable data={result.chart_data} />
          <ChartInterpretation planets={result.chart_data.planets} />
        </div>
      )}
    </div>
  );
}
