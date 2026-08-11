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
      "FIELDPORTER LIMITED (“FIELDPORTER”, “we”, “us”) builds custom software, operational systems, and practical automation and AI capability for growing companies. This Privacy Policy explains how we collect, use, store, and share personal information when you use fieldporter.com, contact us, book a call, or subscribe to insights.",
      "This policy covers our public website and related enquiry, booking, and newsletter flows. It does not invent tools or processors we do not currently use.",
      "For privacy requests, email freddy@fieldporter.com.",
    ],
  },
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: Eye,
    content: [
      "Contact form: name, email address, optional organisation, what brings you here, your message or project details, and optional context such as timeline, current tools, and team size.",
      "Newsletter: email address and signup source (for example, Insights).",
      "Call booking: when you book through our Cal.com embed, Cal.com collects booking details such as name, email, timezone, and meeting time. We may also store booking records in our systems for follow-up.",
      "First-party site interactions: limited interaction events such as page URL, clicked element text, browser user agent, referrer, viewport size, scroll depth, and a session identifier. These are stored in Firebase Firestore for site improvement and are not Google Analytics cookies.",
      "Browser storage: preferences such as theme and short-lived session flags may be stored in localStorage or sessionStorage on your device.",
      "Email and delivery records: correspondence and notification metadata created when we reply to you or send transactional messages.",
      "Website chat: an on-site AI chat widget is not currently active. If we re-enable chat, we will update this policy before collecting chat content.",
    ],
  },
  {
    id: "information-use",
    title: "How We Use Information",
    icon: FileText,
    content: [
      "To respond to enquiries, qualify work, prepare proposals, and deliver custom software and automation services.",
      "To schedule and run discovery or project calls booked through Cal.com.",
      "To send insights you subscribed to, and to process unsubscribe requests when you ask us.",
      "To operate and improve the website using the first-party interaction events described above.",
      "To send transactional emails such as enquiry acknowledgements and internal notifications.",
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    icon: Users,
    content: [
      "We do not sell, rent, or trade your personal information for third-party marketing.",
      "We use service providers that process data for us: Google Firebase (Firestore and related infrastructure), Resend (email delivery), and Cal.com (appointment booking).",
      "We may disclose information when required by law, to protect our rights or users, or as part of a genuine business transfer such as a merger or asset sale.",
      "We may share information with your explicit consent for a specific purpose.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: [
      "We protect data in transit using HTTPS and store enquiry, newsletter, booking, and interaction records in Firebase with access limited to people who need it for delivery and operations.",
      "Email is sent through Resend. Booking data is also processed by Cal.com under Cal.com’s own terms and privacy practices.",
      "No security practice is perfect. If you believe your information has been compromised in connection with our services, contact freddy@fieldporter.com.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: Globe,
    content: [
      "You can ask what personal information we hold about you, and request a copy.",
      "You can ask us to correct inaccurate or incomplete information.",
      "You can ask us to delete information, subject to records we must keep for legal, accounting, or legitimate business reasons.",
      "You can unsubscribe from marketing emails by contacting us. Transactional messages about an enquiry or booking may still be necessary.",
      "To exercise these rights, email freddy@fieldporter.com. We aim to respond within 5 business days.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Browser Storage",
    icon: Globe,
    content: [
      "We do not currently load Google Analytics, Hotjar, or similar third-party analytics or marketing pixel scripts on this website.",
      "We do not currently show a cookie consent banner because we are not setting non-essential analytics or marketing cookies from our own code.",
      "We use browser localStorage and sessionStorage for things like theme preference and a short-lived session identifier used with first-party Firestore interaction logging.",
      "When you open the booking embed, Cal.com may set its own cookies or similar technologies so the calendar works. Those are controlled by Cal.com.",
      "If we later enable Google Analytics or other non-essential tracking, we will add an appropriate consent control and update this policy first.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    icon: Globe,
    content: [
      "FIELDPORTER is based in New Zealand and works with clients remotely worldwide.",
      "Our processors (including Google Firebase, Resend, and Cal.com) may process data in countries outside New Zealand, commonly including the United States.",
      "By using the website, submitting a form, booking a call, or subscribing, you understand that your information may be processed in those locations under each provider’s terms.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: Clock,
    content: [
      "Enquiry and project-related records are kept for as long as needed to respond, deliver work, and meet legal or accounting needs.",
      "Newsletter subscriptions are kept until you ask to unsubscribe or we remove the list entry.",
      "Booking records are kept as needed to run the meeting and follow up.",
      "First-party interaction logs are kept as needed for site improvement and then removed or reduced when no longer useful.",
      "We do not currently run an automated purge job. Deletion and correction are handled when you request them, or when we manually clean records as part of normal operations.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    icon: Mail,
    content: [
      "Privacy requests and general enquiries: freddy@fieldporter.com",
      "Location: New Zealand (remote / worldwide). We do not operate a public walk-in office.",
      "We aim to respond to privacy requests within 5 business days.",
      "If you are not satisfied with our response, you may raise the matter with the Office of the Privacy Commissioner in New Zealand or another applicable data protection authority.",
    ],
  },
];

// Animation variants for staggered sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
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
            <p className="text-xl text-fieldporter-gray leading-relaxed mb-6">
              How FIELDPORTER collects, uses, and protects information when you
              use our website, contact us, book a call, or subscribe to
              insights. Written to match what the site actually does today.
            </p>
            <p className="text-sm text-fieldporter-gray/80 leading-relaxed mb-8">
              Services are provided by FIELDPORTER LIMITED (Company No. 1301915,
              NZBN 9429035991564, GST 085-395-475).
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-sm text-fieldporter-gray">
                <strong>Last Updated:</strong> August 2026
              </div>
              <div className="text-sm text-fieldporter-gray">
                <strong>Effective Date:</strong> August 11, 2026
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
                    className="flex items-center space-x-3 p-4 rounded-lg glass-dark border border-white/10 hover:border-fieldporter-blue/40 hover:bg-white/[0.04] transition-all duration-500 group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fieldporter-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98]"
                  >
                    <section.icon className="w-5 h-5 text-fieldporter-blue group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                    <span className="text-fieldporter-gray group-hover:text-white transition-colors duration-500">
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
            <div className="p-8 rounded-lg glass-dark border border-white/10 hover:border-fieldporter-blue/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500">
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
                  href="mailto:freddy@fieldporter.com"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Privacy Requests
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
