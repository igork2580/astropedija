import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NatalChartCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Izrada natalne karte",
  description: "Besplatna izrada natalne karte sa kompletnom interpretacijom. Unesite datum, vreme i mesto rođenja.",
};

export default function NatalnaKartaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Natalna karta" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Izrada natalne karte</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vaše podatke o rođenju da biste izradili kompletnu natalnu kartu sa pozicijama planeta, kuća i aspekata.
      </p>
      <div className="mt-8">
        <NatalChartCalculator />
      </div>
    </div>
  );
}
