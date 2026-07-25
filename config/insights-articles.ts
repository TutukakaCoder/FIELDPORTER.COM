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
    id: "from-ai-pilot-to-production",
    title: "From AI Pilot to Production: Why Most Teams Stall",
    excerpt:
      "Nearly nine in ten companies use AI somewhere. Far fewer redesign workflows enough to move EBIT. Here is a practical path from demo to durable production value.",
    category: "AI Strategy",
    author: "FIELDPORTER Team",
    publishDate: "2026-07-18",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "build-vs-buy-ai-agents",
    title: "Build vs Buy AI Agents in 2026: A Decision Framework",
    excerpt:
      "Packaged agent platforms are fast. Custom agents win on unit economics and control at scale. Use this framework before you commit budget.",
    category: "Implementation",
    author: "FIELDPORTER Team",
    publishDate: "2026-07-02",
    readTime: "9 min read",
    featured: true,
  },
  {
    id: "when-custom-software-wins",
    title: "When Custom Software Beats Another SaaS Seat",
    excerpt:
      "Generic tools are fine until your workflow is the product. We cover the signals that custom portals and internal tools pay for themselves.",
    category: "Custom Software",
    author: "FIELDPORTER Team",
    publishDate: "2026-06-12",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "automation-that-pays-back",
    title: "Automation That Pays Back: Prioritize by Margin, Not Noise",
    excerpt:
      "Not every process deserves a bot. Score work by volume, error cost, and cycle time so automation funding follows real margin, not shiny demos.",
    category: "Business Automation",
    author: "FIELDPORTER Team",
    publishDate: "2026-05-20",
    readTime: "8 min read",
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
