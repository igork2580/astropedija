"use client";

import { Input } from "@/components/ui";
import { LocationAutocomplete } from "./LocationAutocomplete";
import type { BirthData, GeoLocation } from "@/types";

interface BirthDataFieldsProps {
  data: BirthData;
  onChange: (data: BirthData) => void;
  prefix?: string;
}

export function BirthDataFields({ data, onChange, prefix = "" }: BirthDataFieldsProps) {
  function update(field: keyof BirthData, value: string | number) {
    onChange({ ...data, [field]: value });
  }

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
    <div className="space-y-4">
      <Input
        label={prefix ? `Ime (${prefix})` : "Ime"}
        value={data.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder="Unesite ime"
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
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Sat"
          type="number"
          value={data.hour ?? ""}
          onChange={(e) => update("hour", parseInt(e.target.value) || 0)}
          min={0}
          max={23}
          placeholder="HH"
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
      <LocationAutocomplete
        value={data.city}
        onChange={handleLocationSelect}
        label={prefix ? `Mesto rođenja (${prefix})` : "Mesto rođenja"}
      />
    </div>
  );
}
