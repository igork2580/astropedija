import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SynastryCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Uporedna natalna karta (Sinastija), besplatno",
  description: "Postavite dve natalne karte jednu preko druge. Sinastija pokazuje aspekte izmedju vasih planeta, gde se slazete i gde se izazivate.",
};

export default function UporednaNatalnaKartaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Kalkulatori", href: "/astro-kalkulatori" },
          { label: "Uporedna karta" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Uporedna natalna karta</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Sinastija postavlja dve natalne karte jednu preko druge i racuna medjuaspekte izmedju svih planeta obe osobe. Kalkulator koristi Swiss Ephemeris i Placidus sistem kuca da precizno odredi gde se vase planete podudaraju (konjunkcije, trigoni, sekstili) i gde izazivaju tenziju (kvadrati, opozicije). Potrebni su vam tacni podaci o rodjenju za obe osobe: datum, vreme i mesto.
      </p>
      <div className="mt-8">
        <SynastryCalculator />
      </div>
    </div>
  );
}
