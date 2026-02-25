import { getAllSignSlugs, getSignBySlug } from "@/data/zodiac-signs";
import { generateOGImage, ogSize } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "AstroPut";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSignSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sign = getSignBySlug(slug);

  return generateOGImage({
    title: `Nedeljni horoskop - ${sign?.name || slug}`,
    subtitle: sign?.dateRange,
  });
}
