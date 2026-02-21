"use client";

import { useState } from "react";
import { useOnboarding } from "@/hooks/useOnboarding";

const ZODIAC_SIGNS = [
  { name: "Ovan", emoji: "\u2648", dates: "21.3 - 19.4" },
  { name: "Bik", emoji: "\u2649", dates: "20.4 - 20.5" },
  { name: "Blizanci", emoji: "\u264A", dates: "21.5 - 20.6" },
  { name: "Rak", emoji: "\u264B", dates: "21.6 - 22.7" },
  { name: "Lav", emoji: "\u264C", dates: "23.7 - 22.8" },
  { name: "Devica", emoji: "\u264D", dates: "23.8 - 22.9" },
  { name: "Vaga", emoji: "\u264E", dates: "23.9 - 22.10" },
  { name: "Skorpija", emoji: "\u264F", dates: "23.10 - 21.11" },
  { name: "Strelac", emoji: "\u2650", dates: "22.11 - 21.12" },
  { name: "Jarac", emoji: "\u2651", dates: "22.12 - 19.1" },
  { name: "Vodolija", emoji: "\u2652", dates: "20.1 - 18.2" },
  { name: "Ribe", emoji: "\u2653", dates: "19.2 - 20.3" },
];

export function OnboardingModal() {
  const { loaded, completed, complete } = useOnboarding();
  const [selected, setSelected] = useState<string | null>(null);

  // Don't render until localStorage is read, or if already completed
  if (!loaded || completed) return null;

  function handleConfirm() {
    if (selected) {
      complete(selected);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-bg-end p-6 shadow-2xl">
        <div className="text-center mb-6">
          <p className="text-3xl mb-2">&#9733;</p>
          <h2 className="text-xl font-bold text-text-primary">
            Koji je vaš znak?
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Izaberite svoj sunčev znak da personalizujemo vaš doživljaj.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {ZODIAC_SIGNS.map((sign) => (
            <button
              key={sign.name}
              type="button"
              onClick={() => setSelected(sign.name)}
              className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all ${
                selected === sign.name
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface hover:border-primary/50 hover:bg-surface-hover text-text-secondary"
              }`}
            >
              <span className="text-xl">{sign.emoji}</span>
              <span className="text-xs font-medium">{sign.name}</span>
              <span className="text-[10px] text-text-muted">{sign.dates}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => complete("")}
            className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-hover transition-colors"
          >
            Preskoči
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selected}
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            Potvrdi
          </button>
        </div>
      </div>
    </div>
  );
}
