"use client";

import { useState } from "react";
import { DualBirthDataForm } from "./DualBirthDataForm";
import { ChartViewer, ChartDataTable, ChartShareButton } from "@/components/chart";
import type { ChartResponse } from "@/types";

export function SynastryCalculator() {
  const [result, setResult] = useState<ChartResponse | null>(null);

  return (
    <div className="space-y-8">
      <DualBirthDataForm
        apiEndpoint="/api/charts/synastry"
        storageKey="synastry"
        onResult={setResult}
      />
      {result && (
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
