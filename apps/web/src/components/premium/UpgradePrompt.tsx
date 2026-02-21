"use client";

import Link from "next/link";

interface UpgradePromptProps {
  feature?: string;
}

export function UpgradePrompt({ feature }: UpgradePromptProps) {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
      <p className="text-2xl mb-3">&#9733;</p>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        Premium sadržaj
      </h3>
      <p className="text-sm text-text-secondary mb-4">
        {feature
          ? `${feature} je dostupan sa Premium planom.`
          : "Ova funkcija je dostupna sa Premium planom."}
        {" "}Nadogradite za pristup AI interpretacijama, detaljnim tranzit izveštajima i PDF eksportu.
      </p>
      <Link
        href="/premium"
        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        Nadogradite na Premium
      </Link>
    </div>
  );
}
