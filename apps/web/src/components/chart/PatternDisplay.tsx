"use client";

interface AspectPattern {
  name: string;
  name_sr: string;
  planets: string[];
  description: string;
}

interface PatternDisplayProps {
  patterns: AspectPattern[];
}

export function PatternDisplay({ patterns }: PatternDisplayProps) {
  if (!patterns || patterns.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Aspektni obrasci</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {patterns.map((pattern, i) => (
          <div
            key={i}
            className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                {pattern.name}
              </span>
            </div>
            <h4 className="font-semibold text-text-primary mb-1">
              {pattern.name_sr}
            </h4>
            <p className="text-xs text-text-muted mb-2">
              {pattern.planets.join(" • ")}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {pattern.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
