"use client";

import { Button } from "@/components/ui/button";
import { trackCTA } from "@/lib/firebase-analytics";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  const handleContactCTA = () => {
    trackCTA("contact", "Get Started", {
      location: "cta_section",
      button_position: "primary_cta",
    });
  };

  const handlePortfolioCTA = () => {
    trackCTA("service_interest", "View Work", {
      location: "cta_section",
      button_position: "secondary_cta",
    });
  };

  return (
    <section className="relative section-rhythm-lg overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* CTA Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative p-8 md:p-12 rounded-3xl backdrop-blur-md border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02]"
        >
          <div className="relative z-10 space-y-8 md:space-y-10">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-white leading-tight tracking-[-0.02em] break-words">
              Book a Call. Get a{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Scored Roadmap
              </span>
              .
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              One call to scope your challenge and receive a clear next step. No
              obligation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:min-w-[200px] group"
                  asChild
                >
                  <Link
                    href="/contact"
                    onClick={handleContactCTA}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Book a Call</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:min-w-[200px] group"
                  asChild
                >
                  <Link
                    href="/portfolio"
                    onClick={handlePortfolioCTA}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <span>See Our Work</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Trust Note */}
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
              No sales pitches. Just an honest conversation about whether we can
              help solve your specific challenge.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
