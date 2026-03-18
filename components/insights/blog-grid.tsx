"use client";

import { INSIGHTS_ARTICLES } from "@/config/insights-articles";
import { EXTERNAL_INSIGHT_RESOURCES } from "@/config/insights-resources";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

export function BlogGrid() {
  const articles = INSIGHTS_ARTICLES;

  const featuredArticles = articles.filter((article) => article.featured);
  const regularArticles = articles.filter((article) => !article.featured);
  const groupedResources = ["AI Strategy", "Automation", "VC Operations"].map(
    (category) => ({
      category,
      items: EXTERNAL_INSIGHT_RESOURCES.filter((r) => r.category === category),
    }),
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI Strategy":
        return "bg-fieldporter-blue/20 text-fieldporter-blue border-fieldporter-blue/30";
      case "Business Automation":
        return "bg-fieldporter-blue/20 text-fieldporter-blue border-fieldporter-blue/30";
      case "VC Insights":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Implementation":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-fieldporter-gray/20 text-fieldporter-gray border-fieldporter-gray/30";
    }
  };

  return (
    <section id="latest-insights" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-primary" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-12 space-y-4 text-center sm:mb-14"
        >
          <h2 className="text-display-sm md:text-display-md font-bold text-fieldporter-white">
            Latest
            <span className="text-fieldporter-blue"> Insights</span>
          </h2>
          <p className="text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed">
            Practical FIELDPORTER articles plus curated external reads worth
            your time.
          </p>
        </motion.div>

        {featuredArticles.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <h3 className="mb-6 text-heading-lg font-semibold text-fieldporter-white sm:mb-8">
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Link href={`/insights/${article.id}`}>
                    <GlassCard className="group h-full cursor-pointer p-7 transition-all duration-300 hover:border-fieldporter-blue/30 hover:shadow-lg hover:shadow-fieldporter-blue/10">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(article.category)} transition-colors duration-300`}
                          >
                            {article.category}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-fieldporter-blue/20 text-fieldporter-blue rounded border border-fieldporter-blue/30 group-hover:bg-fieldporter-blue/30 transition-colors duration-300">
                            Featured
                          </span>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-heading-lg font-semibold text-fieldporter-white group-hover:text-fieldporter-blue transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-body-md text-fieldporter-gray leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-body-sm text-fieldporter-gray">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 group-hover:text-white/70 transition-colors duration-300">
                              <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1 group-hover:text-white/70 transition-colors duration-300">
                              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                              <span>
                                {new Date(
                                  article.publishDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 group-hover:text-white/70 transition-colors duration-300">
                            <Clock className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-fieldporter-blue group-hover:text-blue-400 transition-colors duration-300">
                          <span className="text-body-sm font-medium">
                            Read Article
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6 sm:space-y-8">
          <h3 className="text-heading-lg font-semibold text-fieldporter-white">
            All Articles
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="h-full"
              >
                <Link href={`/insights/${article.id}`}>
                  <GlassCard className="group h-full cursor-pointer p-6 transition-all duration-300 hover:border-fieldporter-blue/25 hover:shadow-md hover:shadow-fieldporter-blue/10">
                    <div className="space-y-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(article.category)} transition-colors duration-300`}
                      >
                        {article.category}
                      </span>

                      <div className="space-y-3">
                        <h4 className="text-heading-md font-semibold text-fieldporter-white group-hover:text-fieldporter-blue transition-colors duration-300">
                          {article.title}
                        </h4>
                        <p className="text-body-sm text-fieldporter-gray leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors duration-300">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-body-xs text-fieldporter-gray pt-2 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
                        <div className="flex items-center space-x-1 group-hover:text-white/60 transition-colors duration-300">
                          <Calendar className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                          <span>
                            {new Date(article.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 group-hover:text-white/60 transition-colors duration-300">
                          <Clock className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="recommended-reading" className="pt-14 sm:pt-16">
          <h3 className="mb-6 text-heading-lg font-semibold text-fieldporter-white sm:mb-8">
            Recommended Reading from the Internet
          </h3>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {groupedResources.map((group) => (
              <GlassCard key={group.category} className="p-6">
                <h4 className="mb-4 text-base font-semibold text-fieldporter-white">
                  {group.category}
                </h4>
                <div className="space-y-4">
                  {group.items.map((resource) => (
                    <a
                      key={resource.href}
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-fieldporter-blue/30"
                    >
                      <p className="text-sm font-medium text-fieldporter-white group-hover:text-fieldporter-blue">
                        {resource.title}
                      </p>
                      <p className="mt-1 text-xs text-fieldporter-blue">
                        {resource.source}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-fieldporter-gray">
                        {resource.note}
                      </p>
                    </a>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="pt-14 text-center sm:pt-16"
        >
          <motion.div
            className="mx-auto max-w-2xl rounded-xl border border-white/10 p-8 glass-dark transition-all duration-300 hover:border-fieldporter-blue/30 hover:shadow-lg hover:shadow-fieldporter-blue/10"
            whileHover={{ y: -2 }}
          >
            <h3 className="text-heading-lg font-semibold text-fieldporter-white mb-4">
              Get New Articles in Your Inbox
            </h3>
            <p className="text-body-md text-fieldporter-gray mb-6">
              We publish insights from our AI implementations and business
              building. Subscribe to be notified of new articles.
            </p>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="primary"
                size="enterprise"
                className="group focus-visible:ring-2 focus-visible:ring-fieldporter-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                onClick={() => {
                  // Scroll to newsletter signup
                  document
                    .getElementById("newsletter-signup")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Subscribe for Updates
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
