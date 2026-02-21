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

const ELEMENT_ICONS: Record<string, string> = {
  Vatra: "🔥",
  Zemlja: "🌍",
  Vazduh: "💨",
  Voda: "💧",
};

export function ElementDistribution({ elements }: ElementDistributionProps) {
  const total = Object.values(elements).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold mb-4">Distribucija elemenata</h3>
      <div className="space-y-3">
        {Object.entries(elements).map(([element, count]) => (
          <div key={element} className="flex items-center gap-3">
            <span className="text-lg w-6">{ELEMENT_ICONS[element]}</span>
            <span className="w-16 text-sm font-medium text-text-secondary">{element}</span>
            <div className="flex-1 h-3 rounded-full bg-surface-hover overflow-hidden">
              <div
                className={`h-full rounded-full ${ELEMENT_COLORS[element]} transition-all duration-500`}
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-text-primary w-6 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
