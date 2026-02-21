"use client";

import { WizardStep } from "../WizardStep";

export function StepCalculating() {
  return (
    <WizardStep title="Izračunavanje..." description="Molimo sačekajte dok pripremamo vašu kartu">
      <div className="flex flex-col items-center gap-6 py-8">
        {/* Animated zodiac wheel spinner */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-border border-t-primary" />
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-border border-b-secondary" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            &#9733;
          </div>
        </div>
        <p className="text-sm text-text-muted animate-pulse">
          Čitamo položaje planeta...
        </p>
      </div>
    </WizardStep>
  );
}
