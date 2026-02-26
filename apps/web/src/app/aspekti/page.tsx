import type { Metadata } from "next";
import Link from "next/link";
import { aspects } from "@/data/aspects";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generateFAQSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Astroloski aspekti: konjunkcija, trigon, kvadrat i drugi",
  description: "Glavni astrološki aspekti: konjunkcija (0°), sekstil (60°), kvadrat (90°), trigon (120°) i opozicija (180°). Kako planete međusobno razgovaraju u karti.",
};

const aspectsFAQ = generateFAQSchema([
  {
    question: "Sta su aspekti u astrologiji?",
    answer: "Aspekti su uglovi izmedju planeta u natalnoj karti koji pokazuju kako planete medjusobno deluju. Pet glavnih aspekata su konjunkcija (0°), sekstil (60°), kvadrat (90°), trigon (120°) i opozicija (180°).",
  },
  {
    question: "Koji aspekti su pozitivni, a koji negativni?",
    answer: "Trigon (120°) i sekstil (60°) su harmonicni aspekti koji olaksavaju protok energije. Kvadrat (90°) i opozicija (180°) su tenzicni aspekti koji stvaraju trenje, ali i podsticu rast. Konjunkcija (0°) pojacava obe planete, a njen efekat zavisi od prirode planeta.",
  },
  {
    question: "Sta je orbis u astrologiji?",
    answer: "Orbis je dozvoljeno odstupanje od tacnog ugla aspekta. Na primer, trigon je tacno 120°, ali se racuna i ugao od 114° do 126° ako je orbis 6°. Standardni orbis za glavne aspekte iznosi 6 do 10 stepeni, a za manje aspekte 1 do 3 stepena.",
  },
]);

export default function AspektiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aspectsFAQ) }}
      />
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Aspekti" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Astrološki aspekti</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Aspekti pokazuju kako planete u karti „razgovaraju" i mereni su uglom
        izmedju njih. Pet glavnih aspekata su konjunkcija (0°), sekstil (60°),
        kvadrat (90°), trigon (120°) i opozicija (180°). Harmonicni aspekti
        (trigon, sekstil) olaksavaju protok energije, dok tenzicni (kvadrat,
        opozicija) stvaraju trenje koje podstice rast. Konjunkcija pojacava obe
        planete, a da li skladno ili napeto, zavisi od njihove prirode. Standardni
        orbis za glavne aspekte iznosi 6 do 10°.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {aspects.map((aspect) => (
          <Link
            key={aspect.slug}
            href={`/aspekti/${aspect.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-3xl mb-2">{aspect.symbol}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">
              {aspect.name}
            </span>
            <span className="text-xs text-text-muted mt-1">{aspect.angle}°</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
