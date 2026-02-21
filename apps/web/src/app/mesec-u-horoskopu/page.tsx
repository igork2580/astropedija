import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PlanetCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Mesec u horoskopu - Izracunajte poziciju Meseca",
  description:
    "Besplatno izracunajte poziciju Meseca u vasem horoskopu. Saznajte u kom znaku i kuci se nalazi vas Mesec na osnovu datuma, vremena i mesta rodjenja.",
};

export default function MesecUHoroskopuPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Mesec u horoskopu" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Mesec u horoskopu
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vase podatke o rodjenju da biste saznali u kom znaku i kuci se
        nalazi vas Mesec. Mesec predstavlja vase emocije, instinkte i
        podsvest.
      </p>
      <div className="mt-8">
        <PlanetCalculator
          planet="mesec"
          planetName="Mesec"
          apiEndpoint="/api/calculate/planet-position"
        />
      </div>
    </div>
  );
}
