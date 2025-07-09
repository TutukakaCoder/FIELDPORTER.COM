import {
  FIELDPORTER_COMPANY,
  getPersonalityResponse,
  getServiceByType,
} from "./company-knowledge";

// Enhanced teaching-first quick responses with FIELDPORTER personality
export const TEACHING_QUICK_RESPONSES = [
  {
    pattern: /^(hi|hello|hey|greetings)$/i,
    response: () => getPersonalityResponse("greeting"),
    category: "greeting",
  },
  {
    pattern: /^(thanks|thank you|cheers)$/i,
    response: () => {
      const quirk = getPersonalityResponse("quirk");
      return `You're welcome! ${quirk} What other challenges can I help you think through?`;
    },
    category: "appreciation",
  },
  {
    pattern: /what do you do|what services|what does fieldporter/i,
    response: () => {
      const transition = getPersonalityResponse("transition");
      const humor = getPersonalityResponse("humor");
      return `${transition} ${humor} Instead of rattling off services, let me understand your challenge first. What's the biggest time-waster in your operations right now?`;
    },
    category: "services_inquiry",
  },
  {
    pattern: /pricing|cost|how much|budget|price/i,
    response: () => {
      const humor = getPersonalityResponse("humor");
      return `${humor} Investment really depends on what you're trying to solve. Our projects typically range from $2K for workflow automation to $50K for comprehensive market research. What specific challenge are you looking to tackle?`;
    },
    category: "pricing_inquiry",
  },
  {
    pattern: /help|assist|support/i,
    response: () => {
      const transition = getPersonalityResponse("transition");
      return `${transition} I'd love to help! What's the primary business challenge or operational headache you're dealing with right now?`;
    },
    category: "help_request",
  },
  {
    pattern: /automation|automate|workflow|process/i,
    response: () => {
      const serviceInfo = FIELDPORTER_COMPANY.services.workflow_optimization;
      return `${serviceInfo.teaching_angle} ${serviceInfo.personality_hook} What manual processes are eating up your team's time?`;
    },
    category: "automation_interest",
  },
  {
    pattern: /research|analysis|market|competitive/i,
    response: () => {
      const serviceInfo = FIELDPORTER_COMPANY.services.strategic_research;
      return `${serviceInfo.teaching_angle} ${serviceInfo.personality_hook} What kind of insights are you looking for?`;
    },
    category: "research_interest",
  },
  {
    pattern: /ai strategy|ai implementation|artificial intelligence/i,
    response: () => {
      const honestTruth =
        FIELDPORTER_COMPANY.teaching_frameworks.implementation_reality
          .honest_truths[
          Math.floor(
            Math.random() *
              FIELDPORTER_COMPANY.teaching_frameworks.implementation_reality
                .honest_truths.length,
          )
        ];
      return `${honestTruth} What specific problem are you hoping AI can solve for your business?`;
    },
    category: "ai_strategy",
  },
  {
    pattern: /prototype|mvp|development|build/i,
    response: () => {
      const serviceInfo = FIELDPORTER_COMPANY.services.rapid_development;
      return `${serviceInfo.teaching_angle} ${serviceInfo.personality_hook} What concept do you want to validate?`;
    },
    category: "development_interest",
  },
  {
    pattern: /^(yes|yeah|yep|sure|ok|okay)$/i,
    response: () => {
      return "Great! Tell me more about the specific challenge you're facing. What's currently taking up most of your team's time?";
    },
    category: "affirmation",
  },
  {
    pattern: /^(no|nope|not really|not sure)$/i,
    response: () => {
      return "No worries! What brought you here today? I'm here to help you think through any operational challenges you might have.";
    },
    category: "negation",
  },
  {
    pattern: /portfolio|examples|case studies|clients/i,
    response: () => {
      const realExample = FIELDPORTER_COMPANY.real_examples.voycap_platform;
      return `Here's a real example: ${realExample.challenge} - ${realExample.outcome}. ${realExample.what_we_learned} What type of challenge are you dealing with?`;
    },
    category: "examples_request",
  },
] as const;

// Contextual response generator based on conversation history
export function getContextualQuickResponse(
  message: string,
  conversationHistory: any[] = [],
): string | null {
  const lowerMessage = message.toLowerCase().trim();

  // Find matching pattern
  const matchingResponse = TEACHING_QUICK_RESPONSES.find((qr) =>
    qr.pattern.test(lowerMessage),
  );

  if (matchingResponse) {
    return typeof matchingResponse.response === "function"
      ? matchingResponse.response()
      : matchingResponse.response;
  }

  return null;
}

// Enhanced conversation intelligence for better qualification
export function analyzeConversationIntelligence(conversationHistory: any[]): {
  phase: "discovery" | "learning" | "evaluation" | "decision";
  engagement_level: "low" | "medium" | "high";
  topics_discussed: string[];
  pain_points_mentioned: string[];
  readiness_signals: string[];
  personality_match: "formal" | "casual" | "technical" | "executive";
} {
  const userMessages = conversationHistory.filter((msg) => msg.role === "user");
  const allContent = userMessages
    .map((msg) => msg.content.toLowerCase())
    .join(" ");

  // Determine engagement level
  let engagement_level: "low" | "medium" | "high" = "low";
  if (userMessages.length >= 5) engagement_level = "high";
  else if (userMessages.length >= 3) engagement_level = "medium";

  // Identify topics discussed
  const topicPatterns = {
    automation: ["automation", "workflow", "process", "manual"],
    research: ["research", "analysis", "market", "competitive"],
    ai_strategy: [
      "ai",
      "artificial intelligence",
      "strategy",
      "transformation",
    ],
    development: ["development", "prototype", "build", "mvp"],
    data: ["data", "analytics", "insights", "reporting"],
  };

  const topics_discussed = Object.entries(topicPatterns)
    .filter(([topic, patterns]) =>
      patterns.some((pattern) => allContent.includes(pattern)),
    )
    .map(([topic]) => topic);

  // Identify pain points
  const painPointPatterns = [
    "time consuming",
    "manual process",
    "inefficient",
    "bottleneck",
    "taking too long",
    "costing us",
    "driving crazy",
    "eating up time",
  ];

  const pain_points_mentioned = painPointPatterns.filter((pattern) =>
    allContent.includes(pattern),
  );

  // Identify readiness signals
  const readinessPatterns = [
    "budget",
    "timeline",
    "next step",
    "getting started",
    "move forward",
    "schedule",
    "call",
    "meeting",
    "contact",
    "email",
  ];

  const readiness_signals = readinessPatterns.filter((pattern) =>
    allContent.includes(pattern),
  );

  // Determine personality match
  let personality_match: "formal" | "casual" | "technical" | "executive" =
    "casual";
  if (
    allContent.includes("technical") ||
    allContent.includes("api") ||
    allContent.includes("integration")
  ) {
    personality_match = "technical";
  } else if (
    allContent.includes("budget") ||
    allContent.includes("roi") ||
    allContent.includes("investment")
  ) {
    personality_match = "executive";
  } else if (
    allContent.includes("please") ||
    allContent.includes("would you") ||
    allContent.includes("could you")
  ) {
    personality_match = "formal";
  }

  // Determine conversation phase
  let phase: "discovery" | "learning" | "evaluation" | "decision" = "discovery";
  if (readiness_signals.length > 0) phase = "decision";
  else if (allContent.includes("how much") || allContent.includes("compare"))
    phase = "evaluation";
  else if (topics_discussed.length > 0) phase = "learning";

  return {
    phase,
    engagement_level,
    topics_discussed,
    pain_points_mentioned,
    readiness_signals,
    personality_match,
  };
}

// Smart response selector that considers context and personality
export function getSmartResponse(
  message: string,
  conversationHistory: any[] = [],
): string | null {
  // First try quick responses
  const quickResponse = getContextualQuickResponse(
    message,
    conversationHistory,
  );
  if (quickResponse) return quickResponse;

  // Analyze conversation for context
  const intelligence = analyzeConversationIntelligence(conversationHistory);

  // Generate contextual response based on intelligence
  if (
    intelligence.engagement_level === "high" &&
    intelligence.readiness_signals.length > 0
  ) {
    const handoff =
      FIELDPORTER_COMPANY.handoff_strategies.high_engagement[
        Math.floor(
          Math.random() *
            FIELDPORTER_COMPANY.handoff_strategies.high_engagement.length,
        )
      ]!;
    return handoff;
  }

  if (intelligence.topics_discussed.length > 0) {
    const topic = intelligence.topics_discussed[0]!;
    const serviceType = topic.replace("_", " ");
    const relevantService = getServiceByType(serviceType);

    if (relevantService) {
      return `${relevantService.teaching_angle} ${relevantService.personality_hook} What aspect of this interests you most?`;
    }
  }

  // Default to discovery question
  const discoveryQuestions =
    FIELDPORTER_COMPANY.teaching_frameworks.ai_transformation_potential
      .discovery_questions;
  return discoveryQuestions[
    Math.floor(Math.random() * discoveryQuestions.length)
  ]!;
}

export type QuickResponseCategory =
  (typeof TEACHING_QUICK_RESPONSES)[number]["category"];
