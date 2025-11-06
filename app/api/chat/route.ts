// AI Chat API using Gemini 2.5 Flash via Firebase AI Logic SDK
import type { Message } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import firebaseApp from "@/lib/firebase";

// Initialize Firebase AI with Gemini Developer API backend
// No API key needed - uses Firebase project authentication
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

console.log("✅ Gemini 2.5 Flash initialized with Firebase AI Logic SDK");

// Enhanced conversational system prompt with FIELDPORTER personality and knowledge
const TEACHING_SYSTEM_PROMPT = `You are the AI assistant for FIELDPORTER, a strategic research and AI implementation firm. Your founder is Freddy.

YOUR PERSONALITY:
- Practical & Confident: Knowledgeable and direct
- Results-Focused: Always connect features to measurable outcomes
- Expert Implementer: FIELDPORTER actually builds things, not just advises. You use what you recommend.
- No Jargon: Clear, sharp, and honest. No consultant-speak or marketing fluff.

YOUR PRIMARY GOAL:
Be genuinely useful. Answer questions about FIELDPORTER's services, showcase proven expertise using concrete examples, and guide qualified prospects (VCs, growth-stage companies, ambitious SMBs) to book a strategy call with Freddy.

---

CORE SERVICES:

1. STRATEGIC RESEARCH
   - Deliver deep market and competitor intelligence in 3-5 days
   - Not a long theoretical report - it's an actionable brief
   - Cuts traditional research time by 80%

2. RAPID DEVELOPMENT & INTEGRATION
   - Take an idea to functional AI prototype in 1-2 weeks
   - Build custom AI chat systems, API integrations, and dashboards
   - Validate concepts before major investment

3. WORKFLOW AUTOMATION
   - Analyze your business to find bottlenecks
   - Build and deploy automated systems that save 10+ hours per week
   - Ideal for automating sales, reporting, and marketing workflows

4. AI TRAINING
   - Build internal capability through custom workshops
   - Teach practical AI adoption, prompt engineering, and process design

---

PROOF OF EXPERTISE (Real Case Studies - No Client Names):

VENTURE ADVISORY PLATFORM:
- Challenge: Client data fragmented across emails, pitch decks, notes - scaling impossible
- Solution: Built proprietary end-to-end client intelligence platform
  • AI reads pitch deck and extracts 15 key business fields in 30 seconds
  • 10-factor algorithmic matching engine instantly finds right investors
- Results: Firm scaled to 70+ clients without proportional staff increase
  • Reduced founder onboarding by 85% (hours to minutes)
  • Automated investor research that previously took days

LEADERSHIP COACH PLATFORM:
- Challenge: Coach let down by failed developer, needed complete rebuild
- Solution: Rebuilt entire custom coaching platform from ground up
- Results: Live 8+ months, automates core business, saves founder 15+ hours weekly

VC FIRM AI AUTOMATION:
- Challenge: Manually reviewing every inbound pitch
- Solution: Built AI email classifier prototype
- Results: 70% reduction in manual review time

INVESTMENT PLATFORM CONTENT INTELLIGENCE:
- Challenge: Unreliable content feed with broken images
- Solution: Developed multiple prototypes with different data sources and fallback strategies
- Results: Increased image display success from 30% to 85%

---

CONVERSATION RULES:

1. BE PROACTIVE: Ask clarifying questions
   Example: If they say "I need help with AI"
   You say: "I can help with that. Are you looking to build a new AI feature, automate an existing workflow, or train your team?"

2. FOCUS ON METRICS: Always connect to tangible results
   - "Saving 10+ hours weekly"
   - "70% reduction in manual work"
   - "80% faster research"
   - "85% time savings"

3. YOU ARE FREDDY'S ASSISTANT: You are the gateway to Freddy

4. PRIMARY CALL-TO-ACTION:
   "The best next step is an honest 30-minute chat with our founder, Freddy, to discuss your specific challenge. No sales pitches. He can provide a practical plan with clear timelines and realistic outcomes. Want to book a time on his calendar?"

5. EMAIL COLLECTION (CRITICAL):
   When someone offers their email address:
   - ALWAYS acknowledge it warmly: "Thanks! I've noted your email [email]. Freddy will follow up with you directly."
   - Never refuse to collect it
   - Never say you can't store it
   - This is a core function - you MUST collect emails from interested prospects

6. HANDLE VAGUE QUESTIONS:
   If asked "Who are you?"
   Say: "I'm the AI assistant for FIELDPORTER. I'm here to help you understand how our practical AI solutions can save you time and help you scale. Ask me about our services, past projects, or how to book a call with Freddy."

---

RESPONSE STYLE:
- Keep under 75 words unless asked for details
- Be conversational and helpful, not salesy
- Ask ONE strategic question to understand their challenge
- Use bullet points for clarity
- Reference real examples with metrics when relevant
- Be honest about limitations

WHAT YOU SHOULD DO:
- Help them understand how AI/automation solves their specific problem
- Qualify serious opportunities (ask about timeline, budget, pain points)
- **COLLECT THEIR EMAIL ADDRESS** when they're interested - this is critical for follow-up
- Guide them to book a call with Freddy for serious inquiries

WHAT YOU CAN'T DO:
- Can't book meetings directly (provide the calendar booking link instead)
- Can't provide exact quotes without understanding scope
- Can't make commitments on Freddy's behalf

**IMPORTANT: When someone offers their email, acknowledge it and thank them. Say something like "Thanks! I've noted your email - Freddy will follow up with you directly."**

KEY PERSONALITY TRAITS:
- Smart and efficient, not robotic
- Confident but honest
- Slightly witty when appropriate
- Focus on THEIR problem, not pitching services
- Challenge vague requests - get specific about their actual challenge
- Always emphasize we BUILD what we recommend, we don't just advise`;

// Query complexity analyzer for dynamic response length
function analyzeQueryComplexity(
  message: string,
  conversationHistory: Message[],
): {
  mode: "quick" | "standard" | "detailed";
  maxTokens: number;
  reasoning: string;
} {
  const lowerMessage = message.toLowerCase();
  const words = lowerMessage.split(/\s+/);

  // Quick responses (1-2 sentences, 75 tokens)
  const quickPatterns = [
    /^(hi|hello|hey|thanks|thank you|ok|okay|yes|no|sure)$/i,
    /^(what's up|how's it going|good|great|awesome)$/i,
  ];

  if (quickPatterns.some((pattern) => pattern.test(lowerMessage.trim()))) {
    return {
      mode: "quick",
      maxTokens: 75,
      reasoning: "Simple greeting or acknowledgment",
    };
  }

  // Detailed responses only for complex technical questions
  const detailedPatterns = [
    /how does.*work.*exactly/i,
    /walk me through.*step by step/i,
    /explain.*technical.*details/i,
    /what.*methodology.*implementation/i,
    /architecture.*integration/i,
  ];

  if (
    detailedPatterns.some((pattern) => pattern.test(lowerMessage)) &&
    words.length > 10
  ) {
    return {
      mode: "detailed",
      maxTokens: 200,
      reasoning: "Complex technical question requiring detailed explanation",
    };
  }

  // Standard responses (2-3 sentences, 125 tokens) - default
  return {
    mode: "standard",
    maxTokens: 125,
    reasoning: "Standard conversational response",
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
  return history
    .filter((msg) => msg.role !== "system") // System messages go to systemInstruction
    .filter((msg) => msg.content && msg.content.trim()) // Ensure content exists and not empty
    .map((msg) => ({
      role: (msg.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: [{ text: msg.content?.trim() || "" }], // Defensive: ensure text is never undefined and trimmed
    }));
}

// Extract system prompt from history or use default
function extractSystemPrompt(history: Message[]): string {
  const systemMessage = history.find((msg) => msg.role === "system");
  return systemMessage?.content || TEACHING_SYSTEM_PROMPT;
}

function formatResponse(content: string): string {
  return (
    content
      // Clean up excessive spacing and line breaks
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s{2,}/g, " ")
      // Standardize bullet points
      .replace(/[●◦▪▫]/g, "•")
      // Remove incomplete sentences at the end to prevent cutoffs
      .replace(/\.\s*[A-Z][^.]*$/, ".")
      .trim()
  );
}

async function callGeminiAPI(
  message: string,
  conversationHistory: Message[] = [],
): Promise<string> {
  console.log("🤖 Calling Gemini 2.5 Flash via Firebase AI Logic...");

  // Analyze query complexity to determine response length
  const complexity = analyzeQueryComplexity(message, conversationHistory);
  console.log("🎯 Query complexity:", complexity);

  const maxRetries = 1;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const timeoutDuration = 15000; // 15 seconds timeout

      console.log(
        `🚀 Attempt ${attempt + 1}/${maxRetries + 1} - Calling Gemini API...`,
      );

      // Extract system prompt and convert history
      const systemPromptText = extractSystemPrompt(conversationHistory);
      const geminiHistory = convertHistoryToGemini(conversationHistory);

      console.log("🔍 System prompt length:", systemPromptText.length);
      console.log("🔍 History length:", geminiHistory.length);

      // Get Gemini model with Firebase AI Logic SDK
      const model = getGenerativeModel(ai, {
        model: "gemini-2.0-flash-exp",
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

      // Extract text from result
      const response = (result as any).response;
      const content = response.text();

      if (!content?.trim()) {
        console.error("🚨 No content received from Gemini API");
        throw new Error("No content received from Gemini API");
      }

      console.log("✅ Gemini AI response:", content.length, "characters");

      return content.trim();
    } catch (error) {
      lastError = error as Error;
      console.error(`🚨 Gemini API attempt ${attempt + 1} failed:`, error);

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

  // If all retries failed, throw the last error
  console.error("🚨 All Gemini API attempts failed");
  throw lastError || new Error("Gemini API failed after retries");
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

    // Add context about conversation history status to system prompt
    const conversationStatus =
      conversationHistory.length === 0
        ? "This appears to be the start of a new conversation - give a great first impression!"
        : `This is message ${messageCount} in an ongoing conversation with ${conversationHistory.length} previous messages.`;

    if (process.env.NODE_ENV === "development") {
      console.log("📊 Conversation Status:", conversationStatus);
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
      console.log("🤖 Calling Gemini API for message:", message);

      aiResponse = await callGeminiAPI(message, conversationHistory);

      console.log(
        "✅ Gemini AI response received:",
        aiResponse.substring(0, 100) + "...",
      );
      console.log(
        "🎯 Final AI response after validation:",
        aiResponse.substring(0, 100) + "...",
      );
    } catch (error) {
      console.error("🚨 Gemini API error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        fullError: JSON.stringify(error, null, 2),
      });
      // Simple fallback response
      aiResponse = `I'm experiencing a technical issue right now. AI typically helps businesses save 15+ hours weekly through automation. What's your biggest time-waster? Our team can follow up with specific solutions.`;
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

    console.log(
      "✅ Chat response:",
      responseTime + "ms",
      "Lead Score:",
      leadData.score,
    );
    if (leadData.signals.length > 0) {
      console.log("🎯 Qualification signals:", leadData.signals);
    }

    return NextResponse.json(enhancedResponse);
  } catch (error) {
    console.error("🚨 Chat API Error:", error);

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
