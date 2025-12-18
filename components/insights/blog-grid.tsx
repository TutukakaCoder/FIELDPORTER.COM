"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  featured: boolean;
}

export function BlogGrid() {
  // Featured thought leadership articles
  const articles: Article[] = [
    {
      id: "why-ai-consulting-fails",
      title: "Why Most AI Consulting Fails (And How to Avoid It)",
      excerpt:
        "Over 80% of AI projects fail to deliver on their intended objectives. Learn the common pitfalls and our proven framework for ensuring AI consulting success.",
      category: "AI Strategy",
      author: "FIELDPORTER Team",
      publishDate: "2024-01-15",
      readTime: "12 min read",
      featured: true,
    },
    {
      id: "real-cost-not-automating",
      title: "The Real Cost of Not Automating Your Business Processes",
      excerpt:
        "Manual processes are silently draining your business daily. Learn how to quantify hidden costs and calculate automation ROI with our proven assessment framework.",
      category: "Business Automation",
      author: "FIELDPORTER Team",
      publishDate: "2024-01-10",
      readTime: "15 min read",
      featured: true,
    },
    {
      id: "vc-portfolio-optimization",
      title: "VC Portfolio Optimization: Beyond Due Diligence",
      excerpt:
        "Post-investment value creation through operational improvement has become the cornerstone of modern VC strategy. Learn our framework for driving portfolio company excellence.",
      category: "VC Insights",
      author: "FIELDPORTER Team",
      publishDate: "2024-01-05",
      readTime: "18 min read",
      featured: false,
    },
  ];

  const featuredArticles = articles.filter((article) => article.featured);
  const regularArticles = articles.filter((article) => !article.featured);

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
    <section id="blog-grid" className="py-20 lg:py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-primary" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-display-sm md:text-display-md font-bold text-fieldporter-white">
            Latest
            <span className="text-fieldporter-blue"> Insights</span>
          </h2>
          <p className="text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed">
            Practical insights from building AI companies and implementing
            strategies across diverse industries.
          </p>
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h3 className="text-heading-lg font-semibold text-fieldporter-white mb-8">
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="h-full"
                >
                  <Link href={`/insights/${article.id}`}>
                    <GlassCard className="p-8 h-full transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-fieldporter-blue/20 hover:border-fieldporter-blue/30">
                      <div className="space-y-6">
                        {/* Category & Meta */}
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

                        {/* Content */}
                        <div className="space-y-4">
                          <h3 className="text-heading-lg font-semibold text-fieldporter-white group-hover:text-fieldporter-blue transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-body-md text-fieldporter-gray leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Meta Info */}
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

                        {/* Read More */}
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

        {/* Regular Articles Grid */}
        <div className="space-y-8">
          <h3 className="text-heading-lg font-semibold text-fieldporter-white">
            All Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="h-full"
              >
                <Link href={`/insights/${article.id}`}>
                  <GlassCard className="p-6 h-full transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-fieldporter-blue/15 hover:border-fieldporter-blue/25">
                    <div className="space-y-4">
                      {/* Category */}
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(article.category)} transition-colors duration-300`}
                      >
                        {article.category}
                      </span>

                      {/* Content */}
                      <div className="space-y-3">
                        <h4 className="text-heading-md font-semibold text-fieldporter-white group-hover:text-fieldporter-blue transition-colors duration-300">
                          {article.title}
                        </h4>
                        <p className="text-body-sm text-fieldporter-gray leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors duration-300">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Meta Info */}
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

        {/* Load More / Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pt-16"
        >
          <motion.div
            className="p-8 rounded-xl glass-dark border border-white/10 max-w-2xl mx-auto hover:border-fieldporter-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-fieldporter-blue/10"
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <h3 className="text-heading-lg font-semibold text-fieldporter-white mb-4">
              More Insights Coming Soon
            </h3>
            <p className="text-body-md text-fieldporter-gray mb-6">
              We&apos;re constantly sharing new insights from our AI
              implementations and business building experiences.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
