"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Eye,
  FileText,
  Globe,
  Lock,
  Mail,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { PageWrapper } from "@/components/layout";

const sections = [
  {
    id: "introduction",
    title: "Introduction & Scope",
    icon: Shield,
    content: [
      "FIELDPORTER is committed to protecting your privacy and maintaining the confidentiality of your personal and business information. This Privacy Policy explains how we collect, use, protect, and share information when you use our AI consulting services, visit our website, or interact with our AI chat features.",
      "This policy applies to all FIELDPORTER services including strategic AI consulting, business process automation, VC portfolio optimization, and our AI-powered research tools.",
      "For privacy inquiries, please contact our Privacy Officer at privacy@fieldporter.com.",
    ],
  },
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: Eye,
    content: [
      "Contact Information: Name, email address, phone number, company name, job title, and business address when you request consultations or subscribe to our insights.",
      "AI Chat Data: Conversation history, queries, and responses from our AI chat system to improve service quality and provide business intelligence.",
      "Business Information: Company size, industry, AI maturity level, project scope, budget range, and timeline information for consultation qualification.",
      "Website Analytics: IP address, browser type, device information, pages visited, time spent on site, and referral sources for website optimization.",
      "Communication Records: Email correspondence, meeting notes, and consultation records for service delivery and relationship management.",
    ],
  },
  {
    id: "information-use",
    title: "How We Use Information",
    icon: FileText,
    content: [
      "Consultation Services: To schedule consultations, assess project fit, develop proposals, and deliver AI strategy and implementation services.",
      "AI Chat Enhancement: To improve our AI chat responses, develop better business intelligence, and provide more relevant strategic insights.",
      "Business Development: To qualify leads, understand market needs, and develop targeted service offerings for enterprise clients.",
      "Communication: To send service updates, industry insights, newsletter content, and respond to inquiries about our consulting services.",
      "Analytics & Optimization: To improve website performance, understand user behavior, and optimize our service delivery processes.",
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    icon: Users,
    content: [
      "No Sale of Personal Information: We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
      "Service Providers: We share data with trusted service providers including Firebase (Google), DeepSeek API, and analytics platforms under strict data processing agreements.",
      "Legal Compliance: We may disclose information when required by law, court order, or to protect our legal rights and business interests.",
      "Business Transfers: In the event of a merger, acquisition, or sale of business assets, customer information may be transferred as part of the transaction.",
      "Consent-Based Sharing: We may share information with your explicit consent for specific business purposes or partnership opportunities.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: [
      "Enterprise-Grade Security: We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security assessments.",
      "Firebase Security: All data is stored using Google Firebase with enterprise-grade security features, automatic backups, and 99.9% uptime guarantee.",
      "API Security: DeepSeek API interactions are secured with authentication tokens, rate limiting, and encrypted communications.",
      "Access Controls: Limited access to personal information on a need-to-know basis with multi-factor authentication for all team members.",
      "Regular Audits: Quarterly security reviews, vulnerability assessments, and compliance checks to maintain the highest security standards.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: Globe,
    content: [
      "Access Rights: You can request access to all personal information we hold about you and receive a copy in a portable format.",
      "Correction Rights: You can request correction of inaccurate or incomplete personal information at any time.",
      "Deletion Rights: You can request deletion of your personal information, subject to legal and business record retention requirements.",
      "Opt-Out Rights: You can unsubscribe from marketing communications and opt-out of non-essential data collection.",
      "Data Portability: You can request your data in a machine-readable format for transfer to another service provider.",
    ],
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    icon: Globe,
    content: [
      "Essential Cookies: Required for website functionality, security, and basic navigation features.",
      "Analytics Cookies: Used to understand website performance, user behavior, and optimize our services (Google Analytics).",
      "Chat Functionality: Cookies to maintain AI chat sessions, conversation context, and user preferences.",
      "Marketing Cookies: Used to deliver relevant content and track the effectiveness of our marketing efforts.",
      "Cookie Management: You can control cookie preferences through your browser settings or our cookie consent banner.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    icon: Globe,
    content: [
      "Global Operations: FIELDPORTER operates globally with data processing in New Zealand, United States, and European Union.",
      "Adequate Protection: All international data transfers are protected by adequate safeguards including Standard Contractual Clauses.",
      "Service Provider Compliance: Our service providers (Firebase, DeepSeek) maintain international compliance certifications.",
      "Legal Basis: International transfers are based on legitimate business interests and adequate protection measures.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: Clock,
    content: [
      "Consultation Records: Maintained for 7 years for business development and legal compliance purposes.",
      "AI Chat Data: Retained for 2 years for service improvement, then anonymized for research purposes.",
      "Marketing Data: Newsletter subscriptions and marketing preferences retained until unsubscribe request.",
      "Website Analytics: Aggregated analytics data retained for 3 years for business intelligence purposes.",
      "Automatic Deletion: Automated systems delete expired data according to our retention schedule.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    icon: Mail,
    content: [
      "Privacy Officer: privacy@fieldporter.com",
      "General Inquiries: freddy@fieldporter.com",
      "Business Address: New Zealand (Remote Worldwide)",
      "Response Time: We respond to privacy inquiries within 5 business days.",
      "Complaint Process: If you have concerns about our privacy practices, please contact us directly. You also have the right to lodge a complaint with your local data protection authority.",
    ],
  },
];

// Animation variants for staggered sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper className="pt-24">
      {/* Hero Section */}
      <section className="pt-24 pb-16 border-b border-white/10">
        <div className="container-fieldporter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-fieldporter-blue" />
              <span className="text-fieldporter-blue font-medium">
                Privacy & Data Protection
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-fieldporter-gray leading-relaxed mb-8">
              FIELDPORTER is committed to protecting your privacy and
              maintaining enterprise-grade data security standards. This policy
              explains how we collect, use, and protect your information in our
              AI consulting services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-sm text-fieldporter-gray">
                <strong>Last Updated:</strong> January 2025
              </div>
              <div className="text-sm text-fieldporter-gray">
                <strong>Effective Date:</strong> January 1, 2025
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 border-b border-white/10">
        <div className="container-fieldporter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Table of Contents
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sections.map((section, index) => (
                <motion.div key={section.id} variants={itemVariants}>
                  <Link
                    href={`#${section.id}`}
                    className="flex items-center space-x-3 p-4 rounded-lg glass-dark border border-white/10 hover:border-fieldporter-blue/30 hover:bg-white/[0.02] transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/5"
                  >
                    <section.icon className="w-5 h-5 text-fieldporter-blue group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="text-fieldporter-gray group-hover:text-white transition-colors duration-300">
                      {index + 1}. {section.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container-fieldporter">
          <div className="max-w-4xl space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-fieldporter-blue/10 border border-fieldporter-blue/20">
                    <section.icon className="w-6 h-6 text-fieldporter-blue" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-fieldporter-gray leading-relaxed text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 border-t border-white/10">
        <div className="container-fieldporter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="p-8 rounded-lg glass-dark border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Questions About This Policy?
              </h3>
              <p className="text-fieldporter-gray mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy or how we
                handle your data, please don&apos;t hesitate to contact us.
                We&apos;re committed to transparency and will respond to all
                privacy inquiries within 5 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="mailto:privacy@fieldporter.com"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Privacy Officer
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  General Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
