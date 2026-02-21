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

const STEPS = ["Ime i datum", "Vreme", "Lokacija", "Rezultat"];

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

interface WizardCalculatorFormProps {
  apiEndpoint: string;
  storageKey: string;
  onResult: (result: ChartResponse) => void;
}

export function WizardCalculatorForm({
  apiEndpoint,
  storageKey,
  onResult,
}: WizardCalculatorFormProps) {
  const [data, setData] = useLocalStorage<BirthData>(storageKey, DEFAULT_BIRTH_DATA);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canAdvance = useCallback(() => {
    switch (step) {
      case 0:
        return (
          data.name.trim() !== "" &&
          data.day >= 1 && data.day <= 31 &&
          data.month >= 1 && data.month <= 12 &&
          data.year >= 1900 && data.year <= 2100
        );
      case 1:
        return true; // Time is always valid (defaults to 12:00)
      case 2:
        return data.city.trim() !== "";
      default:
        return false;
    }
  }, [step, data]);

  function handleNext() {
    if (step < 2) {
      setStep((s) => s + 1);
    } else {
      // Final step — submit
      handleSubmit();
    }
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function handleSubmit() {
    setStep(3); // Show calculating animation
    setError(null);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        let message = "Greška pri izradi karte";
        if (err?.detail) {
          if (typeof err.detail === "string") {
            message = err.detail;
          } else if (Array.isArray(err.detail)) {
            message = err.detail.map((e: { msg?: string }) => e.msg || "").filter(Boolean).join(", ");
          }
        }
        throw new Error(message || "Greška pri izradi karte");
      }

      const result: ChartResponse = await res.json();
      onResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Došlo je do greške");
      setStep(2); // Go back to last input step on error
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && canAdvance() && step < 3) {
      e.preventDefault();
      handleNext();
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6" onKeyDown={handleKeyDown}>
      <WizardProgress steps={STEPS} currentStep={step} />

      <div className="min-h-[200px] overflow-hidden">
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {step === 0 && <StepNameDate data={data} onChange={setData} />}
            {step === 1 && <StepTime data={data} onChange={setData} />}
            {step === 2 && <StepLocation data={data} onChange={setData} />}
            {step === 3 && <StepCalculating />}
          </m.div>
        </AnimatePresence>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-secondary/50 bg-secondary/10 px-4 py-3 text-sm text-secondary">
          {error}
        </div>
      )}

      {step < 3 && (
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
            {step === 2 ? "Izradi kartu" : "Dalje"}
          </Button>
        </div>
      )}
    </div>
  );
}
