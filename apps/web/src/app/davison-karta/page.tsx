import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DavisonCalculator } from "@/components/calculator/DavisonCalculator";

export const metadata: Metadata = {
  title: "Davison karta",
  description:
    "Izradite Davison kartu odnosa. Karta koristi srednju tačku u vremenu i prostoru između dva rođenja za analizu veze.",
};

export default function DavisonChartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Davison karta" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Davison karta odnosa
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Davison karta koristi srednju tačku u vremenu i prostoru između dva
        rođenja. Za razliku od kompozitne karte koja koristi srednje tačke
        planeta, Davison karta stvara pravi horoskop za srednji trenutak —
        jedinstveni pogled na energiju vašeg odnosa.
      </p>
      <div className="mt-8">
        <DavisonCalculator />
      </div>
    </div>
  );
}
