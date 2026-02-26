import type { Metadata } from "next";
import { getSignBySlug, getAllSignSlugs } from "@/data/zodiac-signs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HoroscopeContent, HoroscopeTypeTabs } from "@/components/horoscope";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllSignSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sign = getSignBySlug(slug);
  if (!sign) return {};
  return {
    title: `Nedeljni horoskop - ${sign.name}`,
    description: `Nedeljni horoskop za ${sign.name}. Planirajte nedelju uz astrološki vodič.`,
    alternates: { canonical: `/nedeljni-horoskop/${slug}` },
  };
}

export default async function NedeljniHoroskopSignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sign = getSignBySlug(slug);
  if (!sign) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Nedeljni horoskop", href: "/nedeljni-horoskop" },
          { label: sign.name },
        ]}
      />
      <div className="mt-6 text-center">
        <span className="text-5xl">{sign.symbol}</span>
        <h1 className="mt-4 text-3xl font-bold">Nedeljni horoskop - {sign.name}</h1>
        <p className="mt-2 text-text-muted">{sign.element} · {sign.quality} · Vladar: {sign.ruler}</p>
      </div>
      <div className="mt-6 flex justify-center">
        <HoroscopeTypeTabs sign={slug} activeType="nedeljni" />
      </div>
      <div className="mt-6">
        <HoroscopeContent sign={slug} type="weekly" />
      </div>
    </div>
  );
}
