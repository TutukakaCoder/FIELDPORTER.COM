import { ArticleLayout } from "@/components/insights";
import { ARTICLE_BODIES } from "@/components/insights/article-bodies";
import {
  getInsightArticle,
  INSIGHTS_ARTICLES,
  toPublishedTime,
} from "@/config/insights-articles";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface InsightArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INSIGHTS_ARTICLES.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: InsightArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightArticle(slug);

  if (!article) {
    return { title: "Article Not Found | FIELDPORTER" };
  }

  const url = `https://fieldporter.com/insights/${article.id}`;

  return {
    title: `${article.title} | FIELDPORTER Insights`,
    description: article.excerpt,
    keywords: [
      article.category,
      "FIELDPORTER insights",
      "AI strategy",
      "business automation",
      "custom software",
    ],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      publishedTime: toPublishedTime(article.publishDate),
      authors: [article.author],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: url },
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
    <ArticleLayout
      article={{
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
  );
}
