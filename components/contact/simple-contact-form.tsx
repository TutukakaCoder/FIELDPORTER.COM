"use client";

import { Button } from "@/components/ui/button";
import { ContactFormData } from "@/lib/firebase-forms";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  Lightbulb,
  Loader2,
  MessageSquare,
  Target,
  User,
} from "lucide-react";
import React, { useState } from "react";

// Enhanced form data interface
interface EnhancedContactFormData extends ContactFormData {
  whatBringsYouHere: string;
  additionalContext: {
    timeline: string;
    currentTools: string;
    teamSize: string;
  };
}

const WHAT_BRINGS_YOU_OPTIONS = [
  "I know what I want to automate",
  "Help me find opportunities",
  "Just exploring AI",
];

const FIELD_CONFIGS = {
  "I know what I want to automate": {
    label: "Project details",
    placeholder:
      "Describe your automation idea, workflow challenges, or AI integration needs...",
    helperText: "The more specific, the better we can help",
  },
  "Help me find opportunities": {
    label: "Current situation",
    placeholder:
      "Tell us about your work, daily tasks, or processes that take too much time...",
    helperText:
      "We'll analyze your workflow and suggest automation opportunities",
  },
  "Just exploring AI": {
    label: "Areas of interest",
    placeholder:
      "What aspects of AI interest you? Research, automation, development, or something else?",
    helperText: "Let's start a conversation about what's possible",
  },
};

export function SimpleContactForm() {
  const [formData, setFormData] = useState<EnhancedContactFormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    challengeDescription: "",
    timeline: "",
    budgetRange: "",
    whatBringsYouHere: "",
    additionalContext: {
      timeline: "",
      currentTools: "",
      teamSize: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showAdditionalContext, setShowAdditionalContext] = useState(false);

  // Form validation - simplified, no character minimums
  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.email.includes("@") &&
    formData.whatBringsYouHere.length > 0 &&
    formData.challengeDescription.trim().length > 0;

  const updateFormData = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      if (parent === "additionalContext") {
        setFormData((prev) => ({
          ...prev,
          additionalContext: {
            ...prev.additionalContext,
            [child as keyof typeof prev.additionalContext]: value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field as keyof EnhancedContactFormData]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrors([]);

    try {
      // Prepare form data for the new API
      const submissionData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || "",
        projectType: formData.whatBringsYouHere || "AI Project Inquiry",
        challengeDescription: formData.challengeDescription,
        timeline: formData.additionalContext.timeline || "Flexible",
        budgetRange: formData.budgetRange || "Let's discuss",
        additionalContext: formData.additionalContext,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);

        // Track conversion for analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "contact_form_submission", {
            lead_score: result.leadScore,
            project_type: formData.whatBringsYouHere,
          });
        }
      } else {
        setErrors([
          result.error || "An unexpected error occurred. Please try again.",
        ]);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setErrors(["Network error. Please check your connection and try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentFieldConfig = formData.whatBringsYouHere
    ? FIELD_CONFIGS[formData.whatBringsYouHere as keyof typeof FIELD_CONFIGS]
    : null;

  const getFieldIcon = (option: string) => {
    switch (option) {
      case "I know what I want to automate":
        return <Target className="h-4 w-4 text-blue-400" />;
      case "Help me find opportunities":
        return <Activity className="h-4 w-4 text-blue-400" />;
      case "Just exploring AI":
        return <Lightbulb className="h-4 w-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  if (isSubmitted) {
    return (
      <section
        id="contact-form"
        className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-black dark:via-gray-950 dark:to-black" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/[0.04] transition-all duration-300">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight">
                Thanks for Reaching Out!
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We've received your message and are already thinking about how
                we can help. Here's what happens next:
              </p>

              <div className="bg-gray-900/[0.02] dark:bg-white/[0.02] border border-gray-900/10 dark:border-white/10 rounded-2xl p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
                      Within 24 hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      We'll analyze your needs and identify specific
                      opportunities
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
                      Personalized response
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      You'll receive tailored recommendations based on your
                      situation
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                      <ArrowRight className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      Next steps
                    </h3>
                    <p className="text-gray-400 text-sm">
                      We'll suggest a focused call, resources, or automation
                      roadmap
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-blue-400 text-base">
                <strong>In the meantime:</strong> Feel free to explore our{" "}
                <a
                  href="/portfolio"
                  className="underline hover:text-blue-300 transition-colors"
                >
                  case studies
                </a>{" "}
                or check out our{" "}
                <a
                  href="/insights"
                  className="underline hover:text-blue-300 transition-colors"
                >
                  latest insights
                </a>{" "}
                on AI automation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact-form"
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-black dark:via-gray-950 dark:to-black" />

      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 lg:mb-16"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Use the form below or chat with our AI assistant and share your
              email or details - someone from our team will get back to you
              shortly.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-gray-900/10 dark:border-white/10 rounded-3xl p-6 md:p-12 hover:bg-gray-900/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300"
          >
            {/* Error Messages */}
            <AnimatePresence>
              {errors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
                >
                  <ul className="text-red-400 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-8">
              {/* Your Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Your Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      Your name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      placeholder="Full name"
                      className="w-full px-4 py-4 bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-h-[48px] touch-manipulation"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      Email address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-4 bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-h-[48px] touch-manipulation"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Organization{" "}
                    <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateFormData("company", e.target.value)}
                    placeholder="Company or personal project"
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-h-[48px] touch-manipulation"
                  />
                </div>
              </div>

              {/* Tell Us More Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Tell Us More
                </h3>

                {/* What brings you here dropdown */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    What brings you here?{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.whatBringsYouHere}
                      onChange={(e) => {
                        updateFormData("whatBringsYouHere", e.target.value);
                        // Reset challenge description when switching options
                        updateFormData("challengeDescription", "");
                      }}
                      className="w-full px-4 py-4 bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 appearance-none min-h-[48px] touch-manipulation text-sm md:text-base pr-10"
                      required
                    >
                      <option
                        value=""
                        className="bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                      >
                        What describes you best...
                      </option>
                      {WHAT_BRINGS_YOU_OPTIONS.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Dynamic field based on selection */}
                <AnimatePresence mode="wait">
                  {currentFieldConfig && (
                    <motion.div
                      key={formData.whatBringsYouHere}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        {getFieldIcon(formData.whatBringsYouHere)}
                        {currentFieldConfig.label}{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={formData.challengeDescription}
                        onChange={(e) =>
                          updateFormData("challengeDescription", e.target.value)
                        }
                        placeholder={currentFieldConfig.placeholder}
                        rows={4}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none min-h-[120px] touch-manipulation"
                        required
                      />
                      <p className="text-sm text-gray-400 mt-2">
                        {currentFieldConfig.helperText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Context (Expandable) */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setShowAdditionalContext(!showAdditionalContext)
                  }
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 mb-4"
                >
                  <motion.div
                    animate={{ rotate: showAdditionalContext ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                  Additional Context{" "}
                  <span className="text-gray-500">(optional)</span>
                </button>

                <AnimatePresence>
                  {showAdditionalContext && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Timeline
                          </label>
                          <input
                            type="text"
                            value={formData.additionalContext.timeline}
                            onChange={(e) =>
                              updateFormData(
                                "additionalContext.timeline",
                                e.target.value,
                              )
                            }
                            placeholder="When are you looking to start?"
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-h-[48px] touch-manipulation"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Current tools
                          </label>
                          <input
                            type="text"
                            value={formData.additionalContext.currentTools}
                            onChange={(e) =>
                              updateFormData(
                                "additionalContext.currentTools",
                                e.target.value,
                              )
                            }
                            placeholder="Any AI tools you are already using?"
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-h-[48px] touch-manipulation"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Team size
                          </label>
                          <input
                            type="text"
                            value={formData.additionalContext.teamSize}
                            onChange={(e) =>
                              updateFormData(
                                "additionalContext.teamSize",
                                e.target.value,
                              )
                            }
                            placeholder="Just you or a larger team?"
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-h-[48px] touch-manipulation"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    variant="primary"
                    size="enterprise"
                    className="w-full group focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Start the Conversation
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
