import type { Metadata } from "next";
import { ZodiacGrid } from "@/components/zodiac";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "12 znakova zodijaka — osobine, elementi, vladari",
  description:
    "Upoznajte svih 12 znakova zodijaka — od Ovna do Riba. Elementi, kvaliteti (kardinalni, fiksni, promenljivi), vladajuće planete i ključne osobine svakog znaka.",
};

export default function ZnakroviPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Zodijački znakovi" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Zodijački znakovi</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Zodijak čine 12 znakova raspoređenih u 4 elementa — vatra, zemlja, vazduh
        i voda — i 3 kvaliteta: kardinalni, fiksni i promenljivi. Svaki znak ima
        vladajuću planetu koja oblikuje njegov temperament: Mars daje Ovnu
        prodornost, Venera Biku senzualnost, a Neptun Ribama intuiciju. Otkrijte
        kako se ovi slojevi prepliću u svakom znaku.
      </p>
      <div className="mt-8">
        <ZodiacGrid />
      </div>
    </div>
  );
}
