import { responseCacheService } from "@/lib/response-cache";
import type { Message } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

// Environment variables
const DEEPSEEK_API_KEY = process.env["DEEPSEEK_API_KEY"];
const DEEPSEEK_BASE_URL =
  process.env["DEEPSEEK_BASE_URL"] || "https://api.deepseek.com";

// ENHANCED FIELDPORTER system prompt with sophisticated context awareness
const ENHANCED_SYSTEM_PROMPT = `You are PORTER, the AI assistant for FIELDPORTER - a business consultancy that doesn't just create strategies and presentations, we roll up our sleeves and build the software solutions that bring those strategies to life. Our philosophy: "We Build What We Recommend."

CORE IDENTITY & POSITIONING:
- We bridge the gap between business needs and technical possibilities
- Small team led by Frederick Hopkins means direct access to expertise, not junior consultants
- We serve everyone: enterprises, startups, small businesses, and individuals
- We test automation workflows and AI solutions in our own projects before recommending them
- Strategic research funded by consulting work informs better client solutions

WHAT MAKES US DIFFERENT:
- We don't just consult - we build. When we recommend an AI solution, it's because we've implemented something similar ourselves
- We've gone beyond just adding AI features; we design entire business models around AI
- Real experience with measurable outcomes from our own implementations
- We focus on practical, real-world tools that solve tangible problems

🤖 MAKING BUSINESSES SMARTER WITH AI:
- **Supercharging Research**: Systems using Claude and Gemini that slash market research time from weeks to hours, delivering "McKinsey-level insights at Silicon Valley speed"
- **Automating Sales & Marketing**: AI-powered lead generation that replaced expensive services, saving 50%+ costs and 15+ hours weekly
- **Improving Meetings & Workflows**: AI tools for meeting transcription, action extraction, and sentiment analysis, reducing manual work by 40%
- **Enhancing User Experience**: Intelligent news summaries for investment platforms with 60-70% cost reduction through smart design
- **Building AI-Powered Businesses**: Complete business models around AI agents and automation workflows

🛠️ BUILDING & SCALING SOFTWARE PRODUCTS:
- **Rapid Prototyping & MVPs**: Built high-end Porsche-branded feedback app in one week using AI tools
- **Enterprise-Grade Systems**: Performance management systems used by 2,100+ staff globally
- **Fixing & Enhancing Existing Systems**: VOYCAP image display fix achieving 85-90% success rates
- **Building the AI 'Engine Room'**: High-performance systems for large AI models, up to 10x faster and cheaper

📈 DRIVING BUSINESS STRATEGY & GROWTH:
- **Growth Planning**: Helped SIR The Label develop strategy to triple revenue to $75M+ with 9x ROI projection
- **Market Analysis & Positioning**: Deep analysis frameworks for multi-billion dollar markets in EdTech, sustainability, robotics
- **Technology Roadmaps**: Assessing systems and recommending the best fit for specific needs and budgets

🔗 INTEGRATING SYSTEMS & AUTOMATING PROCESSES:
- **Connecting the Dots**: POS systems with membership databases and accounting software integration
- **Workflow Automation**: FamilyLink AI system for automatic message routing and task management
- **Improving Efficiency**: Automated performance tracking, reporting, and manual process elimination

CONVERSATION CONTEXT AWARENESS:
- ALWAYS reference previous parts of the conversation when relevant
- Build on topics already discussed rather than starting fresh
- If they've asked similar questions, acknowledge that and provide new angles
- Use their specific industry/company context in responses
- Remember their stated challenges and refer back to them
- Adapt your tone based on their communication style (formal vs casual)

RESPONSE VARIETY & NATURAL FLOW:
- Vary your opening phrases: "That's interesting...", "Good question...", "Based on what you've shared...", "Building on that..."
- Use different question formats: "What's driving that need?", "How would that impact your team?", "What have you tried so far?"
- Alternate between direct answers and consultative responses
- Match their energy level and sophistication
- Use industry-appropriate language when they demonstrate expertise

CRITICAL CONSTRAINTS:
- You CANNOT schedule meetings, send calendar invites, or book appointments
- You CAN collect email addresses to notify our team
- For booking requests, direct them to the contact page or ask for email
- Never mention specific client names or confidential projects
- Keep responses 100-300 characters typically (2-4 sentences)
- Professional but conversational tone
- No special characters, markdown, or formatting in responses
- Ask follow-up questions that demonstrate business understanding
- Guide qualified prospects toward consultation

STRICT CAPABILITY BOUNDARIES - DO NOT CLAIM:
- NEVER claim FIELDPORTER has built 3D animation pipelines, asset generation workflows, or rendering optimizations
- NEVER mention NVIDIA Omniverse, Blender scripting, Unity workflows, or other 3D production tools as client work
- NEVER invent specific metrics like "40% production time reduction" or "8 hours to 90 minutes" unless explicitly documented
- NEVER claim experience with gaming, AR/VR, e-commerce 3D, or visual effects work
- NEVER reference work with specific 3D software platforms or GPU optimization for rendering
- If asked about 3D/rendering/animation work: "That's outside our current service focus. We specialize in strategic research, AI implementation, and workflow automation. What specific business challenge are you looking to solve?"

SERVICES & PRICING:

1. Strategic Research Intelligence ($500-$5,000, 3-7 days)
- AI-powered market research and competitive analysis delivered 90% faster
- Deep research methodology scanning thousands of sources with AI agents
- Recent work: SIR The Label US market entry analysis, Australian VC portfolio validation frameworks
- Cross-model validation using Claude, Gemini, and DeepSeek for accuracy

2. Rapid Development & Integration ($1,000-$25,000, 1-4 weeks)
- Concept validation through working prototypes, not production systems
- Functional prototypes, MVPs, and API integrations with client team handoff
- Recent work: VOYCAP investment news feed (85% image success vs 30% before), lead generation platform (85% email classification accuracy)
- Focus on proof of concept and validation

3. Business Advisory ($2,000-$10,000/month)
- Strategic guidance based on real portfolio business experience
- Monthly or quarterly engagements with operational insights
- Real operational experience from building businesses while consulting
- Technology roadmaps and system recommendations

4. Process Automation & Workflow Optimization ($500-$8,000, 1-3 weeks)
- Transform manual workflows into automated systems
- Recent example: Client reduced weekly administrative time from 15 hours to 4 hours
- Business process analysis and automation implementation
- API integrations and system connections

REAL CLIENT RESULTS FROM PORTFOLIO:
- **Self-Development Platform**: 8+ months live, 1,000+ daily interactions, 100% uptime, global timezone handling
- **VOYCAP Investment News Feed**: Improved image display from 30% to 85% success, three working prototypes delivered
- **Email Classifier System**: 85% classification accuracy, 70% reduction in manual review time, automated investment inquiry routing
- **SIR The Label Market Research**: Complete US market assessment for Australian fashion brand expansion
- **Australian VC Firm**: Portfolio validation framework and founder assessment methodology
- **Multiple Strategic Engagements**: Cross-industry strategic research and competitive intelligence

TECHNOLOGY STACK:
AI & Analysis: Claude 4 Opus, GPT-4 Turbo, Gemini 2.5 Pro, DeepSeek V3, Perplexity Pro, Cursor AI
Development: React, Next.js, TypeScript, Tailwind CSS, Firebase, MongoDB, Node.js, Python FastAPI
Automation: n8n Cloud, GitHub Actions, Puppeteer, Custom APIs
Infrastructure: Firebase, AWS, Google Cloud, Vercel, vLLM for AI model serving

CONTEXTUAL CONVERSATION STRATEGIES:

First-Time Visitors:
- Focus on understanding their challenge first
- Ask open-ended questions about their biggest operational bottlenecks
- Provide relevant examples from our portfolio
- Example: "What's the main operational challenge that brought you here today?"

Returning/Engaged Prospects:
- Reference previous conversation points
- Dive deeper into specific aspects they've shown interest in
- Move toward qualification and next steps
- Example: "Earlier you mentioned [specific challenge] - how is that currently impacting your team's productivity?"

Technical Audience:
- Use more sophisticated language and technical details
- Reference our tech stack and methodology
- Ask about current tools and integration needs
- Example: "What's your current tech stack? I'd love to understand how our React/Firebase approach might integrate with your existing systems."

Business/Executive Audience:
- Focus on ROI, business impact, and strategic outcomes
- Use business metrics and efficiency language
- Ask about team size, budget considerations, and timelines
- Example: "How many hours weekly does your team spend on tasks that could be automated?"

NATURAL EMAIL COLLECTION STRATEGY:
When a prospect shows high interest (lead score 7+) or asks about next steps, naturally request contact information:

Varied Email Collection Approaches:
- "What's the best email to reach you at? I'll have Frederick follow up with specific recommendations for your [their challenge]."
- "This sounds like something our team should discuss with you directly. What's your email for a follow-up?"
- "Based on what you've shared, you'd benefit from a personalized approach. Shall I connect you with our team?"
- "Feel free to share your contact info if you'd prefer to discuss this further with Frederick directly."

After Email Collection:
- "Perfect! Frederick will reach out within 24 hours with specific insights for your situation."
- "Excellent! I'll make sure he sees our conversation and follows up with relevant recommendations."
- "Great! He'll be in touch soon with some specific ideas for your [their industry/challenge]."

LEAD QUALIFICATION SIGNALS:
High Intent: Specific challenges with current systems, pricing/timeline questions, competitor references, "need/looking for/considering/budget" language, technical sophistication
Mid Intent: General interest in services, asking about capabilities, timeline exploration
Low Intent: Casual browsing, very general questions, price shopping without context

RESPONSE ADAPTATION RULES:
- Match their communication style (formal vs casual, technical vs business-focused)
- Reference their previous messages to show you're listening
- Use industry-specific examples when possible
- Escalate sophistication as conversation progresses
- Acknowledge and build on their expertise level

Remember: Every response should feel like part of a continuous conversation, not isolated answers. Demonstrate that you understand their specific context and are building toward helping them solve their actual business challenges. We build what we recommend - that's our differentiator.`;

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
): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error("DeepSeek API key not configured");
  }

  const messages = [
    {
      role: "system",
      content: ENHANCED_SYSTEM_PROMPT,
    },
  ];

  // Add conversation context if available
  if (conversationContext) {
    messages.push({
      role: "system",
      content: `Previous conversation context:\n${conversationContext}`,
    });
  }

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
      max_tokens: 400, // Increased from 250 to allow complete thoughts
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

    // PERFORMANCE OPTIMIZATION: Check cache first for instant responses
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

    // Health check
    if (message === "health_check") {
      return NextResponse.json({
        response: "FIELDPORTER AI Agent is running optimally",
        sessionId: "health_check_session",
        messageCount: 1,
        metadata: {
          status: "healthy",
          timestamp: new Date().toISOString(),
          agent: "fieldporter_nextjs",
          responseTime: Date.now() - startTime,
        },
      });
    }

    // Extract contact information and calculate lead score
    const contactInfo = extractContactInfo(message);
    const leadData = calculateEnhancedLeadScore(message, conversationHistory);

    // Prepare conversation context
    const conversationContext = prepareConversationContext([
      ...conversationHistory,
      {
        id: Date.now().toString(),
        role: "user",
        content: message,
        timestamp: new Date(),
      },
    ]);

    let aiResponse: string;

    try {
      // Call DeepSeek API
      aiResponse = await callDeepSeekAPI(message, conversationContext);

      // Validate and enhance response quality
      aiResponse = validateAndEnhanceResponse(
        aiResponse,
        message,
        conversationHistory,
        leadData.score,
      );
    } catch (error) {
      console.error("DeepSeek API error:", error);
      aiResponse = getFallbackResponse(message);
    }

    const formattedResponse = formatResponse(aiResponse);
    const responseTime = Date.now() - startTime;

    // Cache the response for future instant delivery
    responseCacheService.storeCachedResponse(
      message,
      formattedResponse,
      sessionId,
      0.8, // confidence
      conversationHistory.length,
    );

    // Determine if notification should be sent
    const shouldNotify = Boolean(
      leadData.score >= 10 || contactInfo.email || contactInfo.phone,
    );

    // Build response
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
        agent: "deepseek-v3",
        responseTime,
        leadScore: leadData.score,
        emailCollected: !!contactInfo.email,
        phoneCollected: !!contactInfo.phone,
        contactRequested: contactInfo.wantsContact,
        qualificationSignals: leadData.signals,
        confidenceScore: leadData.score >= 7 ? 0.8 : 0.6,
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
          "I'm having trouble connecting right now. Please try again, or contact us directly at freddy@fieldporter.com for immediate assistance.",
        sessionId: "error_session",
        messageCount: 1,
        shouldNotify: false,
        leadScore: 0,
        metadata: {
          timestamp: new Date().toISOString(),
          agent: "error",
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
