"use client";

import { useState } from "react";
import { WizardDualCalculatorForm } from "./wizard";
import { ChartViewer, ChartDataTable, ChartShareButton } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function SynastryCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      {!result ? (
        <WizardDualCalculatorForm
          apiEndpoint="/api/charts/synastry"
          storageKey="synastry"
          onResult={setResult}
          submitLabel="Izradi uporednu kartu"
        />
      ) : (
        <>
          <div className="flex justify-center">
            <ChartShareButton
              chartType="synastry"
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
