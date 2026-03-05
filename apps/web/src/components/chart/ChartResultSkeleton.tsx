import { Skeleton } from "@/components/ui";

/**
 * Skeleton layout for chart result pages (natal, synastry, composite, etc.).
 * Mimics the typical result layout: chart wheel + data table + distributions.
 */
export function ChartResultSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Chart wheel placeholder */}
      <div className="mx-auto max-w-[600px] rounded-2xl border border-border bg-surface p-6 shadow-lg shadow-black/5">
        <Skeleton className="mx-auto aspect-square w-full max-w-[500px] rounded-full" />
      </div>

      {/* Action buttons row */}
      <div className="flex flex-wrap justify-center gap-3">
        <Skeleton className="h-10 w-32 rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      {/* Data table skeleton */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg shadow-black/5">
        {/* Tab header */}
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
        {/* Table rows */}
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Element + Quality distribution */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg shadow-black/5">
          <Skeleton className="h-6 w-40 mb-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-lg" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2.5 w-full rounded-full" />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg shadow-black/5">
          <Skeleton className="h-6 w-40 mb-4" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
