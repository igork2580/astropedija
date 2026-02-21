import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PlanetCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Pluton u horoskopu - Izracunajte poziciju Plutona",
  description:
    "Besplatno izracunajte poziciju Plutona u vasem horoskopu. Saznajte u kom znaku i kuci se nalazi vas Pluton na osnovu datuma, vremena i mesta rodjenja.",
};

export default function PlutonUHoroskopuPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Pluton u horoskopu" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Pluton u horoskopu
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vase podatke o rodjenju da biste saznali u kom znaku i kuci se
        nalazi vas Pluton. Pluton predstavlja transformaciju, moc, regeneraciju
        i duboke promene.
      </p>
      <div className="mt-8">
        <PlanetCalculator
          planet="pluton"
          planetName="Pluton"
          apiEndpoint="/api/calculate/planet-position"
        />
      </div>
    </div>
  );
}
