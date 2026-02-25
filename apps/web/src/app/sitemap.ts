import type { MetadataRoute } from "next";
import { zodiacSigns } from "@/data/zodiac-signs";
import { planets } from "@/data/planets";
import { houses } from "@/data/houses";
import { aspects } from "@/data/aspects";
import { getAllSlugs } from "@/lib/content";
import { brand } from "@/lib/brand";

const BASE_URL = brand.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const today = now.split("T")[0];
  const contentDate = "2026-01-15";

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: today, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/znakovi`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/planete`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/kuce`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/aspekti`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/podznak`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/ljubavni-horoskop`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/dnevni-horoskop`, lastModified: today, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/nedeljni-horoskop`, lastModified: today, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/mesecni-horoskop`, lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/astro-kalkulatori`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/izrada-natalne-karte`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/uporedna-natalna-karta`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kompozit-horoskop`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/natalna-karta-tranziti`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/solarni-horoskop`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/numerologija-kalkulator`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/trenutne-planete`, lastModified: today, changeFrequency: "hourly", priority: 0.7 },
    { url: `${BASE_URL}/meseceve-faze`, lastModified: today, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/planete-po-znakovima`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/planete-po-kucama`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/kuce-po-znakovima`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/o-nama`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/kontakt`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/politika-privatnosti`, lastModified: contentDate, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/uslovi-koriscenja`, lastModified: contentDate, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Zodiac sign pages
  const signPages: MetadataRoute.Sitemap = zodiacSigns.flatMap((sign) => [
    { url: `${BASE_URL}/znakovi/${sign.slug}`, lastModified: contentDate, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/podznak/${sign.slug}`, lastModified: contentDate, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/dnevni-horoskop/${sign.slug}`, lastModified: today, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/nedeljni-horoskop/${sign.slug}`, lastModified: today, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/mesecni-horoskop/${sign.slug}`, lastModified: today, changeFrequency: "monthly" as const, priority: 0.7 },
  ]);

  // Planet pages
  const planetPages: MetadataRoute.Sitemap = planets.map((p) => ({
    url: `${BASE_URL}/planete/${p.slug}`,
    lastModified: contentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // House pages
  const housePages: MetadataRoute.Sitemap = houses.map((h) => ({
    url: `${BASE_URL}/kuce/${h.slug}`,
    lastModified: contentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Aspect pages
  const aspectPages: MetadataRoute.Sitemap = aspects.map((a) => ({
    url: `${BASE_URL}/aspekti/${a.slug}`,
    lastModified: contentDate,
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
      lastModified: contentDate,
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
