"use client";

import { Button } from "@/components/ui/button";
import { firebaseNewsletterService } from "@/lib/firebase-newsletter";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import {
  CheckCircle,
  Layers,
  Lightbulb,
  Loader2,
  Mail,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

// Premium aurora background matching about hero
function PremiumAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />

      {/* Enhanced grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle aurora effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </div>
  );
}

// Floating geometric elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 bg-blue-400/30 rounded-full"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-1 h-1 bg-white/40 rounded-full"
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full"
        animate={{
          x: [-5, 5, -5],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}

// Premium newsletter signup component
function PremiumNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || isSubmitting) return;

    // Validate email
    const validation = firebaseNewsletterService.validateEmail(email);
    if (!validation.isValid) {
      setError(validation.error || "Invalid email");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await firebaseNewsletterService.subscribeToNewsletter({
        email: email,
        source: "insights_coming_soon",
        metadata: {
          page_url: typeof window !== "undefined" ? window.location.href : "",
          interest: "AI strategy insights early access",
          trigger_type: "coming_soon_signup",
        },
      });

      if (result.success) {
        setIsSubscribed(true);
        setEmail("");
      } else {
        setError(result.error || "Subscription failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative p-8 lg:p-12 rounded-3xl backdrop-blur-xl border border-white/10 bg-white/[0.02] overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Welcome to Early Access!
          </h3>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            You'll be the first to know when our comprehensive insights platform
            launches with strategic research, AI implementation guides, and
            business intelligence reports.
          </p>

          <div className="flex items-center justify-center text-sm text-gray-400">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Your email is secure. We'll notify you when we launch.
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative p-8 lg:p-12 rounded-3xl backdrop-blur-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />

      <div className="relative text-center">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6 text-blue-400" />
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          Get Early Access
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our exclusive insights newsletter for early access to strategic
          research, AI implementation guides, and business intelligence reports.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 text-left">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Subscribing...
                </div>
              ) : (
                "Notify Me"
              )}
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-6 text-sm text-gray-400">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Your email is secure. No spam, unsubscribe anytime.
        </div>
      </div>
    </div>
  );
}

export function InsightsComingSoon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0.3]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      <PremiumAuroraBackground />
      <FloatingElements />

      <main className="relative z-10">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section - Matching About Page Style */}
            <section
              ref={containerRef}
              className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
              <motion.div
                style={{ y, opacity }}
                className="relative z-10 w-full"
              >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-12"
                  >
                    {/* Icon */}
                    <motion.div
                      variants={itemVariants}
                      className="flex justify-center"
                    >
                      <div className="p-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.02]">
                        <Layers className="w-12 h-12 text-blue-400" />
                      </div>
                    </motion.div>

                    {/* Status Badge */}
                    <motion.div
                      variants={itemVariants}
                      className="flex justify-center"
                    >
                      <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-3" />
                        <span className="text-gray-300 text-sm font-medium">
                          In Development
                        </span>
                      </div>
                    </motion.div>

                    {/* Main heading */}
                    <motion.div variants={itemVariants} className="space-y-6">
                      <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        <span className="text-white">AI Strategy</span>{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                          Insights
                        </span>
                        <br />
                        <span className="text-gray-400 text-3xl lg:text-4xl font-light">
                          Coming Soon
                        </span>
                      </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                      variants={itemVariants}
                      className="max-w-3xl mx-auto"
                    >
                      <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                        We're developing a comprehensive insights platform
                        featuring strategic research, AI implementation case
                        studies, and cutting-edge business intelligence reports.
                      </p>
                    </motion.div>

                    {/* Premium divider */}
                    <motion.div
                      variants={itemVariants}
                      className="flex justify-center pt-8"
                    >
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* Preview Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              <div className="group relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Strategic Research
                </h3>
                <p className="text-gray-400">
                  Market analysis and competitive intelligence reports
                </p>
              </div>

              <div className="group relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  AI Case Studies
                </h3>
                <p className="text-gray-400">
                  Real implementation stories and technical deep-dives
                </p>
              </div>

              <div className="group relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Innovation Frameworks
                </h3>
                <p className="text-gray-400">
                  Practical guides for AI-driven business transformation
                </p>
              </div>
            </motion.div>

            {/* Newsletter Signup Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <PremiumNewsletterSignup />
            </motion.div>

            {/* Timeline Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Development Timeline
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2" />
                  <span className="text-gray-300">
                    Q3 2025: Research Platform
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-2" />
                  <span className="text-gray-300">Q4 2025: Case Studies</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2" />
                  <span className="text-gray-300">Q1 2026: Full Launch</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
