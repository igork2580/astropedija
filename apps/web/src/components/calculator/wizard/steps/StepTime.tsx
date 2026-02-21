"use client";

import { Input } from "@/components/ui";
import { WizardStep } from "../WizardStep";
import type { BirthData } from "@/types";

interface StepTimeProps {
  data: BirthData;
  onChange: (data: BirthData) => void;
  prefix?: string;
}

export function StepTime({ data, onChange, prefix }: StepTimeProps) {
  function update(field: keyof BirthData, value: number) {
    onChange({ ...data, [field]: value });
  }

  return (
    <WizardStep
      title={prefix ? `${prefix} — Vreme rođenja` : "Vreme rođenja"}
      description="Tačno vreme omogućava preciznije kuće i podznak"
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Sat"
          type="number"
          value={data.hour ?? ""}
          onChange={(e) => update("hour", parseInt(e.target.value) || 0)}
          min={0}
          max={23}
          placeholder="HH"
          autoFocus
        />
        <Input
          label="Minut"
          type="number"
          value={data.minute ?? ""}
          onChange={(e) => update("minute", parseInt(e.target.value) || 0)}
          min={0}
          max={59}
          placeholder="MM"
        />
      </div>
    </WizardStep>
  );
}
