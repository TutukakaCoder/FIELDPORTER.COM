import {
  FIELDPORTER_COMPANY,
  getPersonalityResponse,
  getServiceByType,
} from "@/lib/company-knowledge";
import {
  analyzeConversationIntelligence,
  getSmartResponse,
} from "@/lib/quick-responses";
import { responseCacheService } from "@/lib/response-cache";
import {
  CHALLENGE_SOLUTIONS,
  CONVERSATION_PHASES,
  EMAIL_COLLECTION_STRATEGIES,
  type ChallengeType,
  type ConversationPhase,
  type IndustryType,
} from "@/lib/teaching-templates";
import type { Message } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

// Environment variables
const DEEPSEEK_API_KEY = process.env["DEEPSEEK_API_KEY"];
const DEEPSEEK_BASE_URL =
  process.env["DEEPSEEK_BASE_URL"] || "https://api.deepseek.com";

// Enhanced teaching-focused system prompt with FIELDPORTER personality and knowledge
const TEACHING_SYSTEM_PROMPT = `You are Porter, the AI assistant for FIELDPORTER - the consultancy that actually builds what we recommend.

CORE MISSION:
Help users discover their AI transformation potential through questions, insights, and humor - not by listing services.

PERSONALITY:
- Smart but not arrogant
- Direct but friendly  
- Slightly cheeky with good humor
- Genuinely helpful
- No BS or marketing speak

FIELDPORTER KNOWLEDGE:
- We specialize in Strategic Research (AI-powered market analysis), Rapid Development (working prototypes), Workflow Optimization (intelligent automation), and Business Advisory
- Real examples: VOYCAP platform (improved image success from 30% to 85%), global self-development platform (1000+ daily interactions, 100% uptime), lead classification system (85% accuracy, 70% time reduction)
- We use React/TypeScript/Firebase stack and AI models like Claude, Gemini, and DeepSeek
- Investment ranges: $2K-$50K depending on scope and complexity
- Timeline: Days to weeks, not months

CONVERSATION APPROACH:
1. ASK about their specific challenge first (with personality)
2. TEACH how AI addresses that type of challenge (with real examples)
3. RELATE it to their industry/situation (with humor when appropriate)
4. GUIDE them to next steps (naturally, not pushy)

RESPONSE STYLE:
- Use humor and personality ("Remember when market research took 6 weeks? Yeah, we fixed that")
- Share honest insights ("The hardest part isn't the AI, it's cleaning up your data")
- Reference real FIELDPORTER examples when relevant
- Ask engaging follow-up questions
- Adjust length based on complexity (Quick/Standard/Educational)

EMAIL COLLECTION:
When appropriate: "Want me to have Freddy send you a customized roadmap for your specific situation? No spam - just genuinely useful insights."

KNOWLEDGE BOUNDARIES:
- Don't claim expertise in 3D animation, gaming, or AR/VR
- If unsure: "That's a great question for Freddy. What's your email so he can send you specific insights?"
- Focus on: strategic research, workflow automation, AI implementation, business intelligence

Remember: You're teaching them about their AI potential while showcasing FIELDPORTER's expertise through personality and real examples.`;

// Query complexity analyzer for dynamic response length
function analyzeQueryComplexity(
  message: string,
  conversationHistory: Message[],
): {
  mode: "quick" | "standard" | "educational";
  maxTokens: number;
  reasoning: string;
} {
  const lowerMessage = message.toLowerCase();
  const words = lowerMessage.split(/\s+/);

  // Quick responses (1-2 sentences, 100 tokens)
  const quickPatterns = [
    /^(hi|hello|hey|thanks|thank you|ok|okay|yes|no|sure)$/i,
    /^(what's up|how's it going|good|great|awesome)$/i,
  ];

  if (quickPatterns.some((pattern) => pattern.test(lowerMessage.trim()))) {
    return {
      mode: "quick",
      maxTokens: 100,
      reasoning: "Simple greeting or acknowledgment",
    };
  }

  // Educational responses (5-8 sentences, 400 tokens)
  const educationalPatterns = [
    /how does.*work/i,
    /what.*process/i,
    /explain.*how/i,
    /walk me through/i,
    /tell me about.*implementation/i,
    /what.*methodology/i,
    /how would you.*approach/i,
    /what.*steps/i,
    /technical.*details/i,
    /architecture/i,
    /integration/i,
    /workflow/i,
  ];

  if (educationalPatterns.some((pattern) => pattern.test(lowerMessage))) {
    return {
      mode: "educational",
      maxTokens: 400,
      reasoning: "User asking for detailed explanation or process information",
    };
  }

  // Educational if message is long and complex
  if (words.length > 20) {
    return {
      mode: "educational",
      maxTokens: 400,
      reasoning: "Long, complex message requiring detailed response",
    };
  }

  // Educational if it's a follow-up to a technical discussion
  const recentMessages = conversationHistory.slice(-4);
  const hasTechnicalContext = recentMessages.some(
    (msg) =>
      msg.content.toLowerCase().includes("technical") ||
      msg.content.toLowerCase().includes("implementation") ||
      msg.content.toLowerCase().includes("workflow") ||
      msg.content.toLowerCase().includes("process"),
  );

  if (hasTechnicalContext && words.length > 8) {
    return {
      mode: "educational",
      maxTokens: 400,
      reasoning: "Technical discussion requiring detailed explanation",
    };
  }

  // Standard responses (2-4 sentences, 200 tokens) - default
  return {
    mode: "standard",
    maxTokens: 200,
    reasoning: "Standard conversational response with follow-up question",
  };
}

// Enhanced lead scoring with more nuanced detection
const ENHANCED_QUALIFICATION_KEYWORDS = {
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

  // Service-specific interests
  "strategic research": 4,
  "rapid prototyping": 3,
  "business advisory": 3,
  "ai training": 3,
};

// Enhanced contact detection patterns
const CONTACT_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
  phone:
    /\b(?:\+?1[-.]?)?(?:\()?([0-9]{3})(?:\))?[-.]?([0-9]{3})[-.]?([0-9]{4})\b/g,
  wantsContact: [
    "contact",
    "reach out",
    "get in touch",
    "speak to someone",
    "talk to someone",
    "call me",
    "email me",
    "schedule",
    "book",
    "connect with team",
    "discuss directly",
  ],
};

// Request/Response interfaces
interface ChatRequest {
  message: string;
  sessionId: string;
  conversationHistory?: Message[];
  userEmail?: string | null;
  messageCount?: number;
}

interface EnhancedChatResponse {
  response: string;
  sessionId: string;
  messageCount: number;
  shouldNotify: boolean;
  userEmail?: string | null;
  userPhone?: string | null;
  leadScore: number;
  metadata: {
    timestamp: string;
    agent: string;
    responseTime: number;
    leadScore: number;
    emailCollected: boolean;
    phoneCollected: boolean;
    contactRequested: boolean;
    qualificationSignals: string[];
    confidenceScore: number;
  };
}

// Utility functions
function extractContactInfo(message: string) {
  const emails = message.match(CONTACT_PATTERNS.email);
  const phones = message.match(CONTACT_PATTERNS.phone);
  const wantsContact = CONTACT_PATTERNS.wantsContact.some((pattern) =>
    message.toLowerCase().includes(pattern),
  );

  return {
    email: emails?.[0] || null,
    phone: phones?.[0] || null,
    wantsContact,
  };
}

function calculateEnhancedLeadScore(
  message: string,
  conversationHistory: Message[] = [],
): { score: number; signals: string[] } {
  let score = 1;
  const signals: string[] = [];
  const lowerMessage = message.toLowerCase();

  // Keyword scoring
  for (const [keyword, points] of Object.entries(
    ENHANCED_QUALIFICATION_KEYWORDS,
  )) {
    if (lowerMessage.includes(keyword)) {
      score += points;
      signals.push(`keyword: ${keyword} (+${points})`);
    }
  }

  // Contact information bonus
  const contactInfo = extractContactInfo(message);
  if (contactInfo.email) {
    score += 5;
    signals.push("email provided (+5)");
  }
  if (contactInfo.phone) {
    score += 4;
    signals.push("phone provided (+4)");
  }
  if (contactInfo.wantsContact) {
    score += 3;
    signals.push("contact requested (+3)");
  }

  // ENHANCED CONVERSATION DEPTH ANALYSIS
  const conversationDepthScore = analyzeConversationDepth(
    conversationHistory,
    message,
  );
  score += conversationDepthScore.score;
  signals.push(...conversationDepthScore.signals);

  // Message length and sophistication
  if (message.length > 100) {
    score += 1;
    signals.push("detailed message (+1)");
  }

  // Question sophistication (business-focused questions)
  const sophisticatedQuestions = [
    "how much",
    "what cost",
    "pricing",
    "implementation",
    "team size",
    "similar clients",
    "case study",
    "timeline",
  ];

  if (sophisticatedQuestions.some((q) => lowerMessage.includes(q))) {
    score += 2;
    signals.push("sophisticated question (+2)");
  }

  return { score, signals };
}

function analyzeConversationDepth(
  conversationHistory: Message[],
  currentMessage: string,
): { score: number; signals: string[] } {
  let score = 0;
  const signals: string[] = [];
  const userMessages = conversationHistory.filter((msg) => msg.role === "user");
  const conversationLength = conversationHistory.length;

  // Basic engagement scoring
  if (conversationLength >= 3) {
    score += 1;
    signals.push("active conversation (+1)");
  }
  if (conversationLength >= 6) {
    score += 1;
    signals.push("engaged conversation (+1)");
  }
  if (conversationLength >= 10) {
    score += 2;
    signals.push("deep engagement (+2)");
  }

  // Progressive interest analysis
  const hasProgressiveInterest = analyzeProgressiveInterest(userMessages);
  if (hasProgressiveInterest.isProgressive) {
    score += hasProgressiveInterest.score;
    signals.push(...hasProgressiveInterest.signals);
  }

  // Topic consistency and focus
  const topicAnalysis = analyzeTopicConsistency(userMessages);
  if (topicAnalysis.isFocused) {
    score += topicAnalysis.score;
    signals.push(...topicAnalysis.signals);
  }

  // Question sophistication progression
  const questionAnalysis = analyzeQuestionSophistication(
    userMessages,
    currentMessage,
  );
  if (questionAnalysis.isProgressing) {
    score += questionAnalysis.score;
    signals.push(...questionAnalysis.signals);
  }

  // Objection handling and follow-up patterns
  const objectionAnalysis = analyzeObjectionHandling(userMessages);
  if (objectionAnalysis.score > 0) {
    score += objectionAnalysis.score;
    signals.push(...objectionAnalysis.signals);
  }

  return { score, signals };
}

function analyzeProgressiveInterest(userMessages: Message[]): {
  isProgressive: boolean;
  score: number;
  signals: string[];
} {
  if (userMessages.length < 3)
    return { isProgressive: false, score: 0, signals: [] };

  const interestLevels = [
    { patterns: ["what", "how", "tell me"], level: 1 },
    { patterns: ["pricing", "cost", "budget", "investment"], level: 2 },
    {
      patterns: ["implementation", "timeline", "next steps", "process"],
      level: 3,
    },
    {
      patterns: ["start", "begin", "schedule", "contact", "meeting"],
      level: 4,
    },
  ];

  let maxLevel = 0;
  let progression = false;
  const signals: string[] = [];

  userMessages.forEach((msg, index) => {
    const content = msg.content.toLowerCase();
    for (const levelData of interestLevels) {
      if (levelData.patterns.some((pattern) => content.includes(pattern))) {
        if (levelData.level > maxLevel) {
          maxLevel = levelData.level;
          if (index > 0) progression = true;
        }
        break;
      }
    }
  });

  if (progression && maxLevel >= 3) {
    signals.push("progressive interest (+2)");
    return { isProgressive: true, score: 2, signals };
  }
  if (progression && maxLevel >= 2) {
    signals.push("building interest (+1)");
    return { isProgressive: true, score: 1, signals };
  }

  return { isProgressive: false, score: 0, signals: [] };
}

function analyzeTopicConsistency(userMessages: Message[]): {
  isFocused: boolean;
  score: number;
  signals: string[];
} {
  if (userMessages.length < 3)
    return { isFocused: false, score: 0, signals: [] };

  const topics = {
    automation: ["automation", "automate", "workflow", "process"],
    strategy: ["strategy", "strategic", "plan", "consulting"],
    technical: ["technical", "api", "integration", "development"],
    business: ["business", "revenue", "growth", "efficiency"],
  };

  const topicCounts = Object.keys(topics).reduce(
    (acc, topic) => {
      acc[topic] = 0;
      return acc;
    },
    {} as Record<string, number>,
  );

  userMessages.forEach((msg) => {
    const content = msg.content.toLowerCase();
    Object.entries(topics).forEach(([topic, keywords]) => {
      if (keywords.some((keyword) => content.includes(keyword))) {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      }
    });
  });

  const dominantTopic = Object.entries(topicCounts).reduce(
    (max, [topic, count]) => (count > max.count ? { topic, count } : max),
    { topic: "", count: 0 },
  );

  if (
    dominantTopic.count >= 2 &&
    dominantTopic.count >= userMessages.length * 0.5
  ) {
    return {
      isFocused: true,
      score: 1,
      signals: [`focused on ${dominantTopic.topic} (+1)`],
    };
  }

  return { isFocused: false, score: 0, signals: [] };
}

function analyzeQuestionSophistication(
  userMessages: Message[],
  currentMessage: string,
): {
  isProgressing: boolean;
  score: number;
  signals: string[];
} {
  const allMessages = [...userMessages, { content: currentMessage } as Message];

  const sophisticationLevels = [
    { patterns: ["what", "who", "where"], level: 1, name: "basic" },
    { patterns: ["how", "why", "when"], level: 2, name: "exploratory" },
    {
      patterns: ["what if", "how much", "timeline", "process"],
      level: 3,
      name: "evaluative",
    },
    {
      patterns: ["implementation", "next steps", "contract", "agreement"],
      level: 4,
      name: "decisive",
    },
  ];

  let hasProgression = false;
  let maxLevel = 0;
  let previousLevel = 0;

  allMessages.forEach((msg) => {
    const content = msg.content.toLowerCase();
    for (const level of sophisticationLevels) {
      if (level.patterns.some((pattern) => content.includes(pattern))) {
        if (level.level > previousLevel) {
          hasProgression = true;
        }
        maxLevel = Math.max(maxLevel, level.level);
        previousLevel = level.level;
        break;
      }
    }
  });

  if (hasProgression && maxLevel >= 3) {
    return {
      isProgressing: true,
      score: 2,
      signals: ["sophisticated question progression (+2)"],
    };
  }

  return { isProgressing: false, score: 0, signals: [] };
}

function analyzeObjectionHandling(userMessages: Message[]): {
  score: number;
  signals: string[];
} {
  const objectionPatterns = [
    { patterns: ["but", "however", "although"], type: "soft_objection" },
    { patterns: ["expensive", "too much", "budget"], type: "price_concern" },
    { patterns: ["not sure", "uncertain", "doubt"], type: "uncertainty" },
    { patterns: ["think about it", "consider", "discuss with"], type: "delay" },
  ];

  const followUpPatterns = [
    "tell me more",
    "explain",
    "how would",
    "what about",
    "can you",
  ];

  let hasObjections = false;
  let hasFollowUps = false;

  userMessages.forEach((msg) => {
    const content = msg.content.toLowerCase();

    // Check for objections
    if (
      objectionPatterns.some((obj) =>
        obj.patterns.some((pattern) => content.includes(pattern)),
      )
    ) {
      hasObjections = true;
    }

    // Check for follow-ups after objections
    if (followUpPatterns.some((pattern) => content.includes(pattern))) {
      hasFollowUps = true;
    }
  });

  if (hasObjections && hasFollowUps) {
    return {
      score: 2,
      signals: ["overcoming objections (+2)"],
    };
  }

  return { score: 0, signals: [] };
}

function prepareConversationContext(
  messages: Message[],
  maxMessages: number = 12, // Increased from 8 for better context retention
): string {
  // Filter to user and assistant messages only
  const filteredMessages = messages.filter(
    (msg) => msg.role === "user" || msg.role === "assistant",
  );

  if (filteredMessages.length === 0) return "";

  // For longer conversations, provide summary of early messages + recent context
  if (filteredMessages.length > maxMessages) {
    const earlyMessages = filteredMessages.slice(0, -maxMessages);
    const recentMessages = filteredMessages.slice(-maxMessages);

    // Generate conversation summary for early messages
    const summary = generateConversationSummary(earlyMessages);
    const recentContext = formatMessagesForContext(recentMessages);

    return summary
      ? `Earlier in conversation: ${summary}\n\nRecent context:\n${recentContext}`
      : recentContext;
  }

  return formatMessagesForContext(filteredMessages);
}

function formatMessagesForContext(messages: Message[]): string {
  return messages
    .map(
      (msg) =>
        `${msg.role === "user" ? "User" : "FIELDPORTER"}: ${msg.content}`,
    )
    .join("\n");
}

function generateConversationSummary(messages: Message[]): string {
  if (messages.length === 0) return "";

  const userMessages = messages.filter((m) => m.role === "user");
  const topics = extractConversationTopics(userMessages);
  const leadIndicators = extractLeadIndicators(userMessages);

  const topicSummary =
    topics.length > 0 ? `User discussed ${topics.join(", ")}` : "";
  const leadSummary =
    leadIndicators.length > 0
      ? `Showed interest in ${leadIndicators.join(", ")}`
      : "";

  return [topicSummary, leadSummary].filter(Boolean).join(". ");
}

function extractConversationTopics(userMessages: Message[]): string[] {
  const topics = new Set<string>();
  const topicKeywords = {
    "AI strategy": [
      "ai strategy",
      "artificial intelligence",
      "machine learning",
    ],
    automation: ["automation", "automate", "workflow"],
    consulting: ["consulting", "consultant", "advice"],
    "technical implementation": ["technical", "implementation", "integration"],
    "business challenges": ["problem", "challenge", "issue", "bottleneck"],
  };

  userMessages.forEach((msg) => {
    const content = msg.content.toLowerCase();
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some((keyword) => content.includes(keyword))) {
        topics.add(topic);
      }
    });
  });

  return Array.from(topics);
}

function extractLeadIndicators(userMessages: Message[]): string[] {
  const indicators = new Set<string>();
  const leadKeywords = {
    "strategic research": ["research", "analysis", "market"],
    "rapid development": ["development", "prototype", "mvp"],
    "process optimization": ["optimize", "efficiency", "workflow"],
    "AI training": ["training", "education", "learning"],
  };

  userMessages.forEach((msg) => {
    const content = msg.content.toLowerCase();
    Object.entries(leadKeywords).forEach(([service, keywords]) => {
      if (keywords.some((keyword) => content.includes(keyword))) {
        indicators.add(service);
      }
    });
  });

  return Array.from(indicators);
}

function validateAndEnhanceResponse(
  response: string,
  userMessage: string,
  conversationHistory: Message[],
  leadScore: number,
): string {
  let enhancedResponse = response;

  // 1. Check minimum quality thresholds
  if (!response || response.trim().length < 50) {
    console.log("Response too short, using contextual fallback");
    return generateContextualFallback(userMessage, conversationHistory);
  }

  // 2. Detect and fix repetitive responses
  if (isRepetitiveResponse(response, conversationHistory)) {
    console.log("Repetitive response detected, generating variation");
    enhancedResponse = generateVariedResponse(userMessage, conversationHistory);
  }

  // 3. Ensure proper lead qualification questions for engaged prospects
  if (shouldAskQualificationQuestion(leadScore, conversationHistory)) {
    enhancedResponse = addQualificationQuestion(
      enhancedResponse,
      userMessage,
      leadScore,
    );
  }

  // 4. Check for confidentiality breaches and inappropriate claims
  enhancedResponse = sanitizeResponse(enhancedResponse);

  // 5. Ensure contextual relevance
  if (!isResponseRelevant(enhancedResponse, userMessage)) {
    return generateContextualResponse(userMessage, conversationHistory);
  }

  return enhancedResponse;
}

function generateContextualFallback(
  userMessage: string,
  conversationHistory: Message[],
): string {
  const lowerMessage = userMessage.toLowerCase();

  // Check conversation context for better fallbacks
  const hasDiscussedServices = conversationHistory.some(
    (msg) =>
      msg.content.toLowerCase().includes("service") ||
      msg.content.toLowerCase().includes("automation") ||
      msg.content.toLowerCase().includes("strategy"),
  );

  if (lowerMessage.includes("budget") || lowerMessage.includes("pricing")) {
    return hasDiscussedServices
      ? "Based on what we've discussed, I'd recommend connecting with our team for a detailed proposal. What's your email so they can follow up with specific pricing?"
      : "For specific pricing discussions, our team needs to understand your requirements better. What's the main challenge you're looking to solve?";
  }

  if (lowerMessage.includes("technical") || lowerMessage.includes("how")) {
    return hasDiscussedServices
      ? "That's getting into the technical implementation details our team would love to discuss with you. What's your email so they can provide specific guidance?"
      : "That's an excellent technical question. Our approach varies based on your specific infrastructure and needs. What's the main technical challenge you're facing?";
  }

  return "Thanks for your question! Based on our conversation, this sounds like something our team should discuss with you directly. What's the best way to connect?";
}

function isRepetitiveResponse(
  response: string,
  conversationHistory: Message[],
): boolean {
  const assistantMessages = conversationHistory
    .filter((msg) => msg.role === "assistant")
    .slice(-3); // Check last 3 assistant messages

  if (assistantMessages.length === 0) return false;

  const responseWords = new Set(response.toLowerCase().split(/\s+/));

  return assistantMessages.some((msg) => {
    const msgWords = new Set(msg.content.toLowerCase().split(/\s+/));
    const intersection = new Set(
      [...responseWords].filter((x) => msgWords.has(x)),
    );
    const similarity =
      intersection.size / Math.min(responseWords.size, msgWords.size);
    return similarity > 0.7; // 70% word overlap indicates repetition
  });
}

function generateVariedResponse(
  userMessage: string,
  conversationHistory: Message[],
): string {
  const lowerMessage = userMessage.toLowerCase();
  const hasDiscussedBudget = conversationHistory.some(
    (msg) =>
      msg.content.toLowerCase().includes("budget") ||
      msg.content.toLowerCase().includes("pricing"),
  );

  // Provide varied responses based on conversation context
  if (lowerMessage.includes("help") || lowerMessage.includes("assist")) {
    if (hasDiscussedBudget) {
      return "Absolutely! Since we've touched on budget considerations, the next step would be a consultation to map out the specific approach for your needs. What's your email so our team can follow up?";
    }
    return "I'd be happy to help! What's the primary business challenge or inefficiency you're looking to address?";
  }

  if (lowerMessage.includes("automation")) {
    return hasDiscussedBudget
      ? "Perfect timing to discuss automation solutions. Our team can show you exactly how this would work for your specific workflows. What's your email for a direct follow-up?"
      : "Smart focus on automation. What manual processes are currently taking up the most time for your team?";
  }

  return "I understand you're exploring solutions for your business. What specific operational challenge would you like to tackle first?";
}

function shouldAskQualificationQuestion(
  leadScore: number,
  conversationHistory: Message[],
): boolean {
  // Only ask qualification questions for high-value prospects who have shown genuine engagement
  if (leadScore < 8) return false; // Increased from 5 to 8 - be more selective

  // Require at least 3 exchanges before asking qualification questions
  if (conversationHistory.length < 6) return false; // At least 3 user + 3 assistant messages

  const recentMessages = conversationHistory.slice(-6);
  const recentQuestions = recentMessages.filter(
    (msg) =>
      msg.role === "assistant" &&
      (msg.content.includes("email") ||
        msg.content.includes("contact") ||
        msg.content.includes("connect")),
  );

  // Don't ask if we've already asked for contact info
  return recentQuestions.length === 0;
}

function addQualificationQuestion(
  response: string,
  userMessage: string,
  leadScore: number,
): string {
  const lowerMessage = userMessage.toLowerCase();

  // Only add qualification questions for very high-value prospects
  if (leadScore < 9) {
    // For medium-high prospects, ask business questions instead of contact info
    if (
      lowerMessage.includes("automation") ||
      lowerMessage.includes("process")
    ) {
      return (
        response +
        " How many hours per week does your team currently spend on manual tasks?"
      );
    } else if (
      lowerMessage.includes("strategy") ||
      lowerMessage.includes("ai")
    ) {
      return (
        response + " What's your biggest operational bottleneck right now?"
      );
    }
    return response; // No qualification question for lower scores
  }

  // For very high-value prospects (9+), consider asking for contact
  if (
    !response.toLowerCase().includes("email") &&
    !response.toLowerCase().includes("contact")
  ) {
    return (
      response +
      " What's your email so our team can follow up with specific recommendations?"
    );
  }

  return response;
}

function sanitizeResponse(response: string): string {
  let sanitized = response;

  // Remove any mentions of confidential client work
  const confidentialTerms = [
    "papps mastery",
    "voycap",
    "harpers",
    "sir the label",
    "steve papps",
    "self-development platform",
  ];

  const lowerResponse = sanitized.toLowerCase();
  for (const term of confidentialTerms) {
    if (lowerResponse.includes(term)) {
      return "I'd be happy to discuss how FIELDPORTER can help with your strategic challenges. What specific business problem are you looking to solve?";
    }
  }

  // Remove any false 3D/gaming capability claims
  const false3DPatterns = [
    /NVIDIA\s+Omniverse/gi,
    /Blender\s+(scripting|automation)/gi,
    /Unity\s+(rendering|workflows)/gi,
    /(built|developed|created)\s+.*3D.*pipelines?/gi,
    /gaming\s+(client|project|work)/gi,
    /AR\/VR\s+(client|project|work)/gi,
  ];

  for (const pattern of false3DPatterns) {
    if (pattern.test(sanitized)) {
      return "That's outside our current service focus. We specialize in strategic research, AI implementation, and workflow automation. What specific business challenge are you looking to solve?";
    }
  }

  return sanitized;
}

function isResponseRelevant(response: string, userMessage: string): boolean {
  const responseWords = new Set(response.toLowerCase().split(/\s+/));
  const messageWords = new Set(userMessage.toLowerCase().split(/\s+/));

  // Check for basic relevance - at least some word overlap or relevant business terms
  const intersection = new Set(
    [...responseWords].filter((x) => messageWords.has(x)),
  );
  const hasOverlap = intersection.size > 0;

  const hasBusinessTerms =
    responseWords.has("business") ||
    responseWords.has("strategy") ||
    responseWords.has("automation") ||
    responseWords.has("help") ||
    responseWords.has("solution") ||
    responseWords.has("challenge");

  return hasOverlap || hasBusinessTerms;
}

function generateContextualResponse(
  userMessage: string,
  conversationHistory: Message[],
): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("what") || lowerMessage.includes("how")) {
    return "That's a great question about our approach. Every business has unique challenges, so our solutions are customized accordingly. What's the main operational challenge you're trying to solve?";
  }

  if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
    return "Investment varies based on scope and complexity. Our strategic research typically runs $10K-$50K, automation projects $5K-$25K. What type of challenge are you looking to address?";
  }

  return "I want to make sure I understand your specific situation correctly. What's the primary business challenge that brought you here today?";
}

async function callDeepSeekAPI(
  message: string,
  conversationContext: string,
  conversationHistory: Message[] = [],
): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error("DeepSeek API key not configured");
  }

  // Analyze query complexity to determine response length
  const complexity = analyzeQueryComplexity(message, conversationHistory);

  const messages = [
    {
      role: "system",
      content: TEACHING_SYSTEM_PROMPT,
    },
  ];

  // Add conversation context if available
  if (conversationContext) {
    messages.push({
      role: "system",
      content: `Previous conversation context:\n${conversationContext}`,
    });
  }

  // Add complexity guidance to the system
  messages.push({
    role: "system",
    content: `Response mode: ${complexity.mode}. ${complexity.reasoning}. Adjust your response length accordingly.`,
  });

  messages.push({
    role: "user",
    content: message,
  });

  const response = await fetch(`${DEEPSEEK_BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      max_tokens: complexity.maxTokens, // Dynamic based on query complexity
      temperature: 0.6, // Increased from 0.3 for more natural variety
      top_p: 0.9,
      frequency_penalty: 0.3, // Increased from 0.1 to reduce repetition
      presence_penalty: 0.4, // Increased from 0.1 for topic variety
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `DeepSeek API error: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  if (!data.choices?.[0]?.message?.content) {
    throw new Error("Invalid response from DeepSeek API");
  }

  return data.choices[0].message.content.trim();
}

function formatResponse(content: string): string {
  return (
    content
      // Clean up formatting
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      // Remove excessive punctuation
      .replace(/[•●◦▪▫]/g, "•")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s+/g, " ")
      // Ensure reasonable length but don't truncate mid-sentence
      .substring(0, 800) // Increased from 400 to allow complete responses
      .trim()
  );
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Qualified prospect fallback
  if (lowerMessage.includes("budget") || lowerMessage.includes("pricing")) {
    return "For specific pricing discussions, our team will need to understand your requirements better. Let me connect you with someone who can provide a detailed consultation.";
  }

  // Technical question fallback
  if (lowerMessage.includes("how") || lowerMessage.includes("technical")) {
    return "That's an excellent technical question. Our implementation approach varies based on your specific infrastructure. Would you like to schedule a technical consultation?";
  }

  // General fallback
  return "Thanks for your question! This sounds like something our team should discuss with you directly. What's the best way to connect about your AI strategy needs?";
}

// Progressive teaching flow implementation
function determineConversationPhase(conversationHistory: Message[]): {
  phase: ConversationPhase;
  reasoning: string;
} {
  const userMessages = conversationHistory.filter((msg) => msg.role === "user");
  const totalMessages = conversationHistory.length;

  // Discovery phase (early conversation)
  if (userMessages.length <= 2) {
    return {
      phase: "discovery",
      reasoning:
        "Early in conversation, focus on understanding their challenge",
    };
  }

  // Analyze message content to determine phase
  const recentUserMessages = userMessages.slice(-3);
  const recentContent = recentUserMessages
    .map((msg) => msg.content.toLowerCase())
    .join(" ");

  // Decision phase indicators
  const decisionSignals = [
    "timeline",
    "budget",
    "next step",
    "getting started",
    "move forward",
    "schedule",
    "call",
    "meeting",
    "contact",
    "team",
    "email",
  ];

  if (decisionSignals.some((signal) => recentContent.includes(signal))) {
    return {
      phase: "decision",
      reasoning: "User showing readiness signals, guide toward next steps",
    };
  }

  // Evaluation phase indicators
  const evaluationSignals = [
    "how much",
    "cost",
    "pricing",
    "compare",
    "options",
    "evaluate",
    "consider",
    "pros and cons",
    "benefits",
    "roi",
    "implementation",
  ];

  if (evaluationSignals.some((signal) => recentContent.includes(signal))) {
    return {
      phase: "evaluation",
      reasoning: "User evaluating options, help assess fit and feasibility",
    };
  }

  // Learning phase indicators (or default after discovery)
  const learningSignals = [
    "how does",
    "what happens",
    "tell me",
    "explain",
    "understand",
    "learn",
    "process",
    "work",
    "implementation",
    "approach",
  ];

  if (
    learningSignals.some((signal) => recentContent.includes(signal)) ||
    userMessages.length >= 3
  ) {
    return {
      phase: "learning",
      reasoning: "User ready to learn, teach how AI addresses their challenge",
    };
  }

  // Default to discovery
  return {
    phase: "discovery",
    reasoning: "Continue understanding their primary challenge",
  };
}

function identifyUserChallenge(
  conversationHistory: Message[],
): ChallengeType | null {
  const userMessages = conversationHistory.filter((msg) => msg.role === "user");
  const allContent = userMessages
    .map((msg) => msg.content.toLowerCase())
    .join(" ");

  // Match content to challenge types
  const challengePatterns = {
    manual_processes: [
      "manual",
      "repetitive",
      "data entry",
      "time consuming",
      "tedious",
    ],
    data_analysis: [
      "data",
      "analysis",
      "reporting",
      "insights",
      "patterns",
      "analytics",
    ],
    customer_insights: [
      "customer",
      "client",
      "churn",
      "satisfaction",
      "retention",
    ],
    workflow_optimization: [
      "workflow",
      "process",
      "bottleneck",
      "efficiency",
      "optimize",
    ],
    communication_overhead: [
      "meetings",
      "communication",
      "status",
      "updates",
      "coordination",
    ],
    decision_making: ["decisions", "evaluate", "choose", "options", "analysis"],
  };

  for (const [challenge, patterns] of Object.entries(challengePatterns)) {
    if (patterns.some((pattern) => allContent.includes(pattern))) {
      return challenge as ChallengeType;
    }
  }

  return null;
}

function identifyUserIndustry(
  conversationHistory: Message[],
): IndustryType | null {
  const userMessages = conversationHistory.filter((msg) => msg.role === "user");
  const allContent = userMessages
    .map((msg) => msg.content.toLowerCase())
    .join(" ");

  const industryPatterns = {
    manufacturing: [
      "manufacturing",
      "factory",
      "production",
      "assembly",
      "quality control",
    ],
    retail: ["retail", "store", "ecommerce", "inventory", "customers", "sales"],
    healthcare: ["healthcare", "medical", "patients", "clinic", "hospital"],
    financial: ["financial", "banking", "investment", "insurance", "loans"],
    construction: ["construction", "building", "contractor", "project", "site"],
    professional_services: [
      "consulting",
      "legal",
      "accounting",
      "professional",
      "services",
    ],
  };

  for (const [industry, patterns] of Object.entries(industryPatterns)) {
    if (patterns.some((pattern) => allContent.includes(pattern))) {
      return industry as IndustryType;
    }
  }

  return null;
}

// Enhanced teaching response with FIELDPORTER knowledge and personality
function generateTeachingResponse(
  message: string,
  conversationHistory: Message[],
  phase: ConversationPhase,
  challenge: ChallengeType | null,
  industry: IndustryType | null,
): string {
  const lowerMessage = message.toLowerCase();

  // Handle greetings with personality
  if (
    phase === "discovery" &&
    conversationHistory.filter((m) => m.role === "user").length <= 1
  ) {
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return getPersonalityResponse("greeting");
    }
  }

  // Handle service inquiries with knowledge and personality
  if (
    lowerMessage.includes("what do you do") ||
    lowerMessage.includes("services") ||
    lowerMessage.includes("what does fieldporter")
  ) {
    const transition = getPersonalityResponse("transition");
    const quirk = getPersonalityResponse("quirk");
    return `${transition} ${quirk} Instead of rattling off services, let me understand your challenge first. What's the biggest time-waster in your operations right now?`;
  }

  // Handle pricing questions with honesty and humor
  if (
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("budget")
  ) {
    const humor = getPersonalityResponse("humor");
    return `${humor} Investment really depends on what you're trying to solve. Our projects typically range from $2K for workflow automation to $50K for comprehensive market research. What specific challenge are you looking to tackle?`;
  }

  // Identify relevant service for their challenge
  const relevantService = getServiceByType(message);

  // Discovery phase - understand their challenge with personality
  if (phase === "discovery") {
    const phaseData = CONVERSATION_PHASES[phase];
    const question =
      phaseData.questions[
        Math.floor(Math.random() * phaseData.questions.length)
      ];
    const followUp =
      Math.random() > 0.5
        ? phaseData.follow_ups[
            Math.floor(Math.random() * phaseData.follow_ups.length)
          ]
        : "";

    return `${question} ${followUp}`.trim();
  }

  // Learning phase - teach with FIELDPORTER examples and personality
  if (phase === "learning") {
    if (challenge && relevantService) {
      const transition = getPersonalityResponse("transition");
      const serviceInfo = relevantService;
      const teachingMoment =
        FIELDPORTER_COMPANY.teaching_frameworks.ai_transformation_potential
          .teaching_moments[
          Math.floor(
            Math.random() *
              FIELDPORTER_COMPANY.teaching_frameworks
                .ai_transformation_potential.teaching_moments.length,
          )
        ];

      return `${transition} ${serviceInfo.teaching_angle} ${teachingMoment} ${serviceInfo.personality_hook} What aspect of this interests you most?`;
    }

    if (challenge) {
      const challengeData = CHALLENGE_SOLUTIONS[challenge];
      const honestTruth =
        FIELDPORTER_COMPANY.teaching_frameworks.implementation_reality
          .honest_truths[
          Math.floor(
            Math.random() *
              FIELDPORTER_COMPANY.teaching_frameworks.implementation_reality
                .honest_truths.length,
          )
        ];
      const question =
        challengeData.questions[
          Math.floor(Math.random() * challengeData.questions.length)
        ];

      return `${challengeData.insight} ${honestTruth} ${question}`;
    }

    return "I'd love to share specific insights, but I need to understand your challenge better first. What's the main operational bottleneck you're trying to solve?";
  }

  // Evaluation phase - help assess fit with real FIELDPORTER info
  if (phase === "evaluation") {
    const evaluationData = CONVERSATION_PHASES.evaluation;
    const question =
      evaluationData.questions[
        Math.floor(Math.random() * evaluationData.questions.length)
      ];
    const followUp =
      evaluationData.follow_ups[
        Math.floor(Math.random() * evaluationData.follow_ups.length)
      ];

    if (relevantService) {
      return `For ${relevantService.name.toLowerCase()}, ${relevantService.why_it_works.toLowerCase()} Typically takes ${relevantService.timeline} with investment around ${relevantService.investment_range}. ${question} ${followUp}`;
    }

    return `${question} ${followUp}`;
  }

  // Decision phase - guide to next steps with personality
  if (phase === "decision") {
    const handoffStrategy =
      Math.random() > 0.7 ? "technical_depth" : "high_engagement";
    const handoffOptions =
      FIELDPORTER_COMPANY.handoff_strategies[handoffStrategy];
    const handoff =
      handoffOptions[Math.floor(Math.random() * handoffOptions.length)]!;

    return handoff;
  }

  // Fallback with personality
  const transition = getPersonalityResponse("transition");
  return `${transition} I want to understand your specific challenge better so I can share relevant insights. What's the main operational issue you're looking to solve?`;
}

// Enhanced email collection with value-focused approach
function shouldCollectEmail(
  conversationHistory: Message[],
  phase: ConversationPhase,
  leadScore: number,
  challenge: ChallengeType | null,
): {
  should: boolean;
  strategy: keyof typeof EMAIL_COLLECTION_STRATEGIES;
  message: string;
} {
  const userMessages = conversationHistory.filter((msg) => msg.role === "user");

  // High lead score or decision phase - offer value
  if (leadScore >= 8 || phase === "decision") {
    const valueOffer =
      FIELDPORTER_COMPANY.handoff_strategies.value_offers[
        Math.floor(
          Math.random() *
            FIELDPORTER_COMPANY.handoff_strategies.value_offers.length,
        )
      ]!;
    return {
      should: true,
      strategy: "value_exchange",
      message: valueOffer,
    };
  }

  // Deep engagement - personalized follow-up
  if (userMessages.length >= 4 && challenge) {
    return {
      should: true,
      strategy: "deep_engagement",
      message: `You're asking great questions about ${challenge.replace("_", " ")}. Want me to have Freddy send you a personalized roadmap for your specific situation?`,
    };
  }

  // Technical discussions - expert consultation
  if (
    userMessages.some(
      (msg) =>
        msg.content.toLowerCase().includes("technical") ||
        msg.content.toLowerCase().includes("implementation") ||
        msg.content.toLowerCase().includes("integration"),
    )
  ) {
    const techHandoff =
      FIELDPORTER_COMPANY.handoff_strategies.technical_depth[
        Math.floor(
          Math.random() *
            FIELDPORTER_COMPANY.handoff_strategies.technical_depth.length,
        )
      ]!;
    return {
      should: true,
      strategy: "deep_engagement",
      message: `${techHandoff} What's your email?`,
    };
  }

  return {
    should: false,
    strategy: "value_exchange",
    message: "",
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse JSON with proper error handling
    let body: ChatRequest;
    try {
      const rawBody = await request.text();
      if (!rawBody.trim()) {
        return NextResponse.json(
          { error: "Empty request body" },
          { status: 400 },
        );
      }
      body = JSON.parse(rawBody);
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    const {
      message,
      sessionId,
      conversationHistory = [],
      userEmail = null,
      messageCount = 1,
    } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    // Health check
    if (message === "health_check") {
      return NextResponse.json({
        response:
          "FIELDPORTER AI Agent is running optimally with enhanced teaching capabilities",
        sessionId: "health_check_session",
        messageCount: 1,
        metadata: {
          status: "healthy",
          timestamp: new Date().toISOString(),
          agent: "fieldporter_nextjs_enhanced",
          responseTime: Date.now() - startTime,
        },
      });
    }

    // PERFORMANCE OPTIMIZATION: Try smart quick responses first
    const quickResponse = getSmartResponse(message, conversationHistory);
    if (quickResponse) {
      const responseTime = Date.now() - startTime;
      const leadScore = calculateEnhancedLeadScore(
        message,
        conversationHistory,
      ).score;

      return NextResponse.json({
        response: quickResponse,
        sessionId,
        messageCount: messageCount + 1,
        shouldNotify: leadScore >= 8,
        leadScore,
        metadata: {
          timestamp: new Date().toISOString(),
          agent: "quick_response_enhanced",
          responseTime,
          leadScore,
          emailCollected: false,
          phoneCollected: false,
          contactRequested: false,
          qualificationSignals: ["quick_response", "teaching_focused"],
          confidenceScore: 0.9,
        },
      });
    }

    // PERFORMANCE OPTIMIZATION: Check cache for more complex responses
    const cacheResult = await responseCacheService.getCachedResponse(
      message,
      sessionId,
      conversationHistory.length,
    );
    if (cacheResult.response) {
      const responseTime = Date.now() - startTime;

      return NextResponse.json({
        response: cacheResult.response,
        sessionId,
        messageCount: messageCount + 1,
        shouldNotify: false,
        leadScore: 1,
        metadata: {
          timestamp: new Date().toISOString(),
          agent: cacheResult.source || "cache",
          responseTime,
          leadScore: 1,
          emailCollected: false,
          phoneCollected: false,
          contactRequested: false,
          qualificationSignals: ["cached_response"],
          confidenceScore: 0.9,
        },
      });
    }

    // Determine conversation phase and generate teaching response
    const phase = determineConversationPhase(conversationHistory);
    const challenge = identifyUserChallenge(conversationHistory);
    const industry = identifyUserIndustry(conversationHistory);
    const intelligence = analyzeConversationIntelligence(conversationHistory);

    let aiResponse: string;

    try {
      // For high-engagement conversations, use AI-generated responses
      if (intelligence.engagement_level === "high" || !quickResponse) {
        // Call DeepSeek API with conversation history for complexity analysis
        aiResponse = await callDeepSeekAPI(
          message,
          prepareConversationContext([
            ...conversationHistory,
            {
              id: Date.now().toString(),
              role: "user",
              content: message,
              timestamp: new Date(),
            },
          ]),
          conversationHistory,
        );

        // Validate and enhance response quality
        aiResponse = validateAndEnhanceResponse(
          aiResponse,
          message,
          conversationHistory,
          calculateEnhancedLeadScore(message, conversationHistory).score,
        );
      }

      // Apply progressive teaching flow
      aiResponse = generateTeachingResponse(
        message,
        conversationHistory,
        phase.phase,
        challenge,
        industry,
      );

      // Determine if email should be collected
      const emailCollection = shouldCollectEmail(
        conversationHistory,
        phase.phase,
        calculateEnhancedLeadScore(message, conversationHistory).score,
        challenge,
      );

      if (emailCollection.should) {
        aiResponse += `\n\n${emailCollection.message}`;
      }
    } catch (error) {
      console.error("DeepSeek API error:", error);
      aiResponse = getFallbackResponse(message);
    }

    const formattedResponse = formatResponse(aiResponse);
    const responseTime = Date.now() - startTime;

    // Intelligent caching - only cache responses that are likely to be reused
    if (message.length < 50 && !extractContactInfo(message).email) {
      responseCacheService.storeCachedResponse(
        message,
        formattedResponse,
        sessionId,
        0.8,
        conversationHistory.length,
      );
    }

    // Determine if notification should be sent
    const leadData = calculateEnhancedLeadScore(message, conversationHistory);
    const contactInfo = extractContactInfo(message);
    const shouldNotify = Boolean(
      leadData.score >= 10 || contactInfo.email || contactInfo.phone,
    );

    // Build enhanced response with conversation intelligence
    const response: EnhancedChatResponse = {
      response: formattedResponse,
      sessionId,
      messageCount: messageCount + 1,
      shouldNotify,
      userEmail: contactInfo.email || userEmail,
      userPhone: contactInfo.phone,
      leadScore: leadData.score,
      metadata: {
        timestamp: new Date().toISOString(),
        agent: "deepseek-v3-enhanced",
        responseTime,
        leadScore: leadData.score,
        emailCollected: !!contactInfo.email,
        phoneCollected: !!contactInfo.phone,
        contactRequested: contactInfo.wantsContact,
        qualificationSignals: leadData.signals,
        confidenceScore: leadData.score >= 7 ? 0.9 : 0.7,
      },
    };

    // Send notification for qualified leads
    if (shouldNotify) {
      try {
        await import("@/lib/notification-service").then(
          ({ notificationService }) =>
            notificationService.sendLeadNotification({
              sessionId,
              userMessage: message,
              userEmail: response.userEmail,
              userPhone: response.userPhone,
              leadScore: leadData.score,
              qualificationSignals: leadData.signals,
              timestamp: new Date().toISOString(),
            }),
        );
      } catch (notificationError) {
        console.error("Notification failed:", notificationError);
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("API Error:", error);
    const errorResponseTime = Date.now() - startTime;

    return NextResponse.json(
      {
        response:
          "I'm having trouble connecting right now. But hey, that's what happens when AI meets reality sometimes! Please try again, or contact Freddy directly at freddy@fieldporter.com for immediate assistance.",
        sessionId: "error_session",
        messageCount: 1,
        shouldNotify: false,
        leadScore: 0,
        metadata: {
          timestamp: new Date().toISOString(),
          agent: "error_with_personality",
          responseTime: errorResponseTime,
          leadScore: 0,
          emailCollected: false,
          phoneCollected: false,
          contactRequested: false,
          qualificationSignals: ["api_error"],
          confidenceScore: 0,
        },
      },
      { status: 500 },
    );
  }
}

// Support CORS for development
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
