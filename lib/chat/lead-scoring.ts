import type { Message } from "@/types/chat";

export const analyseMessageForIntelligence = (
  content: string,
): {
  businessKeywords: string[];
  painPoints: string[];
  urgencySignals: string[];
  technicalSignals: string[];
  budgetIndicators: string[];
  companySignals: string[];
} => {
  const lowerContent = content.toLowerCase();

  const businessKeywords = [
    "scale",
    "growth",
    "efficiency",
    "roi",
    "save time",
    "competitive advantage",
    "optimise",
    "streamline",
    "automate",
    "workflow",
    "process",
  ].filter((keyword) => lowerContent.includes(keyword));

  const painPoints = [
    "manual process",
    "time consuming",
    "inefficient",
    "bottleneck",
    "expensive",
    "difficult to scale",
    "taking too long",
    "costing us",
    "losing money",
    "wasting time",
    "frustrated",
    "stuck",
    "overwhelmed",
  ].filter((keyword) => lowerContent.includes(keyword));

  const urgencySignals = [
    "immediately",
    "asap",
    "urgent",
    "this quarter",
    "within weeks",
    "starting soon",
    "timeline",
    "deadline",
    "need now",
    "can't wait",
    "quickly",
  ].filter((keyword) => lowerContent.includes(keyword));

  const technicalSignals = [
    "api",
    "integration",
    "workflow",
    "automation",
    "system",
    "database",
    "architecture",
    "scalable",
    "enterprise",
    "technical team",
    "developer",
  ].filter((keyword) => lowerContent.includes(keyword));

  const budgetIndicators = [
    "budget",
    "investment",
    "cost",
    "price",
    "spend",
    "roi",
    "savings",
    "expensive",
    "affordable",
    "worth it",
    "pay for itself",
  ].filter((keyword) => lowerContent.includes(keyword));

  const companySignals = [
    "startup",
    "enterprise",
    "team of",
    "employees",
    "company",
    "business",
    "organisation",
    "we are",
    "we have",
    "our team",
  ].filter((keyword) => lowerContent.includes(keyword));

  return {
    businessKeywords,
    painPoints,
    urgencySignals,
    technicalSignals,
    budgetIndicators,
    companySignals,
  };
};

export const calculateLeadScore = (
  messages: Message[],
): {
  score: number;
  qualification: "cold" | "warm" | "hot" | "qualified";
  reasoning: string[];
} => {
  let score = 2; // Base score
  const reasoning: string[] = [];

  const userMessages = messages.filter((msg) => msg.role === "user");
  const allIntelligence = {
    businessKeywords: [] as string[],
    painPoints: [] as string[],
    urgencySignals: [] as string[],
    technicalSignals: [] as string[],
    budgetIndicators: [] as string[],
    companySignals: [] as string[],
  };

  userMessages.forEach((msg) => {
    const intel = analyseMessageForIntelligence(msg.content);
    allIntelligence.businessKeywords.push(...intel.businessKeywords);
    allIntelligence.painPoints.push(...intel.painPoints);
    allIntelligence.urgencySignals.push(...intel.urgencySignals);
    allIntelligence.technicalSignals.push(...intel.technicalSignals);
    allIntelligence.budgetIndicators.push(...intel.budgetIndicators);
    allIntelligence.companySignals.push(...intel.companySignals);
  });

  allIntelligence.businessKeywords = [
    ...new Set(allIntelligence.businessKeywords),
  ];
  allIntelligence.painPoints = [...new Set(allIntelligence.painPoints)];
  allIntelligence.urgencySignals = [...new Set(allIntelligence.urgencySignals)];
  allIntelligence.technicalSignals = [
    ...new Set(allIntelligence.technicalSignals),
  ];
  allIntelligence.budgetIndicators = [
    ...new Set(allIntelligence.budgetIndicators),
  ];
  allIntelligence.companySignals = [...new Set(allIntelligence.companySignals)];

  if (allIntelligence.painPoints.length > 0) {
    score += 3;
    reasoning.push(
      `${allIntelligence.painPoints.length} pain points identified`,
    );
  }

  if (allIntelligence.budgetIndicators.length > 0) {
    score += 3;
    reasoning.push("Budget discussion detected");
  }

  if (allIntelligence.urgencySignals.length > 0) {
    score +=
      allIntelligence.urgencySignals.includes("immediately") ||
      allIntelligence.urgencySignals.includes("asap")
        ? 4
        : 2;
    reasoning.push("Timeline urgency indicated");
  }

  if (allIntelligence.technicalSignals.length > 0) {
    score += 2;
    reasoning.push("Technical sophistication detected");
  }

  if (allIntelligence.companySignals.length > 0) {
    score += 2;
    reasoning.push("Business context provided");
  }

  if (userMessages.length >= 3) {
    score += 2;
    reasoning.push("High engagement level");
  }

  let qualification: "cold" | "warm" | "hot" | "qualified" = "cold";
  if (score >= 12) qualification = "qualified";
  else if (score >= 8) qualification = "hot";
  else if (score >= 5) qualification = "warm";

  return { score, qualification, reasoning };
};

export const generateQualificationPrompt = (
  messages: Message[],
): string | null => {
  const { qualification } = calculateLeadScore(messages);
  const userMessages = messages.filter((msg) => msg.role === "user");

  if (userMessages.length < 2) return null;

  const lastMessage = userMessages[userMessages.length - 1]?.content || "";
  const intelligence = analyseMessageForIntelligence(lastMessage);

  if (qualification === "qualified") {
    return "Based on what you've shared, you'd benefit significantly from a personalized automation roadmap. Shall I connect you with our strategic team for a consultation?";
  }

  if (qualification === "hot" && intelligence.budgetIndicators.length > 0) {
    return "For opportunities of this scale, we typically start with a strategic assessment. Would you like to explore a consultation to discuss your specific requirements?";
  }

  if (intelligence.painPoints.length > 0 && userMessages.length >= 3) {
    return "You're dealing with exactly the type of operational challenges we help solve. Our approach typically saves businesses 15-20 hours weekly. Would you like to see how this applies to your situation?";
  }

  if (intelligence.technicalSignals.length > 0 && qualification === "warm") {
    return "You're asking the right technical questions. This level of implementation typically warrants a direct conversation with our team. Interested in a technical discussion?";
  }

  return null;
};
