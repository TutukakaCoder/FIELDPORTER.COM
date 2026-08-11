import type { InsightArticleMeta } from "@/config/insights-articles";
import { toPublishedTime } from "@/config/insights-articles";
import { JsonLd, SCHEMA_IDS } from "@/lib/json-ld";
import { absoluteUrl, SOCIAL_IMAGE } from "@/lib/social-metadata";

type InsightArticleJsonLdProps = {
  article: InsightArticleMeta;
};

/** Article + BreadcrumbList for insight article pages only. */
export function InsightArticleJsonLd({ article }: InsightArticleJsonLdProps) {
  const articleUrl = absoluteUrl(`/insights/${article.id}`);
  const published = toPublishedTime(article.publishDate);

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: absoluteUrl("/insights"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  const articleSchema = {
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: published,
    dateModified: published,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@id": SCHEMA_IDS.organization,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: [absoluteUrl(SOCIAL_IMAGE.path)],
    inLanguage: "en-NZ",
  };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [breadcrumbList, articleSchema],
      }}
    />
  );
}
