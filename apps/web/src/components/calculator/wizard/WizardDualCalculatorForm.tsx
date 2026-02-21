"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Button } from "@/components/ui";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WizardProgress } from "./WizardProgress";
import { StepNameDate } from "./steps/StepNameDate";
import { StepTime } from "./steps/StepTime";
import { StepLocation } from "./steps/StepLocation";
import { StepCalculating } from "./steps/StepCalculating";
import type { BirthData, ChartResponse } from "@/types";

const STEPS = ["Osoba 1", "Vreme 1", "Mesto 1", "Osoba 2", "Vreme 2", "Mesto 2"];

const DEFAULT_BIRTH_DATA: BirthData = {
  name: "",
  year: 0,
  month: 0,
  day: 0,
  hour: 12,
  minute: 0,
  latitude: 44.8176,
  longitude: 20.4633,
  timezone: "Europe/Belgrade",
  city: "",
};

interface WizardDualCalculatorFormProps {
  apiEndpoint: string;
  storageKey: string;
  onResult: (result: ChartResponse) => void;
  submitLabel?: string;
}

export function WizardDualCalculatorForm({
  apiEndpoint,
  storageKey,
  onResult,
  submitLabel = "Izradi uporednu kartu",
}: WizardDualCalculatorFormProps) {
  const [person1, setPerson1] = useLocalStorage<BirthData>(`${storageKey}_p1`, DEFAULT_BIRTH_DATA);
  const [person2, setPerson2] = useLocalStorage<BirthData>(`${storageKey}_p2`, DEFAULT_BIRTH_DATA);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentPerson = step < 3 ? person1 : person2;
  const setCurrentPerson = step < 3 ? setPerson1 : setPerson2;
  const prefix = step < 3 ? "Osoba 1" : "Osoba 2";

  const canAdvance = useCallback(() => {
    const d = step < 3 ? person1 : person2;
    const localStep = step % 3;
    switch (localStep) {
      case 0:
        return d.name.trim() !== "" && d.day > 0 && d.month > 0 && d.year > 0;
      case 1:
        return true;
      case 2:
        return d.city.trim() !== "";
      default:
        return false;
    }
  }, [step, person1, person2]);

  function handleNext() {
    if (step < 5) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function handleSubmit() {
    setStep(6); // Calculating
    setError(null);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person1, person2 }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "Greška pri izradi karte");
      }

      const result: ChartResponse = await res.json();
      onResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Došlo je do greške");
      setStep(5);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && canAdvance() && step <= 5) {
      e.preventDefault();
      handleNext();
    }
  }

  const localStep = step % 3;
  const isCalculating = step === 6;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6" onKeyDown={handleKeyDown}>
      <WizardProgress steps={STEPS} currentStep={Math.min(step, 5)} />

      <div className="min-h-[200px] overflow-hidden">
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {isCalculating ? (
              <StepCalculating />
            ) : (
              <>
                {localStep === 0 && (
                  <StepNameDate data={currentPerson} onChange={setCurrentPerson} prefix={prefix} />
                )}
                {localStep === 1 && (
                  <StepTime data={currentPerson} onChange={setCurrentPerson} prefix={prefix} />
                )}
                {localStep === 2 && (
                  <StepLocation data={currentPerson} onChange={setCurrentPerson} prefix={prefix} />
                )}
              </>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-secondary/50 bg-secondary/10 px-4 py-3 text-sm text-secondary">
          {error}
        </div>
      )}

      {!isCalculating && (
        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <Button type="button" variant="secondary" onClick={handleBack} className="flex-1">
              Nazad
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            onClick={handleNext}
            disabled={!canAdvance()}
            className="flex-1"
          >
            {step === 5 ? submitLabel : "Dalje"}
          </Button>
        </div>
      )}
    </div>
  );
}
