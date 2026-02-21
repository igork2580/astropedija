import { zodiacSigns } from "@/data/zodiac-signs";
import { ZodiacCard } from "./ZodiacCard";

interface ZodiacGridProps {
  basePath?: string;
  compact?: boolean;
}

export function ZodiacGrid({
  basePath = "/znakovi",
  compact = false,
}: ZodiacGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
      {zodiacSigns.map((sign) => (
        <ZodiacCard
          key={sign.slug}
          sign={sign}
          href={`${basePath}/${sign.slug}`}
          compact={compact}
        />
      ))}
    </div>
  );
}
