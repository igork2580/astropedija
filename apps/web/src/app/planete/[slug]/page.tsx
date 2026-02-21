import type { Metadata } from "next";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { ContentPage } from "@/components/mdx";

const CATEGORY = "planete";

export async function generateStaticParams() {
  return getAllSlugs(CATEGORY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug(CATEGORY, slug);
  if (!item) return {};
  return { title: item.frontmatter.title, description: item.frontmatter.description };
}

export default async function PlanetaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPage category={CATEGORY} slug={slug} parentLabel="Planete" parentHref="/planete" />;
}
