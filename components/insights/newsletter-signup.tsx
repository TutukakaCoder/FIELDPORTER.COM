"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source: "insights",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");

        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "newsletter_signup", {
            source: "insights",
            lead_score: result.leadScore,
          });
        }
      } else {
        setError(result.error || "Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="newsletter-signup"
      className="relative pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-7 sm:p-9">
            {isSubscribed ? (
              <div className="flex items-center gap-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500 dark:text-green-400" />
                <div>
                  <h2 className="text-heading-md font-semibold text-gray-900 dark:text-white">
                    You are subscribed
                  </h2>
                  <p className="mt-1 text-body-sm text-fieldporter-gray">
                    New articles will land in your inbox as we publish them.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
                <div className="space-y-2">
                  <h2 className="text-heading-lg font-semibold text-gray-900 dark:text-white">
                    Get new articles in your inbox
                  </h2>
                  <p className="max-w-xl text-body-md leading-relaxed text-fieldporter-gray">
                    Practical notes from the AI systems and custom software we
                    build. No fluff, and you can unsubscribe at any time.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full lg:w-auto">
                  <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      aria-label="Email address"
                      required
                      disabled={isSubmitting}
                      className="min-h-[48px] w-full rounded-lg border border-gray-900/20 bg-gray-900/5 px-4 py-3 text-gray-900 placeholder-fieldporter-gray transition-colors duration-300 hover:border-gray-900/30 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fieldporter-blue disabled:opacity-50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/30 sm:w-72"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="enterprise"
                      disabled={isSubmitting || !email.trim()}
                      className="group whitespace-nowrap focus-visible:ring-2 focus-visible:ring-fieldporter-blue"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Subscribing
                        </>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 dark:text-red-400"
                    >
                      {error}
                    </motion.p>
                  )}
                </form>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
