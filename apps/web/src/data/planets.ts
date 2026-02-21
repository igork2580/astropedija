import type { Planet } from "@/types";

export const planets: Planet[] = [
  { id: 1, slug: "sunce", name: "Sunce", symbol: "☉", icon: "/images/planets/sunce.webp" },
  { id: 2, slug: "mesec", name: "Mesec", symbol: "☽", icon: "/images/planets/mesec.webp" },
  { id: 3, slug: "merkur", name: "Merkur", symbol: "☿", icon: "/images/planets/merkur.webp" },
  { id: 4, slug: "venera", name: "Venera", symbol: "♀", icon: "/images/planets/venera.webp" },
  { id: 5, slug: "mars", name: "Mars", symbol: "♂", icon: "/images/planets/mars.webp" },
  { id: 6, slug: "jupiter", name: "Jupiter", symbol: "♃", icon: "/images/planets/jupiter.webp" },
  { id: 7, slug: "saturn", name: "Saturn", symbol: "♄", icon: "/images/planets/saturn.webp" },
  { id: 8, slug: "uran", name: "Uran", symbol: "♅", icon: "/images/planets/uran.webp" },
  { id: 9, slug: "neptun", name: "Neptun", symbol: "♆", icon: "/images/planets/neptun.webp" },
  { id: 10, slug: "pluton", name: "Pluton", symbol: "♇", icon: "/images/planets/pluton.webp" },
  { id: 11, slug: "severni-mesecov-cvor", name: "Severni Mesečev čvor", symbol: "☊", icon: "/images/planets/severni-mesecov-cvor.webp" },
];

export function getPlanetBySlug(slug: string): Planet | undefined {
  return planets.find((p) => p.slug === slug);
}

export function getAllPlanetSlugs(): string[] {
  return planets.map((p) => p.slug);
}
