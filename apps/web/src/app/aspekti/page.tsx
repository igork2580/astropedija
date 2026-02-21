import type { Metadata } from "next";
import Link from "next/link";
import { aspects } from "@/data/aspects";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Astrološki aspekti — konjunkcija, trigon, kvadrat i drugi",
  description: "Glavni astrološki aspekti: konjunkcija (0°), sekstil (60°), kvadrat (90°), trigon (120°) i opozicija (180°). Kako planete međusobno razgovaraju u karti.",
};

export default function AspektiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Aspekti" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Astrološki aspekti</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Aspekti pokazuju kako planete u karti „razgovaraju" — mereni su uglom
        između njih. Pet glavnih aspekata su konjunkcija (0°), sekstil (60°),
        kvadrat (90°), trigon (120°) i opozicija (180°). Harmonični aspekti
        (trigon, sekstil) olakšavaju protok energije, dok tenzični (kvadrat,
        opozicija) stvaraju trenje koje podstiče rast. Konjunkcija pojačava obe
        planete — da li skladno ili napeto, zavisi od njihove prirode. Standardni
        orbis za glavne aspekte iznosi 6–10°.
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
