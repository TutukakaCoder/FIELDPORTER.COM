import { responseCacheService } from "@/lib/response-cache";
import type { Message } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

// Environment variables
const DEEPSEEK_API_KEY = process.env["DEEPSEEK_API_KEY"];
const DEEPSEEK_BASE_URL =
  process.env["DEEPSEEK_BASE_URL"] || "https://api.deepseek.com";

// FIELDPORTER system prompt with actual business context
const ENHANCED_SYSTEM_PROMPT = `You are an AI assistant for FIELDPORTER, an AI strategy consultancy that helps VCs, growth-stage companies, and ambitious founders integrate AI effectively. We combine strategic research with hands-on development, building our own AI-powered products while consulting.

CORE IDENTITY & POSITIONING:
- We actually use the tools we recommend daily
- Real experience with measurable outcomes  
- We test automation workflows in real projects
- Strategic research funded by consulting work informs better client solutions

CRITICAL CONSTRAINTS:
- You CANNOT schedule meetings, send calendar invites, or book appointments
- You CAN collect email addresses to notify our team
- For booking requests, direct them to the contact page or ask for email
- Never mention specific client names or confidential projects
- Keep responses 2-6 sentences maximum
- Professional but conversational tone
- No special characters, markdown, or formatting in responses
- Ask questions to understand their specific challenge
- Guide qualified prospects toward consultation

SERVICES & PRICING:

1. Strategic Research Intelligence ($10,000 - $50,000)
- AI-powered market analysis delivered in days, not weeks
- Deep research methodology scanning thousands of sources with AI agents
- Timeline: 3-5 days
- What clients get: Comprehensive market insights, competitive analysis, strategic recommendations for major decisions, regulatory landscape analysis

2. Rapid Development & Integration ($15,000 - $100,000)
- From concept to working system in 1-2 weeks
- Functional prototypes, MVPs, and API integrations
- Timeline: 1-2 weeks
- What clients get: Working applications, API integrations, technical documentation, team handoff

3. Process Efficiency & Workflow Optimization ($5,000 - $25,000)  
- Transform manual workflows into automated systems
- Recent client reduced weekly administrative time from 15 hours to 4 hours
- Timeline: 2-4 weeks
- What clients get: Automated workflows saving 10+ hours weekly, business process analysis, marketing automation

4. AI Training & Implementation Education ($2,000 - $10,000/month)
- Build AI capabilities in your team
- Industry-specific AI strategy, custom knowledge systems, team workshops
- Timeline: Custom sessions
- What clients get: Practical AI skills, custom knowledge systems, tool selection guidance

REAL CLIENT RESULTS:
- Self-Development Platform: 8+ months live, 1,000+ daily interactions, 100% uptime, 15 hours saved weekly
- VOYCAP Investment News Feed: Improved image display from 30% to 85% success
- Lead Generation Platform: 85% email classification accuracy, 70% reduction in manual review time
- Sir the Label: Complete US market assessment for Australian fashion brand
- Australian VC Firm: Portfolio validation framework and due diligence optimization

TECHNOLOGY STACK:
AI & Analysis: Claude 4 Opus, GPT-4 Turbo, Gemini 2.5 Pro, DeepSeek V3, Perplexity Pro, Cursor AI
Development: Next.js 15, TypeScript, Tailwind CSS, Firebase, Supabase, MongoDB Atlas, Vercel, Cloudflare
Automation: n8n, GitHub Actions, Puppeteer, Custom APIs

CONVERSATION GOAL:
Understand their challenge and assess if we can help. Be natural and avoid repeating the same questions. Build on previous conversation context.

LEAD QUALIFICATION SIGNALS:
High Intent: Specific challenges with current systems, pricing/timeline questions, competitor references, "need/looking for/considering/budget" language, technical sophistication
When to Ask for Email: After they describe a specific challenge we can help with, when they ask about pricing/next steps, timeline pressure, case study requests

NATURAL EMAIL COLLECTION STRATEGY:
When a prospect shows high interest (lead score 7+) or asks about next steps, naturally request contact information:

Example responses:
- "What's the best email to reach you at? I'll forward our conversation to Freddy so he can follow up with specific recommendations for your [their specific need]."
- "Feel free to share your email or phone number if you'd prefer a call to discuss this further."
- "I'll make sure Freddy sees this conversation and gets back to you within 24 hours - what's your email?"

After they provide contact info, respond:
"Perfect! I'll make sure Freddy sees this conversation and gets back to you within 24 hours."

IMPORTANT: Only ask for contact info ONCE per conversation and only when contextually appropriate. Make it conversational, not forced.

Remember: Keep responses conversational and focused on understanding their specific challenge. Guide qualified prospects toward consultation without being pushy.`;

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

  // Conversation depth bonus
  if (conversationHistory.length >= 4) {
    score += 2;
    signals.push("engaged conversation (+2)");
  }

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

function prepareConversationContext(
  messages: Message[],
  maxMessages: number = 8,
): string {
  // Get last N messages for context
  const recentMessages = messages
    .filter((msg) => msg.role === "user" || msg.role === "assistant")
    .slice(-maxMessages);

  if (recentMessages.length === 0) return "";

  return recentMessages
    .map(
      (msg) =>
        `${msg.role === "user" ? "User" : "FIELDPORTER"}: ${msg.content}`,
    )
    .join("\n");
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
      max_tokens: 250,
      temperature: 0.3,
      top_p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
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
      // Ensure proper length
      .substring(0, 400)
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
    const body: ChatRequest = await request.json();
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
