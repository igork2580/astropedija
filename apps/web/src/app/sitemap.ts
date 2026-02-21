import type { MetadataRoute } from "next";
import { zodiacSigns } from "@/data/zodiac-signs";
import { planets } from "@/data/planets";
import { houses } from "@/data/houses";
import { aspects } from "@/data/aspects";
import { getAllSlugs } from "@/lib/content";
import { brand } from "@/lib/brand";

const BASE_URL = brand.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/znakovi`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/planete`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/kuce`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/aspekti`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/podznak`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/ljubavni-horoskop`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/dnevni-horoskop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/nedeljni-horoskop`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/mesecni-horoskop`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/astro-kalkulatori`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/izrada-natalne-karte`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/uporedna-natalna-karta`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kompozit-horoskop`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/natalna-karta-tranziti`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/solarni-horoskop`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/numerologija-kalkulator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/trenutne-planete`, changeFrequency: "hourly", priority: 0.7 },
    { url: `${BASE_URL}/meseceve-faze`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/planete-po-znakovima`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/planete-po-kucama`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/kuce-po-znakovima`, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Zodiac sign pages
  const signPages: MetadataRoute.Sitemap = zodiacSigns.flatMap((sign) => [
    { url: `${BASE_URL}/znakovi/${sign.slug}`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/podznak/${sign.slug}`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/dnevni-horoskop/${sign.slug}`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/nedeljni-horoskop/${sign.slug}`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/mesecni-horoskop/${sign.slug}`, changeFrequency: "monthly" as const, priority: 0.7 },
  ]);

  // Planet pages
  const planetPages: MetadataRoute.Sitemap = planets.map((p) => ({
    url: `${BASE_URL}/planete/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // House pages
  const housePages: MetadataRoute.Sitemap = houses.map((h) => ({
    url: `${BASE_URL}/kuce/${h.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Aspect pages
  const aspectPages: MetadataRoute.Sitemap = aspects.map((a) => ({
    url: `${BASE_URL}/aspekti/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic MDX content pages
  const contentCategories = [
    "planete-po-znakovima",
    "planete-po-kucama",
    "kuce-po-znakovima",
    "ljubavni-horoskop",
  ];

  const contentPages: MetadataRoute.Sitemap = contentCategories.flatMap((cat) =>
    getAllSlugs(cat).map((slug) => ({
      url: `${BASE_URL}/${cat}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [
    ...staticPages,
    ...signPages,
    ...planetPages,
    ...housePages,
    ...aspectPages,
    ...contentPages,
  ];
}
