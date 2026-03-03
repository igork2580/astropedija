import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllContent, getAllSlugs } from "@/lib/content";
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

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const houseNumToSlug: Record<number, string> = {
  1: "prva-kuca", 2: "druga-kuca", 3: "treca-kuca", 4: "cetvrta-kuca",
  5: "peta-kuca", 6: "sesta-kuca", 7: "sedma-kuca", 8: "osma-kuca",
  9: "deveta-kuca", 10: "deseta-kuca", 11: "jedanaesta-kuca", 12: "dvanaesta-kuca",
};

/** Find slugs in a category that start with a prefix (e.g., "sunce-u-" in planete-po-znakovima). */
function findSlugsStartingWith(category: string, prefix: string, limit: number): string[] {
  return getAllSlugs(category).filter((s) => s.startsWith(prefix)).slice(0, limit);
}

/** Cross-category link suggestions based on actual existing content slugs. */
function getCrossLinks(
  category: string,
  slug: string,
  frontmatter: Record<string, unknown>,
): { href: string; label: string }[] {
  const links: { href: string; label: string }[] = [];

  if (category === "znakovi") {
    // Sign page → find actual planet-in-sign articles containing this sign slug
    const signSlug = slug;
    for (const planet of ["sunce", "mesec", "merkur", "venera"]) {
      const matches = findSlugsStartingWith("planete-po-znakovima", `${planet}-u-`, 12);
      const match = matches.find((s) => s.includes(signSlug));
      if (match) {
        const item = getContentBySlug("planete-po-znakovima", match);
        links.push({ href: `/planete-po-znakovima/${match}`, label: item?.frontmatter.title || `${cap(planet)} u ${cap(signSlug)}` });
      }
    }
    // Podznak link (same slug pattern as znakovi)
    links.push({ href: `/podznak/${signSlug}`, label: `Podznak ${String(frontmatter.title || cap(signSlug))}` });
    // Love horoscope — find any that start with this sign
    const loveMatches = findSlugsStartingWith("ljubavni-horoskop", `${signSlug}-i-`, 1);
    if (loveMatches.length > 0) {
      links.push({ href: `/ljubavni-horoskop/${loveMatches[0]}`, label: `Ljubavna kompatibilnost` });
    }
  } else if (category === "planete") {
    // Planet page → find planet-in-sign articles for this planet
    const planetSlug = slug;
    const matches = findSlugsStartingWith("planete-po-znakovima", `${planetSlug}-u-`, 4);
    for (const match of matches) {
      const item = getContentBySlug("planete-po-znakovima", match);
      links.push({ href: `/planete-po-znakovima/${match}`, label: item?.frontmatter.title || match });
    }
    // Also link to planet-in-house articles
    const houseMatches = findSlugsStartingWith("planete-po-kucama", `${planetSlug}-u-`, 2);
    for (const match of houseMatches) {
      const item = getContentBySlug("planete-po-kucama", match);
      links.push({ href: `/planete-po-kucama/${match}`, label: item?.frontmatter.title || match });
    }
  } else if (category === "planete-po-znakovima") {
    // Planet-in-sign → link back to planet and sign parent pages
    const planet = frontmatter.planet as string | undefined;
    const sign = frontmatter.sign as string | undefined;
    if (planet) links.push({ href: `/planete/${planet}`, label: `Planeta: ${cap(planet)}` });
    if (sign) links.push({ href: `/znakovi/${sign}`, label: `Znak: ${cap(sign)}` });
    // Link to same planet in houses
    if (planet) {
      const houseMatches = findSlugsStartingWith("planete-po-kucama", `${planet}-u-`, 2);
      for (const match of houseMatches) {
        const item = getContentBySlug("planete-po-kucama", match);
        links.push({ href: `/planete-po-kucama/${match}`, label: item?.frontmatter.title || match });
      }
    }
  } else if (category === "planete-po-kucama") {
    const planet = frontmatter.planet as string | undefined;
    const houseNum = frontmatter.house as number | undefined;
    if (planet) links.push({ href: `/planete/${planet}`, label: `Planeta: ${cap(planet)}` });
    if (houseNum) {
      const houseSlug = houseNumToSlug[houseNum];
      if (houseSlug) links.push({ href: `/kuce/${houseSlug}`, label: `${cap(houseSlug.replace(/-/g, " "))}` });
    }
  } else if (category === "kuce") {
    // House page → find house-by-sign articles matching this house
    const houseSlug = slug;
    // House slugs: "prva-kuca" → kuce-po-znakovima uses "1-kuca-u-..."
    // Extract number from slug for matching
    const houseNumMap: Record<string, string> = {
      "prva-kuca": "1-kuca", "druga-kuca": "2-kuca", "treca-kuca": "3-kuca",
      "cetvrta-kuca": "4-kuca", "peta-kuca": "5-kuca", "sesta-kuca": "6-kuca",
      "sedma-kuca": "7-kuca", "osma-kuca": "8-kuca", "deveta-kuca": "9-kuca",
      "deseta-kuca": "10-kuca", "jedanaesta-kuca": "11-kuca", "dvanaesta-kuca": "12-kuca",
    };
    const prefix = houseNumMap[houseSlug];
    if (prefix) {
      const matches = findSlugsStartingWith("kuce-po-znakovima", `${prefix}-u-`, 4);
      for (const match of matches) {
        const item = getContentBySlug("kuce-po-znakovima", match);
        links.push({ href: `/kuce-po-znakovima/${match}`, label: item?.frontmatter.title || match });
      }
    }
  } else if (category === "kuce-po-znakovima") {
    const houseNum = frontmatter.house as number | undefined;
    const sign = frontmatter.sign as string | undefined;
    if (houseNum) {
      const houseSlug = houseNumToSlug[houseNum];
      if (houseSlug) links.push({ href: `/kuce/${houseSlug}`, label: `${cap(houseSlug.replace(/-/g, " "))}` });
    }
    if (sign) links.push({ href: `/znakovi/${sign}`, label: `Znak: ${cap(sign)}` });
  } else if (category === "ljubavni-horoskop") {
    // Love horoscope → link to both sign pages
    const parts = slug.split("-i-");
    if (parts.length === 2) {
      links.push({ href: `/znakovi/${parts[0]}`, label: cap(parts[0]) });
      links.push({ href: `/znakovi/${parts[1]}`, label: cap(parts[1]) });
    }
  }

  return links.slice(0, 6);
}

/** Score related content by word overlap in title/description instead of random order. */
function getSemanticRelated(
  allItems: { slug: string; frontmatter: { title: string; description: string; [key: string]: unknown } }[],
  currentSlug: string,
  currentFrontmatter: { title: string; description: string; [key: string]: unknown },
  limit: number = 6,
) {
  const currentWords = new Set(
    `${currentFrontmatter.title} ${currentFrontmatter.description}`
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3),
  );

  return allItems
    .filter((i) => i.slug !== currentSlug)
    .map((item) => {
      const words = `${item.frontmatter.title} ${item.frontmatter.description}`
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 3);
      const overlap = words.filter((w) => currentWords.has(w)).length;
      // Boost items sharing the same element/ruler/planet/sign
      let bonus = 0;
      for (const key of ["element", "ruler", "planet", "sign", "quality"]) {
        if (currentFrontmatter[key] && currentFrontmatter[key] === item.frontmatter[key]) {
          bonus += 3;
        }
      }
      return { ...item, score: overlap + bonus };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
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
  // Safe: JSON-LD generated from trusted internal frontmatter, not user input
  const schemaJson = JSON.stringify(articleSchema);

  const allItems = getAllContent(category);
  const related = getSemanticRelated(allItems, slug, item.frontmatter, 6);
  const crossLinks = getCrossLinks(category, slug, item.frontmatter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
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
          <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
            <span>Objavljeno: februar 2026</span>
            <span>·</span>
            <span>AstroPut redakcija</span>
          </div>
          <div className="mt-8">
            <MDXRenderer source={item.content} />
          </div>

          {/* Cross-category links */}
          {crossLinks.length > 0 && (
            <nav className="mt-10 border-t border-border pt-6">
              <h2 className="text-lg font-bold">Istražite dalje</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {crossLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm transition-all hover:border-primary/50 hover:bg-surface-hover"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}

          {/* Related articles from same category */}
          {related.length > 0 && (
            <nav className="mt-10 border-t border-border pt-6">
              <h2 className="text-xl font-bold">Povezani članci</h2>
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
