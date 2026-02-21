"use client";

import { Input } from "@/components/ui";
import { WizardStep } from "../WizardStep";
import type { BirthData } from "@/types";

interface StepNameDateProps {
  data: BirthData;
  onChange: (data: BirthData) => void;
  prefix?: string;
}

export function StepNameDate({ data, onChange, prefix }: StepNameDateProps) {
  function update(field: keyof BirthData, value: string | number) {
    onChange({ ...data, [field]: value });
  }

  return (
    <WizardStep
      title={prefix ? `${prefix} — Ime i datum` : "Ime i datum rođenja"}
      description="Unesite ime i tačan datum rođenja"
    >
      <div className="space-y-4">
        <Input
          label={prefix ? `Ime (${prefix})` : "Ime"}
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Unesite ime"
          autoFocus
        />
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Dan"
            type="number"
            value={data.day || ""}
            onChange={(e) => update("day", parseInt(e.target.value) || 0)}
            min={1}
            max={31}
            placeholder="DD"
          />
          <Input
            label="Mesec"
            type="number"
            value={data.month || ""}
            onChange={(e) => update("month", parseInt(e.target.value) || 0)}
            min={1}
            max={12}
            placeholder="MM"
          />
          <Input
            label="Godina"
            type="number"
            value={data.year || ""}
            onChange={(e) => update("year", parseInt(e.target.value) || 0)}
            min={1900}
            max={2100}
            placeholder="GGGG"
          />
        </div>
      </div>
    </WizardStep>
  );
}
