"use client";

interface QualityDistributionProps {
  qualities: Record<string, number>;
}

const QUALITY_COLORS: Record<string, string> = {
  Kardinalan: "bg-primary",
  Fiksan: "bg-secondary",
  Mutabilan: "bg-yellow-500",
};

const QUALITY_RING_COLORS: Record<string, string> = {
  Kardinalan: "ring-primary/20",
  Fiksan: "ring-secondary/20",
  Mutabilan: "ring-yellow-500/20",
};

const QUALITY_DESCRIPTIONS: Record<string, string> = {
  Kardinalan: "Inicijativa, pokretac",
  Fiksan: "Stabilnost, istrajnost",
  Mutabilan: "Prilagodljivost, promena",
};

export function QualityDistribution({ qualities }: QualityDistributionProps) {
  const total = Object.values(qualities).reduce((a, b) => a + b, 0) || 1;
  const maxCount = Math.max(...Object.values(qualities), 1);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-lg shadow-black/5">
      <h3 className="text-lg font-semibold mb-5">Distribucija kvaliteta</h3>
      <div className="space-y-4">
        {Object.entries(qualities).map(([quality, count]) => {
          const pct = Math.round((count / total) * 100);

          return (
            <div key={quality} className="group">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-2.5 w-2.5 rounded-full ring-2 ${QUALITY_RING_COLORS[quality]} ${QUALITY_COLORS[quality]}`}
                  />
                  <div>
                    <span className="text-sm font-medium text-text-primary">
                      {quality}
                    </span>
                    <span className="ml-2 text-xs text-text-muted hidden sm:inline">
                      {QUALITY_DESCRIPTIONS[quality]}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-text-secondary tabular-nums">
                  {count}{" "}
                  <span className="text-text-muted font-normal">({pct}%)</span>
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-surface-hover overflow-hidden">
                <div
                  className={`h-full rounded-full ${QUALITY_COLORS[quality]} transition-all duration-700 ease-out`}
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
