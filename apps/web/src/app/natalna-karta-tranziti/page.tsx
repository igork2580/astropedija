import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TransitCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Natalna karta + tranziti",
  description: "Pogledajte kako trenutni planetarni tranziti utiču na vašu natalnu kartu.",
};

export default function TranzitiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Tranziti" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Natalna karta + tranziti</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Pogledajte kako se trenutne pozicije planeta odnose prema vašoj natalnoj karti.
      </p>
      <div className="mt-8">
        <TransitCalculator />
      </div>
    </div>
  );
}
