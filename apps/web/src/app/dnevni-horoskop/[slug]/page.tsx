import type { Metadata } from "next";
import { getSignBySlug, getAllSignSlugs } from "@/data/zodiac-signs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HoroscopeContent, HoroscopeTypeTabs } from "@/components/horoscope";
import { generateHoroscopeSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllSignSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sign = getSignBySlug(slug);
  if (!sign) return {};
  return {
    title: `Dnevni horoskop - ${sign.name}`,
    description: `Pročitajte dnevni horoskop za ${sign.name}. Saznajte šta vam zvezde poručuju danas.`,
    alternates: { canonical: `/dnevni-horoskop/${slug}` },
  };
}

export default async function DnevniHoroskopSignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sign = getSignBySlug(slug);
  if (!sign) return null;

  const horoscopeSchema = generateHoroscopeSchema({
    signName: sign.name,
    type: "dnevni",
    url: `/dnevni-horoskop/${slug}`,
    description: `Dnevni horoskop za ${sign.name}. Saznajte sta vam zvezde porucuju danas.`,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(horoscopeSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: "Dnevni horoskop", href: "/dnevni-horoskop" },
          { label: sign.name },
        ]}
      />
      <div className="mt-6 text-center">
        <span className="text-5xl">{sign.symbol}</span>
        <h1 className="mt-4 text-3xl font-bold">Dnevni horoskop - {sign.name}</h1>
        <p className="mt-2 text-text-muted">{sign.element} · {sign.quality} · Vladar: {sign.ruler}</p>
      </div>
      <div className="mt-6 flex justify-center">
        <HoroscopeTypeTabs sign={slug} activeType="dnevni" />
      </div>
      <div className="mt-6">
        <HoroscopeContent sign={slug} type="daily" />
      </div>
    </div>
  );
}
