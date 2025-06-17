import { PageWrapper } from '@/components/layout';
import { ContactSection } from '@/components/services/contact-section';
import { FAQSection } from '@/components/services/faq-section';
import { MethodologySection } from '@/components/services/methodology-section';
import { ResultsSection } from '@/components/services/results-section';
import { ServiceHero } from '@/components/services/service-hero';
import { BookOpen, Building2, CheckCircle, Code, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Strategic Research & Development | FIELDPORTER',
  description:
    'Strategic research intelligence, rapid development, workflow optimization, and AI training. Direct solutions with clear timelines and transparent pricing.',
  keywords: [
    'strategic research intelligence',
    'rapid development',
    'workflow optimization',
    'AI training',
    'Frederick Hopkins',
    'business automation',
    'AI consulting',
  ],
  openGraph: {
    title: 'Four Things We Do | FIELDPORTER',
    description:
      'Strategic research intelligence, rapid development, workflow optimization, and AI training with transparent pricing.',
    type: 'website',
    url: 'https://fieldporter.com/services',
    siteName: 'FIELDPORTER',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER Services - Frederick Hopkins',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Four Things We Do | FIELDPORTER',
    description:
      'Strategic research intelligence, rapid development, workflow optimization, and AI training with transparent pricing.',
    images: ['/og-image.jpg'],
  },
};

const heroData = {
  title: 'Four Things We Do',
  subtitle: 'Direct solutions for businesses that want working AI systems, not consulting theory.',
  description:
    'We combine systematic research methodology with hands-on development. Building agents, knowledge bases and preparing business professionals with the necessary skills to compete.',
  stats: [], // Remove stats cards
  ctaText: 'Schedule Strategy Discussion',
  ctaHref: '/contact',
};

const services = [
  {
    id: 'strategic-research',
    phase: '01',
    icon: TrendingUp,
    title: 'Strategic Research Intelligence',
    duration: '3-5 days',
    description:
      'Complex market analysis delivered in days, not weeks. Deep research methodology scanning thousands of sources with AI agents across multiple databases.',
    detailedExplanation:
      'Traditional market research takes 4-6 weeks because analysts work sequentially through limited sources. My systematic methodology processes thousands of sources simultaneously while maintaining accuracy through validation phases. When researching market entry opportunities, I analyze regulatory landscapes, distribution partnerships, customer behavior patterns, technology requirements, and competitive positioning - all simultaneously across multiple information sources. Recent clothing brand expansion research delivered complete US market entry strategy in 1 week versus typical consultant timelines.',
    outcomes: [
      'Comprehensive analysis in 3-5 days versus traditional 4-6 weeks',
      'Multi-source data validation across thousands of sources',
      'Strategic insights enabling faster decision-making',
      'Complete market intelligence and competitive analysis',
    ],
    proof:
      'What You Get: Comprehensive market intelligence, competitive analysis, strategic frameworks that inform business decisions.',
    investment: '$3,000-$8,000 depending on research scope and market complexity.',
    timeline: '3-5 days',
    timelineStyle: 'prototype',
  },
  {
    id: 'rapid-development',
    phase: '02',
    icon: Code,
    title: 'Rapid Development & Integration',
    duration: '1-2 weeks',
    description:
      'From concept to working system in 1-2 weeks. Rapid prototyping to validate concepts, full-stack development for small-scale applications, and API integration.',
    detailedExplanation:
      'I build working prototypes that prove concepts and provide clear technical roadmaps. My development process has a broad foundation (React, Typescript, Mongo/Firebase), then integrates whatever AI tools make sense for your specific challenge - Claude for natural language processing, various APIs for data connections, automation tools for workflow management (n8n). The Self-Development Platform running for 8+ months demonstrates production-grade capability. For clients, rapid validation with complete handoff documentation typically creates more value than lengthy development partnerships.',
    outcomes: [
      'Functional applications ready for immediate deployment and testing',
      'API endpoints for existing system integration and data flow',
      'Complete technical documentation and handoff materials',
      'Production-ready features with proven React, Firebase/Mongo, TypeScript stack',
    ],
    proof:
      'What You Get: Working applications, API integrations, technical documentation that enables your team to build confidently.',
    investment: '$2,000-$8,000 depending on complexity and integration requirements.',
    timeline: '1-2 weeks',
    timelineStyle: 'training',
  },
  {
    id: 'workflow-optimization',
    phase: '03',
    icon: Building2,
    title: 'Process Efficiency & Workflow Optimization',
    duration: '2-4 weeks',
    description:
      'Transform manual workflows into automated systems. Recent client reduced weekly administrative time from 15 hours to 4 hours through workflow optimization.',
    detailedExplanation:
      'Most businesses lose enormous time on manual tasks that software should handle. I identify these bottlenecks and build automation solutions using whatever combination of tools creates the best results. This is about finding the repetitive tasks eating up 5-15 hours weekly and creating reliable automation that handles them consistently. Lead qualification processes, research compilation workflows, data processing sequences, customer communication automation - these represent perfect automation targets with immediate measurable impact.',
    outcomes: [
      'Business workflow analysis and automation implementation',
      'Lead generation and outreach system optimization',
      'Administrative task elimination with measurable time savings',
      'Marketing process streamlining with training and handoff',
    ],
    proof:
      'What You Get: Automated workflows, measurable efficiency gains, team training so you can maintain and improve systems independently.',
    investment: '$2,500-$6,000 depending on workflow complexity and automation scope.',
    timeline: '2-4 weeks',
    timelineStyle: 'research',
  },
  {
    id: 'ai-training',
    phase: '04',
    icon: BookOpen,
    title: 'AI Training & Implementation Education',
    duration: 'Custom sessions',
    description:
      'Become an AI power user in your specific industry. Project knowledge systems, prompt engineering for consistent results, AI tool selection, and workflow integration.',
    detailedExplanation:
      "Most AI training teaches generic techniques that don't translate to business value. I teach the specific approaches I use daily in revenue-generating businesses - how to set up project knowledge systems so AI understands your context, prompt engineering techniques that get consistent results, tool selection for different use cases. The goal is making you genuinely capable with AI tools rather than creating ongoing service dependency.",
    outcomes: [
      'Custom AI knowledge bases for your business contexts and requirements',
      'Industry-specific prompt development for consistent, reliable results',
      'AI tool selection and optimization for your workflows',
      'Sustainable skill development reducing long-term dependency',
    ],
    proof:
      'What You Get: Practical AI skills, custom knowledge systems, sustainable capabilities you can develop independently.',
    investment:
      '$75-$150 per hour for individual training sessions, flexible project-based pricing for team workshops.',
    timeline: 'Custom sessions',
    timelineStyle: 'portfolio',
  },
];

const methodologyData = {
  title: 'How Strategic Research Intelligence Works',
  subtitle:
    "Here's an example of our research process for the Strategic Research Intelligence service:",
  phases: [
    {
      phase: '01',
      title: 'Foundation',
      description:
        'Gather all your business context - pitch decks, processes, investment memorandums, competitive landscape, strategic objectives. This creates comprehensive project knowledge that makes AI analysis specific to your situation.',
      deliverables: [
        'Complete business context mapping and documentation',
        'Strategic objectives analysis and priority framework',
        'Competitive landscape assessment and positioning analysis',
        'Investment memorandums and pitch deck strategic review',
        'Project knowledge base creation for AI-specific context',
      ],
      timeline: 'Foundation Phase',
      timelineStyle: 'research',
    },
    {
      phase: '02',
      title: 'Deep Research',
      description:
        'Using Claude for contextual understanding, Gemini for deep analysis, DeepSeek for cost-effective bulk processing, plus specialized research tools, systematically scan thousands of sources based on your specific objectives.',
      deliverables: [
        'Claude integration for contextual understanding and analysis',
        'Gemini deployment for comprehensive deep research processing',
        'DeepSeek utilization for cost-effective bulk data processing',
        'Specialized research tools and database integration',
        'Parallel source processing across thousands of information sources',
      ],
      timeline: 'Research Phase',
      timelineStyle: 'prototype',
    },
    {
      phase: '03',
      title: 'Validation & Filtering',
      description:
        "Raw AI research produces massive information volumes - often 70+ documents with 30+ pages each. Systematically filter this down to useful intelligence, removing everything that doesn't directly inform your strategic decisions.",
      deliverables: [
        'Systematic information filtering and relevance assessment',
        'Strategic decision framework application to research data',
        'Intelligence extraction from bulk research volumes',
        'Jargon elimination and clarity-focused content refinement',
        'Decision-relevant insight prioritization and organization',
      ],
      timeline: 'Validation Phase',
      timelineStyle: 'advisory',
    },
    {
      phase: '04',
      title: 'Cross-Model Validation',
      description:
        'Run refined information through different AI models to catch inconsistencies and verify source quality. Academic research gets weighted appropriately versus social media discussions.',
      deliverables: [
        'Cross-model validation for accuracy and consistency verification',
        'Source quality assessment and credibility weighting',
        'Academic research versus social media content differentiation',
        'Hallucination prevention through systematic verification processes',
        'Reliability framework application for business decision support',
      ],
      timeline: 'Validation Phase',
      timelineStyle: 'research',
    },
    {
      phase: '05',
      title: 'Strategic Documentation',
      description:
        'Convert validated research into usable business documentation - strategic frameworks, competitive analysis, implementation roadmaps that inform decisions.',
      deliverables: [
        'Strategic frameworks and decision-making tools',
        'Competitive analysis with positioning insights',
        'Implementation roadmaps with clear next steps',
        'Business documentation designed for operational use',
        'Complete handoff materials and ongoing support guidance',
      ],
      timeline: 'Delivery Phase',
      timelineStyle: 'advisory',
    },
  ],
};

const resultsData = {
  title: 'Proven Through Projects',
  subtitle: 'Systems demonstrating methodology and technical capability',
  results: [
    {
      metric: 'Self-Development Platform',
      description:
        '8+ months consistent revenue generation demonstrates technical sophistication and business operations capability. Complex React/Firebase architecture handles global timezone coordination, subscription billing, real-time data synchronization.',
      industry: 'SaaS Operations',
    },
    {
      metric: 'Strategic Research Automation',
      description:
        'Clothing brand US expansion research delivered comprehensive market intelligence including regulatory analysis, distribution partnerships, competitive positioning in 1 week using systematic methodology versus traditional 4-6 week consultant timelines.',
      industry: 'Market Research',
    },
    {
      metric: 'Business Process Automation',
      description:
        'Investment research firm automation reduced weekly market data compilation from 15 hours to 2 hours while improving coverage and consistency. Lead qualification systems eliminated 70% of manual screening time.',
      industry: 'Process Optimization',
    },
    {
      metric: 'AI Integration Systems',
      description:
        'Family Care Platform prototype demonstrates natural language processing for family coordination. News analysis system provides investment intelligence through cost-optimized AI processing.',
      industry: 'AI Integration',
    },
  ],
};

const faqData = {
  title: 'Common Questions',
  subtitle: 'Honest answers about methodology, capability, and practical implementation',
  faqs: [
    {
      question: 'How do you deliver research so much faster without sacrificing quality?',
      answer:
        'The systematic 5-phase methodology processes thousands of sources simultaneously rather than sequentially, while validation steps prevent the accuracy problems typical with fast AI research. You get comprehensive insights quickly because the research approach is fundamentally different.',
    },
    {
      question: 'Do you build complete production systems or just prototypes?',
      answer:
        'For clients, I focus on working prototypes with complete technical documentation that proves concepts and provides clear implementation roadmaps. My Self-Development Platform shows production-grade capability, but most clients get better value from validated prototypes their teams can build from.',
    },
    {
      question: 'How do you choose which AI tools for different projects?',
      answer:
        'I use whatever combination delivers optimal results - Claude for contextual understanding, Gemini for deep research, DeepSeek for cost-effective bulk processing, specialized APIs for data integration, automation tools for workflow management. The approach is results-focused.',
    },
    {
      question: "What if you're building businesses that compete with client projects?",
      answer:
        "I'm transparent about portfolio projects. Current focus includes self-development and family coordination software. If potential conflicts exist with your project, I'll identify them upfront. Usually operational experience provides valuable insights rather than competition.",
    },
    {
      question: 'How do you structure pricing for different types of projects?',
      answer:
        'Research projects typically range $3,000-$8,000, development prototypes $2,000-$8,000, process automation $2,500-$6,000, AI training $75-$150 hourly or project-based for teams. Investment depends on scope and complexity. I provide detailed estimates after understanding your specific requirements.',
    },
    {
      question: 'What happens if AI tools change or systems break after implementation?',
      answer:
        "I build systems using proven tools with fallback options and provide documentation that enables your team to maintain and adapt implementations. For automation projects, I include training so you're not dependent on me for ongoing operations.",
    },
  ],
};

const getTimelineBadgeStyle = (timelineStyle?: string) => {
  if (timelineStyle === 'training') {
    return 'bg-green-500/20 border-green-500/30 text-green-400';
  }
  if (timelineStyle === 'prototype') {
    return 'bg-fieldporter-purple/20 border-fieldporter-purple/30 text-fieldporter-purple';
  }
  if (timelineStyle === 'research') {
    return 'bg-fieldporter-blue/20 border-fieldporter-blue/30 text-fieldporter-blue';
  }
  if (timelineStyle === 'portfolio') {
    return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
  }
  return 'bg-fieldporter-gray/20 border-fieldporter-gray/30 text-fieldporter-gray';
};

export default function ServicesPage() {
  return (
    <PageWrapper>
      <ServiceHero {...heroData} />

      {/* Four Core Services Section - Lead with Services */}
      <section className='relative py-16 md:py-20 lg:py-24 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-fieldporter-black to-fieldporter-black/95' />
        <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12 md:mb-16 lg:mb-20'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6 lg:mb-8 leading-tight tracking-[-0.02em]'>
              Four Things We <span className='font-semibold text-fieldporter-blue'>Do</span>
            </h2>
            <p className='text-base lg:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-light'>
              Systematic methodology applied to specific business challenges with clear outcomes.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 lg:mb-20'>
            {services.map((service, index) => (
              <div key={service.id} id={service.id}>
                <div className='p-4 md:p-6 lg:p-8 h-full transition-all duration-300 hover:bg-white/10 rounded-xl backdrop-blur-md bg-white/10 border border-white/20'>
                  <div className='space-y-4 md:space-y-6'>
                    {/* Header */}
                    <div className='flex items-center justify-between flex-wrap gap-2'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 flex items-center justify-center'>
                          <span className='text-xs md:text-sm lg:text-lg font-bold text-white'>
                            {service.phase}
                          </span>
                        </div>
                        <service.icon className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-fieldporter-blue' />
                      </div>
                      <div
                        className={`px-2 py-1 md:px-3 md:py-1.5 rounded-lg border backdrop-blur-md font-medium text-xs md:text-sm ${getTimelineBadgeStyle(service.timelineStyle)}`}
                      >
                        {service.timeline}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className='text-lg md:text-xl lg:text-2xl font-semibold text-white leading-tight'>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className='text-sm md:text-base text-gray-300 leading-relaxed'>
                      {service.description}
                    </p>

                    {/* How This Works */}
                    <div className='space-y-3 md:space-y-4'>
                      <h4 className='text-white font-semibold text-sm md:text-base'>
                        How This Works:
                      </h4>
                      <p className='text-xs md:text-sm text-gray-400 leading-relaxed'>
                        {service.detailedExplanation}
                      </p>
                    </div>

                    {/* Outcomes */}
                    <div className='space-y-3'>
                      <h4 className='text-white font-semibold text-sm md:text-base'>
                        Key Outcomes:
                      </h4>
                      <ul className='space-y-2'>
                        {service.outcomes.map((outcome, outcomeIndex) => (
                          <li
                            key={outcomeIndex}
                            className='flex items-start space-x-3 text-xs md:text-sm text-gray-300'
                          >
                            <CheckCircle className='w-3 h-3 md:w-4 md:h-4 text-fieldporter-blue flex-shrink-0 mt-0.5' />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Proof & Investment */}
                    <div className='space-y-3 md:space-y-4 pt-3 md:pt-4 border-t border-white/10'>
                      <p className='text-xs md:text-sm text-gray-400 italic leading-relaxed'>
                        &ldquo;{service.proof}&rdquo;
                      </p>
                      <p className='text-xs md:text-sm font-medium text-fieldporter-blue'>
                        Investment: {service.investment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Methodology Section - Supporting Detail */}
      <section className='relative py-16 md:py-20 lg:py-24 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-fieldporter-black/95 to-fieldporter-black' />
        <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <MethodologySection {...methodologyData} />
        </div>
      </section>

      <ResultsSection {...resultsData} />
      <FAQSection {...faqData} />

      <ContactSection
        title='Ready to Discuss Your Challenge?'
        description="Let's talk about what you're trying to accomplish. I'll explain honestly whether my research methodology, development approach, or training can help your situation, what the process would look like, and what you'd receive for your investment."
        ctaText='Schedule Strategy Discussion'
        ctaHref='/contact'
      />
    </PageWrapper>
  );
}
