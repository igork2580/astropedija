import type { Metadata } from "next";
import { ZodiacGrid } from "@/components/zodiac";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generateFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "12 znakova zodijaka: osobine, elementi, vladari",
  description:
    "Upoznajte svih 12 znakova zodijaka, od Ovna do Riba. Elementi, kvaliteti (kardinalni, fiksni, promenljivi), vladajuce planete i kljucne osobine svakog znaka.",
};

const zodiacFAQ = generateFAQSchema([
  {
    question: "Koliko znakova zodijaka postoji?",
    answer: "Postoji 12 znakova zodijaka: Ovan, Bik, Blizanci, Rak, Lav, Devica, Vaga, Skorpija, Strelac, Jarac, Vodolija i Ribe. Svaki pokriva oko 30 stepeni ekliptike.",
  },
  {
    question: "Sta su elementi u astrologiji?",
    answer: "Cetiri elementa su Vatra (Ovan, Lav, Strelac), Zemlja (Bik, Devica, Jarac), Vazduh (Blizanci, Vaga, Vodolija) i Voda (Rak, Skorpija, Ribe). Elementi opisuju osnovni temperament znaka.",
  },
  {
    question: "Sta znaci kardinalni, fiksni i mutabilni kvalitet?",
    answer: "Kardinalni znakovi (Ovan, Rak, Vaga, Jarac) pokrecu promene. Fiksni (Bik, Lav, Skorpija, Vodolija) odrzavaju stabilnost. Mutabilni (Blizanci, Devica, Strelac, Ribe) se prilagodjavaju i posreduju.",
  },
  {
    question: "Kako da saznam svoj horoskopski znak?",
    answer: "Vas Suncani znak odredjuje datum rodjenja. Na primer, rodjeni od 21. marta do 19. aprila su Ovnovi. Za precizno odredjivanje, posebno na granici dva znaka, potreban je tacan sat rodjenja i natalna karta.",
  },
]);

export default function ZnakroviPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zodiacFAQ) }}
      />
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Zodijački znakovi" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Zodijački znakovi</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Zodijak cine 12 znakova rasporedjenih u 4 elementa (vatra, zemlja, vazduh
        i voda) i 3 kvaliteta: kardinalni, fiksni i promenljivi. Svaki znak ima
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
