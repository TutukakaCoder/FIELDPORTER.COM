import {
  FIELDPORTER_COMPANY,
  getPersonalityResponse,
} from "./company-knowledge";

// Enhanced teaching-first quick responses with FIELDPORTER personality
export const TEACHING_QUICK_RESPONSES = [
  {
    // Only match very simple greetings at start of conversation
    pattern: /^(hi|hello|hey|greetings)$/i,
    response: () => getPersonalityResponse("greeting"),
    category: "greeting",
  },
  {
    // Only match very simple thank yous
    pattern: /^(thanks|thank you|cheers)$/i,
    response: () => {
      const quirk = getPersonalityResponse("quirk");
      return `You're welcome! ${quirk} What other challenges can I help you think through?`;
    },
    category: "appreciation",
  },
  {
    // Only match very direct service inquiries
    pattern:
      /^(what do you do|what services do you offer|what does fieldporter do)$/i,
    response: () => {
      const transition = getPersonalityResponse("transition");
      const humor = getPersonalityResponse("humor");
      return `${transition} ${humor} Instead of rattling off services, let me understand your challenge first. What's the biggest time-waster in your operations right now?`;
    },
    category: "services_inquiry",
  },
  {
    // Only match very direct pricing questions
    pattern: /^(pricing|cost|how much|budget|price)\??$/i,
    response: () => {
      const humor = getPersonalityResponse("humor");
      return `${humor} Investment really depends on what you're trying to solve. Our projects typically range from $2K for workflow automation to $50K for comprehensive market research. What specific challenge are you looking to tackle?`;
    },
    category: "pricing_inquiry",
  },
  {
    // Only match very simple help requests
    pattern: /^(help|can you help|need help)$/i,
    response: () => {
      const transition = getPersonalityResponse("transition");
      return `${transition} I'd love to help! What's the primary business challenge or operational headache you're dealing with right now?`;
    },
    category: "help_request",
  },
  {
    // Only match very simple yes/no responses
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
    // Only match very direct examples requests
    pattern: /^(portfolio|examples|case studies|show me examples)$/i,
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

  // CRITICAL: Never use quick responses if this is an ongoing conversation
  // Only use for very first interactions or very simple responses
  const userMessages = conversationHistory.filter((msg) => msg.role === "user");

  // If user has already sent multiple messages, always use DeepSeek
  if (userMessages.length > 1) {
    return null;
  }

  // If the message is longer than 10 words, use DeepSeek
  if (lowerMessage.split(" ").length > 10) {
    return null;
  }

  // If message contains question words, use DeepSeek for better context
  if (
    lowerMessage.includes("how") ||
    lowerMessage.includes("what") ||
    lowerMessage.includes("why") ||
    lowerMessage.includes("when") ||
    lowerMessage.includes("where") ||
    lowerMessage.includes("which")
  ) {
    return null;
  }

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
  // Enhanced context awareness for better follow-up responses
  const contextAwareResponse = getContextAwareResponse(
    message,
    conversationHistory,
  );
  if (contextAwareResponse) {
    return contextAwareResponse;
  }
  // First try quick responses - these are already very restrictive
  const quickResponse = getContextualQuickResponse(
    message,
    conversationHistory,
  );
  if (quickResponse) return quickResponse;

  // CRITICAL: For all other cases, let DeepSeek handle the conversation
  // Only use template responses for very specific, simple scenarios

  const userMessages = conversationHistory.filter((msg) => msg.role === "user");

  // If this is an ongoing conversation, always use DeepSeek
  if (userMessages.length > 1) {
    return null;
  }

  // If first message is complex/long, use DeepSeek
  if (message.split(" ").length > 5) {
    return null;
  }

  // For all business discussions, use DeepSeek for contextual responses
  return null;
}

export type QuickResponseCategory =
  (typeof TEACHING_QUICK_RESPONSES)[number]["category"];

// Enhanced context-aware response system
function getContextAwareResponse(
  message: string,
  conversationHistory: any[] = [],
): string | null {
  const lowerMessage = message.toLowerCase().trim();
  const userMessages = conversationHistory.filter((msg) => msg.role === "user");

  // Only use context-aware responses for follow-up conversations
  if (userMessages.length === 0) {
    return null;
  }

  // Get previous context
  const previousContext = extractPreviousContext(conversationHistory);

  // Industry-specific follow-up responses
  if (previousContext.industry) {
    return getIndustryFollowUpResponse(lowerMessage, previousContext);
  }

  // Topic-specific follow-up responses
  if (previousContext.topic) {
    return getTopicFollowUpResponse(lowerMessage, previousContext);
  }

  // General context-aware responses
  return getGeneralFollowUpResponse(lowerMessage, previousContext);
}

function extractPreviousContext(conversationHistory: any[]): {
  industry: string | null;
  topic: string | null;
  hasDiscussedPricing: boolean;
  hasDiscussedTimeline: boolean;
  lastBotMessage: string | null;
} {
  const allMessages = conversationHistory
    .map((msg) => msg.content)
    .join(" ")
    .toLowerCase();
  const lastBotMessage =
    conversationHistory.filter((msg) => msg.role === "assistant").slice(-1)[0]
      ?.content || null;

  // Industry detection
  const industryPatterns = {
    construction: ["construction", "contractor", "building", "jobsite", "crew"],
    veterinary: ["vet", "veterinary", "animal", "clinic", "practice"],
    healthcare: ["healthcare", "medical", "hospital", "patient"],
    manufacturing: ["manufacturing", "factory", "production"],
    retail: ["retail", "store", "customer", "sales"],
  };

  let industry = null;
  for (const [ind, patterns] of Object.entries(industryPatterns)) {
    if (patterns.some((pattern) => allMessages.includes(pattern))) {
      industry = ind;
      break;
    }
  }

  // Topic detection
  let topic = null;
  if (allMessages.includes("automation") || allMessages.includes("workflow")) {
    topic = "automation";
  } else if (
    allMessages.includes("research") ||
    allMessages.includes("analysis")
  ) {
    topic = "research";
  } else if (
    allMessages.includes("development") ||
    allMessages.includes("prototype")
  ) {
    topic = "development";
  }

  return {
    industry,
    topic,
    hasDiscussedPricing:
      allMessages.includes("pricing") || allMessages.includes("cost"),
    hasDiscussedTimeline:
      allMessages.includes("timeline") || allMessages.includes("schedule"),
    lastBotMessage,
  };
}

function getIndustryFollowUpResponse(
  message: string,
  context: { industry: string | null; lastBotMessage: string | null },
): string | null {
  if (!context.industry) return null;

  const industryFollowUps = {
    construction: {
      labour:
        "Labor management is brutal in construction - tracking hours across multiple sites, managing subcontractors, ensuring compliance, dealing with no-shows. We've built AI systems that predict labor needs based on project phases, automate time tracking with geo-fencing, and even handle certified payroll reports. Are you dealing more with scheduling complexity, cost tracking, or compliance documentation?",
      automat:
        "Construction companies lose 20-30 hours weekly on paperwork, scheduling, and compliance tracking. We've helped contractors automate job costing, safety compliance reports, and crew scheduling. What's your biggest time drain - project management, documentation, or resource allocation?",
      how: "Here's how this typically works for construction: We first map your current workflow (bid-to-invoice process), identify the biggest time drains, then build AI systems that handle the repetitive stuff. Think automated job costing, crew scheduling, and compliance reporting. What part of your process eats up the most time?",
    },
    veterinary: {
      how: "For veterinary practices, we typically start with appointment scheduling and medical record automation. Our AI can handle appointment reminders, populate treatment notes, and track vaccination schedules. Most clinics save 15-20 hours per week. What's your biggest operational headache - scheduling, records, or client communication?",
      automat:
        "Veterinary practices typically save 15-20 hours per week by automating appointment scheduling, medical record updates, and inventory tracking. What manual processes are driving your team crazy right now?",
      records:
        "Medical record management in veterinary practice is time-consuming but critical. We've built AI systems that automatically populate treatment notes, track vaccination schedules, and flag potential health issues based on historical data. Are you dealing with manual record keeping, appointment scheduling, or client communication challenges?",
    },
  };

  const responses =
    industryFollowUps[context.industry as keyof typeof industryFollowUps];
  if (!responses) return null;

  // Match message to appropriate response
  for (const [key, response] of Object.entries(responses)) {
    if (message.includes(key)) {
      return response;
    }
  }

  return null;
}

function getTopicFollowUpResponse(
  message: string,
  context: { topic: string | null },
): string | null {
  if (!context.topic) return null;

  const topicFollowUps = {
    automation: {
      how: "Our automation approach is systematic: (1) Map your current workflow, (2) Identify repetitive tasks, (3) Build AI systems that handle the boring stuff, (4) Train your team on the new process. Most businesses save 15-25 hours per week. What specific process is eating up your team's time?",
      cost: "Automation projects typically range from $2K-$15K depending on complexity. The ROI is usually 3-5x within 6 months because of time savings. What manual process would you tackle first?",
    },
    research: {
      how: "Our research process uses AI to scan thousands of sources simultaneously, then cross-validates findings across multiple models. We deliver McKinsey-level insights in 3-7 days, not weeks. What type of research are you looking to do - market analysis, competitive intelligence, or strategic planning?",
      cost: "Strategic research projects typically range from $10K-$50K depending on scope. The speed advantage is huge - 3-7 days vs 6+ weeks traditional research. What decision are you trying to make?",
    },
  };

  const responses =
    topicFollowUps[context.topic as keyof typeof topicFollowUps];
  if (!responses) return null;

  for (const [key, response] of Object.entries(responses)) {
    if (message.includes(key)) {
      return response;
    }
  }

  return null;
}

function getGeneralFollowUpResponse(
  message: string,
  context: { hasDiscussedPricing: boolean; hasDiscussedTimeline: boolean },
): string | null {
  // Simple follow-up responses based on context
  if (message.includes("how") && context.hasDiscussedPricing) {
    return "Great question! The implementation approach depends on your specific workflow. Most clients see results within 2-4 weeks. What's the primary challenge you're trying to solve?";
  }

  if (message.includes("timeline") && !context.hasDiscussedTimeline) {
    return "Timeline varies by project scope: workflow automation (1-3 weeks), prototypes (1-4 weeks), strategic research (3-7 days). What type of project are you considering?";
  }

  return null;
}
