"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui";

interface TransitAlert {
  type: "ingress" | "retrograde" | "direct";
  date: string;
  days_until: number;
  title: string;
  description: string;
  planet: string;
}

const typeStyles: Record<string, string> = {
  retrograde: "border-secondary/30 bg-secondary/5 text-secondary",
  direct: "border-green-500/30 bg-green-500/5 text-green-400",
  ingress: "border-primary/30 bg-primary/5 text-primary",
};

const typeIcons: Record<string, string> = {
  retrograde: "\u211E",
  direct: "\u2192",
  ingress: "\u2609",
};

export function TransitAlertBanner() {
  const [alerts, setAlerts] = useState<TransitAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sky/transits?days=7")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: TransitAlert[]) => setAlerts(data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* Skeleton while loading */
  if (loading) {
    return (
      <div className="space-y-3 animate-in fade-in duration-300">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-64" />
              </div>
              <Skeleton className="h-4 w-16 ml-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert, i) => (
        <div
          key={`${alert.planet}-${alert.type}-${i}`}
          className={`rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${typeStyles[alert.type] || typeStyles.ingress}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-current/10 text-sm"
                aria-hidden="true"
              >
                {typeIcons[alert.type] || typeIcons.ingress}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm">{alert.title}</h3>
                <p className="text-xs opacity-80 mt-0.5 line-clamp-2">
                  {alert.description}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium whitespace-nowrap shrink-0">
              {alert.days_until === 0
                ? "danas"
                : alert.days_until === 1
                  ? "sutra"
                  : `za ${alert.days_until} dana`}
            </span>
          </div>
        </div>
      ))}
      <Link
        href="/tranziti"
        className="block text-center text-xs font-medium text-primary hover:text-primary-light transition-colors"
      >
        Pogledajte sve nadolazece tranzite \u2192
      </Link>
    </div>
  );
}
