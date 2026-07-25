"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useStableMobile } from "@/hooks";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, Clock, Video } from "lucide-react";
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
        <div className="flex items-center justify-center min-h-[320px] text-gray-500">
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

const BENEFITS = [
  { icon: Clock, label: "30 Minutes", color: "text-blue-400" },
  { icon: Video, label: "Video Call", color: "text-emerald-400" },
  { icon: Calendar, label: "Flexible Times", color: "text-purple-400" },
] as const;

export function BookingWidget({
  username = process.env["NEXT_PUBLIC_CAL_USERNAME"] || "freddy-hopkins",
  eventSlug = process.env["NEXT_PUBLIC_CAL_EVENT_SLUG"] || "discovery-call",
}: BookingWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useStableMobile();
  const calLayout = isMobile ? "column_view" : "month_view";
  const minHeight = isMobile ? 420 : 600;

  useEffect(() => {
    let cancelled = false;

    (async function () {
      try {
        const cal = await getCalApi();

        cal("ui", {
          theme: "dark",
          styles: {
            branding: {
              brandColor: "#0969da",
            },
          },
          hideEventTypeDetails: false,
          layout: calLayout,
        });

        if (!cancelled) setIsLoaded(true);
      } catch (error) {
        console.error("Error loading Cal.com embed:", error);
        if (!cancelled) setIsLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [calLayout]);

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
      className="relative section-rhythm-tight overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-black dark:via-gray-950 dark:to-black" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-0 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-4 md:mb-8 px-4">
            <h2 className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4 leading-tight tracking-tight">
              Book a Discovery Call
            </h2>
            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A 30-minute call to discuss your situation—AI, automation,
              research, or a build—and whether we&apos;re a fit.
            </p>
          </div>

          {/* Benefits: accordion on mobile, row on md+ */}
          <div className="mb-4 md:mb-8 max-w-3xl mx-auto px-4">
            <details className="md:hidden group rounded-xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02]">
              <summary className="flex items-center justify-between gap-2 cursor-pointer list-none touch-manipulation min-h-[44px] px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>Call details · 30 min · video · flexible times</span>
                <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="grid grid-cols-1 gap-2 px-3 pb-3">
                {BENEFITS.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-2 py-2"
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </details>

            <div className="hidden md:grid grid-cols-3 gap-4">
              {BENEFITS.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-md border border-gray-900/10 dark:border-white/10 rounded-xl p-4 flex items-center justify-center gap-3"
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Widget Container */}
          <div className="relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-md border-y border-gray-900/10 dark:border-white/10 sm:border sm:rounded-3xl p-0 md:p-4 overflow-hidden">
            {!isLoaded && (
              <div
                className="flex items-center justify-center"
                style={{ minHeight }}
              >
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
              <div
                className="w-full h-full"
                style={{ minHeight }}
              >
                <Cal
                  key={calLayout}
                  calLink={calLink}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight,
                    overflow: "hidden",
                  }}
                  config={{
                    layout: calLayout,
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
