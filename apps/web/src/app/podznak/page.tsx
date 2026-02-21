import type { Metadata } from "next";
import Link from "next/link";
import { zodiacSigns } from "@/data/zodiac-signs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Podznak (Ascendent)",
  description: "Saznajte sve o podznaku u astrologiji - kako se računa, šta znači i kako utiče na ličnost.",
};

export default function PodznakPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Podznak" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Podznak (Ascendent)</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Podznak ili ascendent je znak koji se nalazio na istočnom horizontu u trenutku vašeg rođenja.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {zodiacSigns.map((sign) => (
          <Link
            key={sign.slug}
            href={`/podznak/${sign.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:bg-surface-hover hover:-translate-y-1"
          >
            <span className="text-3xl mb-2">{sign.symbol}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">
              Podznak {sign.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
