"use client";

import { LocationAutocomplete } from "../../LocationAutocomplete";
import { WizardStep } from "../WizardStep";
import type { BirthData, GeoLocation } from "@/types";

interface StepLocationProps {
  data: BirthData;
  onChange: (data: BirthData) => void;
  prefix?: string;
}

export function StepLocation({ data, onChange, prefix }: StepLocationProps) {
  function handleLocationSelect(loc: GeoLocation) {
    onChange({
      ...data,
      city: `${loc.name}, ${loc.countryName}`,
      latitude: loc.lat,
      longitude: loc.lng,
      timezone: loc.timezone,
    });
  }

  return (
    <WizardStep
      title={prefix ? `${prefix} — Mesto rođenja` : "Mesto rođenja"}
      description="Počnite da kucate i izaberite grad iz liste"
    >
      <LocationAutocomplete
        value={data.city}
        onChange={handleLocationSelect}
        label={prefix ? `Mesto rođenja (${prefix})` : "Mesto rođenja"}
      />
    </WizardStep>
  );
}
