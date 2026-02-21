"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TransitAlert {
  type: "ingress" | "retrograde" | "direct";
  date: string;
  days_until: number;
  title: string;
  description: string;
  planet: string;
}

export function TransitAlertBanner() {
  const [alerts, setAlerts] = useState<TransitAlert[]>([]);

  useEffect(() => {
    fetch("/api/sky/transits?days=7")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: TransitAlert[]) => setAlerts(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  if (alerts.length === 0) return null;

  const typeStyles: Record<string, string> = {
    retrograde: "border-secondary/30 bg-secondary/5 text-secondary",
    direct: "border-green-500/30 bg-green-500/5 text-green-400",
    ingress: "border-primary/30 bg-primary/5 text-primary",
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert, i) => (
        <div
          key={`${alert.planet}-${alert.type}-${i}`}
          className={`rounded-xl border p-4 ${typeStyles[alert.type] || typeStyles.ingress}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">{alert.title}</h3>
              <p className="text-xs opacity-80 mt-0.5">{alert.description}</p>
            </div>
            <span className="text-xs font-medium whitespace-nowrap ml-3">
              {alert.days_until === 1
                ? "sutra"
                : `za ${alert.days_until} dana`}
            </span>
          </div>
        </div>
      ))}
      {alerts.length > 0 && (
        <Link
          href="/tranziti"
          className="block text-center text-xs text-primary hover:underline"
        >
          Pogledajte sve nadolazeće tranzite →
        </Link>
      )}
    </div>
  );
}
