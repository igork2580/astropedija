import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NumerologyCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Numerologija kalkulator",
  description: "Besplatni numerološki kalkulator. Izračunajte vaš životni put, broj sudbine i osobine ličnosti.",
};

export default function NumerologijaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Numerologija" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Numerologija kalkulator</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vaše ime i datum rođenja da biste saznali vaš životni broj i numerološki profil.
      </p>
      <div className="mt-8">
        <NumerologyCalculator />
      </div>
    </div>
  );
}
