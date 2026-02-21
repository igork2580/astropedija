import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PlanetCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Mars u horoskopu - Izracunajte poziciju Marsa",
  description:
    "Besplatno izracunajte poziciju Marsa u vasem horoskopu. Saznajte u kom znaku i kuci se nalazi vas Mars na osnovu datuma, vremena i mesta rodjenja.",
};

export default function MarsUHoroskopuPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Mars u horoskopu" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Mars u horoskopu
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vase podatke o rodjenju da biste saznali u kom znaku i kuci se
        nalazi vas Mars. Mars predstavlja energiju, akciju, strast i nacin na
        koji se borite za ono sto zelite.
      </p>
      <div className="mt-8">
        <PlanetCalculator
          planet="mars"
          planetName="Mars"
          apiEndpoint="/api/calculate/planet-position"
        />
      </div>
    </div>
  );
}
