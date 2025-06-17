export const FIELDPORTER_KNOWLEDGE = {
  company: {
    name: 'FIELDPORTER',
    owner: 'Frederick Hopkins',
    positioning: 'Strategic research and rapid prototyping for ambitious founders',
    business_model: 'Consulting while building portfolio businesses',
    philosophy: 'Building portfolio businesses while using consulting to fund development',
  },

  services: {
    strategic_research: {
      description: 'AI-powered market research and competitive analysis',
      delivery_time: '1-2 weeks',
      investment_range: '$10K-$50K',
      expertise: '90% faster research using AI agents',
    },
    rapid_prototyping: {
      description: 'Concept validation through working prototypes',
      delivery_time: '1-4 weeks',
      investment_range: '$5K-$25K',
      note: 'Handoff to client development teams for production',
      focus: 'Proof of concept and validation, not production systems',
    },
    business_advisory: {
      description: 'Strategic guidance based on portfolio business experience',
      delivery_model: 'Monthly or quarterly engagements',
      investment_range: '$2K-$10K per month',
      value: 'Real operational experience from building businesses',
    },
  },

  frederick_background: {
    education: 'Business degree, University of Auckland',
    experience: [
      'Professional tennis player',
      'Mercedes-Benz sales',
      'Startup development and operations',
      'AI-powered business optimization',
    ],
    current_focus: 'Building Family Care platform while consulting',
    expertise: [
      'AI-powered strategic research',
      'Business process optimization',
      'Rapid concept validation',
      'Portfolio business development',
    ],
  },

  target_clients: [
    'VCs evaluating portfolio company strategies',
    'Growth-stage companies needing strategic research',
    'Founders requiring concept validation',
    'Portfolio companies seeking operational optimization',
  ],

  confidential_boundaries: {
    do_not_mention: [
      'Specific client names or applications',
      'PAPPS Mastery details (confidential client work)',
      'Enterprise/Fortune 500 experience claims',
      'Detailed proprietary methodologies',
      'Specific client outcomes or revenue figures',
    ],
    can_discuss: [
      'General service capabilities and approach',
      "Frederick's background and experience",
      'Investment ranges and typical timelines',
      'Target market and ideal client profiles',
      'Portfolio business development philosophy',
    ],
  },

  conversation_goals: [
    "Understand visitor's strategic challenges",
    "Qualify potential fit for Frederick's services",
    'Guide toward consultation booking if appropriate',
    'Demonstrate expertise without overselling',
    'Maintain professional credibility',
  ],

  response_guidelines: {
    max_length: '2-3 sentences maximum',
    tone: 'Professional but conversational',
    format: 'No special characters or bullet points',
    focus: 'Ask questions to understand their challenge',
    escalation: 'Complex topics should be directed to Frederick directly',
  },

  value_propositions: [
    'Direct access to Frederick (founder), not junior consultants',
    'Real operational experience building businesses while consulting',
    'AI-powered research delivering insights 90% faster',
    'Portfolio business perspective on strategic challenges',
  ],
} as const;

export type FieldporterKnowledge = typeof FIELDPORTER_KNOWLEDGE;
