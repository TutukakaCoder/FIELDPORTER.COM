import { PageWrapper } from '@/components/layout';
import { FAQSection, MethodologySection, ResultsSection, ServiceHero } from '@/components/services';
import { BarChart3, Clock, DollarSign, Target, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';

interface FAQ {
  question: string;
  answer: string;
  category?: 'strategy' | 'implementation' | 'timeline' | 'investment';
}

export const metadata: Metadata = {
  title: 'VC Portfolio Optimization | AI Strategy for Portfolio Companies',
  description:
    'Strategic AI guidance for portfolio companies and investment due diligence. We accelerate growth through targeted AI implementations and data-driven insights for VC firms.',
  keywords: [
    'VC portfolio optimization',
    'portfolio company AI strategy',
    'investment due diligence',
    'AI startup consulting',
    'venture capital AI advisory',
    'portfolio acceleration',
    'exit preparation',
  ],
  openGraph: {
    title: 'VC Portfolio Optimization | FIELDPORTER',
    description:
      'Strategic AI guidance for portfolio companies. Accelerate growth and enhance valuations through targeted AI implementations.',
    type: 'website',
    url: 'https://fieldporter.com/services/vc-consulting',
    images: [
      {
        url: '/og-vc-consulting.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER VC Portfolio Optimization',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VCConsultingPage() {
  const heroData = {
    title: 'VC Portfolio Optimization',
    subtitle: 'AI-Driven Portfolio Acceleration',
    description:
      'As operators building our own AI companies, we understand both investor and founder perspectives. We help portfolio companies increase valuations by demonstrating AI-driven competitive moats and accelerate growth through strategic technology implementations.',
    problemStatement:
      "Portfolio companies struggle with AI strategy and implementation while VC firms need better due diligence for AI-related investments. Traditional consultants don't understand the unique pressures and timelines of venture-backed companies.",
    icon: <TrendingUp className='w-full h-full text-fieldporter-white' />,
    stats: [
      { value: '2.3x', label: 'Valuation Increase' },
      { value: '30 Days', label: 'AI Readiness Assessment' },
      { value: '85%', label: 'Portfolio Success Rate' },
      { value: '50+', label: 'Companies Accelerated' },
    ],
  };

  const methodologyData = {
    title: 'Portfolio Acceleration Protocol',
    subtitle:
      'Our systematic approach to portfolio company transformation, designed specifically for the unique needs and timelines of venture-backed companies.',
    steps: [
      {
        phase: 'Assessment',
        title: 'AI Readiness & Opportunity Mapping',
        description:
          'We conduct rapid assessments of portfolio companies to identify AI opportunities, competitive positioning, and implementation readiness within investor timelines.',
        deliverables: [
          'Comprehensive AI readiness assessment',
          'Competitive landscape analysis',
          'Technology stack evaluation',
          'Market opportunity sizing',
          'Implementation roadmap with milestones',
          'Investment requirement analysis',
        ],
        timeline: '2-3 weeks',
      },
      {
        phase: 'Strategy',
        title: 'Growth Acceleration Planning',
        description:
          'We develop AI strategies that align with growth objectives, funding stages, and exit timelines while creating demonstrable competitive advantages.',
        deliverables: [
          'AI-driven growth strategy',
          'Competitive differentiation framework',
          'Technology implementation roadmap',
          'Resource and hiring plans',
          'Milestone and KPI framework',
          'Investor communication strategy',
        ],
        timeline: '3-4 weeks',
      },
      {
        phase: 'Implementation',
        title: 'Rapid Deployment & Validation',
        description:
          'We guide fast-paced implementation of AI capabilities that deliver measurable business impact and create compelling investor narratives.',
        deliverables: [
          'MVP AI implementations',
          'Performance measurement systems',
          'Customer validation and feedback',
          'Scaling preparation and requirements',
          'Team capability development',
          'Progress reporting and optimization',
        ],
        timeline: '2-4 months',
      },
      {
        phase: 'Scaling',
        title: 'Value Creation & Exit Preparation',
        description:
          'We help scale successful implementations while building the AI capabilities and metrics that enhance company valuations and exit readiness.',
        deliverables: [
          'Enterprise-scale AI capabilities',
          'Valuation enhancement strategies',
          'Exit preparation and positioning',
          'Advanced analytics and insights',
          'Ongoing strategic advisory',
          'Investor relations support',
        ],
        timeline: 'Ongoing',
      },
    ],
  };

  const resultsData = {
    title: 'Portfolio Performance Enhancement',
    subtitle:
      'Our portfolio optimization approach delivers measurable value creation for both portfolio companies and their investors.',
    metrics: [
      {
        icon: <BarChart3 className='w-full h-full text-fieldporter-white' />,
        value: '2.3x',
        label: 'Valuation Increase',
        description: 'Average valuation improvement through AI implementation',
      },
      {
        icon: <Target className='w-full h-full text-fieldporter-white' />,
        value: '65%',
        label: 'Revenue Growth',
        description: 'Average revenue acceleration in portfolio companies',
      },
      {
        icon: <Clock className='w-full h-full text-fieldporter-white' />,
        value: '6 Months',
        label: 'Time to Impact',
        description: 'Average time from strategy to measurable business results',
      },
      {
        icon: <DollarSign className='w-full h-full text-fieldporter-white' />,
        value: '4.2x',
        label: 'Exit Multiple',
        description: 'Average exit multiple improvement with AI capabilities',
      },
    ],
    caseStudy: {
      company: 'Series B SaaS Platform',
      industry: 'Enterprise Software',
      challenge:
        'A Series B SaaS company faced competitive pressure and needed to differentiate their platform while preparing for Series C funding. Their manual customer success processes were limiting growth and retention.',
      solution:
        'We implemented AI-powered customer success automation, predictive churn prevention, and intelligent product recommendations that created a compelling competitive moat and improved unit economics.',
      results: [
        '40% reduction in customer churn through predictive interventions',
        '2.5x increase in expansion revenue from AI recommendations',
        '60% improvement in customer success team efficiency',
        'Successfully raised Series C at 3x higher valuation',
        'AI capabilities became key differentiator in competitive deals',
      ],
      timeline: '8-month transformation',
    },
    expectations: {
      title: 'Portfolio Acceleration Timeline',
      items: [
        {
          phase: 'Quick Assessment',
          outcome: 'Complete AI readiness evaluation and opportunity identification',
          timeline: '30 days',
        },
        {
          phase: 'Strategic Implementation',
          outcome:
            'AI capabilities delivering measurable business impact and competitive advantage',
          timeline: '6 months',
        },
        {
          phase: 'Value Realization',
          outcome: 'Enhanced valuations and exit readiness through proven AI-driven growth',
          timeline: '12-18 months',
        },
      ],
    },
  };

  const faqData: { title: string; subtitle: string; faqs: FAQ[] } = {
    title: 'VC Portfolio Questions',
    subtitle:
      'Common questions from venture capital firms and portfolio company leaders about AI strategy and implementation.',
    faqs: [
      {
        question: 'How do you work with our existing portfolio company teams?',
        answer:
          'We integrate directly with portfolio company leadership and work alongside their existing teams. Our approach is collaborative, not disruptive. We provide strategic guidance while empowering internal teams to execute, ensuring knowledge transfer and capability building.',
        category: 'implementation',
      },
      {
        question: "What's the typical investment required for portfolio company AI transformation?",
        answer:
          'Investment varies by company stage and scope, typically ranging from $100K-$500K for comprehensive AI strategy and initial implementations. Most portfolio companies see 3-5x ROI within 12-18 months through improved metrics and enhanced valuations.',
        category: 'investment',
      },
      {
        question: 'How do you help with due diligence on AI-related investments?',
        answer:
          'We provide technical and strategic due diligence for AI companies, evaluating technology capabilities, market positioning, competitive advantages, and scaling potential. Our operator perspective helps identify both opportunities and risks that traditional DD might miss.',
        category: 'strategy',
      },
      {
        question: "Can you help portfolio companies that aren't AI-native?",
        answer:
          'Absolutely. Many of our most successful engagements are with traditional companies adding AI capabilities. We help identify the highest-impact AI applications for their business model and implement solutions that create genuine competitive advantages.',
        category: 'strategy',
      },
      {
        question: 'How do you measure success in portfolio company engagements?',
        answer:
          'We track both business metrics (revenue growth, customer retention, operational efficiency) and investment metrics (valuation improvement, exit readiness, competitive positioning). Success is measured by tangible business impact, not just technology implementation.',
        category: 'strategy',
      },
      {
        question: "What happens if a portfolio company isn't ready for AI implementation?",
        answer:
          'We start with readiness assessment and capability building. Not every company is ready for advanced AI, but most can benefit from intelligent automation and data-driven insights. We create realistic roadmaps that match company maturity and resources.',
        category: 'implementation',
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
