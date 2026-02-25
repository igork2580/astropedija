import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { generateOGImage, ogSize } from "@/lib/og-image";
import { getSignBySlug } from "@/data/zodiac-signs";

export const dynamic = "force-static";
export const alt = "AstroPut";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs("znakovi").map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getContentBySlug("znakovi", slug);
  const sign = getSignBySlug(slug);
  const title = item?.frontmatter.title || slug;

  return generateOGImage({
    title,
    subtitle: sign?.dateRange,
  });
}
