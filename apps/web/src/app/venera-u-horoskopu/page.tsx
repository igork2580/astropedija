import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PlanetCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Venera u horoskopu - Izracunajte poziciju Venere",
  description:
    "Besplatno izracunajte poziciju Venere u vasem horoskopu. Saznajte u kom znaku i kuci se nalazi vasa Venera na osnovu datuma, vremena i mesta rodjenja.",
};

export default function VeneraUHoroskopuPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Venera u horoskopu" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Venera u horoskopu
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vase podatke o rodjenju da biste saznali u kom znaku i kuci se
        nalazi vasa Venera. Venera predstavlja ljubav, lepotu, vrednosti i
        nacin na koji volite.
      </p>
      <div className="mt-8">
        <PlanetCalculator
          planet="venera"
          planetName="Venera"
          apiEndpoint="/api/calculate/planet-position"
        />
      </div>
    </div>
  );
}
