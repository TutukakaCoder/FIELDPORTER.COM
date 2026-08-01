"use client";

import {
  INSIGHTS_ARTICLES,
  formatPublishDate,
  type InsightArticleMeta,
} from "@/config/insights-articles";
import { EXTERNAL_INSIGHT_RESOURCES } from "@/config/insights-resources";
import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const RESOURCE_CATEGORIES = ["AI Strategy", "Automation", "VC Operations"];

function getCategoryColor(category: string) {
  switch (category) {
    case "AI Strategy":
    case "Custom Software":
      return "bg-fieldporter-blue/15 text-fieldporter-blue border-fieldporter-blue/25";
    case "Business Automation":
    case "VC Insights":
      return "bg-green-500/15 text-green-500 dark:text-green-400 border-green-500/25";
    case "Implementation":
      return "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/25";
    default:
      return "bg-fieldporter-gray/15 text-fieldporter-gray border-fieldporter-gray/25";
  }
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(category)}`}
    >
      {category}
    </span>
  );
}

function ArticleMeta({ article }: { article: InsightArticleMeta }) {
  return (
    <span className="text-body-xs text-fieldporter-gray">
      {formatPublishDate(article.publishDate)} · {article.readTime}
    </span>
  );
}

export function BlogGrid() {
  const [leadArticle, ...restArticles] = [...INSIGHTS_ARTICLES].sort((a, b) =>
    b.publishDate.localeCompare(a.publishDate),
  );

  const groupedResources = RESOURCE_CATEGORIES.map((category) => ({
    category,
    items: EXTERNAL_INSIGHT_RESOURCES.filter((r) => r.category === category),
  }));

  return (
    <section id="latest-insights" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-primary" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-10 space-y-3"
        >
          <h2 className="text-display-sm md:text-display-md font-bold text-gray-900 dark:text-white">
            Latest
            <span className="text-fieldporter-blue"> Insights</span>
          </h2>
          <p className="text-body-lg text-fieldporter-gray max-w-2xl leading-relaxed">
            Practical FIELDPORTER articles plus curated external reads worth
            your time.
          </p>
        </motion.div>

        {leadArticle && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link href={`/insights/${leadArticle.id}`} className="block">
              <GlassCard className="group p-7 sm:p-8 transition-colors duration-300 hover:border-fieldporter-blue/30">
                <div className="flex flex-wrap items-center gap-3">
                  <CategoryTag category={leadArticle.category} />
                  <span className="text-body-xs font-medium uppercase tracking-wide text-fieldporter-blue">
                    Latest
                  </span>
                </div>

                <h3 className="mt-4 text-heading-lg sm:text-heading-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-fieldporter-blue">
                  {leadArticle.title}
                </h3>
                <p className="mt-3 max-w-3xl text-body-md leading-relaxed text-fieldporter-gray">
                  {leadArticle.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <ArticleMeta article={leadArticle} />
                  <span className="inline-flex items-center text-body-sm font-medium text-fieldporter-blue">
                    Read article
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        )}

        {restArticles.length > 0 && (
          <div>
            <h3 className="mb-4 text-body-sm font-semibold uppercase tracking-wide text-fieldporter-gray">
              More articles
            </h3>

            <GlassCard className="divide-y divide-gray-900/10 dark:divide-white/10 p-0">
              {restArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.id}`}
                  className="group flex flex-col gap-2 p-5 transition-colors duration-300 hover:bg-gray-900/[0.03] dark:hover:bg-white/[0.04] sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-6"
                >
                  <div className="min-w-0 space-y-2">
                    <CategoryTag category={article.category} />
                    <h4 className="text-heading-md font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-fieldporter-blue">
                      {article.title}
                    </h4>
                    <p className="line-clamp-2 text-body-sm leading-relaxed text-fieldporter-gray">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2 sm:pt-1">
                    <ArticleMeta article={article} />
                    <ArrowRight className="h-4 w-4 text-fieldporter-blue transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </GlassCard>
          </div>
        )}

        <div id="recommended-reading" className="pt-14 sm:pt-16">
          <h3 className="text-heading-lg font-semibold text-gray-900 dark:text-white">
            Recommended reading
          </h3>
          <p className="mt-2 text-body-sm text-fieldporter-gray">
            External research we return to when advising on AI and automation
            decisions.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {groupedResources.map((group) => (
              <div key={group.category}>
                <h4 className="mb-3 text-body-xs font-semibold uppercase tracking-wide text-fieldporter-gray">
                  {group.category}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((resource) => (
                    <li key={resource.href}>
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-3 rounded-lg border border-gray-900/10 dark:border-white/10 px-4 py-3 transition-colors hover:border-fieldporter-blue/30 hover:bg-gray-900/[0.03] dark:hover:bg-white/[0.04]"
                      >
                        <span className="min-w-0">
                          <span className="block text-body-sm font-medium text-gray-900 dark:text-white group-hover:text-fieldporter-blue">
                            {resource.title}
                          </span>
                          <span className="mt-1 block text-body-xs text-fieldporter-gray">
                            {resource.source}
                          </span>
                        </span>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-fieldporter-gray transition-colors group-hover:text-fieldporter-blue" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
