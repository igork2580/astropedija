import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PlanetCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Jupiter u horoskopu - Izracunajte poziciju Jupitera",
  description:
    "Besplatno izracunajte poziciju Jupitera u vasem horoskopu. Saznajte u kom znaku i kuci se nalazi vas Jupiter na osnovu datuma, vremena i mesta rodjenja.",
};

export default function JupiterUHoroskopuPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Jupiter u horoskopu" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Jupiter u horoskopu
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vase podatke o rodjenju da biste saznali u kom znaku i kuci se
        nalazi vas Jupiter. Jupiter predstavlja srecu, ekspanziju, mudrost i
        oblasti u kojima imate najvise srece.
      </p>
      <div className="mt-8">
        <PlanetCalculator
          planet="jupiter"
          planetName="Jupiter"
          apiEndpoint="/api/calculate/planet-position"
        />
      </div>
    </div>
  );
}
