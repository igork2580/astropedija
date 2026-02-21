"use client";

import { useEffect, useState } from "react";

interface MoonPhaseData {
  date: string;
  phase_name: string;
  illumination: number;
  moon_sign: string;
  moon_degree: number;
}

const MOON_EMOJIS: Record<string, string> = {
  "Mlad Mesec": "🌑",
  "Rastuća Srp": "🌒",
  "Prva četvrtina": "🌓",
  "Rastuća Grbava": "🌔",
  "Pun Mesec": "🌕",
  "Opadajuća Grbava": "🌖",
  "Poslednja četvrtina": "🌗",
  "Opadajuća Srp": "🌘",
};

const MONTHS_SR = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun",
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar",
];

export function MoonPhaseCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [phases, setPhases] = useState<MoonPhaseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhases() {
      setLoading(true);
      try {
        const res = await fetch(`/api/sky/moon-phases?year=${year}&month=${month}`);
        if (res.ok) {
          setPhases(await res.json());
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchPhases();
  }, [year, month]);

  function prevMonth() {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  // Generate calendar grid
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1; // Monday-start

  const phaseMap = new Map<number, MoonPhaseData>();
  for (const p of phases) {
    const d = new Date(p.date).getDate();
    phaseMap.set(d, p);
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < adjustedFirst; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="space-y-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded-lg border border-border bg-surface p-2 text-text-secondary hover:bg-surface-hover transition-colors"
        >
          ←
        </button>
        <h2 className="text-xl font-bold">
          {MONTHS_SR[month - 1]} {year}
        </h2>
        <button
          type="button"
          onClick={nextMonth}
          className="rounded-lg border border-border bg-surface p-2 text-text-secondary hover:bg-surface-hover transition-colors"
        >
          →
        </button>
      </div>

      {/* Calendar grid */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border bg-surface-hover">
          {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((day) => (
            <div key={day} className="px-2 py-2 text-center text-xs font-semibold text-text-muted">
              {day}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const phase = day ? phaseMap.get(day) : null;
            const isToday =
              day === now.getDate() &&
              month === now.getMonth() + 1 &&
              year === now.getFullYear();

            return (
              <div
                key={i}
                className={`min-h-[60px] border-b border-r border-border/30 p-1.5 ${
                  isToday ? "bg-primary/10" : ""
                } ${!day ? "bg-surface-hover/30" : ""}`}
              >
                {day && (
                  <>
                    <span
                      className={`text-xs ${
                        isToday
                          ? "font-bold text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      {day}
                    </span>
                    {phase && (
                      <div className="mt-0.5 text-center" title={`${phase.phase_name} - ${phase.moon_sign}`}>
                        <span className="text-sm">{MOON_EMOJIS[phase.phase_name] || "🌙"}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Key moon phases for this month */}
      {phases.length > 0 && (
        <div className="rounded-2xl border border-border bg-surface p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Ključne faze ovog meseca</h3>
          <div className="space-y-2">
            {phases
              .filter((p) =>
                ["Mlad Mesec", "Prva četvrtina", "Pun Mesec", "Poslednja četvrtina"].includes(p.phase_name),
              )
              .map((p) => (
                <div key={p.date} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{MOON_EMOJIS[p.phase_name]}</span>
                    <span className="text-text-secondary">{p.phase_name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-text-primary">
                      {new Date(p.date).toLocaleDateString("sr-RS")}
                    </span>
                    <span className="text-text-muted ml-2 text-xs">{p.moon_sign}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {loading && (
        <p className="text-center text-sm text-text-muted">Učitavanje...</p>
      )}
      {!loading && phases.length === 0 && (
        <p className="text-center text-sm text-text-muted">
          Podaci o mesečevim fazama će biti dostupni kada se API server pokrene.
        </p>
      )}
    </div>
  );
}
