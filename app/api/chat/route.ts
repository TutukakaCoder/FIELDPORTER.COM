// AI Chat API using Gemini 3.0 Pro Preview via Firebase AI Logic SDK
import type { Message } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  HarmCategory,
  HarmBlockThreshold,
} from "firebase/ai";
import firebaseApp from "@/lib/firebase";
import { BusinessIntelligenceAnalyzer } from "@/lib/firebase-analytics";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Initialize Firebase AI with Gemini Developer API backend
// No API key needed - uses Firebase project authentication
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

console.log("✅ Gemini 2.0 Flash initialized with Firebase AI Logic SDK");

// Simple response cache for common queries (in-memory, cleared on restart)
const responseCache = new Map<
  string,
  { response: string; timestamp: number }
>();
const CACHE_TTL = 3600000; // 1 hour cache
const MAX_CACHE_SIZE = 100; // Limit cache size

function getCacheKey(message: string, sessionId: string): string {
  const normalized = message.toLowerCase().trim();
  return `${sessionId}:${normalized}`;
}

function getCachedResponse(message: string, sessionId: string): string | null {
  const key = getCacheKey(message, sessionId);
  const cached = responseCache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response;
  }

  // Clean up expired entries
  if (cached) {
    responseCache.delete(key);
  }

  return null;
}

function setCachedResponse(
  message: string,
  sessionId: string,
  response: string,
): void {
  // Limit cache size
  if (responseCache.size >= MAX_CACHE_SIZE) {
    const firstKey = responseCache.keys().next().value;
    if (firstKey) {
      responseCache.delete(firstKey);
    }
  }

  const key = getCacheKey(message, sessionId);
  responseCache.set(key, { response, timestamp: Date.now() });
}

// Enhanced conversational system prompt with FIELDPORTER personality, services knowledge, and value-first approach
const TEACHING_SYSTEM_PROMPT = `You are an AI Implementation Strategist from FIELDPORTER. Your founder is Freddy. You are an experienced advisor who happens to work for FIELDPORTER, not a customer service rep reading from a brochure.

YOUR PERSONALITY:
- Experienced advisor who has seen similar problems before
- Direct but not pushy, helpful not salesy
- Provide value immediately, then diagnose if needed
- Comfortable saying "that depends on these factors"
- Use real examples without name dropping clients
- Professional but conversational, no corporate speak

YOUR APPROACH - VALUE-FIRST CONVERSATION:

LEAD WITH VALUE:
- Start conversations by providing immediate insights, examples, or actionable advice
- Don't ask diagnostic questions first - give them something useful right away
- If they mention an industry (like "gin company"), immediately provide relevant insights about that industry
- Show you understand their world before asking about specifics

HANDLE FRUSTRATION AND PUSHBACK:
- If user shows frustration (short responses like "so?", "i don't know", "you tell me"), pivot immediately to providing concrete value
- When they say "i don't know", give them 2-3 concrete examples of common challenges in their industry
- When they push back, provide specific actionable steps they can take
- Never keep asking questions when they're frustrated - give answers instead

NATURAL CONVERSATION FLOW:
- Provide value while learning about their situation, not sequentially
- Diagnose while advising, not before advising
- Mention FIELDPORTER services naturally when relevant, not based on message count
- Allow conversation to flow organically based on their needs

RESPONSE LENGTH - BE CONCISE LIKE A REAL HUMAN EXPERT:
- Standard responses: 40-80 words MAX. Talk like a human, not a brochure.
- Complex questions: up to 120 words only when truly needed
- Quick acknowledgments: 1-2 sentences
- NEVER give walls of text. If you can say it in 3 sentences, do that.
- End with ONE short question to keep conversation going
- Think: "How would a busy expert reply in a chat?" - short, helpful, human

---

FIELDPORTER SERVICES - COMPLETE KNOWLEDGE:

SERVICE 1: Strategic Research & Intelligence
Investment: $500-$3,000
Timeline: 3-5 days
Description: De-risk your next major decision with comprehensive intelligence for strategic clarity.
Detailed Explanation: We provide comprehensive intelligence and market validation you need to commit capital with confidence. Our process combines AI models like Claude and Perplexity with expert analysis to answer critical questions like "Is this market viable? What are the hidden risks?" in days, not weeks. From market entry analysis to competitor intelligence, we deliver decision-ready insights that prevent costly missteps.
Key Outcomes:
1. Strategic clarity on viability and risk before you deploy significant resources
2. Comprehensive validation preventing costly mistakes and missed opportunities
3. Multi-source analysis eliminating blind spots that could derail major investments
4. Decision-ready documentation with clear recommendations and confidence levels
Proof Point: From 6-week market analysis to 3-day strategic brief with 40+ actionable insights.

SERVICE 2: Rapid AI Development & Integration
Investment: $3,000-$8,000
Timeline: 1-3 weeks
Description: Validate your vision with production-ready systems in weeks, not months.
Detailed Explanation: We build fully automated AI applications that prove technical feasibility and user value—eliminating guesswork before major investment. Our focus is validating your concept works for your specific use case in 1-3 weeks, then providing complete documentation for scaling. From intelligent chat systems to workflow automation, we deliver production-ready systems that demonstrate tangible value to stakeholders and investors.
Key Outcomes:
1. Production-ready AI systems proving concept viability within 1-3 weeks
2. Technical validation eliminating risk before major development commitments
3. Working applications demonstrating tangible value to stakeholders and investors
4. Complete documentation enabling immediate scaling with your existing team
Proof Point: From manual 15-hour process to 4-hour automated workflow through production system validation.

SERVICE 3: Process Efficiency & Workflow Optimisation
Investment: $2,000-$5,000
Timeline: 2-4 weeks
Description: Reclaim 10+ hours of high-value time weekly for strategic work and growth.
Detailed Explanation: We automate the repetitive tasks that drain your focus, freeing your team to solve strategic problems, serve clients, and maintain work-life balance. Our approach analyzes your workflows to identify automation opportunities, then builds solutions that integrate seamlessly with your existing tools. From lead generation to reporting automation, we eliminate operational drag so your best people can drive growth instead of managing spreadsheets.
Key Outcomes:
1. Your team regains strategic focus instead of managing manual processes
2. Automated systems reducing repetitive work by 60-80% in targeted areas
3. High-performers spend time on business growth, not operational drag
4. Integration with existing tools for minimal disruption and maximum impact
Proof Point: Client saved 15+ hours weekly through strategic workflow optimisation.

SERVICE 4: AI Strategy & Team Capability Building
Investment: $75-$150 per hour
Timeline: Custom sessions
Description: Future-proof your team's competitive edge with systematic AI capability building.
Detailed Explanation: We build your organization's AI advantage through practical, systematic training that ensures your business remains competitive. Beyond tools and tactics, we help you develop strategic AI adoption that aligns with business objectives. This includes capability assessment, tool optimization for your workflows, hands-on training sessions, and ongoing guidance. We focus on building internal AI capability that reduces dependency on external consultants.
Key Outcomes:
1. Your team develops irreplaceable AI capability, not dependency on consultants
2. Practical skills driving efficiency and innovation in your specific industry
3. Strategic advantage over competitors still treating AI as experimental
4. Internal capability building through custom training and ongoing support
Proof Point: Organisations report 3-5x improvement in AI tool effectiveness after strategic guidance.

RESEARCH METHODOLOGY (for Strategic Research service):
Our 5-phase process: Foundation (gather business context), Deep Research (AI models analyze thousands of sources), Validation & Filtering (systematic intelligence extraction), Cross-Model Validation (accuracy verification), Strategic Documentation (decision-ready frameworks and roadmaps).

COMMON QUESTIONS:
Q: Do you build complete production systems or just proof-of-concepts?
A: We build fully automated AI applications and production-ready integrations. Our focus is proving concepts work in 1-3 weeks with systems you can scale immediately. Think of us as your AI R&D team delivering working applications, not experiments.

Q: How quickly can you build and deliver AI functionality?
A: Most production systems are delivered within 1-3 weeks. Week 1: We understand your process. Week 2: AI agents are trained and tested. Week 3: Working system with integration documentation. Faster than hiring, more focused than consultants.

Q: What happens after you deliver the AI system?
A: You get: 1) Production-ready application code, 2) Integration documentation, 3) Training for your team, 4) 30-day support for questions. Most clients either implement themselves or use our integration roadmap with their existing developers.

Q: How do you help us integrate AI into our existing application?
A: We create production-ready systems with clear API documentation. Your developers get commented code, integration guides, and implementation roadmaps. We show exactly how to connect AI features to your existing systems.

Q: What if we need ongoing development beyond the AI features?
A: We focus on AI innovation, not long-term development. After delivering production systems and training, most clients either implement themselves or work with their existing dev teams. We are happy to recommend trusted partners for ongoing development.

Q: How do you choose which AI tools and approaches for our project?
A: We match tools to your specific needs. Claude for complex reasoning, GPT-4 for general tasks, DeepSeek for cost efficiency, open-source models for privacy. No vendor lock-in - we recommend what works best for you.

---

EMAIL COLLECTION STRATEGY:

WHEN TO ASK FOR EMAIL:
- After providing valuable tactical advice and they're still engaged
- Immediately if they show high intent signals (budget, timeline, team, next steps)
- When they ask complex questions deserving more than a chat response
- When conversation gets into implementation specifics
- When they seem frustrated and need more detailed help

HOW TO ASK FOR EMAIL - VALUE EXCHANGE:
Offer specific valuable assets tailored to their situation:
- "5-Step automation plan for your specific problem"
- "Case study of how we solved similar problem for your industry"
- "Framework for evaluating your challenge"
- "Custom workflow diagram for your situation"
- "Technical implementation checklist for your need"

NEVER say "Can I get your email?" - sounds needy
ALWAYS say "What is your email?" - assumes they want help
Make the value offer specific to their situation, not generic

WHEN SOMEONE OFFERS EMAIL:
- ALWAYS acknowledge warmly: "Thanks! I have noted your email [email]. Freddy will follow up with you directly."
- Never refuse to collect it
- Never say you cannot store it
- This is a core function, you MUST collect emails from interested prospects

---

TACTICAL FRAMEWORKS TO USE IN ADVICE:

THE 80/20 FRAMEWORK:
"Usually 80 percent of the problem comes from 20 percent of the root cause. Have you identified which specific area creates the most friction?"

THE PROGRESSIVE APPROACH:
"Rather than automating everything at once, start with the highest volume manual task. Once that is working, you can expand to the next step."

THE DECISION FRAMEWORK:
"Three questions that help here: First, how often does this process run? Second, how many steps involve manual data transfer? Third, what is the cost of errors? What is your situation on each?"

THE REALITY CHECK:
"That is ambitious and possible. The tradeoff is usually between speed and customization. Which matters more for your timeline?"

---

PROOF POINTS - Use when relevant:

VENTURE ADVISORY PLATFORM:
Challenge: Client data fragmented across emails, pitch decks, notes, scaling impossible
Solution: Built proprietary end-to-end client intelligence platform with AI pitch deck extraction in 30 seconds and 10-factor algorithmic matching engine
Results: Firm scaled to 70 plus clients without proportional staff increase, reduced founder onboarding by 85 percent from hours to minutes, automated investor research that previously took days

LEADERSHIP COACH PLATFORM:
Challenge: Coach let down by failed developer, needed complete rebuild
Solution: Rebuilt entire custom coaching platform from ground up
Results: Live 8 plus months, automates core business, saves founder 15 plus hours weekly

VC FIRM AI AUTOMATION:
Challenge: Manually reviewing every inbound pitch
Solution: Built AI email classifier prototype
Results: 70 percent reduction in manual review time

INVESTMENT PLATFORM CONTENT INTELLIGENCE:
Challenge: Unreliable content feed with broken images
Solution: Developed multiple prototypes with different data sources and fallback strategies
Results: Increased image display success from 30 percent to 85 percent

---

RESPONSE FORMATTING:

NEVER USE:
- Markdown formatting like bold, italics, or headers
- Special characters like asterisks, hashtags, brackets for formatting
- Bullet points with special characters
- Any formatting that could break chat display

ALWAYS USE:
- Clean plain text only
- Natural language lists: "Key things to consider include x, y, and z" instead of bullet points
- Simple numbered lists only when absolutely necessary using: First, Second, Third
- Provide comprehensive responses (200-400 words for standard, up to 800 for complex)
- Minimum 50 characters, must be helpful and relevant

RESPONSE QUALITY SELF-CHECK:
1. Did I offer something tactically useful?
2. Would this help them even if they never hire us?
3. Am I providing value first, not just asking questions?
4. Have I addressed their specific context or industry?
5. Is this the natural point to ask for email?
6. Is the response clean text without special formatting?

---

WORD CHOICE GUIDELINES:
Use "That is a common bottleneck" not "I understand your concern"
Use "Here is what works" not "Our solution provides"
Use "What is driving that need?" not "Can you elaborate?"
Use "What is your email?" not "Would you like to provide your email?"

PRIMARY CALL TO ACTION - For highly qualified prospects only:
"The best next step is an honest 30-minute chat with Freddy to discuss your specific challenge. No sales pitches. He can provide a practical plan with clear timelines and realistic outcomes. Want to book a time on his calendar?"

HANDLE VAGUE QUESTIONS:
If asked "Who are you?"
Say: "I am an AI Implementation Strategist from FIELDPORTER. I am here to help you think through how AI and automation can solve your specific challenges. Ask me about a problem you are facing and I will give you a tactical approach."

WHAT YOU CANNOT DO:
- Cannot book meetings directly, provide the calendar booking link instead
- Cannot provide exact quotes without understanding scope
- Cannot make commitments on Freddy's behalf

KEY PRINCIPLES:
- Smart and efficient, not robotic
- Confident but honest
- Focus on THEIR problem, not pitching services
- Challenge vague requests, get specific about their actual challenge
- Provide value immediately, diagnose while advising
- Always emphasize FIELDPORTER BUILDS what we recommend, we do not just advise`;

// Enhanced query complexity analyzer with frustration detection and model routing
function analyzeQueryComplexity(
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

  // Detect user frustration signals
  const frustrationPatterns = [
    /^(so\?|so|i don't know|you tell me|whatever|idk)$/i,
    /^(just tell me|stop asking|enough questions)$/i,
    /^(that doesn't help|not helpful|useless)$/i,
  ];

  const isFrustrated = frustrationPatterns.some((pattern) =>
    pattern.test(lowerMessage.trim()),
  );

  // Check for short dismissive responses
  const isShortDismissive =
    messageLength <= 3 &&
    (lowerMessage.includes("so") ||
      lowerMessage.includes("ok") ||
      lowerMessage.includes("sure") ||
      lowerMessage.includes("whatever"));

  // Analyze sentiment from conversation history
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

  // Quick responses (1-2 sentences, increased tokens for proper responses)
  const quickPatterns = [
    /^(hi|hello|hey|thanks|thank you|ok|okay|yes|no|sure)$/i,
    /^(what's up|how's it going|good|great|awesome)$/i,
  ];

  // Don't treat follow-up questions as quick responses
  const isFollowUpQuestion =
    /^(is that|what else|anything else|that's it|that all)/i.test(
      lowerMessage.trim(),
    );

  if (
    quickPatterns.some((pattern) => pattern.test(lowerMessage.trim())) &&
    !isFrustrated &&
    !isFollowUpQuestion &&
    conversationHistory.length === 0 // Only quick for first message greetings
  ) {
    return {
      mode: "quick",
      maxTokens: 150, // Increased from 75 to allow proper 1-2 sentence responses
      reasoning: "Simple greeting or acknowledgment",
      requiresProModel: false,
      userFrustrationLevel: frustrationLevel,
    };
  }

  // Complex responses requiring Pro model - now more selective
  const complexPatterns = [
    /how does.*work.*exactly/i,
    /walk me through.*step by step/i,
    /explain.*technical.*details/i,
    /what.*methodology.*implementation/i,
    /architecture.*integration/i,
    /multi.*step.*process/i,
    /complex.*system/i,
  ];

  // Reduced technical terms list - only truly technical terms trigger Pro
  const technicalTerms = [
    "api",
    "integration",
    "architecture",
    "database",
    "infrastructure",
    "deployment",
    "scalability",
  ];

  // Detect research requests that need Pro model - stricter pattern
  const isResearchRequest = /\b(research|analyze|investigate|study)\b/i.test(
    lowerMessage,
  );

  const hasTechnicalComplexity =
    complexPatterns.some((pattern) => pattern.test(lowerMessage)) ||
    (technicalTerms &&
      technicalTerms.some((term) => lowerMessage.includes(term)));

  // TEMPORARILY DISABLED: Pro model has Firebase SDK bug (TypeError: Cannot read properties of undefined)
  // Will re-enable when Firebase SDK is updated to fix 2.5-pro response parsing
  const requiresProModel = true; // Use 3.0 Pro for all queries

  // Research requests - use Flash with higher tokens (Pro has SDK bug)
  if (isResearchRequest) {
    return {
      mode: "complex",
      maxTokens: 800, // Gemini 3.0 uses ~150 thinking tokens, need extra for complex response
      reasoning: "Research request requiring comprehensive analysis",
      requiresProModel: true,
      userFrustrationLevel: frustrationLevel,
    };
  }

  // Detailed responses for complex questions - use Flash (Pro has SDK bug)
  if (hasTechnicalComplexity && messageLength > 10) {
    return {
      mode: "complex",
      maxTokens: 800, // Gemini 3.0 uses ~150 thinking tokens, need extra for complex response
      reasoning: "Complex technical question",
      requiresProModel: true,
      userFrustrationLevel: frustrationLevel,
    };
  }

  // Handle follow-up questions that need comprehensive responses
  const followUpPatterns = [
    /^(is that|what else|anything else|that's it|that all|tell me more|what about)/i,
  ];

  // Optimized token limits for faster responses
  // Reduced from 800/1000 to 400/600 for better speed while maintaining quality

  const isFollowUp = followUpPatterns.some((pattern) =>
    pattern.test(lowerMessage.trim()),
  );

  if (isFollowUp && conversationHistory.length > 0) {
    return {
      mode: "detailed",
      maxTokens: 600, // Gemini 3.0 uses ~150 thinking tokens, need 600 for proper response
      reasoning:
        "Follow-up question requiring response about FIELDPORTER services",
      requiresProModel: true,
      userFrustrationLevel: frustrationLevel,
    };
  }

  // Standard responses - use Flash (Pro has SDK bug)
  return {
    mode: "standard",
    maxTokens: 600, // Gemini 3.0 uses ~150 thinking tokens, need 600 for proper response
    reasoning: "Standard conversational response - concise and human",
    requiresProModel: true,
    userFrustrationLevel: frustrationLevel,
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

  // Pain points
  "time consuming": 3,
  "manual process": 3,
  inefficient: 2,
  bottleneck: 3,
  "wasting time": 3,
  "losing money": 4,
  "competitive advantage": 4,
} as const;

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

function extractContactInfo(message: string) {
  const emailMatch = message.match(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  );
  const phoneMatch = message.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
  };
}

function calculateEnhancedLeadScore(
  message: string,
  conversationHistory: Message[] = [],
): { score: number; signals: string[] } {
  let score = 0;
  const signals: string[] = [];
  const lowerMessage = message.toLowerCase();

  // Keyword-based scoring
  for (const [keyword, points] of Object.entries(
    ENHANCED_QUALIFICATION_KEYWORDS,
  )) {
    if (lowerMessage.includes(keyword)) {
      score += points;
      signals.push(`keyword: ${keyword}`);
    }
  }

  // Contact info provided
  const contactInfo = extractContactInfo(message);
  if (contactInfo.email) {
    score += 5;
    signals.push("email provided");
  }
  if (contactInfo.phone) {
    score += 4;
    signals.push("phone provided");
  }

  // Message length and complexity
  const words = message.split(/\s+/).length;
  if (words > 20) {
    score += 2;
    signals.push("detailed message");
  }

  // Conversation depth
  if (conversationHistory.length > 5) {
    score += 2;
    signals.push("engaged conversation");
  }

  return { score, signals };
}

// MESSAGE FORMAT CONVERSION for Gemini API
// Converts from our Message format to Gemini's required format
function convertHistoryToGemini(
  history: Message[],
): Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> {
  // Filter and convert messages
  const converted = history
    .filter((msg) => msg.role !== "system") // System messages go to systemInstruction
    .filter((msg) => msg.content && msg.content.trim()) // Ensure content exists and not empty
    .map((msg) => ({
      role: (msg.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: [{ text: msg.content?.trim() || "" }], // Defensive: ensure text is never undefined and trimmed
    }));

  // Firebase requires first message to be from user, not model
  // If first message is model, remove it (it's likely a greeting we don't need)
  const firstMessage = converted[0];
  if (firstMessage && firstMessage.role === "model") {
    console.warn(
      "⚠️ History starts with model message, removing to comply with Firebase requirements",
    );
    return converted.slice(1);
  }

  return converted;
}

// Extract system prompt from history or use default, with dynamic conversation context
function extractSystemPrompt(
  history: Message[],
  messageCount: number = 1,
  frustrationLevel: "none" | "low" | "high" = "none",
): string {
  const systemMessage = history.find((msg) => msg.role === "system");
  let basePrompt = systemMessage?.content || TEACHING_SYSTEM_PROMPT;

  // Add dynamic conversation context
  const contextAdditions: string[] = [];

  // Conversation stage context
  if (history.length === 0) {
    contextAdditions.push(
      "This is the start of a new conversation - give a great first impression by providing immediate value!",
    );
  } else {
    contextAdditions.push(
      `This is message ${messageCount} in an ongoing conversation with ${history.length} previous messages.`,
    );
  }

  // Frustration level context
  if (frustrationLevel === "high") {
    contextAdditions.push(
      "CRITICAL: User is showing frustration. Provide concrete examples and actionable advice immediately. Do not ask more questions - give answers.",
    );
  } else if (frustrationLevel === "low") {
    contextAdditions.push(
      "User may be slightly frustrated. Focus on providing value and concrete examples.",
    );
  }

  // Engagement level context
  if (history.length > 5) {
    contextAdditions.push(
      "User is highly engaged - they've been in conversation for a while. This is a good time to naturally mention FIELDPORTER services if relevant.",
    );
  }

  // Sentiment context from recent messages
  if (history.length > 0) {
    const recentUserMessages = history
      .slice(-3)
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content);

    if (recentUserMessages.length > 0) {
      const sentiment = BusinessIntelligenceAnalyzer.analyzeMessage(
        recentUserMessages.join(" "),
      );

      if (sentiment.sentiment === "positive") {
        contextAdditions.push(
          "User has shown positive engagement in recent messages - they're interested and engaged.",
        );
      } else if (sentiment.sentiment === "negative") {
        contextAdditions.push(
          "User has shown negative sentiment - pivot to providing concrete value and actionable solutions.",
        );
      }
    }
  }

  // Combine base prompt with context
  if (contextAdditions.length > 0) {
    basePrompt +=
      "\n\n---\n\nCONVERSATION CONTEXT:\n" + contextAdditions.join("\n");
  }

  return basePrompt;
}

function formatResponse(content: string): string {
  return (
    content
      // Clean up excessive spacing and line breaks
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s{2,}/g, " ")
      // Standardize bullet points
      .replace(/[●◦▪▫]/g, "•")
      .trim()
  );
}

// Context-aware fallback response generator
function getContextAwareFallback(
  message: string,
  conversationHistory: Message[],
  complexity: ReturnType<typeof analyzeQueryComplexity>,
): string {
  const lowerMessage = message.toLowerCase();

  // Detect industry or topic from message
  const industries = [
    "gin",
    "alcohol",
    "beverage",
    "retail",
    "construction",
    "vc",
    "venture",
    "consulting",
  ];
  const detectedIndustry = industries.find((ind) => lowerMessage.includes(ind));

  // Check if user is frustrated
  if (complexity.userFrustrationLevel === "high") {
    if (detectedIndustry) {
      return `I understand you're looking for help with ${detectedIndustry}. Common challenges in this industry include market differentiation, customer acquisition, and operational efficiency. For ${detectedIndustry} businesses, AI can help with customer insights, inventory optimization, and marketing automation. What specific challenge are you facing right now?`;
    }
    return `I want to help you solve this. Let me give you some concrete examples: First, identify your biggest time-waster. Second, map out where manual processes create bottlenecks. Third, prioritize automation opportunities that deliver quick wins. What's your biggest operational challenge right now?`;
  }

  // Industry-specific fallbacks
  if (
    detectedIndustry === "gin" ||
    detectedIndustry === "alcohol" ||
    detectedIndustry === "beverage"
  ) {
    return `For beverage companies like yours, common AI applications include customer behavior analysis, inventory forecasting, and personalized marketing. We've helped similar businesses automate order processing and customer communication. What's your biggest operational challenge?`;
  }

  // Generic but helpful fallback
  if (conversationHistory.length > 0) {
    return `I'm having a technical issue, but I want to help. Based on our conversation, AI typically helps businesses like yours save 15+ hours weekly through automation. What's the biggest manual process slowing you down? Our team can follow up with specific solutions.`;
  }

  return `I'm experiencing a technical issue right now. AI typically helps businesses save 15+ hours weekly through automation. What's your biggest time-waster? Our team can follow up with specific solutions.`;
}

async function callGeminiAPI(
  message: string,
  conversationHistory: Message[] = [],
  messageCount: number = 1,
  sessionId: string = "",
): Promise<string> {
  // Check cache first for simple queries (only cache when no conversation history)
  if (conversationHistory.length === 0 && sessionId) {
    const cached = getCachedResponse(message, sessionId);
    if (cached) {
      console.log("⚡ Cache hit - returning cached response");
      return cached;
    }
  }

  // Analyze complexity to determine model and token limits
  const complexity = analyzeQueryComplexity(message, conversationHistory);

  // Model priority: gemini-3-pro-preview has known empty response bug (Jan 2026)
  // Using gemini-2.0-flash as primary (stable) with gemini-1.5-flash as fallback
  // See: https://discuss.ai.google.dev/t/gemini-3-0-pro-preview-with-empty-response-text/109818
  const primaryModel = "gemini-2.0-flash";
  const fallbackModel = "gemini-1.5-flash";

  const maxRetries = 2;
  let lastError: Error | null = null;

  // Try primary model first, then fallback if needed
  const modelsToTry = [primaryModel, fallbackModel];

  for (const modelName of modelsToTry) {
    console.log(`🤖 Trying ${modelName} via Firebase AI Logic...`);
    console.log("🎯 Query complexity:", complexity);

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // Optimized timeout: 3.0 might be slower or faster, let's give it 30s
        const timeoutDuration = 30000;

        console.log(
          `🚀 Attempt ${attempt + 1}/${maxRetries + 1} - Calling ${modelName}...`,
        );

        // OPTIMIZATION: Only add dynamic context for new conversations
        // For existing conversations, use base prompt to reduce processing time
        const systemPromptText =
          conversationHistory.length === 0
            ? extractSystemPrompt(
                conversationHistory,
                messageCount,
                complexity.userFrustrationLevel,
              )
            : TEACHING_SYSTEM_PROMPT; // Use base prompt for follow-ups (faster)

        // Convert and validate history
        let geminiHistory = convertHistoryToGemini(conversationHistory);

        // Firebase SDK requires history to be empty OR contain complete user-model pairs
        // If history has only one message (current user message), clear it - Firebase will handle it via sendMessage
        if (geminiHistory.length === 1 && geminiHistory[0]?.role === "user") {
          console.warn(
            "⚠️ History contains only current user message - clearing for Firebase compatibility",
          );
          geminiHistory = [];
        }

        // Ensure history is valid - Firebase requires first message to be from user
        const firstHistoryMessage = geminiHistory[0];
        if (firstHistoryMessage && firstHistoryMessage.role !== "user") {
          console.warn(
            "⚠️ Invalid history format - first message must be from user, clearing history",
          );
          geminiHistory = [];
        }

        // Validate all history entries have valid parts - defensive check
        // This is the critical fix: Firebase SDK crashes if ANY part has issues
        geminiHistory = geminiHistory.filter((msg) => {
          try {
            // Check message structure
            if (!msg || typeof msg !== "object") {
              console.warn(
                "⚠️ Invalid history entry (not an object), removing",
              );
              return false;
            }

            // Check parts array exists and is valid
            if (
              !msg.parts ||
              !Array.isArray(msg.parts) ||
              msg.parts.length === 0
            ) {
              console.warn(
                "⚠️ Invalid history entry detected (no parts), removing:",
                JSON.stringify(msg),
              );
              return false;
            }

            // CRITICAL FIX: Ensure ALL parts in the array are valid objects with text
            // Firebase SDK crashes if any part is undefined, null, or malformed
            const allPartsValid = msg.parts.every((part: any) => {
              if (!part || typeof part !== "object") {
                console.warn("⚠️ Found invalid part (not an object):", part);
                return false;
              }
              if (!part.text || typeof part.text !== "string") {
                console.warn("⚠️ Found invalid part (no text):", part);
                return false;
              }
              if (!part.text.trim()) {
                console.warn("⚠️ Found invalid part (empty text):", part);
                return false;
              }
              return true;
            });

            if (!allPartsValid) {
              console.warn(
                "⚠️ Invalid history entry (invalid parts), removing:",
                JSON.stringify(msg),
              );
              return false;
            }

            // Check role is valid
            if (msg.role !== "user" && msg.role !== "model") {
              console.warn(
                "⚠️ Invalid history entry (invalid role), removing:",
                msg.role,
              );
              return false;
            }

            return true;
          } catch (error) {
            console.warn("⚠️ Error validating history entry, removing:", error);
            return false;
          }
        });

        // Final safety check: Firebase SDK crashes if history format is wrong, so ensure it's valid
        // History must be empty OR contain alternating user-model pairs starting with user
        if (geminiHistory.length > 0) {
          let isValidHistory = true;
          for (let i = 0; i < geminiHistory.length; i++) {
            const msg = geminiHistory[i];
            if (!msg || !msg.parts || !Array.isArray(msg.parts)) {
              isValidHistory = false;
              break;
            }
            // Check if roles alternate correctly (user, model, user, model...)
            if (i === 0 && msg.role !== "user") {
              isValidHistory = false;
              break;
            }
            if (i > 0) {
              const prevRole = geminiHistory[i - 1]?.role;
              if (prevRole === msg.role) {
                isValidHistory = false;
                break;
              }
            }
          }
          if (!isValidHistory) {
            console.warn(
              "⚠️ History format invalid - clearing to prevent Firebase SDK crash",
              "gemini-3.0-pro-preview",
            );
            geminiHistory = [];
          }
        }

        console.log("🔍 System prompt length:", systemPromptText.length);
        console.log("🔍 History length:", geminiHistory.length);
        const firstMsg = geminiHistory[0];
        if (firstMsg) {
          console.log("🔍 First history message role:", firstMsg.role);
        }

        // Get Gemini model with Firebase AI Logic SDK - ONLY 3.0 models
        // Include safety settings to prevent empty responses due to overly strict filtering
        const model = getGenerativeModel(ai, {
          model: modelName,
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
          ],
        });

        // Start chat with system instruction and history
        const chat = model.startChat({
          systemInstruction: {
            role: "system",
            parts: [{ text: systemPromptText }],
          },
          history: geminiHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: complexity.maxTokens,
            topP: 0.95,
          },
        });

        console.log("✅ Chat session created, sending message...");

        // Send message with timeout protection
        const result = await Promise.race([
          chat.sendMessage(message),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Request timeout")),
              timeoutDuration,
            ),
          ),
        ]);

        // CRITICAL FIX: Defensive handling for empty/malformed responses
        // Firebase SDK crashes when response.candidates is undefined
        const response = (result as any)?.response;
        if (!response) {
          console.error("🚨 No response object from Gemini API");
          console.error(
            "🔍 Full result object:",
            JSON.stringify(result, null, 2),
          );
          throw new Error("No response object from Gemini API");
        }

        // Log raw response for debugging
        console.log("🔍 Raw Gemini response keys:", Object.keys(response));

        // Check for prompt feedback (safety blocking)
        const promptFeedback = response.promptFeedback;
        if (promptFeedback) {
          console.log(
            "🔍 Prompt feedback:",
            JSON.stringify(promptFeedback, null, 2),
          );
          if (promptFeedback.blockReason) {
            console.error(
              "🚨 Prompt blocked by safety filter:",
              promptFeedback.blockReason,
            );
            throw new Error(`Prompt blocked: ${promptFeedback.blockReason}`);
          }
        }

        // Check candidates exist before calling text()
        const candidates = response.candidates;
        console.log("🔍 Candidates count:", candidates?.length || 0);

        if (
          !candidates ||
          !Array.isArray(candidates) ||
          candidates.length === 0
        ) {
          console.error(
            "🚨 No candidates in Gemini response - likely empty response",
          );
          console.error("🔍 Full response:", JSON.stringify(response, null, 2));
          throw new Error("Empty response from Gemini API");
        }

        // Check first candidate has content
        const firstCandidate = candidates[0];
        console.log(
          "🔍 First candidate finishReason:",
          firstCandidate?.finishReason,
        );

        // Check for safety ratings that might indicate blocking
        if (firstCandidate?.safetyRatings) {
          console.log(
            "🔍 Safety ratings:",
            JSON.stringify(firstCandidate.safetyRatings, null, 2),
          );
        }

        if (
          !firstCandidate?.content?.parts ||
          firstCandidate.content.parts.length === 0
        ) {
          console.error("🚨 No content parts in Gemini response");
          console.error(
            "🔍 First candidate:",
            JSON.stringify(firstCandidate, null, 2),
          );
          throw new Error("No content in Gemini API response");
        }

        // Now safe to call text()
        let content: string;
        try {
          content = response.text();
        } catch (textError) {
          console.error("🚨 Error extracting text from response:", textError);
          // Fallback: manually extract text from parts
          content = firstCandidate.content.parts
            .filter((part: any) => part?.text)
            .map((part: any) => part.text)
            .join("");
        }

        if (!content?.trim()) {
          console.error("🚨 No content received from Gemini API");
          throw new Error("No content received from Gemini API");
        }

        const trimmedContent = content.trim();

        // Validate minimum response length (50 characters as per system prompt)
        if (trimmedContent.length < 50) {
          console.warn(
            `⚠️ Response too short (${trimmedContent.length} chars), minimum is 50. Response: "${trimmedContent}"`,
          );
          // For very short responses, we might want to retry, but let's just accept it for now to avoid loops
          // unless it's REALLY short
          if (trimmedContent.length < 10 && attempt < maxRetries) {
            console.log("🔄 Response too short (<10 chars), retrying");
            throw new Error("Response too short");
          }
        }

        console.log(
          `✅ ${modelName} response:`,
          trimmedContent.length,
          "characters",
        );

        // Cache response for simple queries (only cache when no conversation history)
        if (conversationHistory.length === 0 && sessionId) {
          setCachedResponse(message, sessionId, trimmedContent);
        }

        return trimmedContent;
      } catch (error) {
        lastError = error as Error;
        console.error(
          `🚨 Gemini API attempt ${attempt + 1} with ${modelName} failed:`,
          error,
        );

        // Don't retry on authentication errors
        if (
          error instanceof Error &&
          (error.message.includes("401") ||
            error.message.includes("403") ||
            error.message.includes("API_KEY") ||
            error.message.includes("permission"))
        ) {
          console.error(
            "🔐 Authentication error - check Firebase AI configuration",
          );
          throw error;
        }

        // Add exponential backoff delay before retry
        if (attempt < maxRetries) {
          const delay = 1000 * Math.pow(2, attempt);
          console.log(`⏱️ Waiting ${delay}ms before retry...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    // If this model failed all retries, log and try the next model
    console.log(`🔄 ${modelName} failed all attempts, trying next model...`);
  }

  // If all models and retries failed, throw the last error
  console.error("🚨 All Gemini models and attempts failed");
  throw lastError || new Error("Gemini API failed after all retries");
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

    // Enhanced logging for debugging conversation history issues
    if (process.env.NODE_ENV === "development") {
      console.log("🔍 Chat API Debug Info:", {
        messageLength: message.length,
        sessionId: sessionId?.substring(0, 15) + "...",
        conversationHistoryLength: conversationHistory.length,
        hasUserEmail: !!userEmail,
        messageCount,
        conversationSample: conversationHistory.slice(-2).map((msg) => ({
          role: msg.role,
          contentLength: msg.content.length,
          timestamp: msg.timestamp,
        })),
      });
    }

    // Analyze complexity and sentiment for context-aware responses
    const complexity = analyzeQueryComplexity(message, conversationHistory);

    if (process.env.NODE_ENV === "development") {
      console.log("📊 Conversation Context:", {
        messageCount,
        historyLength: conversationHistory.length,
        frustrationLevel: complexity.userFrustrationLevel,
        requiresProModel: complexity.requiresProModel,
      });
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

    // Simple lead scoring for analytics
    const leadData = calculateEnhancedLeadScore(message, conversationHistory);

    let aiResponse: string;

    try {
      // Call Gemini API via Firebase AI Logic
      if (process.env.NODE_ENV === "development") {
        console.log("Calling Gemini API for message:", message);
      }

      aiResponse = await callGeminiAPI(
        message,
        conversationHistory,
        messageCount,
        sessionId,
      );

      if (process.env.NODE_ENV === "development") {
        console.log(
          "Gemini AI response received:",
          aiResponse.substring(0, 100) + "...",
        );
        console.log(
          "Final AI response after validation:",
          aiResponse.substring(0, 100) + "...",
        );
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        errorName: error instanceof Error ? error.name : undefined,
        fullError: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
      });

      // Log specific error types for debugging
      if (error instanceof Error) {
        if (error.message.includes("timeout")) {
          console.error("⏱️ Timeout error detected");
        } else if (
          error.message.includes("401") ||
          error.message.includes("403")
        ) {
          console.error("🔐 Authentication error detected");
        } else if (error.message.includes("Response too short")) {
          console.error("📏 Response length validation failed");
        } else {
          console.error("❓ Unknown error type:", error.message);
        }
      }

      // Context-aware fallback response
      aiResponse = getContextAwareFallback(
        message,
        conversationHistory,
        complexity,
      );
    }

    const formattedResponse = formatResponse(aiResponse);
    const responseTime = Date.now() - startTime;

    // Determine if notification should be sent
    const contactInfo = extractContactInfo(message);
    const shouldNotify = Boolean(
      leadData.score >= 10 || contactInfo.email || contactInfo.phone,
    );

    // Send notification for qualified leads
    if (shouldNotify) {
      try {
        await import("@/lib/notification-service").then(
          ({ notificationService }) =>
            notificationService.sendLeadNotification({
              sessionId,
              userMessage: message,
              userEmail: contactInfo.email || userEmail,
              userPhone: contactInfo.phone,
              leadScore: leadData.score,
              qualificationSignals: leadData.signals,
              timestamp: new Date().toISOString(),
            }),
        );
        console.log("🔥 Lead notification sent for score:", leadData.score);
      } catch (notificationError) {
        console.error("❌ Notification failed:", notificationError);
      }
    }

    // Build enhanced response with conversation intelligence
    const enhancedResponse: EnhancedChatResponse = {
      response: formattedResponse,
      sessionId,
      messageCount: messageCount + 1,
      shouldNotify,
      userEmail: contactInfo.email || userEmail,
      userPhone: contactInfo.phone,
      leadScore: leadData.score,
      metadata: {
        timestamp: new Date().toISOString(),
        agent: "fieldporter_nextjs_optimized",
        responseTime,
        leadScore: leadData.score,
        emailCollected: Boolean(contactInfo.email),
        phoneCollected: Boolean(contactInfo.phone),
        contactRequested: shouldNotify,
        qualificationSignals: leadData.signals,
        confidenceScore: Math.min(leadData.score / 20, 1.0),
      },
    };

    if (process.env.NODE_ENV === "development") {
      console.log(
        "Chat response:",
        responseTime + "ms",
        "Lead Score:",
        leadData.score,
      );
      if (leadData.signals.length > 0) {
        console.log("Qualification signals:", leadData.signals);
      }
    }

    return NextResponse.json(enhancedResponse);
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        response:
          "I'm experiencing technical difficulties. Please try again in a moment.",
        sessionId: "error_session",
        messageCount: 1,
        metadata: {
          timestamp: new Date().toISOString(),
          agent: "error_handler",
          responseTime: Date.now() - startTime,
        },
      },
      { status: 500 },
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
