"use client";

import { useState } from "react";
import { WizardDualCalculatorForm } from "./wizard";
import { ChartViewer, ChartDataTable, ElementDistribution, QualityDistribution, ChartShareButton, ChartInterpretation } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function DavisonCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      {!result ? (
        <WizardDualCalculatorForm
          apiEndpoint="/api/charts/davison"
          storageKey="davison_birth_data"
          onResult={setResult}
        />
      ) : (
        <>
          <div className="flex justify-center">
            <ChartShareButton
              chartType="davison"
              inputData={{}}
              chartData={result.chart_data}
              svg={result.svg}
            />
          </div>
          {result.svg && <ChartViewer svg={result.svg} />}
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
