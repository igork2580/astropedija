/** Centralized brand constants — single source of truth for all branding. */

export const brand = {
  name: "AstroPut",
  domain: "astroput.com",
  url: "https://astroput.com",
  tagline: "Astrologija na srpskom — precizno, besplatno, detaljno",
  description:
    "Besplatni astroloski kalkulatori sa preciznim proracunima: natalna karta, sinastija, tranziti, solarni horoskop. Enciklopedija sa 600+ clanaka o znakovima, planetama i kucama. Dnevni horoskop za sve znakove.",
  shortDescription:
    "Besplatni astroloski kalkulatori, natalne karte sa tumacenjem, dnevni horoskop i enciklopedija astrologije na srpskom.",
  language: "sr",
  locale: "sr_RS",
  copyright: `© ${new Date().getFullYear()} AstroPut. Sva prava zadržana.`,
} as const;

export type Brand = typeof brand;
