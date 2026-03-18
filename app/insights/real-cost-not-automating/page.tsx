import { ArticleLayout } from "@/components/insights/article-layout";
import { getInsightArticle, toPublishedTime } from "@/config/insights-articles";
import { Metadata } from "next";

const articleData = getInsightArticle("real-cost-not-automating")!;

export const metadata: Metadata = {
  title: `${articleData.title} | FIELDPORTER`,
  description:
    "A practical guide to quantifying the cost of manual work and prioritizing automation opportunities with clear ROI and operational impact.",
  keywords: [
    "business process automation",
    "automation ROI calculator",
    "manual process costs",
    "business efficiency",
    "process optimization",
    "automation assessment framework",
  ],
  openGraph: {
    title: articleData.title,
    description:
      "Manual processes create hidden cost in cycle time, errors, and delayed growth. Use this framework to prioritize automation by impact.",
    type: "article",
    url: `https://fieldporter.com/insights/${articleData.id}`,
    publishedTime: toPublishedTime(articleData.publishDate),
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Real Cost of Not Automating - FIELDPORTER Insights",
      },
    ],
  },
  authors: [{ name: articleData.author }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RealCostNotAutomatingPage() {
  return (
    <ArticleLayout article={articleData}>
      <div className="prose prose-lg prose-invert max-w-none">
        <p className="text-xl text-fieldporter-gray leading-relaxed mb-8">
          Most teams underestimate manual work because the cost is spread across
          many people and systems. The real loss is not just hours spent; it is
          slower decisions, more rework, and missed growth windows.
        </p>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          The true cost categories
        </h2>

        <ul>
          <li>
            <strong className="text-fieldporter-white">Time loss:</strong>{" "}
            repeated copy-paste, status chasing, and manual reconciliation.
          </li>
          <li>
            <strong className="text-fieldporter-white">Quality loss:</strong>{" "}
            avoidable errors and delayed correction.
          </li>
          <li>
            <strong className="text-fieldporter-white">Decision loss:</strong>{" "}
            reporting lags that slow leadership actions.
          </li>
          <li>
            <strong className="text-fieldporter-white">Growth loss:</strong>{" "}
            teams stay trapped in admin instead of customer-facing work.
          </li>
        </ul>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          Use this ROI-first prioritization model
        </h2>

        <div className="bg-fieldporter-blue/10 border border-fieldporter-blue/20 rounded-lg p-6 my-8 text-center">
          <h4 className="text-heading-md font-semibold text-fieldporter-blue mb-3">
            Practical ROI Formula
          </h4>
          <p className="text-lg font-mono text-fieldporter-white">
            ROI = ((annual value created - annual automation cost) / annual
            automation cost) x 100
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              Step 1: Map process baseline
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Track volume, cycle time, error rate, and hours consumed.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              Step 2: Estimate value
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Convert time reclaimed, rework reduced, and faster throughput into
              annual financial impact.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              Step 3: Score feasibility
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Prioritize high-volume, rules-based workflows with stable data.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              Step 4: Run a pilot
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Prove value in one workflow before scaling across teams.
            </p>
          </div>
        </div>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          Common mistakes to avoid
        </h2>

        <ul>
          <li>Automating broken processes without fixing flow design first.</li>
          <li>Measuring only labor savings and ignoring speed-to-revenue.</li>
          <li>Launching tools without process ownership and training.</li>
          <li>Skipping post-launch metrics and continuous tuning.</li>
        </ul>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          Sources
        </h2>

        <ul>
          <li>
            <a
              href="https://www2.deloitte.com/us/en/pages/advisory/articles/measuring-enterprise-automation-roi.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deloitte - Measuring automation ROI
            </a>
          </li>
          <li>
            <a
              href="https://www2.deloitte.com/us/en/insights/focus/technology-and-the-future-of-work/intelligent-automation-2022-survey-results.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deloitte - Intelligent automation survey
            </a>
          </li>
          <li>
            <a
              href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/"
              target="_blank"
              rel="noopener noreferrer"
            >
              World Economic Forum - Future of Jobs Report 2025
            </a>
          </li>
          <li>
            <a
              href="https://www.mckinsey.com/capabilities/operations/our-insights/gen-ai-in-corporate-functions-looking-beyond-efficiency-gains"
              target="_blank"
              rel="noopener noreferrer"
            >
              McKinsey - Gen AI in corporate functions
            </a>
          </li>
        </ul>

        <div className="bg-gradient-to-r from-fieldporter-blue/20 to-fieldporter-blue/20 border border-fieldporter-blue/30 rounded-lg p-8 my-12 text-center">
          <h3 className="text-heading-lg font-semibold text-fieldporter-white mb-4">
            Ready to prioritize automation by ROI?
          </h3>
          <p className="text-fieldporter-gray mb-6 max-w-2xl mx-auto">
            FIELDPORTER maps your highest-cost workflows, quantifies the value
            opportunity, and delivers practical automation plans your team can
            run.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-fieldporter-blue hover:bg-fieldporter-blue/80 text-white font-medium rounded-lg btn-article-cta"
            >
              Book Free Assessment
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-fieldporter-blue text-fieldporter-blue hover:bg-fieldporter-blue/10 font-medium rounded-lg btn-article-cta"
            >
              Our Automation Services
            </a>
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
}
