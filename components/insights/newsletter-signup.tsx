"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Mail } from "lucide-react";
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

        // Track conversion for analytics
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

  const benefits = [
    "Weekly AI strategy insights",
    "Early access to new articles",
    "Exclusive implementation frameworks",
    "Industry trend analysis",
  ];

  if (isSubscribed) {
    return (
      <section id="newsletter-signup" className="section-spacing-lg relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary" />

        <div className="relative z-10 content-container-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 md:p-12 text-center hover:border-green-500/30 transition-all duration-300">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-6 border border-green-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <CheckCircle className="w-8 h-8 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
                </motion.div>
              </motion.div>

              <h3 className="text-heading-xl font-semibold text-fieldporter-white mb-4">
                Welcome to Our Community!
              </h3>

              <p className="text-body-lg text-fieldporter-gray mb-8">
                You&apos;re now subscribed to receive our latest AI strategy
                insights and exclusive content.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    size="enterprise"
                    className="group focus-visible:ring-2 focus-visible:ring-fieldporter-blue"
                    onClick={() => {
                      // Scroll back to blog grid
                      document
                        .getElementById("blog-grid")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Explore Articles
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="fieldporter-secondary"
                    size="enterprise"
                    className="group focus-visible:ring-2 focus-visible:ring-white/50"
                    onClick={() => {
                      window.location.href = "/contact";
                    }}
                  >
                    Get Consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter-signup" className="section-spacing-lg relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary" />

      <div className="relative z-10 content-container-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard className="card-spacing-lg">
            <div className="text-center component-spacing">
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-4 mx-auto"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.6 }}
              >
                <Mail className="w-8 h-8 text-fieldporter-blue drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
              </motion.div>

              {/* Header */}
              <div className="text-spacing">
                <h3 className="text-heading-xl font-semibold text-fieldporter-white">
                  Stay Ahead with AI Insights
                </h3>
                <p className="text-body-lg text-fieldporter-gray max-w-2xl mx-auto leading-relaxed">
                  Get exclusive insights from operators who build AI companies.
                  No fluff, just practical strategies you can implement.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className="flex items-center space-x-3 text-left p-2 rounded-lg hover:bg-white/5 transition-colors duration-300 cursor-default"
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-fieldporter-blue flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="text-body-sm text-fieldporter-gray hover:text-white transition-colors duration-300">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-4 rounded-lg bg-white/10 border border-white/20 text-fieldporter-white placeholder-fieldporter-gray focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:border-transparent focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 disabled:opacity-50 min-h-[48px] touch-manipulation hover:border-white/30 hover:bg-white/[0.12]"
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 text-left"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      size="enterprise"
                      disabled={isSubmitting || !email.trim()}
                      className="group whitespace-nowrap focus-visible:ring-2 focus-visible:ring-fieldporter-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Get Insights
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </form>

              {/* Privacy Note */}
              <p className="text-body-xs text-fieldporter-gray max-w-lg mx-auto">
                We respect your privacy. Unsubscribe at any time. By
                subscribing, you agree to receive insights about AI strategy and
                business automation.
              </p>

              {/* Social Proof */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-body-sm text-fieldporter-gray mb-4">
                  Join 500+ executives and entrepreneurs
                </p>
                <div className="flex items-center justify-center space-x-8 text-body-xs text-fieldporter-gray">
                  <span>✓ No spam, ever</span>
                  <span>✓ Weekly insights</span>
                  <span>✓ Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
