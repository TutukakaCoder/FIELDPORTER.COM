import { PageWrapper } from '@/components/layout';
import { FAQSection, MethodologySection, ResultsSection, ServiceHero } from '@/components/services';
import { Brain, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Metadata } from 'next';

interface FAQ {
  question: string;
  answer: string;
  category?: 'strategy' | 'implementation' | 'timeline' | 'investment';
}

export const metadata: Metadata = {
  title: 'AI Strategy Consulting | Enterprise AI Transformation',
  description:
    'Strategic AI consulting for Fortune 500 enterprises. We create actionable AI roadmaps that align technology capabilities with business objectives. 70% of AI initiatives fail - we ensure yours succeeds.',
  keywords: [
    'AI strategy consulting',
    'enterprise AI transformation',
    'AI roadmap development',
    'C-suite AI advisory',
    'Fortune 500 AI consulting',
    'strategic AI implementation',
    'AI business alignment',
  ],
  openGraph: {
    title: 'AI Strategy Consulting | FIELDPORTER',
    description:
      'Transform your enterprise with strategic AI implementation. Expert C-suite advisory for Fortune 500 AI transformation.',
    type: 'website',
    url: 'https://fieldporter.com/services/ai-strategy',
    images: [
      {
        url: '/og-ai-strategy.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER AI Strategy Consulting',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AIStrategyPage() {
  const heroData = {
    title: 'AI Strategy Consulting',
    subtitle: 'Business-First AI Framework',
    description:
      'Most AI initiatives fail because they lack business focus. We guide Fortune 500 leaders through strategic AI transformation using our proven Business-First AI Framework that delivers measurable ROI, not just technology implementations.',
    problemStatement:
      'Most AI initiatives fail because they lack business focus. 70% of enterprise AI projects never make it past pilot stage because they prioritize technology over business outcomes. We ensure yours succeeds.',
    icon: <Brain className='w-full h-full text-fieldporter-white' />,
    stats: [
      { value: '40%', label: 'Efficiency Gains' },
      { value: '6 Months', label: 'Payback Period' },
      { value: '3.2x', label: 'Measurable ROI' },
      { value: '85%', label: 'Success Rate' },
    ],
  };

  const methodologyData = {
    title: 'Business-First AI Framework',
    subtitle:
      'Our proven methodology focuses on business outcomes first, technology second. Refined through dozens of Fortune 500 transformations and tested in our own portfolio companies.',
    steps: [
      {
        phase: 'Assess',
        title: 'AI Readiness Assessment',
        description:
          'We conduct comprehensive business impact analysis and organizational capability assessments to identify your highest-value AI opportunities and readiness gaps.',
        deliverables: [
          'AI Readiness Assessment Report',
          'Business Impact Opportunity Matrix',
          'Organizational Change Readiness Evaluation',
          'Technology Infrastructure Audit',
          'Competitive AI Landscape Analysis',
          'Initial ROI Projections by Use Case',
        ],
        timeline: 'Weeks 1-2',
      },
      {
        phase: 'Plan',
        title: 'Implementation Roadmap',
        description:
          'We develop concrete AI implementation roadmaps with specific pilot projects, resource requirements, and measurable success criteria aligned with business objectives.',
        deliverables: [
          'Implementation Roadmap (12-18 months)',
          'Prioritized Pilot Project Portfolio',
          'ROI Framework with Success Metrics',
          'Resource and Budget Requirements',
          'Risk Mitigation and Governance Strategy',
          'Change Management and Training Plan',
        ],
        timeline: 'Weeks 3-4',
      },
      {
        phase: 'Pilot',
        title: 'Pilot Project Execution',
        description:
          'We guide your teams through initial pilot implementations, ensuring proper methodology, measurement, and learning capture for successful enterprise scaling.',
        deliverables: [
          'Pilot Project Implementation and Oversight',
          'Performance Measurement Dashboard',
          'Weekly Progress Reviews and Optimizations',
          'Team Training and Capability Development',
          'Lessons Learned Documentation',
          'Scaling Readiness Assessment',
        ],
        timeline: 'Months 2-4',
      },
      {
        phase: 'Scale',
        title: 'Enterprise Scaling',
        description:
          'We help you scale successful pilots across the enterprise while continuously optimizing performance and identifying new opportunities for AI-driven value creation.',
        deliverables: [
          'Enterprise Scaling Strategy and Execution',
          'Advanced AI Use Case Development',
          'Performance Optimization and Tuning',
          'Ongoing Advisory and Strategic Guidance',
          'Success Measurement and ROI Reporting',
          'Continuous Improvement Framework',
        ],
        timeline: 'Months 5-12',
      },
    ],
  };

  const resultsData = {
    title: 'We Build What We Recommend',
    subtitle:
      'Our strategic approach delivers measurable business impact because we test every recommendation in our own portfolio companies first. Here are the proven outcomes.',
    metrics: [
      {
        icon: <TrendingUp className='w-full h-full text-fieldporter-white' />,
        value: '40%',
        label: 'Efficiency Gains',
        description: 'Typical operational efficiency improvement within 6 months',
      },
      {
        icon: <Clock className='w-full h-full text-fieldporter-white' />,
        value: '6 Months',
        label: 'Payback Periods',
        description: 'Average time to full return on AI strategy investment',
      },
      {
        icon: <DollarSign className='w-full h-full text-fieldporter-white' />,
        value: '3.2x',
        label: 'Measurable ROI',
        description: 'Typical return on investment within first 18 months',
      },
      {
        icon: <Users className='w-full h-full text-fieldporter-white' />,
        value: '85%',
        label: 'Success Rate',
        description: 'AI initiatives that achieve or exceed projected outcomes',
      },
    ],
    caseStudy: {
      company: 'Fortune 500 Manufacturing Conglomerate',
      industry: 'Industrial Manufacturing',
      challenge:
        'A Fortune 100 manufacturer struggled with disconnected AI pilots across 15 business units, resulting in duplicated efforts, inconsistent results, and no clear path to enterprise-scale impact. Previous consulting engagements delivered theoretical frameworks without practical implementation guidance.',
      solution:
        'We implemented our Business-First AI Framework, leveraging proven methodologies from our own portfolio companies. We consolidated 23 disconnected pilots into 5 high-impact initiatives, established unified governance, and provided hands-on implementation guidance based on real-world experience.',
      results: [
        '40% reduction in operational costs through predictive maintenance',
        '$8.5M annual savings from AI-optimized supply chain',
        '65% improvement in quality control accuracy',
        '6-month payback period on AI strategy investment',
        'Unified AI governance framework across all business units',
      ],
      timeline: '15-month transformation',
    },
    expectations: {
      title: 'Get Your AI Strategy Assessment',
      items: [
        {
          phase: 'Discovery Call',
          outcome: 'Initial assessment of your AI readiness and highest-impact opportunities',
          timeline: '60 minutes',
        },
        {
          phase: 'Strategic Foundation',
          outcome: 'Comprehensive AI roadmap with prioritized initiatives and ROI projections',
          timeline: '30 days',
        },
        {
          phase: 'Pilot Success',
          outcome: 'Proven AI implementations with measurable business impact and scaling plans',
          timeline: '90 days',
        },
        {
          phase: 'Enterprise Transformation',
          outcome: 'Scaled AI capabilities delivering sustained competitive advantage',
          timeline: '12-18 months',
        },
      ],
    },
  };

  const faqData: { title: string; subtitle: string; faqs: FAQ[] } = {
    title: 'Frequently Asked Questions',
    subtitle:
      'Common questions from Fortune 500 executives about AI strategy consulting and what to expect from our engagement.',
    faqs: [
      {
        question: 'How long does implementation take?',
        answer:
          "Honest answer: meaningful AI transformation takes 12-18 months, not 6 weeks. However, you'll see measurable results from pilot projects within 90 days. Our Business-First AI Framework focuses on quick wins that build momentum while laying the foundation for enterprise-scale transformation.",
        category: 'timeline',
      },
      {
        question: "What if our team isn't technical?",
        answer:
          "That's exactly why we start with our AI Readiness Assessment. We've guided organizations from complete AI beginners to advanced practitioners. Our approach includes comprehensive change management, training programs, and capability development that adapts to your team's current technical level.",
        category: 'strategy',
      },
      {
        question: 'How do you address cost concerns and budget constraints?',
        answer:
          'We understand AI investment concerns. Our ROI Framework ensures every initiative has clear financial justification. Investment typically ranges from $250K to $1M+ for comprehensive strategy, but clients see 3.2x ROI within 18 months. We also offer phased approaches to spread investment over time.',
        category: 'investment',
      },
      {
        question: 'How do you handle complexity and reduce implementation risk?',
        answer:
          'We reduce complexity through our proven Assess-Plan-Pilot-Scale methodology. Every recommendation is tested in our own portfolio companies first. We start with simple, high-impact pilots before moving to complex implementations, ensuring each step builds confidence and capability.',
        category: 'implementation',
      },
      {
        question: 'What about security and data privacy concerns?',
        answer:
          'Security is built into every AI strategy from day one. We conduct comprehensive risk assessments, implement enterprise-grade security frameworks, and ensure all AI initiatives meet your industry compliance requirements. Our approach often improves security through better data governance.',
        category: 'implementation',
      },
      {
        question: 'How do you manage organizational change and employee concerns?',
        answer:
          'Change management is core to our methodology. We focus on augmenting human capabilities, not replacing people. Our approach includes stakeholder alignment, communication strategies, training programs, and clear career development paths that help employees embrace AI as a tool for higher-value work.',
        category: 'strategy',
      },
    ],
  };

  return (
    <PageWrapper>
      <ServiceHero {...heroData} />
      <MethodologySection {...methodologyData} />
      <ResultsSection {...resultsData} />
      <FAQSection {...faqData} />
    </PageWrapper>
  );
}
