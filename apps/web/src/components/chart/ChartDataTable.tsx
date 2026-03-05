"use client";

import type { ChartData } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

interface ChartDataTableProps {
  data: ChartData;
}

export function ChartDataTable({ data }: ChartDataTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6 shadow-lg shadow-black/5">
      <Tabs defaultValue="planets">
        <TabsList>
          <TabsTrigger value="planets">Planete</TabsTrigger>
          <TabsTrigger value="houses">Kuće</TabsTrigger>
          {data.aspects && data.aspects.length > 0 && (
            <TabsTrigger value="aspects">Aspekti</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="planets">
          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <div className="inline-block min-w-full px-4 sm:px-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Planeta
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Znak
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Stepen
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Kuća
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                      R
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {data.planets.map((planet, i) => (
                    <tr
                      key={planet.name}
                      className={`transition-colors duration-150 hover:bg-surface-hover ${
                        i % 2 === 0 ? "bg-transparent" : "bg-surface-hover/30"
                      }`}
                    >
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-text-primary">
                        {planet.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-text-secondary">
                        {planet.sign}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-text-secondary">
                        {planet.degree.toFixed(2)}\u00B0
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-text-secondary">
                        {planet.house}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-center">
                        {planet.retrograde && (
                          <span
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10 text-xs text-secondary"
                            title="Retrogradna"
                          >
                            \u211E
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="houses">
          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <div className="inline-block min-w-full px-4 sm:px-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Kuća
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Znak
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Stepen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {data.houses.map((house, i) => (
                    <tr
                      key={house.number}
                      className={`transition-colors duration-150 hover:bg-surface-hover ${
                        i % 2 === 0 ? "bg-transparent" : "bg-surface-hover/30"
                      }`}
                    >
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-text-primary">
                        {house.number}. kuća
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-text-secondary">
                        {house.sign}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-text-secondary">
                        {house.degree.toFixed(2)}\u00B0
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {data.aspects && data.aspects.length > 0 && (
          <TabsContent value="aspects">
            <div className="overflow-x-auto -mx-4 sm:-mx-6">
              <div className="inline-block min-w-full px-4 sm:px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Planeta 1
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Aspekt
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Planeta 2
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Orb
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {data.aspects.map((aspect, i) => (
                      <tr
                        key={`${aspect.planet1}-${aspect.planet2}-${aspect.aspect}`}
                        className={`transition-colors duration-150 hover:bg-surface-hover ${
                          i % 2 === 0
                            ? "bg-transparent"
                            : "bg-surface-hover/30"
                        }`}
                      >
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-text-primary">
                          {aspect.planet1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-center text-primary font-medium">
                          {aspect.aspect}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-text-primary">
                          {aspect.planet2}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right font-mono text-xs text-text-muted">
                          {aspect.orb.toFixed(1)}\u00B0
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
