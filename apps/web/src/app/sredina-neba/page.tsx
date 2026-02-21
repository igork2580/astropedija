import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MidheavenCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Sredina Neba (MC) kalkulator - Izracunajte Medium Coeli",
  description:
    "Besplatno izracunajte poziciju Sredine Neba (Medium Coeli / MC) u vasem horoskopu. Saznajte u kom znaku se nalazi vas MC na osnovu datuma, vremena i mesta rodjenja.",
};

export default function SredinaNebaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Sredina Neba (MC)" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Sredina Neba (Medium Coeli)
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vase podatke o rodjenju da biste saznali u kom znaku se
        nalazi vasa Sredina Neba (MC). MC predstavlja vasu karijeru, javni
        imidz, ambicije i zivotne ciljeve.
      </p>
      <div className="mt-8">
        <MidheavenCalculator />
      </div>
    </div>
  );
}
