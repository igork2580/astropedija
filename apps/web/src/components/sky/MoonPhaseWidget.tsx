"use client";

import Link from "next/link";

const MOON_PHASE_EMOJIS: Record<string, string> = {
  "Mlad Mesec": "🌑",
  "Rastuća Srp": "🌒",
  "Prva četvrtina": "🌓",
  "Rastuća Grbava": "🌔",
  "Pun Mesec": "🌕",
  "Opadajuća Grbava": "🌖",
  "Poslednja četvrtina": "🌗",
  "Opadajuća Srp": "🌘",
};

interface MoonPhaseWidgetProps {
  phaseName?: string;
  illumination?: number;
  moonSign?: string;
}

export function MoonPhaseWidget({
  phaseName = "Rastuća Grbava",
  illumination = 75,
  moonSign = "Lav",
}: MoonPhaseWidgetProps) {
  const emoji = MOON_PHASE_EMOJIS[phaseName] || "🌙";

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <h3 className="text-sm font-semibold text-text-primary mb-3">Faza Meseca</h3>
      <div className="flex items-center gap-3">
        <span className="text-4xl">{emoji}</span>
        <div>
          <p className="text-sm font-medium text-text-primary">{phaseName}</p>
          <p className="text-xs text-text-muted">
            {moonSign} · {illumination}% osvetljen
          </p>
        </div>
      </div>
      <Link
        href="/meseceve-faze"
        className="mt-3 block text-xs text-primary hover:text-primary-light text-center"
      >
        Kalendar mesečevih faza →
      </Link>
    </div>
  );
}
