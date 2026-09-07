import { siteConfig } from "@/lib/site";

type JsonLdProps = { data: Record<string, unknown> };

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
} as const;

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.tagline,
  author: { "@type": "Person", name: siteConfig.name },
} as const;

export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    keywords: input.tags?.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${input.slug}`,
    },
    url: `${siteConfig.url}/blog/${input.slug}`,
  };
}
