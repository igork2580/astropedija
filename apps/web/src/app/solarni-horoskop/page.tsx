import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SolarReturnCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Solarni horoskop",
  description: "Besplatna izrada solarnog horoskopa. Saznajte teme i prilike za vašu narednu godinu života.",
};

export default function SolarniHoroskopPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Solarni horoskop" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Solarni horoskop</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Solarna karta se pravi za trenutak kada se Sunce vrati na tačnu poziciju iz vaše natalne karte.
      </p>
      <div className="mt-8">
        <SolarReturnCalculator />
      </div>
    </div>
  );
}
