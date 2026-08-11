"use client";

import { PageWrapper } from "@/components/layout";
import { InsightBreadcrumb } from "@/components/insights/insight-breadcrumb";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import {
  formatPublishDate,
  getInsightContextCta,
  getRelatedInsights,
} from "@/config/insights-articles";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Linkedin,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  featured?: boolean;
}

interface ArticleLayoutProps {
  article: Article;
  children: ReactNode;
}

export function ArticleLayout({ article, children }: ArticleLayoutProps) {
  const related = getRelatedInsights(article.id, 2);
  const contextCta = getInsightContextCta(article.category);
  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "ai strategy":
        return "bg-fieldporter-blue/20 text-fieldporter-blue border-fieldporter-blue/30";
      case "business automation":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "custom software":
        return "bg-fieldporter-blue/20 text-fieldporter-blue border-fieldporter-blue/30";
      case "vc insights":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "implementation":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-fieldporter-blue/20 text-fieldporter-blue border-fieldporter-blue/30";
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${article.title} - ${article.excerpt}`;

  const handleShare = (platform: "twitter" | "linkedin") => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    let shareLink = "";
    if (platform === "twitter") {
      shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    } else if (platform === "linkedin") {
      shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
  };

  return (
    <PageWrapper>
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <InsightBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: article.title },
            ]}
          />

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <GlassCard className="p-8 md:p-12 hover:border-fieldporter-blue/20 transition-all duration-300 hover:shadow-lg hover:shadow-fieldporter-blue/10">
              <div className="space-y-6">
                {/* Category & Featured Badge */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full border ${getCategoryStyle(article.category)}`}
                  >
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="px-3 py-1 text-sm font-medium bg-fieldporter-blue/20 text-fieldporter-blue rounded-full border border-fieldporter-blue/30">
                      Featured Article
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-display-sm md:text-display-md font-bold text-gray-900 dark:text-white leading-tight">
                  {article.title}
                </h1>

                {/* Excerpt */}
                <p className="text-body-lg text-fieldporter-gray leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-gray-900/10 dark:border-white/10">
                  <div className="flex items-center space-x-6 text-body-sm text-fieldporter-gray">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatPublishDate(article.publishDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center space-x-2">
                    <span className="text-body-sm text-fieldporter-gray mr-2">
                      Share:
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="fieldporter-ghost"
                        size="sm"
                        onClick={() => handleShare("twitter")}
                        className="p-2 hover:text-fieldporter-blue hover:bg-fieldporter-blue/10 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-fieldporter-blue"
                        aria-label="Share on X"
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="fieldporter-ghost"
                        size="sm"
                        onClick={() => handleShare("linkedin")}
                        className="p-2 hover:text-fieldporter-blue hover:bg-fieldporter-blue/10 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-fieldporter-blue"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-8 md:p-12 hover:border-gray-900/15 dark:hover:border-white/15 transition-all duration-300">
              <div className="article-content">{children}</div>
            </GlassCard>
          </motion.div>

          {/* Related articles — plain title list, not another card grid */}
          {related.length > 0 && (
            <nav
              aria-label="Related insights"
              className="mt-12 pt-8 border-t border-gray-900/10 dark:border-white/10"
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
                Related insights
              </h2>
              <ul className="space-y-3">
                {related.map((peer) => (
                  <li key={peer.id}>
                    <Link
                      href={`/insights/${peer.id}`}
                      className="text-base text-gray-900 dark:text-white hover:text-fieldporter-blue dark:hover:text-fieldporter-blue underline-offset-4 hover:underline transition-colors inline-flex min-h-[44px] items-center touch-manipulation"
                    >
                      {peer.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-fieldporter-gray">
                <Link
                  href={contextCta.href}
                  className="text-fieldporter-blue hover:underline underline-offset-4 touch-manipulation"
                >
                  {contextCta.label}
                </Link>
              </p>
            </nav>
          )}

          {/* Conversion CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
            whileHover={{ y: -4 }}
          >
            <GlassCard className="p-8 text-center hover:border-fieldporter-blue/30 transition-all duration-300 hover:shadow-xl hover:shadow-fieldporter-blue/15">
              <h3 className="text-heading-lg font-semibold text-gray-900 dark:text-white mb-4">
                Explore More Insights
              </h3>
              <p className="text-body-md text-fieldporter-gray mb-6">
                Discover more practical insights from our AI implementations and
                business building experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    size="enterprise"
                    className="w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-fieldporter-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    asChild
                  >
                    <Link href="/insights">View All Articles</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="fieldporter-secondary"
                    size="enterprise"
                    className="w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    asChild
                  >
                    <Link href="/contact">Schedule Consultation</Link>
                  </Button>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
