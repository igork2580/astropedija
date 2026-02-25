import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { generateOGImage, ogSize } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "AstroPut";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs("planete-po-znakovima").map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getContentBySlug("planete-po-znakovima", slug);
  const title = item?.frontmatter.title || slug;

  return generateOGImage({
    title,
    subtitle: "Planete po znakovima zodijaka",
  });
}
