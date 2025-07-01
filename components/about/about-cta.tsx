"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Package, Settings } from "lucide-react";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.02]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0, duration: 0.8 }}
          className="relative p-12 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.02]"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                We&apos;re in{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Transition
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                While we still take on select consulting projects, our focus is
                shifting to building products that solve real problems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/portfolio">
                  <Button className="group relative px-8 py-4 rounded-2xl backdrop-blur-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] text-white font-medium min-w-[200px]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                    <div className="relative z-10 flex items-center justify-center space-x-3">
                      <Package className="w-5 h-5" />
                      <span>Explore Our Products</span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/services">
                  <Button className="group relative px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] text-white font-medium min-w-[200px]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.02] to-white/[0.01]" />
                    <div className="relative z-10 flex items-center justify-center space-x-3">
                      <Settings className="w-5 h-5" />
                      <span>Current Services</span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
