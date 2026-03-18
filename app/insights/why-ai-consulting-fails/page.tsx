import { ArticleLayout } from "@/components/insights/article-layout";
import { getInsightArticle, toPublishedTime } from "@/config/insights-articles";
import { Metadata } from "next";

const articleData = getInsightArticle("why-ai-consulting-fails")!;

export const metadata: Metadata = {
  title: `${articleData.title} | FIELDPORTER`,
  description:
    "A practical guide to why AI consulting projects fail in execution, and how to structure ownership, scope, and operating change so AI creates measurable value.",
  keywords: [
    "AI consulting failures",
    "AI project success rate",
    "AI implementation framework",
    "AI consulting best practices",
    "AI strategy consulting",
    "enterprise AI transformation",
  ],
  openGraph: {
    title: articleData.title,
    description:
      "Most AI projects fail in the last mile between pilot and operations. Use this execution framework to improve your AI outcomes.",
    type: "article",
    url: `https://fieldporter.com/insights/${articleData.id}`,
    publishedTime: toPublishedTime(articleData.publishDate),
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Why Most AI Consulting Fails - FIELDPORTER Insights",
      },
    ],
  },
  authors: [{ name: articleData.author }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function WhyAIConsultingFailsPage() {
  return (
    <ArticleLayout article={articleData}>
      <div className="prose prose-lg prose-invert max-w-none">
        <p className="text-xl text-fieldporter-gray leading-relaxed mb-8">
          AI consulting does not usually fail because the model is weak. It
          fails because teams pick unclear use cases, skip operating design, and
          cannot move from pilot to production.
        </p>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          What the best research says
        </h2>

        <ul>
          <li>
            McKinsey reports AI adoption has moved fast, but many teams still
            struggle to convert pilots into business outcomes.
          </li>
          <li>
            BCG finds most companies are not yet scaling AI value across core
            operations.
          </li>
          <li>
            HBR frames the core problem as organizational: incentives,
            governance, and workflow redesign are often missing.
          </li>
        </ul>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          Root causes we see most often
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              1) Bad use-case selection
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Teams pick what is easy to demo, not what matters to revenue,
              margin, or cycle time.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              2) No process owner
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Without a named operator, AI stays in slide decks and experiments.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              3) Weak data contract
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Inputs are inconsistent, labels are unclear, and evaluation rules
              are missing.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <h3 className="text-heading-md font-semibold text-fieldporter-blue mb-2">
              4) No change plan
            </h3>
            <p className="text-fieldporter-gray text-sm">
              Workflows and incentives stay the same, so teams revert to old
              behavior.
            </p>
          </div>
        </div>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          A simple execution framework
        </h2>

        <ol>
          <li>
            <strong className="text-fieldporter-white">
              Tie each AI initiative to one business metric
            </strong>{" "}
            (for example: lead-to-close time, support resolution time, or gross
            margin).
          </li>
          <li>
            <strong className="text-fieldporter-white">
              Assign a business owner and technical owner
            </strong>{" "}
            before build starts.
          </li>
          <li>
            <strong className="text-fieldporter-white">
              Define acceptance tests early
            </strong>{" "}
            so production readiness is clear.
          </li>
          <li>
            <strong className="text-fieldporter-white">
              Launch in one workflow first
            </strong>{" "}
            and scale only after proving measurable lift.
          </li>
          <li>
            <strong className="text-fieldporter-white">
              Redesign roles and incentives
            </strong>{" "}
            as part of deployment, not as an afterthought.
          </li>
        </ol>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          Quick due-diligence questions for any AI partner
        </h2>

        <ul>
          <li>What exact business metric will move in 90 days?</li>
          <li>Who owns adoption after launch?</li>
          <li>What data quality assumptions are you making?</li>
          <li>
            How will you measure model and workflow quality in production?
          </li>
          <li>What breaks first when this scales to 10x volume?</li>
        </ul>

        <h2 className="text-heading-xl font-bold text-fieldporter-white mt-12 mb-6">
          Sources
        </h2>

        <ul>
          <li>
            <a
              href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              McKinsey - The state of AI in early 2024
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
              href="https://s.hbr.org/4oRKC8g"
              target="_blank"
              rel="noopener noreferrer"
            >
              Harvard Business Review - Most AI Initiatives Fail. This 5-Part
              Framework Can Help.
            </a>
          </li>
          <li>
            <a
              href="https://hai.stanford.edu/ai-index/2025-ai-index-report"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stanford HAI - 2025 AI Index
            </a>
          </li>
        </ul>

        <div className="bg-gradient-to-r from-fieldporter-blue/20 to-fieldporter-blue/20 border border-fieldporter-blue/30 rounded-lg p-8 my-12 text-center">
          <h3 className="text-heading-lg font-semibold text-fieldporter-white mb-4">
            Want an execution-first AI roadmap?
          </h3>
          <p className="text-fieldporter-gray mb-6 max-w-2xl mx-auto">
            FIELDPORTER helps teams move from AI pilots to production outcomes
            with clear ownership, stronger process design, and measurable value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-fieldporter-blue hover:bg-fieldporter-blue/80 text-white font-medium rounded-lg btn-article-cta"
            >
              Schedule Consultation
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-fieldporter-blue text-fieldporter-blue hover:bg-fieldporter-blue/10 font-medium rounded-lg btn-article-cta"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
}
