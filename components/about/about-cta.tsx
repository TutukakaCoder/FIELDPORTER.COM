"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Package, Settings } from "lucide-react";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="relative section-rhythm-lg overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -4 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0, duration: 0.8 }}
          className="relative card-section card-section-hover p-12 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 group/card"
        >
          <div className="relative z-10 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white leading-tight">
                Ready to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Work Together
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                We combine strategic research, rapid AI development, and
                workflow automation. Book a call to discuss your project.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="min-w-[200px] group"
                  asChild
                >
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center gap-3"
                  >
                    <Package className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                    <span>View Our Work</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="min-w-[200px] group"
                  asChild
                >
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-3"
                  >
                    <Settings className="w-5 h-5 group-hover:scale-110 group-hover:rotate-90 transition-transform duration-500" />
                    <span>Current Services</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
