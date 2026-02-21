/** Utility functions for converting astrological angles to SVG coordinates. */

/** Convert degrees to radians. */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Convert an astrological degree (0°=Aries) to a screen angle.
 *  In astrology, 0° Aries is at the left (9 o'clock) and goes counterclockwise.
 *  In SVG, 0° is at 3 o'clock and goes clockwise.
 *  Conversion: screenAngle = 180 - astroDegree
 */
export function astroToScreen(astroDeg: number): number {
  return 180 - astroDeg;
}

/** Get the (x, y) point on a circle at a given angle (screen degrees). */
export function pointOnCircle(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
): { x: number; y: number } {
  const rad = degToRad(angleDeg);
  return {
    x: cx + radius * Math.cos(rad),
    y: cy - radius * Math.sin(rad),
  };
}

/** Get the absolute zodiac degree (0–360) from sign + degree within sign. */
export function getAbsoluteDegree(signIndex: number, degreeInSign: number): number {
  return signIndex * 30 + degreeInSign;
}

/** Zodiac sign names in order (0=Aries). */
export const ZODIAC_SIGNS = [
  "Ovan", "Bik", "Blizanci", "Rak", "Lav", "Devica",
  "Vaga", "Skorpija", "Strelac", "Jarac", "Vodolija", "Ribe",
] as const;

/** Unicode zodiac glyphs. */
export const ZODIAC_GLYPHS = [
  "\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D",
  "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653",
] as const;

/** Planet unicode glyphs. */
export const PLANET_GLYPHS: Record<string, string> = {
  Sunce: "\u2609",
  Mesec: "\u263D",
  Merkur: "\u263F",
  Venera: "\u2640",
  Mars: "\u2642",
  Jupiter: "\u2643",
  Saturn: "\u2644",
  Uran: "\u2645",
  Neptun: "\u2646",
  Pluton: "\u2647",
  "Severni čvor": "\u260A",
};

/** Sign name to zodiac index (0-based). */
export function signToIndex(signName: string): number {
  const idx = ZODIAC_SIGNS.indexOf(signName as (typeof ZODIAC_SIGNS)[number]);
  return idx >= 0 ? idx : 0;
}
