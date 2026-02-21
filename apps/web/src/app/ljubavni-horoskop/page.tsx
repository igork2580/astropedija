import type { Metadata } from "next";
import Link from "next/link";
import { zodiacSigns } from "@/data/zodiac-signs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Ljubavni horoskop - Kompatibilnost znakova",
  description: "Proverite ljubavnu kompatibilnost između svih 12 zodijačkih znakova. 144 kombinacije za ljubav i partnerstvo.",
};

export default function LjubavniHoroskopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Početna", href: "/" }, { label: "Ljubavni horoskop" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Ljubavni horoskop</h1>
      <p className="mt-3 text-lg text-text-secondary">
        Izaberite dva znaka i saznajte koliko su kompatibilni u ljubavi i partnerstvu.
      </p>
      <div className="mt-8 space-y-8">
        {zodiacSigns.map((sign1) => (
          <div key={sign1.slug}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>{sign1.symbol}</span> {sign1.name}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {zodiacSigns.map((sign2) => (
                <Link
                  key={`${sign1.slug}-${sign2.slug}`}
                  href={`/ljubavni-horoskop/${sign1.slug}-i-${sign2.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-border bg-surface p-3 text-center transition-all hover:border-secondary/50 hover:bg-surface-hover"
                >
                  <span className="text-lg">{sign2.symbol}</span>
                  <span className="text-xs font-medium text-text-secondary group-hover:text-secondary mt-1">
                    {sign2.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
