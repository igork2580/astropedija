"use client";

interface ElementDistributionProps {
  elements: Record<string, number>;
}

const ELEMENT_COLORS: Record<string, string> = {
  Vatra: "bg-red-500",
  Zemlja: "bg-green-600",
  Vazduh: "bg-yellow-400",
  Voda: "bg-blue-500",
};

const ELEMENT_RING_COLORS: Record<string, string> = {
  Vatra: "ring-red-500/20",
  Zemlja: "ring-green-600/20",
  Vazduh: "ring-yellow-400/20",
  Voda: "ring-blue-500/20",
};

const ELEMENT_ICONS: Record<string, string> = {
  Vatra: "\u{1F525}",
  Zemlja: "\u{1F30D}",
  Vazduh: "\u{1F4A8}",
  Voda: "\u{1F4A7}",
};

export function ElementDistribution({ elements }: ElementDistributionProps) {
  const total = Object.values(elements).reduce((a, b) => a + b, 0) || 1;
  const maxCount = Math.max(...Object.values(elements), 1);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-lg shadow-black/5">
      <h3 className="text-lg font-semibold mb-5">Distribucija elemenata</h3>
      <div className="space-y-4">
        {Object.entries(elements).map(([element, count]) => {
          const pct = Math.round((count / total) * 100);

          return (
            <div key={element} className="group">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ring-2 ${ELEMENT_RING_COLORS[element]} text-sm`}
                  >
                    {ELEMENT_ICONS[element]}
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {element}
                  </span>
                </div>
                <span className="text-sm font-semibold text-text-secondary tabular-nums">
                  {count}{" "}
                  <span className="text-text-muted font-normal">({pct}%)</span>
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-surface-hover overflow-hidden">
                <div
                  className={`h-full rounded-full ${ELEMENT_COLORS[element]} transition-all duration-700 ease-out`}
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
