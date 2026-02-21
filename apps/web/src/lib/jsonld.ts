const BASE_URL = "https://astropedija.com";

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Astropedija",
    url: BASE_URL,
    description: "Enciklopedija astrologije - besplatni kalkulatori, natalne karte, horoskop i sve o zvezdama.",
    inLanguage: "sr",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/pretraga?q={search_term_string}`,
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
    url: `${BASE_URL}${params.url}`,
    inLanguage: "sr",
    publisher: {
      "@type": "Organization",
      name: "Astropedija",
      url: BASE_URL,
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
