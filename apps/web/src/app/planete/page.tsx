import type { Metadata } from "next";
import Link from "next/link";
import { planets } from "@/data/planets";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generateFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Planete u astrologiji: znacenje i uticaj",
  description: "10 planeta u astrologiji, od licnih (Sunce, Mesec, Merkur, Venera, Mars) do generacijskih (Uran, Neptun, Pluton). Znacenje, ciklusi i uticaj na kartu.",
};

const planetFAQ = generateFAQSchema([
  {
    question: "Koliko planeta koristi astrologija?",
    answer: "Astrologija koristi 10 nebeskih tela: Sunce, Mesec, Merkur, Veneru, Mars, Jupiter, Saturn, Uran, Neptun i Pluton. Sunce i Mesec se tradicionalno nazivaju planetama iako to astronomski nisu.",
  },
  {
    question: "Sta su licne, drustvene i generacijske planete?",
    answer: "Licne planete (Sunce, Mesec, Merkur, Venera, Mars) krecu se brzo i uticu na svakodnevni zivot. Drustvene (Jupiter, Saturn) menjaju znak na 1-2,5 godine. Generacijske (Uran, Neptun, Pluton) ostaju u znaku 7 do 31 godinu i definisu generacijske trendove.",
  },
  {
    question: "Sta znaci vladajuca planeta znaka?",
    answer: "Svaki znak ima vladajucu planetu koja oblikuje njegov karakter. Na primer, Mars vlada Ovnom i daje mu prodornost, Venera vlada Bikom i daje mu senzualnost, a Jupiter vlada Strelcem i daje mu sirinu pogleda.",
  },
]);

export default function PlanetePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(planetFAQ) }}
      />
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Planete" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Planete u astrologiji</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Astrologija koristi 10 planeta podeljenih u tri grupe. Licne planete
        (Sunce, Mesec, Merkur, Venera i Mars) krecu se brzo i oblikuju
        svakodnevni temperament. Drustvene planete, Jupiter i Saturn, menjaju
        znak na svake 1 do 2,5 godine i uticu na drustveni polozaj. Generacijske
        planete, Uran (7 god.), Neptun (14 god.) i Pluton (do 31 god. u jednom
        znaku), definisu generacijske trendove. Razumevanje ovih ciklusa
        otkriva zasto neke oblasti zivota deluju licnije, a neke kolektivnije.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {planets.map((planet) => (
          <Link
            key={planet.slug}
            href={`/planete/${planet.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-3xl mb-2">{planet.symbol}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">
              {planet.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
