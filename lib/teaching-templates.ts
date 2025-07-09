// Teaching templates for progressive disclosure approach
// Focus on user's AI transformation potential, not FIELDPORTER achievements

export const INDUSTRY_INSIGHTS = {
  manufacturing: {
    quality_control:
      "AI can detect defects 50x faster than human inspection by analyzing thousands of images per second, catching issues before they become expensive recalls.",
    supply_chain:
      "Predictive AI helps manufacturers anticipate disruptions by analyzing weather patterns, supplier performance, and global events weeks ahead.",
    inventory:
      "Smart AI systems reduce inventory costs by 15-30% while preventing stockouts through demand pattern recognition.",
    maintenance:
      "AI-powered predictive maintenance catches equipment failures 2-3 weeks before they happen, saving massive downtime costs.",
  },
  retail: {
    inventory:
      "AI-driven demand forecasting reduces overstock by predicting seasonal trends, local events, and consumer behavior shifts.",
    customer_service:
      "Automated response systems handle 80% of routine inquiries while escalating complex issues to humans with full context.",
    pricing:
      "Dynamic pricing AI helps retailers optimize margins by analyzing competitor prices, demand patterns, and customer willingness to pay.",
    personalization:
      "AI can increase conversion rates by 20-40% through personalized product recommendations based on browsing and purchase history.",
  },
  healthcare: {
    scheduling:
      "AI scheduling systems reduce patient wait times by 30% while maximizing provider utilization through intelligent appointment clustering.",
    documentation:
      "Voice AI can reduce physician documentation time from 2 hours to 15 minutes per patient, letting doctors focus on care.",
    diagnostics:
      "AI assists in early disease detection by analyzing patterns in lab results, imaging, and patient history that humans might miss.",
    workflow:
      "Automated workflow systems can reduce administrative overhead by 40-60% while improving patient experience.",
  },
  financial: {
    fraud_detection:
      "AI fraud detection systems analyze transaction patterns in real-time, catching suspicious activity within milliseconds.",
    risk_assessment:
      "AI can process thousands of data points to assess credit risk more accurately than traditional scoring methods.",
    compliance:
      "Automated compliance monitoring reduces regulatory violations by continuously scanning transactions and communications.",
    portfolio:
      "AI-driven portfolio optimization can improve returns by 15-25% through real-time market analysis and risk adjustment.",
  },
  construction: {
    project_management:
      "AI project management tools can predict delays 2-3 weeks early by analyzing weather, material delivery, and workforce patterns.",
    safety:
      "Computer vision AI reduces workplace accidents by 40% through real-time hazard detection and worker behavior analysis.",
    cost_estimation:
      "AI estimating tools improve bid accuracy by 20-30% by analyzing historical project data and current market conditions.",
    scheduling:
      "Smart scheduling AI optimizes crew allocation and equipment usage, reducing project timelines by 10-20%.",
  },
  professional_services: {
    document_processing:
      "AI can process contracts, invoices, and legal documents 100x faster than manual review while maintaining accuracy.",
    client_insights:
      "AI analyzes client communication patterns to identify satisfaction issues and growth opportunities early.",
    resource_allocation:
      "Smart scheduling AI optimizes consultant assignments based on skills, availability, and client needs.",
    knowledge_management:
      "AI-powered knowledge bases help teams find relevant case studies and best practices instantly.",
  },
} as const;

export const CHALLENGE_SOLUTIONS = {
  manual_processes: {
    insight:
      "When businesses automate repetitive tasks, teams typically save 15-25 hours per week while reducing errors by 90%.",
    questions: [
      "What manual task takes up most of your team's time?",
      "How many hours weekly do you spend on repetitive data entry?",
      "What happens when someone makes a mistake in your current process?",
    ],
  },
  data_analysis: {
    insight:
      "AI can process thousands of data points to find patterns humans miss, turning overwhelming data into actionable insights.",
    questions: [
      "What decisions do you make based on gut feel that could use data?",
      "How long does it take your team to create reports?",
      "What patterns in your business would be valuable to understand?",
    ],
  },
  customer_insights: {
    insight:
      "By analyzing customer behavior, AI helps predict needs, prevent churn, and identify growth opportunities automatically.",
    questions: [
      "How do you currently identify at-risk customers?",
      "What would you do differently if you knew customer needs in advance?",
      "How much time do you spend analyzing customer feedback?",
    ],
  },
  workflow_optimization: {
    insight:
      "AI workflow optimization typically reduces task completion time by 30-50% while improving quality and consistency.",
    questions: [
      "What bottlenecks slow down your team most?",
      "How do you currently track work progress?",
      "What tasks do people avoid because they're tedious?",
    ],
  },
  communication_overhead: {
    insight:
      "AI can reduce meeting time by 40% through automated summaries, action tracking, and intelligent scheduling.",
    questions: [
      "How many hours weekly do you spend in status meetings?",
      "What information gets lost between meetings?",
      "How do you currently track action items and follow-ups?",
    ],
  },
  decision_making: {
    insight:
      "AI decision support systems help leaders make faster, more informed decisions by analyzing multiple scenarios and outcomes.",
    questions: [
      "What decisions do you delay because you need more information?",
      "How do you currently evaluate different options?",
      "What would faster decision-making mean for your business?",
    ],
  },
} as const;

export const CONVERSATION_PHASES = {
  discovery: {
    goal: "Understand user's primary challenge",
    questions: [
      "What specific challenge brought you here today?",
      "What's the biggest time-waster in your operations right now?",
      "What manual process is driving your team crazy?",
      "What bottleneck is costing you the most money?",
    ],
    follow_ups: [
      "How is that currently impacting your team?",
      "What have you tried to solve this before?",
      "What would fixing this mean for your business?",
    ],
  },
  learning: {
    goal: "Teach how AI addresses their specific challenge",
    approach: "Connect their challenge to relevant AI capabilities",
    questions: [
      "What aspect of AI transformation interests you most?",
      "Have you considered how AI might handle [their challenge]?",
      "What concerns do you have about implementing AI solutions?",
    ],
    follow_ups: [
      "What would that look like in your specific situation?",
      "How would your team adapt to that kind of change?",
      "What timeline are you thinking for something like this?",
    ],
  },
  evaluation: {
    goal: "Help them assess fit and feasibility",
    questions: [
      "What's your timeline for exploring AI solutions?",
      "How does your team typically evaluate new technologies?",
      "What would success look like for you?",
    ],
    follow_ups: [
      "What criteria are most important in your decision?",
      "Who else would be involved in evaluating this?",
      "What's your experience with similar implementations?",
    ],
  },
  decision: {
    goal: "Guide toward next steps",
    questions: [
      "What information would help you move forward?",
      "What's holding you back from taking the next step?",
      "How can we help you explore this further?",
    ],
    handoff: [
      "This deserves a real conversation with our team. What's your email?",
      "You're thinking bigger than a chat can handle. Let me connect you with Freddy.",
      "Based on what you've shared, you'd benefit from a personalized approach. Shall I connect you with our team?",
    ],
  },
} as const;

export const EMAIL_COLLECTION_STRATEGIES = {
  value_exchange: [
    "Want me to send you a guide on implementing [specific solution] for [their industry]?",
    "I can have Freddy send you a customized roadmap for [their challenge]. What's your email?",
    "Let me send you some case studies of businesses that solved [their problem]. Email?",
  ],
  exit_intent: [
    "Hold up! Let me send you something actually useful for [their challenge].",
    "Before you go, drop your email for insights specifically about [their situation].",
    "Quick question - want me to send you a practical guide for [their problem]?",
  ],
  deep_engagement: [
    "You're asking great questions. Email for a personalized AI roadmap?",
    "Based on our conversation, you'd benefit from specific insights. What's your email?",
    "This level of detail deserves a custom analysis. Where should I send it?",
  ],
  humor: [
    "No spam, just Freddy occasionally sharing actually useful AI insights.",
    "We promise not to spam - Freddy only reaches out with genuinely helpful stuff.",
    "Only worthwhile updates, not the usual marketing nonsense.",
  ],
} as const;

export const TEACHING_TRANSITIONS = {
  challenge_to_solution: [
    "Here's how AI typically handles that challenge...",
    "Interesting problem. AI can help with that by...",
    "That's exactly the kind of challenge AI excels at...",
  ],
  solution_to_application: [
    "In your specific situation, that would look like...",
    "For [their industry], this typically means...",
    "Applying that to your challenge...",
  ],
  application_to_next_steps: [
    "To explore this for your business...",
    "The next step would be to...",
    "Here's how you could start...",
  ],
} as const;

export type IndustryType = keyof typeof INDUSTRY_INSIGHTS;
export type ChallengeType = keyof typeof CHALLENGE_SOLUTIONS;
export type ConversationPhase = keyof typeof CONVERSATION_PHASES;
