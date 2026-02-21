"use client";

import { useState, useEffect } from "react";

interface TransitAlert {
  type: "ingress" | "retrograde" | "direct";
  date: string;
  days_until: number;
  title: string;
  description: string;
  planet: string;
}

const TYPE_LABELS: Record<string, string> = {
  ingress: "Ulazak u znak",
  retrograde: "Retrograda",
  direct: "Direktno kretanje",
};

const TYPE_COLORS: Record<string, string> = {
  retrograde: "bg-secondary/10 border-secondary/30 text-secondary",
  direct: "bg-green-500/10 border-green-500/30 text-green-400",
  ingress: "bg-primary/10 border-primary/30 text-primary",
};

export function TransitCalendar() {
  const [alerts, setAlerts] = useState<TransitAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(14);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/sky/transits?days=${days}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: TransitAlert[]) => setAlerts(data))
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false));
  }, [days]);

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex gap-2">
        {[7, 14, 30].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDays(d)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              days === d
                ? "bg-primary text-white"
                : "bg-surface border border-border text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {d} dana
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 animate-pulse rounded-xl bg-border" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && alerts.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <p className="text-text-secondary">
            Nema značajnih tranzita u narednih {days} dana.
          </p>
        </div>
      )}

      {/* Transit list */}
      {!loading && alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div
              key={`${alert.planet}-${alert.type}-${i}`}
              className={`rounded-xl border p-5 ${TYPE_COLORS[alert.type] || TYPE_COLORS.ingress}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium uppercase tracking-wide opacity-60">
                      {TYPE_LABELS[alert.type] || alert.type}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold">{alert.title}</h3>
                  <p className="text-sm opacity-80 mt-1">{alert.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">{alert.date}</p>
                  <p className="text-xs opacity-60">
                    {alert.days_until === 1
                      ? "sutra"
                      : `za ${alert.days_until} dana`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
