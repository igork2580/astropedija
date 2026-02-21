export interface ZodiacSign {
  id: number;
  slug: string;
  name: string;
  symbol: string;
  element: "Vatra" | "Zemlja" | "Vazduh" | "Voda";
  quality: "Kardinalan" | "Fiksan" | "Mutabilan";
  ruler: string;
  dateRange: string;
  icon: string;
}

export interface Planet {
  id: number;
  slug: string;
  name: string;
  symbol: string;
  icon: string;
}

export interface House {
  id: number;
  slug: string;
  name: string;
  number: number;
  naturalSign: string;
  naturalRuler: string;
}

export interface Aspect {
  id: number;
  slug: string;
  name: string;
  symbol: string;
  angle: number;
  type: "Skladan" | "Tenzija" | "Neutralan";
}

export interface BirthData {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezone: string;
  city: string;
}

export interface ChartPlanet {
  name: string;
  sign: string;
  degree: number;
  house: number;
  retrograde: boolean;
}

export interface ChartHouse {
  number: number;
  sign: string;
  degree: number;
}

export interface ChartAspect {
  planet1: string;
  planet2: string;
  aspect: string;
  angle: number;
  orb: number;
}

export interface ChartData {
  planets: ChartPlanet[];
  houses: ChartHouse[];
  aspects: ChartAspect[];
  elements: Record<string, number>;
  qualities: Record<string, number>;
}

export interface ChartResponse {
  chart_data: ChartData;
  svg: string;
}

export interface GeoLocation {
  name: string;
  lat: number;
  lng: number;
  countryName: string;
  timezone: string;
}

export interface Horoscope {
  sign: string;
  type: "daily" | "weekly" | "monthly";
  content: string;
  period_start: string;
  period_end: string;
}

export interface MoonPhase {
  date: string;
  phase_name: string;
  illumination: number;
  moon_sign: string;
  moon_degree: number;
}

export interface ContentFrontmatter {
  title: string;
  description: string;
  image?: string;
  sign?: string;
  planet?: string;
  house?: number;
  aspect?: string;
}

export interface SharedChart {
  share_slug: string;
  chart_type: string;
  chart_data: ChartData;
  svg: string;
  created_at: string;
}
