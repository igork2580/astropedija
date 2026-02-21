"use client";

import { useState } from "react";
import { DualBirthDataForm } from "./DualBirthDataForm";
import { ChartViewer, ChartDataTable, ElementDistribution, QualityDistribution, ChartShareButton } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function CompositeCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      <DualBirthDataForm
        apiEndpoint="/api/charts/composite"
        storageKey="composite"
        onResult={setResult}
      />
      {result && (
        <>
          <div className="flex justify-center">
            <ChartShareButton
              chartType="composite"
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
