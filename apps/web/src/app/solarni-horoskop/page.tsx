import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SolarReturnCalculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Solarni horoskop — prognoza za godinu",
  description: "Solarni horoskop se radi za tačan trenutak kada tranzitno Sunce dostigne stepen vašeg natalnog Sunca. Pokazuje teme narednih 12 meseci.",
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
        Solarna karta (Solar Return) se računa za tačnu sekundu kada tranzitno Sunce dostigne identičan stepen i minut kao vaše natalno Sunce. Swiss Ephemeris precizno određuje taj trenutak za bilo koju godinu. Rezultat je karta koja pokazuje teme, izazove i prilike za narednih 12 meseci — od jednog do sledećeg rođendana. Potrebni su vam originalni podaci o rođenju (datum, vreme, mesto) i godina za koju želite prognozu.
      </p>
      <div className="mt-8">
        <SolarReturnCalculator />
      </div>
    </div>
  );
}
