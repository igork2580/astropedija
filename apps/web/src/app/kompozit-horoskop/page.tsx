import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CompositeCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Kompozit horoskop, karta vase veze",
  description: "Kompozit racuna srednje tacke izmedju dve natalne karte i pravi jednu kartu koja predstavlja samu vezu, njene snage, izazove i dinamiku.",
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
        Kompozitna karta koristi tehniku srednjih tacaka (midpoints). Za svaku planetu racuna tacku na pola puta izmedju njenog polozaja u vasoj i partnerovoj natalnoj karti. Rezultat je potpuno nova karta koja predstavlja samu vezu kao entitet. Dok sinastija pokazuje kako dvoje ljudi medjusobno deluju, kompozit pokazuje kakva je veza sama po sebi, njene teme, snage i slabe tacke. Potrebni su podaci o rodjenju za obe osobe.
      </p>
      <div className="mt-8">
        <CompositeCalculator />
      </div>
    </div>
  );
}
