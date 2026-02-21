import { brand } from "./brand";

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.url,
    description: brand.shortDescription,
    inLanguage: brand.language,
    potentialAction: {
      "@type": "SearchAction",
      target: `${brand.url}/pretraga?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    url: `${brand.url}${params.url}`,
    inLanguage: brand.language,
    publisher: {
      "@type": "Organization",
      name: brand.name,
      url: brand.url,
    },
    datePublished: params.datePublished || "2026-01-01",
    dateModified: params.dateModified || new Date().toISOString().split("T")[0],
  };
}

export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
