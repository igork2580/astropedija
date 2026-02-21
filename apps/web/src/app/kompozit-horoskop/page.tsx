import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CompositeCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Kompozit horoskop",
  description: "Besplatna izrada kompozitnog horoskopa. Saznajte suštinu vaše veze kroz kompozitnu kartu.",
};

export default function KompozitHoroskopPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Kompozit horoskop" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Kompozit horoskop</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Kompozitna karta koristi srednje tačke između dve natalne karte da bi otkrila energiju veze.
      </p>
      <div className="mt-8">
        <CompositeCalculator />
      </div>
    </div>
  );
}
