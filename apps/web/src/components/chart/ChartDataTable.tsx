"use client";

import type { ChartData } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

interface ChartDataTableProps {
  data: ChartData;
}

export function ChartDataTable({ data }: ChartDataTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <Tabs defaultValue="planets">
        <TabsList>
          <TabsTrigger value="planets">Planete</TabsTrigger>
          <TabsTrigger value="houses">Kuće</TabsTrigger>
        </TabsList>

        <TabsContent value="planets">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">Planeta</th>
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">Znak</th>
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">Stepen</th>
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">Kuća</th>
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">R</th>
                </tr>
              </thead>
              <tbody>
                {data.planets.map((planet) => (
                  <tr key={planet.name} className="border-b border-border/50">
                    <td className="px-3 py-2 font-medium text-text-primary">{planet.name}</td>
                    <td className="px-3 py-2 text-text-secondary">{planet.sign}</td>
                    <td className="px-3 py-2 text-text-secondary">{planet.degree.toFixed(2)}°</td>
                    <td className="px-3 py-2 text-text-secondary">{planet.house}</td>
                    <td className="px-3 py-2 text-text-secondary">{planet.retrograde ? "℞" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="houses">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">Kuća</th>
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">Znak</th>
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">Stepen</th>
                </tr>
              </thead>
              <tbody>
                {data.houses.map((house) => (
                  <tr key={house.number} className="border-b border-border/50">
                    <td className="px-3 py-2 font-medium text-text-primary">{house.number}. kuća</td>
                    <td className="px-3 py-2 text-text-secondary">{house.sign}</td>
                    <td className="px-3 py-2 text-text-secondary">{house.degree.toFixed(2)}°</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
