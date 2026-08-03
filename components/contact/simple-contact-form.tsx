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

const fieldClassName =
  "w-full px-4 py-3 bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 rounded-xl text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-h-[44px] touch-manipulation";

const labelClassName =
  "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5";

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

  if (isSubmitted) {
    return (
      <section
        id="contact-form"
        className="relative section-rhythm-lg md:section-rhythm-2xl overflow-hidden"
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-md border border-gray-900/10 dark:border-white/10 rounded-3xl p-8 md:p-12">
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
                We&apos;ve received your message and are already thinking about
                how we can help. Here&apos;s what happens next:
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
                      We&apos;ll analyze your needs and identify specific
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
                      You&apos;ll receive tailored recommendations based on your
                      situation
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                      <ArrowRight className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">
                      Next steps
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      We&apos;ll suggest a focused call, resources, or
                      automation roadmap
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-blue-600 dark:text-blue-400 text-base">
                <strong>In the meantime:</strong> Feel free to explore our{" "}
                <a
                  href="/portfolio"
                  className="underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  case studies
                </a>{" "}
                or check out our{" "}
                <a
                  href="/insights"
                  className="underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
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
      className="relative section-rhythm md:section-rhythm-2xl overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Contact Form — no duplicate page H1 */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-md border border-gray-900/10 dark:border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-12"
          >
            <AnimatePresence>
              {errors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
                >
                  <ul className="text-red-600 dark:text-red-400 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4 md:space-y-6">
              {/* Your Information */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Your Information
                </h3>

                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label htmlFor="contact-name" className={labelClassName}>
                      Your name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      autoComplete="name"
                      className={fieldClassName}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClassName}>
                      Email address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      autoComplete="email"
                      className={fieldClassName}
                      required
                    />
                  </div>
                </div>

                <div className="mt-3 md:mt-4">
                  <label htmlFor="contact-org" className={labelClassName}>
                    Organization{" "}
                    <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateFormData("company", e.target.value)}
                    autoComplete="organization"
                    className={fieldClassName}
                  />
                </div>
              </div>

              {/* Tell Us More */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Tell Us More
                </h3>

                <div className="mb-3 md:mb-4">
                  <label htmlFor="contact-brings" className={labelClassName}>
                    What brings you here?{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-brings"
                      value={formData.whatBringsYouHere}
                      onChange={(e) => {
                        updateFormData("whatBringsYouHere", e.target.value);
                        updateFormData("challengeDescription", "");
                      }}
                      className={`${fieldClassName} appearance-none pr-10`}
                      required
                    >
                      <option
                        value=""
                        className="bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                      >
                        Select one...
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

                <AnimatePresence mode="wait">
                  {currentFieldConfig && (
                    <motion.div
                      key={formData.whatBringsYouHere}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <label
                        htmlFor="contact-challenge"
                        className={`${labelClassName} flex items-center gap-2`}
                      >
                        {getFieldIcon(formData.whatBringsYouHere)}
                        {currentFieldConfig.label}{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="contact-challenge"
                        value={formData.challengeDescription}
                        onChange={(e) =>
                          updateFormData("challengeDescription", e.target.value)
                        }
                        placeholder={currentFieldConfig.placeholder}
                        rows={4}
                        className={`${fieldClassName} resize-none min-h-[120px]`}
                        required
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                        {currentFieldConfig.helperText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Context */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setShowAdditionalContext(!showAdditionalContext)
                  }
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 mb-3 min-h-[44px] touch-manipulation"
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
                      className="space-y-3 md:space-y-4"
                    >
                      <div className="grid md:grid-cols-3 gap-3 md:gap-4">
                        <div>
                          <label
                            htmlFor="contact-timeline"
                            className={labelClassName}
                          >
                            Timeline
                          </label>
                          <input
                            id="contact-timeline"
                            type="text"
                            value={formData.additionalContext.timeline}
                            onChange={(e) =>
                              updateFormData(
                                "additionalContext.timeline",
                                e.target.value,
                              )
                            }
                            placeholder="When to start?"
                            className={fieldClassName}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contact-tools"
                            className={labelClassName}
                          >
                            Current tools
                          </label>
                          <input
                            id="contact-tools"
                            type="text"
                            value={formData.additionalContext.currentTools}
                            onChange={(e) =>
                              updateFormData(
                                "additionalContext.currentTools",
                                e.target.value,
                              )
                            }
                            placeholder="Tools in use"
                            className={fieldClassName}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contact-team"
                            className={labelClassName}
                          >
                            Team size
                          </label>
                          <input
                            id="contact-team"
                            type="text"
                            value={formData.additionalContext.teamSize}
                            onChange={(e) =>
                              updateFormData(
                                "additionalContext.teamSize",
                                e.target.value,
                              )
                            }
                            placeholder="Solo or team?"
                            className={fieldClassName}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <div className="pt-2 md:pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  variant="primary"
                  size="enterprise"
                  className="w-full group focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[48px]"
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
