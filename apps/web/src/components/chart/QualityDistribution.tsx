"use client";

interface QualityDistributionProps {
  qualities: Record<string, number>;
}

const QUALITY_COLORS: Record<string, string> = {
  Kardinalan: "bg-primary",
  Fiksan: "bg-secondary",
  Mutabilan: "bg-yellow-500",
};

export function QualityDistribution({ qualities }: QualityDistributionProps) {
  const total = Object.values(qualities).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold mb-4">Distribucija kvaliteta</h3>
      <div className="space-y-3">
        {Object.entries(qualities).map(([quality, count]) => (
          <div key={quality} className="flex items-center gap-3">
            <span className="w-24 text-sm font-medium text-text-secondary">{quality}</span>
            <div className="flex-1 h-3 rounded-full bg-surface-hover overflow-hidden">
              <div
                className={`h-full rounded-full ${QUALITY_COLORS[quality]} transition-all duration-500`}
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
