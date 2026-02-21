import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NatalChartCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Besplatna natalna karta sa tumacenjem",
  description: "Izradite natalnu kartu za 10 sekundi — pozicije planeta, kuce, aspekti i tumacenje na srpskom. Potrebni su vam samo datum, vreme i mesto rodjenja.",
};

export default function NatalnaKartaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Pocetna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Natalna karta" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Izrada natalne karte</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Unesite datum, vreme i mesto rodjenja. Kalkulator koristi Swiss Ephemeris za precizne pozicije
        svih 10 planeta, raspored po kucama (Placidus sistem) i sve medjusobne aspekte. Rezultat dobijate odmah, sa grafickim prikazom karte i tabelom podataka.
      </p>
      <div className="mt-8">
        <NatalChartCalculator />
      </div>
    </div>
  );
}
