import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SunMoonAscCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Sunce, Mesec i Podznak - Izracunajte veliku trojku",
  description:
    "Besplatno izracunajte pozicije Sunca, Meseca i podznaka u vasem horoskopu. Saznajte vasu veliku trojku na osnovu datuma, vremena i mesta rodjenja.",
};

export default function SunceMesecPodznakPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Sunce, Mesec i Podznak" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Sunce, Mesec i Podznak
      </h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite vase podatke o rodjenju da biste saznali vasu &quot;veliku
        trojku&quot; - pozicije Sunca, Meseca i podznaka. Ova tri elementa
        cine temelj vaseg horoskopa i definisu vasu licnost, emocije i nacin
        na koji vas svet vidi.
      </p>
      <div className="mt-8">
        <SunMoonAscCalculator />
      </div>
    </div>
  );
}
