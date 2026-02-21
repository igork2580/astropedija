import type { Aspect } from "@/types";

export const aspects: Aspect[] = [
  { id: 1, slug: "konjunkcija", name: "Konjunkcija", symbol: "☌", angle: 0, type: "Neutralan" },
  { id: 2, slug: "opozicija", name: "Opozicija", symbol: "☍", angle: 180, type: "Tenzija" },
  { id: 3, slug: "trigon", name: "Trigon", symbol: "△", angle: 120, type: "Skladan" },
  { id: 4, slug: "kvadrat", name: "Kvadrat", symbol: "□", angle: 90, type: "Tenzija" },
  { id: 5, slug: "sekstil", name: "Sekstil", symbol: "⚹", angle: 60, type: "Skladan" },
  { id: 6, slug: "kvinkunks", name: "Kvinkunks", symbol: "⚻", angle: 150, type: "Tenzija" },
  { id: 7, slug: "semi-sekstil", name: "Semi-sekstil", symbol: "⚺", angle: 30, type: "Neutralan" },
  { id: 8, slug: "semi-kvadrat", name: "Semi-kvadrat", symbol: "∠", angle: 45, type: "Tenzija" },
];

export function getAspectBySlug(slug: string): Aspect | undefined {
  return aspects.find((a) => a.slug === slug);
}

export function getAllAspectSlugs(): string[] {
  return aspects.map((a) => a.slug);
}
