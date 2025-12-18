"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

interface ContactSectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export function ContactSection({
  title,
  description,
  ctaText,
  ctaHref,
}: ContactSectionProps) {
  return (
    <section className="py-20 lg:py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlassCard className="p-8 md:p-12 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:border-fieldporter-blue/40 transition-all duration-300 group">
            <div className="space-y-8">
              {/* Icon */}
              <motion.div
                className="w-20 h-20 mx-auto rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-5 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <MessageCircle className="w-full h-full text-fieldporter-blue" />
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <h2 className="text-display-sm font-bold text-fieldporter-white">
                  {title}
                </h2>
                <p className="text-body-lg text-fieldporter-gray max-w-2xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="enterprise"
                  className="group focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  onClick={() => {
                    window.location.href = ctaHref;
                  }}
                >
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
