'use client';

import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Gavel,
  Handshake,
  Mail,
  Scale,
  Shield,
  Users,
} from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

const sections = [
  {
    id: 'service-overview',
    title: 'Service Overview',
    icon: Handshake,
    content: [
      'FIELDPORTER provides premium AI consulting services including strategic AI transformation consulting, business process automation solutions, VC portfolio advisory services, and custom AI integration and implementation.',
      'Our services are delivered through a collaborative partnership approach, combining deep AI expertise with strategic business acumen to help enterprise clients achieve measurable transformation outcomes.',
      'All services are provided on a professional consulting basis, with deliverables including strategic recommendations, implementation roadmaps, custom automation solutions, and ongoing advisory support.',
      'Service delivery methods include remote consultation, on-site workshops, digital collaboration platforms, and ongoing strategic advisory relationships tailored to each client&apos;s specific needs and objectives.',
    ],
  },
  {
    id: 'consultation-process',
    title: 'Consultation & Engagement Process',
    icon: Users,
    content: [
      'Initial Consultation: All engagements begin with a comprehensive consultation to understand your business objectives, current AI maturity, and transformation goals.',
      'Scope Definition: We work collaboratively to define project scope, deliverables, timelines, and success metrics through a detailed proposal process.',
      'Client Collaboration: Successful outcomes require active client participation, including access to key stakeholders, business data, and decision-making authority.',
      'Project Management: We provide structured project management with regular milestone reviews, progress updates, and stakeholder communication throughout the engagement.',
      'Quality Assurance: All deliverables undergo internal quality review and client approval processes to ensure they meet agreed specifications and business objectives.',
    ],
  },
  {
    id: 'service-limitations',
    title: 'Service Limitations & Disclaimers',
    icon: AlertTriangle,
    content: [
      'Consulting Nature: Our services provide strategic advice, recommendations, and implementation guidance. We do not guarantee specific business outcomes or ROI results.',
      'AI Implementation Dependencies: Successful AI implementations depend on client systems, data quality, organizational readiness, and third-party technology platforms beyond our direct control.',
      'Third-Party Integrations: We work with various AI platforms and business tools. Service availability and functionality may be affected by third-party provider changes or limitations.',
      'Regulatory Compliance: Clients are responsible for ensuring AI implementations comply with industry-specific regulations and legal requirements in their jurisdictions.',
      'Business Risk: AI transformation involves inherent business risks. Clients should conduct their own risk assessments and implement appropriate risk management strategies.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: Shield,
    content: [
      'Client Ownership: Clients retain full ownership of custom AI implementations, business processes, and proprietary data developed during our engagement.',
      'FIELDPORTER Methodology: Our strategic frameworks, consulting methodologies, and proprietary analysis tools remain the intellectual property of FIELDPORTER.',
      'Third-Party Licensing: Clients are responsible for obtaining appropriate licenses for third-party AI platforms, software tools, and data sources used in implementations.',
      'Confidentiality: Both parties agree to maintain strict confidentiality regarding proprietary information, business strategies, and competitive intelligence shared during the engagement.',
      'Work Product: All custom deliverables created specifically for the client become client property upon full payment, while general methodologies and frameworks remain with FIELDPORTER.',
    ],
  },
  {
    id: 'payment-terms',
    title: 'Payment Terms',
    icon: FileText,
    content: [
      'Fee Structure: Consultation fees are structured based on project scope, complexity, and timeline. We offer project-based pricing, monthly retainers, and hourly consulting rates.',
      'Payment Schedule: Project payments are typically structured with 50% due upon engagement commencement and 50% upon deliverable completion, with milestone payments for larger projects.',
      'Invoice Terms: Invoices are due within 30 days of receipt. Late payments may incur interest charges of 1.5% per month or the maximum rate permitted by law.',
      'Expense Reimbursement: Client-approved expenses for travel, software licenses, and third-party services are billed separately with appropriate documentation.',
      'Retainer Agreements: Monthly retainer arrangements provide priority access to consulting services with agreed-upon service levels and response times.',
    ],
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality & Data Protection',
    icon: Shield,
    content: [
      'Mutual Confidentiality: Both FIELDPORTER and clients agree to maintain strict confidentiality regarding all proprietary information, business strategies, and competitive intelligence.',
      'Data Security: We implement enterprise-grade security measures including encryption, access controls, and secure data handling procedures for all client information.',
      'AI Chat Privacy: Conversations with our AI chat system are used solely for service improvement and business intelligence, with strict privacy protections in place.',
      'Business Intelligence: Aggregated, anonymized insights may be used for industry research and service development, with no client-specific information disclosed.',
      'Data Retention: Client data is retained according to our privacy policy and automatically deleted according to agreed retention schedules.',
    ],
  },
  {
    id: 'liability-limitation',
    title: 'Limitation of Liability',
    icon: Scale,
    content: [
      'Professional Liability: FIELDPORTER maintains professional liability insurance coverage appropriate for our consulting services and client engagement scope.',
      'Limitation of Damages: Our liability for any claims is limited to the total fees paid for the specific engagement, excluding consequential, indirect, or punitive damages.',
      'Force Majeure: Neither party is liable for delays or failures due to circumstances beyond reasonable control, including natural disasters, pandemics, or technology failures.',
      'Client System Risks: Clients assume responsibility for risks associated with integrating AI solutions into their existing systems and business processes.',
      'Third-Party Dependencies: We are not liable for issues arising from third-party AI platforms, software providers, or data sources beyond our direct control.',
    ],
  },
  {
    id: 'termination',
    title: 'Termination & Cancellation',
    icon: Clock,
    content: [
      'Termination Rights: Either party may terminate the engagement with 30 days written notice, subject to completion of work in progress and payment obligations.',
      'Work Product Delivery: Upon termination, all completed work products and deliverables are provided to the client, with final invoicing for services rendered.',
      'Outstanding Payments: All outstanding payment obligations remain due upon termination, including work completed and approved expenses incurred.',
      'Transition Support: We provide reasonable transition support to ensure smooth handover of work products and knowledge transfer to client teams or successor consultants.',
      "Confidentiality Survival: Confidentiality obligations continue indefinitely beyond engagement termination to protect both parties' proprietary information.",
    ],
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    icon: Gavel,
    content: [
      'Professional Mediation: We prefer to resolve disputes through professional mediation, maintaining business relationships while addressing concerns constructively.',
      'Governing Law: These terms are governed by New Zealand law, with disputes subject to New Zealand jurisdiction unless otherwise agreed.',
      'Alternative Resolution: Before pursuing legal action, parties agree to attempt resolution through direct negotiation and professional mediation services.',
      'Legal Fees: In legal proceedings, the prevailing party may be entitled to reasonable attorney fees and costs as determined by the court.',
      'Severability: If any provision of these terms is deemed unenforceable, the remaining provisions continue in full force and effect.',
    ],
  },
  {
    id: 'general-provisions',
    title: 'General Provisions',
    icon: CheckCircle,
    content: [
      'Entire Agreement: These terms, together with the specific engagement proposal, constitute the entire agreement between the parties.',
      'Modifications: Changes to these terms must be agreed in writing and signed by authorized representatives of both parties.',
      'Assignment: Neither party may assign their rights or obligations without prior written consent, except in the case of business acquisition or merger.',
      'Notice Requirements: All formal notices must be provided in writing via email or certified mail to the addresses specified in the engagement agreement.',
      'Professional Standards: FIELDPORTER adheres to the highest professional standards and ethical guidelines in all client engagements and business relationships.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className='min-h-screen bg-black'>
      <Head>
        <title>Terms of Service | FIELDPORTER</title>
        <meta
          name='description'
          content="FIELDPORTER's comprehensive terms of service for AI consulting, business automation, and strategic advisory services."
        />
        <meta property='og:title' content='Terms of Service | FIELDPORTER' />
        <meta
          property='og:description'
          content="Professional terms of service for FIELDPORTER's AI consulting and business automation services."
        />
        <meta property='og:type' content='website' />
      </Head>

      {/* Hero Section */}
      <section className='pt-24 pb-16 border-b border-white/10'>
        <div className='container-fieldporter'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-4xl'
          >
            <div className='flex items-center space-x-3 mb-6'>
              <Scale className='w-8 h-8 text-fieldporter-blue' />
              <span className='text-fieldporter-blue font-medium'>Legal Terms & Conditions</span>
            </div>
            <h1 className='text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
              Terms of Service
            </h1>
            <p className='text-xl text-fieldporter-gray leading-relaxed mb-8'>
              Professional terms governing FIELDPORTER&apos;s AI consulting services, designed to
              protect both parties while fostering successful collaborative partnerships in AI
              transformation and business automation.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='text-sm text-fieldporter-gray'>
                <strong>Last Updated:</strong> January 2025
              </div>
              <div className='text-sm text-fieldporter-gray'>
                <strong>Effective Date:</strong> January 1, 2025
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className='py-12 border-b border-white/10'>
        <div className='container-fieldporter'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='max-w-4xl'
          >
            <h2 className='text-2xl font-bold text-white mb-6'>Table of Contents</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {sections.map((section, index) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className='flex items-center space-x-3 p-4 rounded-lg glass-dark border border-white/10 hover:border-fieldporter-blue/30 transition-all duration-200 group'
                >
                  <section.icon className='w-5 h-5 text-fieldporter-blue group-hover:text-white transition-colors' />
                  <span className='text-fieldporter-gray group-hover:text-white transition-colors'>
                    {index + 1}. {section.title}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className='py-16'>
        <div className='container-fieldporter'>
          <div className='max-w-4xl space-y-16'>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='scroll-mt-24'
              >
                <div className='flex items-center space-x-4 mb-6'>
                  <div className='p-3 rounded-lg bg-fieldporter-blue/10 border border-fieldporter-blue/20'>
                    <section.icon className='w-6 h-6 text-fieldporter-blue' />
                  </div>
                  <h2 className='text-3xl font-bold text-white'>{section.title}</h2>
                </div>
                <div className='space-y-4'>
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className='text-fieldporter-gray leading-relaxed text-lg'>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Partnership Section */}
      <section className='py-16 border-t border-white/10'>
        <div className='container-fieldporter'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='max-w-4xl'
          >
            <div className='p-8 rounded-lg glass-dark border border-white/10'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Ready to Begin Your AI Transformation?
              </h3>
              <p className='text-fieldporter-gray mb-6 leading-relaxed'>
                These terms are designed to protect both parties while fostering successful
                collaborative partnerships. We believe in transparency, professionalism, and
                delivering measurable value through our AI consulting services.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href='/contact'
                  className='btn-primary inline-flex items-center justify-center'
                >
                  <Handshake className='w-4 h-4 mr-2' />
                  Start Consultation
                </Link>
                <Link
                  href='mailto:freddy@fieldporter.com'
                  className='btn-secondary inline-flex items-center justify-center'
                >
                  <Mail className='w-4 h-4 mr-2' />
                  Legal Questions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Acceptance Notice */}
      <section className='py-12 border-t border-white/10'>
        <div className='container-fieldporter'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='max-w-4xl'
          >
            <div className='p-6 rounded-lg bg-fieldporter-blue/5 border border-fieldporter-blue/20'>
              <div className='flex items-start space-x-3'>
                <CheckCircle className='w-6 h-6 text-fieldporter-blue flex-shrink-0 mt-1' />
                <div>
                  <h4 className='text-white font-semibold mb-2'>Acceptance of Terms</h4>
                  <p className='text-fieldporter-gray text-sm leading-relaxed'>
                    By engaging FIELDPORTER&apos;s services, requesting consultations, or using our
                    website and AI chat features, you acknowledge that you have read, understood,
                    and agree to be bound by these Terms of Service and our Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
