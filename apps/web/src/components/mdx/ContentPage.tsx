import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/content";
import { generateArticleSchema } from "@/lib/jsonld";
import { MDXRenderer } from "./MDXRenderer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Sidebar } from "@/components/layout/Sidebar";

interface ContentPageProps {
  category: string;
  slug: string;
  parentLabel: string;
  parentHref: string;
}

export function ContentPage({
  category,
  slug,
  parentLabel,
  parentHref,
}: ContentPageProps) {
  const item = getContentBySlug(category, slug);
  if (!item) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    url: `/${category}/${slug}`,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Početna", href: "/" },
          { label: parentLabel, href: parentHref },
          { label: item.frontmatter.title },
        ]}
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            {item.frontmatter.title}
          </h1>
          {item.frontmatter.description && (
            <p className="mt-3 text-lg text-text-secondary">
              {item.frontmatter.description}
            </p>
          )}
          <div className="mt-8">
            <MDXRenderer source={item.content} />
          </div>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}
