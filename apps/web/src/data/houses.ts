import type { House } from "@/types";

export const houses: House[] = [
  { id: 1, slug: "prva-kuca", name: "Prva kuća", number: 1, naturalSign: "Ovan", naturalRuler: "Mars" },
  { id: 2, slug: "druga-kuca", name: "Druga kuća", number: 2, naturalSign: "Bik", naturalRuler: "Venera" },
  { id: 3, slug: "treca-kuca", name: "Treća kuća", number: 3, naturalSign: "Blizanci", naturalRuler: "Merkur" },
  { id: 4, slug: "cetvrta-kuca", name: "Četvrta kuća", number: 4, naturalSign: "Rak", naturalRuler: "Mesec" },
  { id: 5, slug: "peta-kuca", name: "Peta kuća", number: 5, naturalSign: "Lav", naturalRuler: "Sunce" },
  { id: 6, slug: "sesta-kuca", name: "Šesta kuća", number: 6, naturalSign: "Devica", naturalRuler: "Merkur" },
  { id: 7, slug: "sedma-kuca", name: "Sedma kuća", number: 7, naturalSign: "Vaga", naturalRuler: "Venera" },
  { id: 8, slug: "osma-kuca", name: "Osma kuća", number: 8, naturalSign: "Skorpija", naturalRuler: "Pluton" },
  { id: 9, slug: "deveta-kuca", name: "Deveta kuća", number: 9, naturalSign: "Strelac", naturalRuler: "Jupiter" },
  { id: 10, slug: "deseta-kuca", name: "Deseta kuća", number: 10, naturalSign: "Jarac", naturalRuler: "Saturn" },
  { id: 11, slug: "jedanaesta-kuca", name: "Jedanaesta kuća", number: 11, naturalSign: "Vodolija", naturalRuler: "Uran" },
  { id: 12, slug: "dvanaesta-kuca", name: "Dvanaesta kuća", number: 12, naturalSign: "Ribe", naturalRuler: "Neptun" },
];

export function getHouseBySlug(slug: string): House | undefined {
  return houses.find((h) => h.slug === slug);
}

export function getAllHouseSlugs(): string[] {
  return houses.map((h) => h.slug);
}
