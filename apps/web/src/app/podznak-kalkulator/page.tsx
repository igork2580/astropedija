import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PodznakCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Podznak kalkulator - Izracunajte vas Ascendent",
  description:
    "Besplatno izracunajte vas podznak (ascendent). Saznajte u kom znaku se nalazi vas podznak na osnovu datuma, vremena i mesta rodjenja.",
};

export default function PodznakKalkulatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Podznak kalkulator" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Podznak kalkulator (Ascendent)
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vase podatke o rodjenju da biste saznali vas podznak.
        Podznak (ascendent) predstavlja nacin na koji vas drugi vide, vas
        spoljasnji izgled i prvi utisak koji ostavljate.
      </p>
      <div className="mt-8">
        <PodznakCalculator />
      </div>
    </div>
  );
}
