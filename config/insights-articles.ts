/** Single source of truth for Insights article metadata. Dates and copy here so they stay consistent across grid, layout, and metadata. */

export interface InsightArticleMeta {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  /** YYYY-MM-DD. Used for display and openGraph publishedTime (append T00:00:00.000Z). */
  publishDate: string;
  readTime: string;
  featured: boolean;
}

export const INSIGHTS_ARTICLES: InsightArticleMeta[] = [
  {
    id: "why-ai-consulting-fails",
    title: "Why Most AI Consulting Fails (And How to Avoid It)",
    excerpt:
      "Most AI work does not fail because of the model. It fails on problem selection, ownership, and operating change. Here is a practical framework to avoid that.",
    category: "AI Strategy",
    author: "FIELDPORTER Team",
    publishDate: "2025-01-15",
    readTime: "9 min read",
    featured: true,
  },
  {
    id: "real-cost-not-automating",
    title: "The Real Cost of Not Automating Your Business Processes",
    excerpt:
      "Manual work drains margin in ways most dashboards miss. We break down the true cost and show a simple method to prioritize automation by impact.",
    category: "Business Automation",
    author: "FIELDPORTER Team",
    publishDate: "2025-01-10",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: "vc-portfolio-optimization",
    title: "VC Portfolio Optimization: Beyond Due Diligence",
    excerpt:
      "When markets tighten, portfolio outcomes depend on operating execution. This guide covers the metrics and operating model that create measurable value after investment.",
    category: "VC Insights",
    author: "FIELDPORTER Team",
    publishDate: "2025-01-05",
    readTime: "9 min read",
    featured: false,
  },
];

export function getInsightArticle(id: string): InsightArticleMeta | undefined {
  return INSIGHTS_ARTICLES.find((a) => a.id === id);
}

/** For openGraph publishedTime. */
export function toPublishedTime(publishDate: string): string {
  return `${publishDate}T00:00:00.000Z`;
}
