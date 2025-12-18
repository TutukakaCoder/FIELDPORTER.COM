"use client";

import { PageWrapper } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Linkedin,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Article {
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
  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "ai strategy":
        return "bg-fieldporter-blue/20 text-fieldporter-blue border-fieldporter-blue/30";
      case "automation":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "implementation":
        return "bg-fieldporter-blue/20 text-fieldporter-blue border-fieldporter-blue/30";
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
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
            whileHover={{ x: -4 }}
          >
            <Button
              variant="fieldporter-ghost"
              className="group hover:text-fieldporter-blue transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-fieldporter-blue"
              asChild
            >
              <Link href="/insights">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
                Back to Insights
              </Link>
            </Button>
          </motion.div>

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
                <h1 className="text-display-sm md:text-display-md font-bold text-fieldporter-white leading-tight">
                  {article.title}
                </h1>

                {/* Excerpt */}
                <p className="text-body-lg text-fieldporter-gray leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-6 text-body-sm text-fieldporter-gray">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.publishDate).toLocaleDateString()}
                      </span>
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
            <GlassCard className="p-8 md:p-12 hover:border-white/15 transition-all duration-300">
              <div className="article-content">{children}</div>
            </GlassCard>
          </motion.div>

          {/* Related Articles CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
            whileHover={{ y: -4 }}
          >
            <GlassCard className="p-8 text-center hover:border-fieldporter-blue/30 transition-all duration-300 hover:shadow-xl hover:shadow-fieldporter-blue/15">
              <h3 className="text-heading-lg font-semibold text-fieldporter-white mb-4">
                Explore More Insights
              </h3>
              <p className="text-body-md text-fieldporter-gray mb-6">
                Discover more practical insights from our AI implementations and
                business building experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    size="enterprise"
                    className="focus-visible:ring-2 focus-visible:ring-fieldporter-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    asChild
                  >
                    <Link href="/insights">View All Articles</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="fieldporter-secondary"
                    size="enterprise"
                    className="focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
