import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllContent } from "@/lib/content";
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

  const allItems = getAllContent(category);
  const related = allItems
    .filter((i) => i.slug !== slug)
    .slice(0, 6);

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
          {related.length > 0 && (
            <nav className="mt-12 border-t border-border pt-8">
              <h2 className="text-xl font-bold">Povezani clanci</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${category}/${r.slug}`}
                    className="rounded-xl border border-border bg-surface p-4 transition-all hover:border-primary/50 hover:bg-surface-hover"
                  >
                    <span className="font-semibold text-text-primary">
                      {r.frontmatter.title}
                    </span>
                    {r.frontmatter.description && (
                      <p className="mt-1 text-sm text-text-muted line-clamp-2">
                        {r.frontmatter.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </nav>
          )}
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
