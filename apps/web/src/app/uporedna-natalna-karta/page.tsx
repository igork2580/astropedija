import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SynastryCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Uporedna natalna karta (Sinastija)",
  description: "Besplatna izrada uporedne natalne karte. Otkrijte kompatibilnost sa partnerom kroz sinastrijsku analizu.",
};

export default function UporednaNatalnaKartaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Uporedna karta" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Uporedna natalna karta</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite podatke o rođenju za dve osobe i saznajte koliko su astrološki kompatibilne.
      </p>
      <div className="mt-8">
        <SynastryCalculator />
      </div>
    </div>
  );
}
