import { brand } from "./brand";

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.url,
    description: brand.shortDescription,
    inLanguage: brand.language,
    publisher: generateOrganizationSchema(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${brand.url}/znakovi?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@type": "Organization",
    name: brand.name,
    url: brand.url,
    logo: {
      "@type": "ImageObject",
      url: `${brand.url}/icons/icon-512x512.svg`,
    },
    sameAs: [],
  };
}

export function generateSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: brand.name,
    url: brand.url,
    description: brand.shortDescription,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RSD",
    },
    inLanguage: brand.language,
    author: generateOrganizationSchema(),
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
    image: `${brand.url}/opengraph-image`,
    author: generateOrganizationSchema(),
    publisher: generateOrganizationSchema(),
    datePublished: params.datePublished || "2026-02-15",
    dateModified: params.dateModified || new Date().toISOString().split("T")[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${brand.url}${params.url}`,
    },
  };
}

export function generateFAQSchema(
  questions: { question: string; answer: string }[],
) {
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

export function generateHoroscopeSchema(params: {
  signName: string;
  type: "dnevni" | "nedeljni" | "mesecni";
  url: string;
  description: string;
}) {
  const typeLabels = {
    dnevni: "Dnevni horoskop",
    nedeljni: "Nedeljni horoskop",
    mesecni: "Mesecni horoskop",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${typeLabels[params.type]} - ${params.signName}`,
    description: params.description,
    url: `${brand.url}${params.url}`,
    inLanguage: brand.language,
    image: `${brand.url}/opengraph-image`,
    author: generateOrganizationSchema(),
    publisher: generateOrganizationSchema(),
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${brand.url}${params.url}`,
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: `${brand.url}${item.url}` } : {}),
    })),
  };
}

export function generateCalculatorSchema(params: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: params.name,
    description: params.description,
    url: `${brand.url}${params.url}`,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RSD",
    },
    inLanguage: brand.language,
    author: generateOrganizationSchema(),
  };
}
