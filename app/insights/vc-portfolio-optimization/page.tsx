import { ArticleLayout } from "@/components/insights/article-layout";
import { getInsightArticle, toPublishedTime } from "@/config/insights-articles";
import { Metadata } from "next";

const articleData = getInsightArticle("vc-portfolio-optimization")!;

export const metadata: Metadata = {
  title: `${articleData.title} | FIELDPORTER`,
  description:
    "A practical operating model for VCs and portfolio operators to improve post-investment execution through AI, automation, and better performance metrics.",
  keywords: [
    "VC portfolio optimization",
    "post-investment value creation",
    "portfolio company automation",
    "venture capital operations",
    "AI for portfolio companies",
    "operational excellence framework",
  ],
  openGraph: {
    title: articleData.title,
    description:
      "When capital is tighter, portfolio value comes from operations. Use this framework to improve execution quality across portfolio companies.",
    type: "article",
    url: `https://fieldporter.com/insights/${articleData.id}`,
    publishedTime: toPublishedTime(articleData.publishDate),
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VC Portfolio Optimization - FIELDPORTER Insights",
      },
    ],
  },
  authors: [{ name: articleData.author }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `https://fieldporter.com/insights/${articleData.id}`,
  },
};

export default function VCPortfolioOptimizationPage() {
  return (
    <ArticleLayout article={articleData}>
      <div className="prose prose-lg prose-invert max-w-none">
        <p className="text-xl text-fieldporter-gray leading-relaxed mb-8">
          In tougher venture markets, post-investment operations matter more
          than narrative. Winning funds now help portfolio teams execute faster,
          cleaner, and with clearer metrics.
        </p>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          Why this changed
        </h2>

        <ul>
          <li>
            Exit windows are less predictable, so internal efficiency and margin
            quality carry more weight.
          </li>
          <li>
            Portfolio support has shifted from introductions and strategy decks
            to operator-level execution help.
          </li>
          <li>
            AI and automation now matter most when they improve company-level
            KPIs, not when they create isolated demos.
          </li>
        </ul>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          A portfolio operating system for value creation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              1) Standardize the baseline
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Use one KPI pack across companies: growth, burn, margin, cycle
              time, and automation impact.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              2) Prioritize by bottleneck
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Focus on one constrained workflow per company each quarter.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              3) Build reusable plays
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Turn successful fixes into templates usable across the portfolio.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              4) Review monthly with operators
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Track execution quality, not just high-level board metrics.
            </p>
          </div>
        </div>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          The KPI stack that actually helps
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 my-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 text-fieldporter-blue font-semibold">
                  Category
                </th>
                <th className="text-left py-3 text-fieldporter-blue font-semibold">
                  KPI
                </th>
                <th className="text-left py-3 text-fieldporter-blue font-semibold">
                  Why it matters
                </th>
              </tr>
            </thead>
            <tbody className="text-fieldporter-gray">
              <tr className="border-b border-white/10">
                <td className="py-3 font-medium">Capital efficiency</td>
                <td className="py-3">Net burn and runway</td>
                <td className="py-3">
                  Shows execution pace relative to available cash.
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 font-medium">Commercial quality</td>
                <td className="py-3">CAC payback and gross margin</td>
                <td className="py-3">
                  Indicates whether growth is financially healthy.
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 font-medium">Operational speed</td>
                <td className="py-3">Cycle time by core workflow</td>
                <td className="py-3">
                  Exposes process drag and unlocks faster execution.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Automation impact</td>
                <td className="py-3">Hours reclaimed and error reduction</td>
                <td className="py-3">
                  Converts automation work into board-level value.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          Sources
        </h2>

        <ul>
          <li>
            <a
              href="https://nvca.org/wp-content/uploads/2025/01/Q4-2024-PitchBook-NVCA-Venture-Monitor.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              PitchBook and NVCA - Venture Monitor
            </a>
          </li>
          <li>
            <a
              href="https://www.gwc.vc/insights/the-operator-advantage-in-venture-capital"
              target="_blank"
              rel="noopener noreferrer"
            >
              GWC - The Operator Advantage in Venture Capital
            </a>
          </li>
          <li>
            <a
              href="https://www.bcg.com/publications/2024/wheres-value-in-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              BCG - Where's the Value in AI?
            </a>
          </li>
          <li>
            <a
              href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              McKinsey - The state of AI in early 2024
            </a>
          </li>
        </ul>

        <div className="bg-gradient-to-r from-green-500/20 to-fieldporter-blue/20 border border-green-500/30 rounded-lg p-8 my-12 text-center">
          <h3 className="text-heading-lg font-semibold text-fieldporter-white mb-4">
            Need operator-level portfolio support?
          </h3>
          <p className="text-fieldporter-gray mb-6 max-w-2xl mx-auto">
            FIELDPORTER helps funds and portfolio leaders deploy repeatable AI
            and automation plays that improve execution quality and measurable
            outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-500/80 text-white font-medium rounded-lg btn-article-cta"
            >
              Schedule Strategic Consultation
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-green-500 text-green-500 hover:bg-green-500/10 font-medium rounded-lg btn-article-cta"
            >
              Portfolio Optimization Services
            </a>
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
}
