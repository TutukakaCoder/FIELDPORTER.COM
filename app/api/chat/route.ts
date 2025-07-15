// Simplified imports - removed unused complex teaching templates
import type { Message } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

// Environment variables with enhanced loading and debug logging
const DEEPSEEK_API_KEY =
  process.env.DEEPSEEK_API_KEY || process.env["DEEPSEEK_API_KEY"];
const DEEPSEEK_BASE_URL =
  process.env["DEEPSEEK_BASE_URL"] || "https://api.deepseek.com";

// Add debug logging
if (!DEEPSEEK_API_KEY) {
  console.error(
    "WARNING: DEEPSEEK_API_KEY not found in environment variables!",
  );
} else {
  console.log("✅ DEEPSEEK_API_KEY loaded successfully");
}

// Enhanced conversational system prompt with FIELDPORTER personality and knowledge
const TEACHING_SYSTEM_PROMPT = `You are Porter, FIELDPORTER's AI assistant. Help businesses understand how AI can solve their specific challenges.

RESPONSE STYLE:
- Keep responses under 75 words unless asked for details
- Be conversational and helpful, not salesy
- Ask ONE follow-up question to understand their needs
- Use bullet points for clarity when listing items

FIELDPORTER EXAMPLES (only mention if directly relevant):
- VOYCAP: 30% → 85% image success rate
- Self-dev platform: 1000+ daily users, 100% uptime
- Lead system: 85% accuracy, 70% time reduction

PRICING: Projects typically range $2K-$50K depending on complexity.

Focus on understanding their specific challenge and explaining how AI addresses that type of problem.`;

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

async function callDeepSeekAPI(
  message: string,
  conversationContext: string,
  conversationHistory: Message[] = [],
  conversationStatus: string = "This is a new conversation.",
): Promise<string> {
  console.log("🔑 Checking DeepSeek API configuration...");

  if (!DEEPSEEK_API_KEY) {
    console.error("🚨 CRITICAL: DeepSeek API key not found!");
    console.error(
      "Environment keys containing 'DEEP':",
      Object.keys(process.env).filter((k) => k.includes("DEEP")),
    );
    throw new Error("DeepSeek API key not configured");
  }

  console.log(
    "✅ API Key found, starting with:",
    DEEPSEEK_API_KEY.substring(0, 10) + "...",
  );
  console.log("🌐 Using API URL:", DEEPSEEK_BASE_URL);

  // Analyze query complexity to determine response length
  const complexity = analyzeQueryComplexity(message, conversationHistory);
  console.log("🎯 Query complexity:", complexity);

  const messages = [
    {
      role: "system",
      content: TEACHING_SYSTEM_PROMPT,
    },
  ];

  // Add only essential conversation history (last 4 messages)
  const recentHistory = conversationHistory.slice(-4);
  recentHistory.forEach((msg) => {
    messages.push({
      role: msg.role,
      content: msg.content,
    });
  });

  messages.push({
    role: "user",
    content: message,
  });

  console.log(
    "📤 Sending request to DeepSeek with",
    messages.length,
    "messages",
  );

  // Optimized timeout handling with retry logic
  const maxRetries = 1;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const timeoutDuration = 15000; // 15 seconds timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

      console.log(
        `🚀 Attempt ${attempt + 1}/${maxRetries + 1} - Calling DeepSeek API...`,
      );

      const response = await fetch(`${DEEPSEEK_BASE_URL}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages,
          max_tokens: complexity.maxTokens,
          temperature: 0.4, // Reduced for more focused responses
          top_p: 0.8,
          frequency_penalty: 0.2,
          presence_penalty: 0.2,
          stream: true,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("📡 DeepSeek API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("🚨 DeepSeek API error:", response.status, errorText);
        throw new Error(
          `DeepSeek API error: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body reader available");
      }

      let content = "";
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  content += delta;
                }
              } catch (e) {
                // Skip invalid JSON chunks
                continue;
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      if (!content.trim()) {
        console.error("🚨 No content received from DeepSeek API");
        throw new Error("No content received from DeepSeek API");
      }

      console.log(
        "✅ DeepSeek AI response length:",
        content.length,
        "characters",
      );
      console.log(
        "🎯 DeepSeek AI response preview:",
        content.substring(0, 200) + "...",
      );

      return content.trim();
    } catch (error) {
      lastError = error as Error;
      console.error(`🚨 DeepSeek API attempt ${attempt + 1} failed:`, error);

      // Don't retry on authentication errors
      if (error instanceof Error && error.message.includes("401")) {
        console.error("🔐 Authentication error - check API key");
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
  console.error("🚨 All DeepSeek API attempts failed");
  throw lastError || new Error("DeepSeek API failed after retries");
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
      // Call DeepSeek API with simplified context
      console.log("🤖 Calling DeepSeek API for message:", message);

      aiResponse = await callDeepSeekAPI(
        message,
        "",
        conversationHistory,
        conversationStatus,
      );

      console.log(
        "✅ DeepSeek AI response received:",
        aiResponse.substring(0, 100) + "...",
      );
      console.log(
        "🎯 Final AI response after validation:",
        aiResponse.substring(0, 100) + "...",
      );
    } catch (error) {
      console.error("🚨 DeepSeek API error:", error);
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
