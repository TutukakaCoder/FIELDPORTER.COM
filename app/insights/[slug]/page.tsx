import { ArticleLayout } from "@/components/insights";
import { ARTICLE_BODIES } from "@/components/insights/article-bodies";
import { InsightArticleJsonLd } from "@/components/insights/insight-article-json-ld";
import {
  getInsightArticle,
  INSIGHTS_ARTICLES,
  toPublishedTime,
} from "@/config/insights-articles";
import { pageSocial } from "@/lib/social-metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface InsightArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INSIGHTS_ARTICLES.map((article) => ({ slug: article.id }));
}

/** Unknown insight slugs must 404 (not soft-render 200 + not-found UI). */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: InsightArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightArticle(slug);

  if (!article) {
    return {
      title: "Page not found",
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [
      article.category,
      "FIELDPORTER insights",
      "AI strategy",
      "business automation",
      "custom software",
    ],
    ...pageSocial({
      title: article.title,
      description: article.excerpt,
      path: `/insights/${article.id}`,
      type: "article",
      alt: article.title,
      publishedTime: toPublishedTime(article.publishDate),
      authors: [article.author],
    }),
    robots: { index: true, follow: true },
  };
}

export default async function InsightArticlePage({
  params,
}: InsightArticlePageProps) {
  const { slug } = await params;
  const article = getInsightArticle(slug);
  const body = ARTICLE_BODIES[slug];

  if (!article || !body) {
    notFound();
  }

  return (
    <>
      <InsightArticleJsonLd article={article} />
      <ArticleLayout
        article={{
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          category: article.category,
          author: article.author,
          publishDate: article.publishDate,
          readTime: article.readTime,
          featured: article.featured,
        }}
      >
        {body}
      </ArticleLayout>
    </>
  );
}
