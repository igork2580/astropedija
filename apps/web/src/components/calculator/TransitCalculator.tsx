"use client";

import { useState } from "react";
import { WizardCalculatorForm } from "./wizard";
import { ChartViewer, ChartDataTable, ChartShareButton } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function TransitCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      {!result ? (
        <WizardCalculatorForm
          apiEndpoint="/api/charts/transit"
          storageKey="transit_birth_data"
          onResult={setResult}
        />
      ) : (
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
