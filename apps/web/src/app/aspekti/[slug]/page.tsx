import type { Metadata } from "next";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { ContentPage } from "@/components/mdx";

const CATEGORY = "aspekti";

export async function generateStaticParams() {
  return getAllSlugs(CATEGORY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug(CATEGORY, slug);
  if (!item) return {};
  return { title: item.frontmatter.title, description: item.frontmatter.description, alternates: { canonical: `/aspekti/${slug}` } };
}

export default async function AspektPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPage category={CATEGORY} slug={slug} parentLabel="Aspekti" parentHref="/aspekti" />;
}
