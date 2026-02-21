"use client";

import { useState } from "react";
import { CalculatorForm } from "./CalculatorForm";
import { ChartViewer, ChartDataTable, ChartShareButton } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function TransitCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <CalculatorForm
          apiEndpoint="/api/charts/transit"
          storageKey="transit_birth_data"
          onResult={setResult}
        />
      </div>
      {result && (
        <>
          <div className="flex justify-center">
            <ChartShareButton
              chartType="transit"
              inputData={{}}
              chartData={result.chart_data}
              svg={result.svg}
            />
          </div>
          <ChartViewer svg={result.svg} />
          <ChartDataTable data={result.chart_data} />
        </>
      )}
    </div>
  );
}
