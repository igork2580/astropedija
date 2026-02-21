import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CurrentPlanetsTable } from "@/components/sky";

export const metadata: Metadata = {
  title: "Trenutne planete",
  description: "Pogledajte trenutne pozicije svih planeta na nebu. Ažurirani podaci za Beograd.",
};

export default function TrenutnePlanetePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Trenutne planete" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Trenutne planete</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Pregled trenutnih pozicija svih planeta na nebu, referentna lokacija: Beograd.
        Podaci se automatski ažuriraju svakih 5 minuta.
      </p>
      <div className="mt-8">
        <CurrentPlanetsTable />
      </div>
    </div>
  );
}
