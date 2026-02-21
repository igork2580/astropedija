import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MoonPhaseCalendar } from "@/components/sky";

export const metadata: Metadata = {
  title: "Mesečeve faze",
  description: "Kalendar mesečevih faza sa detaljnim informacijama o svakoj fazi, znaku i stepenu Meseca.",
};

export default function MeseceveFazePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Mesečeve faze" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Mesečeve faze</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Kalendar mesečevih faza sa informacijama o znaku i stepenu Meseca.
        Koristite strelice za navigaciju između meseci.
      </p>
      <div className="mt-8">
        <MoonPhaseCalendar />
      </div>
    </div>
  );
}
