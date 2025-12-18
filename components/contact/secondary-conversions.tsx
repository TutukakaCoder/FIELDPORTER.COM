"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { firebaseEnhancedFormsService } from "@/lib/firebase-enhanced-forms";
import { firebaseNewsletterService } from "@/lib/firebase-newsletter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Download,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

export function SecondaryConversions() {
  const [assessmentForm, setAssessmentForm] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submissionStates, setSubmissionStates] = useState({
    assessment: false,
    newsletter: false,
    inquiry: false,
  });

  const [loadingStates, setLoadingStates] = useState({
    assessment: false,
    newsletter: false,
    inquiry: false,
  });

  const [errors, setErrors] = useState({
    assessment: null as string | null,
    newsletter: null as string | null,
    inquiry: null as string | null,
  });

  const handleAssessmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loadingStates.assessment) return;

    // Validate form
    const validation = firebaseEnhancedFormsService.validateResourceDownload({
      name: assessmentForm.name,
      email: assessmentForm.email,
      company: assessmentForm.company,
      resourceType: "ai_readiness_assessment",
      resourceName: "AI Readiness Assessment Framework",
    });

    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        assessment: validation.errors[0] || null,
      }));
      return;
    }

    setLoadingStates((prev) => ({ ...prev, assessment: true }));
    setErrors((prev) => ({ ...prev, assessment: null }));

    try {
      const result = await firebaseEnhancedFormsService.submitResourceDownload(
        {
          name: assessmentForm.name,
          email: assessmentForm.email,
          company: assessmentForm.company,
          resourceType: "ai_readiness_assessment",
          resourceName: "AI Readiness Assessment Framework",
        },
        "secondary_conversion",
      );

      if (result.success) {
        setSubmissionStates((prev) => ({ ...prev, assessment: true }));
        setAssessmentForm({ name: "", email: "", company: "" });
      } else {
        setErrors((prev) => ({
          ...prev,
          assessment: result.error || "Submission failed. Please try again.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        assessment:
          "Network error. Please check your connection and try again.",
      }));
    } finally {
      setLoadingStates((prev) => ({ ...prev, assessment: false }));
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loadingStates.newsletter || !newsletterEmail.trim()) return;

    // Validate email
    const validation = firebaseNewsletterService.validateEmail(newsletterEmail);
    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        newsletter: validation.error || "Invalid email",
      }));
      return;
    }

    setLoadingStates((prev) => ({ ...prev, newsletter: true }));
    setErrors((prev) => ({ ...prev, newsletter: null }));

    try {
      const result = await firebaseNewsletterService.subscribeToNewsletter({
        email: newsletterEmail,
        source: "secondary_conversion",
        metadata: {
          page_url: typeof window !== "undefined" ? window.location.href : "",
          interest: "AI strategy insights",
        },
      });

      if (result.success) {
        setSubmissionStates((prev) => ({ ...prev, newsletter: true }));
        setNewsletterEmail("");
      } else {
        setErrors((prev) => ({
          ...prev,
          newsletter: result.error || "Subscription failed. Please try again.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        newsletter:
          "Network error. Please check your connection and try again.",
      }));
    } finally {
      setLoadingStates((prev) => ({ ...prev, newsletter: false }));
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loadingStates.inquiry) return;

    // Validate form
    const validation = firebaseEnhancedFormsService.validateGeneralInquiry({
      name: inquiryForm.name,
      email: inquiryForm.email,
      subject: inquiryForm.subject,
      message: inquiryForm.message,
      urgency: "medium",
    });

    if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, inquiry: validation.errors[0] || null }));
      return;
    }

    setLoadingStates((prev) => ({ ...prev, inquiry: true }));
    setErrors((prev) => ({ ...prev, inquiry: null }));

    try {
      const result = await firebaseEnhancedFormsService.submitGeneralInquiry(
        {
          name: inquiryForm.name,
          email: inquiryForm.email,
          subject: inquiryForm.subject,
          message: inquiryForm.message,
          urgency: "medium",
        },
        "secondary_conversion",
      );

      if (result.success) {
        setSubmissionStates((prev) => ({ ...prev, inquiry: true }));
        setInquiryForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrors((prev) => ({
          ...prev,
          inquiry: result.error || "Submission failed. Please try again.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        inquiry: "Network error. Please check your connection and try again.",
      }));
    } finally {
      setLoadingStates((prev) => ({ ...prev, inquiry: false }));
    }
  };

  return (
    <section className="py-24 bg-bg-fieldporter-tertiary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-fieldporter-white mb-4">
            Multiple Ways to Engage
          </h2>
          <p className="text-fieldporter-gray text-lg max-w-3xl mx-auto">
            Not ready for a full consultation? Start with these valuable
            resources and stay connected with our latest AI strategy insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* AI Readiness Assessment Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:border-fieldporter-blue/40 transition-all duration-300 h-full group">
              <CardHeader className="text-center">
                <motion.div
                  className="w-16 h-16 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Download className="h-8 w-8 text-fieldporter-blue" />
                </motion.div>
                <CardTitle className="text-fieldporter-white">
                  AI Readiness Assessment
                </CardTitle>
                <CardDescription className="text-fieldporter-gray">
                  Download our comprehensive framework to evaluate your
                  organization&apos;s AI readiness
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionStates.assessment ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="text-fieldporter-white font-semibold mb-2">
                      Download Started!
                    </p>
                    <p className="text-fieldporter-gray text-sm">
                      Check your email for the assessment framework and
                      follow-up resources.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                    <div>
                      <Label
                        htmlFor="assessment-name"
                        className="text-fieldporter-white"
                      >
                        Name *
                      </Label>
                      <Input
                        id="assessment-name"
                        value={assessmentForm.name}
                        onChange={(e) =>
                          setAssessmentForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Your name"
                        required
                        disabled={loadingStates.assessment}
                        className="mt-1 bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="assessment-email"
                        className="text-fieldporter-white"
                      >
                        Email *
                      </Label>
                      <Input
                        id="assessment-email"
                        type="email"
                        value={assessmentForm.email}
                        onChange={(e) =>
                          setAssessmentForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="your.email@company.com"
                        required
                        disabled={loadingStates.assessment}
                        className="mt-1 bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="assessment-company"
                        className="text-fieldporter-white"
                      >
                        Company *
                      </Label>
                      <Input
                        id="assessment-company"
                        value={assessmentForm.company}
                        onChange={(e) =>
                          setAssessmentForm((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        placeholder="Company name"
                        required
                        disabled={loadingStates.assessment}
                        className="mt-1 bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue"
                      />
                    </div>
                    {errors.assessment && (
                      <p className="text-red-400 text-sm">
                        {errors.assessment}
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={loadingStates.assessment}
                      className="w-full bg-fieldporter-blue hover:bg-fieldporter-blue/90 text-fieldporter-white"
                    >
                      {loadingStates.assessment ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Download Assessment
                          <Download className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-fieldporter-gray text-center">
                      Includes automated email sequence with additional AI
                      strategy resources
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:border-fieldporter-blue/40 transition-all duration-300 h-full group">
              <CardHeader className="text-center">
                <motion.div
                  className="w-16 h-16 bg-fieldporter-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Mail className="h-8 w-8 text-fieldporter-blue" />
                </motion.div>
                <CardTitle className="text-fieldporter-white">
                  AI Strategy Insights
                </CardTitle>
                <CardDescription className="text-fieldporter-gray">
                  Monthly insights on enterprise AI trends, case studies, and
                  strategic frameworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionStates.newsletter ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="text-fieldporter-white font-semibold mb-2">
                      Successfully Subscribed!
                    </p>
                    <p className="text-fieldporter-gray text-sm">
                      You&apos;ll receive our next AI strategy insights
                      newsletter within the week.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div>
                      <Label
                        htmlFor="newsletter-email"
                        className="text-fieldporter-white"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="newsletter-email"
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="your.email@company.com"
                        required
                        disabled={loadingStates.newsletter}
                        className="mt-1 bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue"
                      />
                      {errors.newsletter && (
                        <p className="text-red-400 text-sm mt-2">
                          {errors.newsletter}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={
                        loadingStates.newsletter || !newsletterEmail.trim()
                      }
                      className="w-full bg-fieldporter-blue hover:bg-fieldporter-blue/90 text-fieldporter-white"
                    >
                      {loadingStates.newsletter ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-fieldporter-gray text-center">
                      No spam, unsubscribe anytime. Weekly insights on AI
                      strategy and implementation.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* General Inquiry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:shadow-[0_20px_50px_rgba(34,197,94,0.15)] hover:border-green-500/40 transition-all duration-300 h-full group">
              <CardHeader className="text-center">
                <motion.div
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MessageSquare className="h-8 w-8 text-green-500" />
                </motion.div>
                <CardTitle className="text-fieldporter-white">
                  Quick Question?
                </CardTitle>
                <CardDescription className="text-fieldporter-gray">
                  Have a specific question about AI implementation or strategy?
                  Send us a quick message.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionStates.inquiry ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="text-fieldporter-white font-semibold mb-2">
                      Message Sent!
                    </p>
                    <p className="text-fieldporter-gray text-sm">
                      We&apos;ll respond to your inquiry within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label
                          htmlFor="inquiry-name"
                          className="text-fieldporter-white"
                        >
                          Name *
                        </Label>
                        <Input
                          id="inquiry-name"
                          value={inquiryForm.name}
                          onChange={(e) =>
                            setInquiryForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Your name"
                          required
                          disabled={loadingStates.inquiry}
                          className="mt-1 bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="inquiry-email"
                          className="text-fieldporter-white"
                        >
                          Email *
                        </Label>
                        <Input
                          id="inquiry-email"
                          type="email"
                          value={inquiryForm.email}
                          onChange={(e) =>
                            setInquiryForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="your.email@company.com"
                          required
                          disabled={loadingStates.inquiry}
                          className="mt-1 bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue"
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="inquiry-subject"
                        className="text-fieldporter-white"
                      >
                        Subject *
                      </Label>
                      <Input
                        id="inquiry-subject"
                        value={inquiryForm.subject}
                        onChange={(e) =>
                          setInquiryForm((prev) => ({
                            ...prev,
                            subject: e.target.value,
                          }))
                        }
                        placeholder="Brief subject line"
                        required
                        disabled={loadingStates.inquiry}
                        className="mt-1 bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="inquiry-message"
                        className="text-fieldporter-white"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="inquiry-message"
                        value={inquiryForm.message}
                        onChange={(e) =>
                          setInquiryForm((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        placeholder="Your question or message..."
                        rows={3}
                        required
                        disabled={loadingStates.inquiry}
                        className="mt-1 bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue resize-none"
                      />
                    </div>
                    {errors.inquiry && (
                      <p className="text-red-400 text-sm">{errors.inquiry}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={loadingStates.inquiry}
                      className="w-full bg-green-600 hover:bg-green-600/90 text-fieldporter-white"
                    >
                      {loadingStates.inquiry ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <MessageSquare className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
