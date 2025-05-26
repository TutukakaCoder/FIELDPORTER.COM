import { PageWrapper } from '@/components/layout';
import { FAQSection, MethodologySection, ResultsSection, ServiceHero } from '@/components/services';
import { Clock, Cog, DollarSign, TrendingUp, Zap } from 'lucide-react';
import { Metadata } from 'next';

interface FAQ {
  question: string;
  answer: string;
  category?: 'strategy' | 'implementation' | 'timeline' | 'investment';
}

export const metadata: Metadata = {
  title: 'Business Process Automation | Intelligent Workflow Solutions',
  description:
    'Transform manual processes with intelligent automation that delivers immediate ROI. We identify high-impact opportunities and implement solutions that scale across your enterprise.',
  keywords: [
    'business process automation',
    'intelligent automation',
    'workflow optimization',
    'enterprise automation',
    'process improvement',
    'RPA implementation',
    'AI-powered automation',
  ],
  openGraph: {
    title: 'Business Process Automation | FIELDPORTER',
    description:
      'Intelligent process automation that delivers immediate ROI. Transform manual workflows with enterprise-scale automation solutions.',
    type: 'website',
    url: 'https://fieldporter.com/services/automation',
    images: [
      {
        url: '/og-automation.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER Business Process Automation',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AutomationPage() {
  const heroData = {
    title: 'Business Process Automation',
    subtitle: 'Identify, Automate, Optimize, Scale',
    description:
      'Your team spends hours on tasks that software should handle. We focus on highest-impact processes first, implementing intelligent automation that delivers 60% time savings, 90% error reduction, and same-day implementation for simple workflows.',
    problemStatement:
      'Your team spends hours on tasks that software should handle. Manual processes drain productivity, create errors, and prevent your people from focusing on strategic work that drives business growth.',
    icon: <Cog className='w-full h-full text-fieldporter-white' />,
    stats: [
      { value: '60%', label: 'Time Savings' },
      { value: '90%', label: 'Error Reduction' },
      { value: 'Same Day', label: 'Implementation' },
      { value: '300%', label: 'Productivity Gain' },
    ],
  };

  const methodologyData = {
    title: 'Highest-Impact Process Automation',
    subtitle:
      'Our proven methodology focuses on highest-impact processes first: customer onboarding, data entry, reporting, and compliance checks. We automate what matters most to your business.',
    steps: [
      {
        phase: 'Identify',
        title: 'Process Discovery & Impact Analysis',
        description:
          'We analyze your current workflows to identify the highest-impact automation opportunities, focusing on repetitive, rule-based processes that consume significant time and resources.',
        deliverables: [
          'Process Mapping and Time Analysis',
          'Automation Opportunity Assessment',
          'ROI Impact Matrix by Process Type',
          'Quick Win Identification (same-day implementations)',
          'Resource and Technical Requirements',
          'Implementation Priority Roadmap',
        ],
        timeline: 'Week 1',
      },
      {
        phase: 'Automate',
        title: 'Rapid Implementation & Testing',
        description:
          'We implement automation solutions starting with quick wins, then progressing to complex workflows. Every automation is tested thoroughly before deployment to ensure reliability.',
        deliverables: [
          'Quick Win Automations (customer onboarding, data entry)',
          'Workflow Automation Solutions',
          'System Integration and API Connections',
          'User Interface and Dashboard Development',
          'Comprehensive Testing and Validation',
          'User Training and Documentation',
        ],
        timeline: 'Weeks 2-4',
      },
      {
        phase: 'Optimize',
        title: 'Performance Tuning & Enhancement',
        description:
          'We continuously monitor and optimize automated processes, identifying bottlenecks, improving performance, and enhancing functionality based on real-world usage.',
        deliverables: [
          'Performance Monitoring and Analytics',
          'Process Optimization and Refinement',
          'Error Handling and Exception Management',
          'User Feedback Integration',
          'Advanced Feature Development',
          'Efficiency Improvement Recommendations',
        ],
        timeline: 'Months 2-3',
      },
      {
        phase: 'Scale',
        title: 'Enterprise Expansion & Innovation',
        description:
          'We scale successful automations across departments and identify new opportunities for intelligent automation, building a comprehensive automation platform.',
        deliverables: [
          'Enterprise-Wide Automation Deployment',
          'Advanced Intelligent Automation Features',
          'Cross-Department Process Integration',
          'Automation Platform Development',
          'Ongoing Innovation and Enhancement',
          'Success Measurement and ROI Reporting',
        ],
        timeline: 'Months 4-6',
      },
    ],
  };

  const resultsData = {
    title: 'Real Examples from FIELDPORTER Operations',
    subtitle:
      "No, automation won't replace your team - it frees them for valuable work. Here are measurable outcomes from our own operational automation and client implementations.",
    metrics: [
      {
        icon: <Clock className='w-full h-full text-fieldporter-white' />,
        value: '60%',
        label: 'Time Savings',
        description: 'Average time reduction on customer onboarding processes',
      },
      {
        icon: <Zap className='w-full h-full text-fieldporter-white' />,
        value: '90%',
        label: 'Error Reduction',
        description: 'Decrease in data entry errors and compliance issues',
      },
      {
        icon: <DollarSign className='w-full h-full text-fieldporter-white' />,
        value: 'Same Day',
        label: 'Implementation',
        description: 'Time to deploy simple workflow automations',
      },
      {
        icon: <TrendingUp className='w-full h-full text-fieldporter-white' />,
        value: '300%',
        label: 'Productivity Gain',
        description: 'Team productivity improvement in automated workflows',
      },
    ],
    caseStudy: {
      company: 'Global Professional Services Firm',
      industry: 'Professional Services',
      challenge:
        'A Fortune 500 consulting firm processed over 2,000 client onboarding workflows monthly through manual processes, resulting in 5-day setup times, frequent errors in compliance documentation, and frustrated clients waiting to start engagements.',
      solution:
        'We implemented automated client onboarding workflows, intelligent document processing for compliance checks, and integrated reporting systems. The same automation framework we use in our own FIELDPORTER operations was adapted for their specific requirements.',
      results: [
        'Reduced client onboarding from 5 days to 4 hours',
        '90% of compliance checks now automated',
        '85% reduction in documentation errors',
        '60% time savings for client success teams',
        'Same-day implementation for simple workflow automations',
      ],
      timeline: '4-month implementation',
    },
    expectations: {
      title: 'Find Your Automation Opportunities',
      items: [
        {
          phase: 'Discovery Call',
          outcome: 'Automation opportunity assessment and quick win identification',
          timeline: '60 minutes',
        },
        {
          phase: 'Quick Wins',
          outcome: 'Same-day implementation of simple workflow automations',
          timeline: '1-7 days',
        },
        {
          phase: 'Scaled Impact',
          outcome: 'Multiple automated workflows with 60% time savings and error reduction',
          timeline: '30-90 days',
        },
        {
          phase: 'Enterprise Platform',
          outcome: 'Comprehensive automation platform enabling continuous optimization',
          timeline: '3-6 months',
        },
      ],
    },
  };

  const faqData: { title: string; subtitle: string; faqs: FAQ[] } = {
    title: 'Automation Opportunity Discovery',
    subtitle:
      'Common questions about business process automation and what to expect from our automation opportunity discovery call.',
    faqs: [
      {
        question: 'Which processes should we automate first for maximum impact?',
        answer:
          'We focus on highest-impact processes: customer onboarding (5-day to 4-hour reduction), data entry (90% error reduction), reporting (same-day automation), and compliance checks (automated validation). We start with quick wins that deliver immediate value while building toward complex automations.',
        category: 'strategy',
      },
      {
        question: "No, automation won't replace your team - but how do we manage change?",
        answer:
          'Automation frees your team for valuable work, not replacement. We focus on automating repetitive tasks so employees can handle strategic activities. Our change management includes training, clear communication about role evolution, and identifying new opportunities for team members to add value.',
        category: 'strategy',
      },
      {
        question: 'How quickly can we see results from automation implementation?',
        answer:
          'Simple workflow automations can be implemented same-day with immediate time savings. Customer onboarding automations typically show 60% time savings within 30 days. Complex process automations deliver full ROI within 90 days through reduced errors and increased productivity.',
        category: 'timeline',
      },
      {
        question: 'Do we need to replace our existing systems for automation?',
        answer:
          'No system replacement required. Our automation solutions integrate with your existing technology stack using APIs, workflow tools, and intelligent connectors. We work with what you have, enhancing rather than replacing your current systems.',
        category: 'implementation',
      },
      {
        question: 'How do you ensure automated processes maintain quality and compliance?',
        answer:
          'Automation actually improves compliance through consistent execution. We build audit trails, validation checks, and exception handling into every automated process. All automations include human oversight for complex decisions while handling routine tasks automatically.',
        category: 'implementation',
      },
      {
        question: "What's included in the automation opportunity discovery call?",
        answer:
          "Our 60-minute discovery call includes process mapping, quick win identification, ROI estimation for your highest-impact opportunities, and a clear roadmap for implementation. You'll leave with specific automation opportunities and timeline for same-day implementations.",
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
