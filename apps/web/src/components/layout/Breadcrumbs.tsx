import Link from "next/link";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/* ------------------------------------------------------------------ */
/*  Breadcrumbs (Server Component)                                     */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build JSON-LD structured data for breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${brand.url}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Navigacione mrvice" className="mb-6">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {/* Home is always first */}
        <li className="flex items-center gap-1">
          <Link
            href="/"
            className="text-text-muted transition-colors duration-150 hover:text-primary"
          >
            Pocetna
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {/* Separator — chevron instead of > for better readability */}
              <svg
                className="h-3.5 w-3.5 shrink-0 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>

              {isLast || !item.href ? (
                <span
                  className={cn(
                    "text-text-secondary",
                    isLast && "font-medium text-text-primary",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-text-muted transition-colors duration-150 hover:text-primary"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
