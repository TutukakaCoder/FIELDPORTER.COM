import { PageWrapper } from "@/components/layout";
import { ArrowRight, Phone, Search, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Operating System (AIOS) | FIELDPORTER",
  description:
    "A strategic diagnostic framework to identify high-ROI AI opportunities. Get a scored roadmap and expert consultation.",
  keywords: ["AI Operating System", "AIOS", "AI Audit", "Automation Roadmap"],
  openGraph: {
    title: "AI Operating System (AIOS) | FIELDPORTER",
    description:
      "A strategic diagnostic framework to identify high-ROI AI opportunities. Get a scored roadmap and expert consultation.",
    type: "website",
    url: "https://fieldporter.com/aios",
  },
};

export default function AIOSPage() {
  return (
    <PageWrapper className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Find the Right AI for <br className="hidden md:block" /> Your
            Business
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Stop guessing where to invest. Get a scored roadmap for your
            automation strategy and move forward with certainty.
          </p>
          <div className="flex justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95"
            >
              Start Your Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* The Problem Section */}
        <div className="mb-24 bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Unsure where to start?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Most business leaders know AI matters, but few know exactly which
              investments will pay off. How do you separate genuine high-ROI
              opportunities from the hype?
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              You don't need more tools. You need clarity on what is right for
              your specific operations.
            </p>
          </div>
        </div>

        {/* The Framework / Process Section */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                1. Secure Collection
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We gather detailed data through our secure portal to get a
                complete picture of your current operations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                2. Deep Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We spend two days analyzing your data, researching your market,
                and consulting our advisor network to validate findings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                3. Delivery & Certainty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You receive a written Assessment Report and two consultation
                calls with AI expert Freddy Hopkins to discuss the roadmap.
              </p>
            </div>
          </div>
        </div>

        {/* Non-Sales Pitch Section */}
        <div className="max-w-4xl mx-auto mb-24 p-8 md:p-12 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/30 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            An Independent Assessment
          </h3>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
            <p>
              Our goal is to give you an honest evaluation of what AI can do for
              you.
            </p>
            <p>
              We only work with select clients on implementation. Whether we
              work together further or not, you walk away with a valuable
              strategic roadmap and no obligation.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to get clarity?
          </h2>
          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95"
          >
            Start Your Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
