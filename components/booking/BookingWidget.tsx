"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video } from "lucide-react";
import React, { useEffect, useState } from "react";

// Simple Error Boundary for Cal.com embed
class CalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any) {
    console.warn("Cal.com embed error caught:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] text-gray-500">
          <p>Calendar unavailable. Please refresh or contact us directly.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

interface BookingWidgetProps {
  username?: string;
  eventSlug?: string;
}

export function BookingWidget({
  username = process.env["NEXT_PUBLIC_CAL_USERNAME"] || "freddy-hopkins",
  eventSlug = process.env["NEXT_PUBLIC_CAL_EVENT_SLUG"] || "discovery-call",
}: BookingWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();

        // Configure dark theme with FIELDPORTER branding
        cal("ui", {
          theme: "dark",
          styles: {
            branding: {
              brandColor: "#0969da", // FIELDPORTER blue
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });

        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading Cal.com embed:", error);
      }
    })();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const calLink = `${username}/${eventSlug}`;

  return (
    <section
      id="booking-widget"
      className="relative py-8 md:py-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-black dark:via-gray-950 dark:to-black" />

      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-0 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8 md:mb-10 px-4">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight tracking-tight">
              Book a Discovery Call
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              30-minute consultation to discuss your automation needs
            </p>
          </div>

          {/* Benefits Cards - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            <div className="bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-gray-900/10 dark:border-white/10 rounded-xl p-3 md:p-4 flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                30 Minutes
              </span>
            </div>

            <div className="bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-gray-900/10 dark:border-white/10 rounded-xl p-3 md:p-4 flex items-center justify-center gap-3">
              <Video className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Video Call
              </span>
            </div>

            <div className="bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-gray-900/10 dark:border-white/10 rounded-xl p-3 md:p-4 flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Flexible Times
              </span>
            </div>
          </div>

          {/* Booking Widget Container */}
          <div className="relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border-y border-gray-900/10 dark:border-white/10 sm:border sm:rounded-3xl p-0 md:p-4 hover:bg-gray-900/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300 overflow-hidden">
            {!isLoaded && (
              <div className="flex items-center justify-center min-h-[600px] md:min-h-[700px]">
                <div className="text-center animate-fade-in">
                  <div className="relative w-14 h-14 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
                    <div
                      className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"
                      style={{ animationDuration: "0.8s" }}
                    ></div>
                    <div
                      className="absolute inset-1 rounded-full border-2 border-transparent border-b-blue-400/50 animate-spin"
                      style={{
                        animationDuration: "1.2s",
                        animationDirection: "reverse",
                      }}
                    ></div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
                    Loading calendar...
                  </p>
                </div>
              </div>
            )}

            <CalErrorBoundary>
              <div className="scrollbar-hide w-full h-full">
                <Cal
                  calLink={calLink}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "600px", // Reduced for mobile
                    overflow: "hidden",
                  }}
                  config={{
                    layout: "month_view",
                    theme: "dark",
                  }}
                />
              </div>
            </CalErrorBoundary>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
