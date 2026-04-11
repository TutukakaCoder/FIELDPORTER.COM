import type { Message } from "@/types/chat";
import { BusinessIntelligenceAnalyzer } from "@/lib/firebase-analytics";

export const ENHANCED_QUALIFICATION_KEYWORDS = {
  // High-value business terms
  "ai strategy": 4,
  "digital transformation": 3,
  enterprise: 3,
  automation: 3,
  optimization: 2,
  streamline: 2,
  efficiency: 2,

  // Budget and investment signals
  budget: 4,
  investment: 4,
  roi: 4,
  cost: 3,
  "save money": 3,
  "reduce costs": 3,

  // Urgency indicators
  urgent: 3,
  asap: 3,
  immediately: 3,
  "this quarter": 3,
  deadline: 2,
  timeline: 2,

  // Scale and growth
  scale: 3,
  growth: 3,
  expand: 2,
  "100+ employees": 3,
  "enterprise level": 4,

  // Technical sophistication
  api: 2,
  integration: 3,
  workflow: 2,
  database: 2,
  architecture: 3,
  "technical team": 2,

  // Industry-specific
  construction: 2,
  vc: 4,
  portfolio: 3,
  consulting: 2,
  research: 2,
  development: 2,

  // Pain points
  "time consuming": 3,
  "manual process": 3,
  inefficient: 2,
  bottleneck: 3,
  "wasting time": 3,
  "losing money": 4,
  "competitive advantage": 4,
} as const;

export function extractContactInfo(message: string) {
  const emailMatch = message.match(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  );
  const phoneMatch = message.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
  };
}

export function calculateEnhancedLeadScore(
  message: string,
  conversationHistory: Message[] = [],
): { score: number; signals: string[] } {
  let score = 0;
  const signals: string[] = [];
  const lowerMessage = message.toLowerCase();

  for (const [keyword, points] of Object.entries(
    ENHANCED_QUALIFICATION_KEYWORDS,
  )) {
    if (lowerMessage.includes(keyword)) {
      score += points;
      signals.push(`keyword: ${keyword}`);
    }
  }

  const contactInfo = extractContactInfo(message);
  if (contactInfo.email) {
    score += 5;
    signals.push("email provided");
  }
  if (contactInfo.phone) {
    score += 4;
    signals.push("phone provided");
  }

  const words = message.split(/\s+/).length;
  if (words > 20) {
    score += 2;
    signals.push("detailed message");
  }

  if (conversationHistory.length > 5) {
    score += 2;
    signals.push("engaged conversation");
  }

  return { score, signals };
}

export function analyzeQueryComplexity(
  message: string,
  conversationHistory: Message[] = [],
): {
  mode: "quick" | "standard" | "detailed" | "complex";
  maxTokens: number;
  reasoning: string;
  requiresProModel: boolean;
  userFrustrationLevel: "none" | "low" | "high";
} {
  const lowerMessage = message.toLowerCase();
  const words = lowerMessage.split(/\s+/);
  const messageLength = words.length;

  const frustrationPatterns = [
    /^(so\?|so|i don't know|you tell me|whatever|idk)$/i,
    /^(just tell me|stop asking|enough questions)$/i,
    /^(that doesn't help|not helpful|useless)$/i,
  ];

  const isFrustrated = frustrationPatterns.some((pattern) =>
    pattern.test(lowerMessage.trim()),
  );

  const isShortDismissive =
    messageLength <= 3 &&
    (lowerMessage.includes("so") ||
      lowerMessage.includes("ok") ||
      lowerMessage.includes("sure") ||
      lowerMessage.includes("whatever"));

  let frustrationLevel: "none" | "low" | "high" = "none";
  if (conversationHistory.length > 0) {
    const recentMessages = conversationHistory
      .slice(-3)
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content);

    const sentimentAnalysis = BusinessIntelligenceAnalyzer.analyzeMessage(
      recentMessages.join(" "),
    );

    if (sentimentAnalysis.sentiment === "negative" || isFrustrated) {
      frustrationLevel = isFrustrated || isShortDismissive ? "high" : "low";
    }
  } else if (isFrustrated || isShortDismissive) {
    frustrationLevel = "high";
  }

  const quickPatterns = [
    /^(hi|hello|hey|thanks|thank you|ok|okay|yes|no|sure)$/i,
    /^(what's up|how's it going|good|great|awesome)$/i,
  ];

  const isFollowUpQuestion =
    /^(is that|what else|anything else|that's it|that all)/i.test(
      lowerMessage.trim(),
    );

  if (
    quickPatterns.some((pattern) => pattern.test(lowerMessage.trim())) &&
    !isFrustrated &&
    !isFollowUpQuestion &&
    conversationHistory.length === 0
  ) {
    return {
      mode: "quick",
      maxTokens: 150,
      reasoning: "Simple greeting or acknowledgment",
      requiresProModel: false,
      userFrustrationLevel: frustrationLevel,
    };
  }

  const complexPatterns = [
    /how does.*work.*exactly/i,
    /walk me through.*step by step/i,
    /explain.*technical.*details/i,
    /what.*methodology.*implementation/i,
    /architecture.*integration/i,
    /multi.*step.*process/i,
    /complex.*system/i,
  ];

  const technicalTerms = [
    "api",
    "integration",
    "architecture",
    "database",
    "infrastructure",
    "deployment",
    "scalability",
  ];

  const isResearchRequest = /\b(research|analyze|investigate|study)\b/i.test(
    lowerMessage,
  );

  const hasTechnicalComplexity =
    complexPatterns.some((pattern) => pattern.test(lowerMessage)) ||
    (technicalTerms &&
      technicalTerms.some((term) => lowerMessage.includes(term)));

  if (isResearchRequest) {
    return {
      mode: "complex",
      maxTokens: 800,
      reasoning: "Research request requiring comprehensive analysis",
      requiresProModel: true,
      userFrustrationLevel: frustrationLevel,
    };
  }

  if (hasTechnicalComplexity && messageLength > 10) {
    return {
      mode: "complex",
      maxTokens: 800,
      reasoning: "Complex technical question",
      requiresProModel: true,
      userFrustrationLevel: frustrationLevel,
    };
  }

  const followUpPatterns = [
    /^(is that|what else|anything else|that's it|that all|tell me more|what about)/i,
  ];

  const isFollowUp = followUpPatterns.some((pattern) =>
    pattern.test(lowerMessage.trim()),
  );

  if (isFollowUp && conversationHistory.length > 0) {
    return {
      mode: "detailed",
      maxTokens: 600,
      reasoning:
        "Follow-up question requiring response about FIELDPORTER services",
      requiresProModel: true,
      userFrustrationLevel: frustrationLevel,
    };
  }

  return {
    mode: "standard",
    maxTokens: 600,
    reasoning: "Standard conversational response - concise and human",
    requiresProModel: true,
    userFrustrationLevel: frustrationLevel,
  };
}
