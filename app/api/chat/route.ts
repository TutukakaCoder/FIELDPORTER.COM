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

import { getCachedResponse, setCachedResponse } from "@/lib/chat/cache";
import {
  analyzeQueryComplexity,
  calculateEnhancedLeadScore,
  extractContactInfo,
} from "@/lib/chat/analysis";
import {
  convertHistoryToGemini,
  extractSystemPrompt,
  getContextAwareFallback,
} from "@/lib/chat/gemini-helpers";
import { TEACHING_SYSTEM_PROMPT } from "@/lib/chat/prompts";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

console.log("✅ Gemini 2.0 Flash initialized with Firebase AI Logic SDK");

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

function formatResponse(content: string): string {
  return content
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .replace(/[●◦▪▫]/g, "•")
    .trim();
}

async function callGeminiAPI(
  message: string,
  conversationHistory: Message[] = [],
  messageCount: number = 1,
  sessionId: string = "",
): Promise<string> {
  if (conversationHistory.length === 0 && sessionId) {
    const cached = getCachedResponse(message, sessionId);
    if (cached) {
      console.log("⚡ Cache hit - returning cached response");
      return cached;
    }
  }

  const complexity = analyzeQueryComplexity(message, conversationHistory);
  const primaryModel = "gemini-2.0-flash";
  const fallbackModel = "gemini-1.5-flash";

  const maxRetries = 2;
  let lastError: Error | null = null;
  const modelsToTry = [primaryModel, fallbackModel];

  for (const modelName of modelsToTry) {
    console.log(`🤖 Trying ${modelName} via Firebase AI Logic...`);
    console.log("🎯 Query complexity:", complexity);

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const timeoutDuration = 30000;
        console.log(
          `🚀 Attempt ${attempt + 1}/${maxRetries + 1} - Calling ${modelName}...`,
        );

        const systemPromptText =
          conversationHistory.length === 0
            ? extractSystemPrompt(
                conversationHistory,
                messageCount,
                complexity.userFrustrationLevel,
              )
            : TEACHING_SYSTEM_PROMPT;

        let geminiHistory = convertHistoryToGemini(conversationHistory);

        if (geminiHistory.length === 1 && geminiHistory[0]?.role === "user") {
          console.warn(
            "⚠️ History contains only current user message - clearing for Firebase compatibility",
          );
          geminiHistory = [];
        }

        const firstHistoryMessage = geminiHistory[0];
        if (firstHistoryMessage && firstHistoryMessage.role !== "user") {
          console.warn(
            "⚠️ Invalid history format - first message must be from user, clearing history",
          );
          geminiHistory = [];
        }

        geminiHistory = geminiHistory.filter((msg) => {
          try {
            if (!msg || typeof msg !== "object") {
              return false;
            }
            if (
              !msg.parts ||
              !Array.isArray(msg.parts) ||
              msg.parts.length === 0
            ) {
              return false;
            }
            const allPartsValid = msg.parts.every((part: any) => {
              if (!part || typeof part !== "object") return false;
              if (!part.text || typeof part.text !== "string") return false;
              if (!part.text.trim()) return false;
              return true;
            });
            if (!allPartsValid) return false;
            if (msg.role !== "user" && msg.role !== "model") return false;
            return true;
          } catch (error) {
            return false;
          }
        });

        if (geminiHistory.length > 0) {
          let isValidHistory = true;
          for (let i = 0; i < geminiHistory.length; i++) {
            const msg = geminiHistory[i];
            if (!msg || !msg.parts || !Array.isArray(msg.parts)) {
              isValidHistory = false;
              break;
            }
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
            geminiHistory = [];
          }
        }

        console.log("🔍 System prompt length:", systemPromptText.length);
        console.log("🔍 History length:", geminiHistory.length);

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

        const result = await Promise.race([
          chat.sendMessage(message),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Request timeout")),
              timeoutDuration,
            ),
          ),
        ]);

        const response = (result as any)?.response;
        if (!response) {
          throw new Error("No response object from Gemini API");
        }

        const promptFeedback = response.promptFeedback;
        if (promptFeedback) {
          if (promptFeedback.blockReason) {
            throw new Error(`Prompt blocked: ${promptFeedback.blockReason}`);
          }
        }

        const candidates = response.candidates;
        if (
          !candidates ||
          !Array.isArray(candidates) ||
          candidates.length === 0
        ) {
          throw new Error("Empty response from Gemini API");
        }

        const firstCandidate = candidates[0];
        if (
          !firstCandidate?.content?.parts ||
          firstCandidate.content.parts.length === 0
        ) {
          throw new Error("No content in Gemini API response");
        }

        let content: string;
        try {
          content = response.text();
        } catch (textError) {
          content = firstCandidate.content.parts
            .filter((part: any) => part?.text)
            .map((part: any) => part.text)
            .join("");
        }

        if (!content?.trim()) {
          throw new Error("No content received from Gemini API");
        }

        const trimmedContent = content.trim();

        if (trimmedContent.length < 50) {
          console.warn(
            `⚠️ Response too short (${trimmedContent.length} chars)`,
          );
          if (trimmedContent.length < 10 && attempt < maxRetries) {
            throw new Error("Response too short");
          }
        }

        console.log(
          `✅ ${modelName} response:`,
          trimmedContent.length,
          "characters",
        );

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

        if (
          error instanceof Error &&
          (error.message.includes("401") ||
            error.message.includes("403") ||
            error.message.includes("API_KEY") ||
            error.message.includes("permission"))
        ) {
          throw error;
        }

        if (attempt < maxRetries) {
          const delay = 1000 * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
  }

  throw lastError || new Error("Gemini API failed after all retries");
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
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

    const complexity = analyzeQueryComplexity(message, conversationHistory);

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

    const leadData = calculateEnhancedLeadScore(message, conversationHistory);
    let aiResponse: string;

    try {
      aiResponse = await callGeminiAPI(
        message,
        conversationHistory,
        messageCount,
        sessionId,
      );
    } catch (error) {
      console.error("Gemini API error:", error);
      aiResponse = getContextAwareFallback(
        message,
        conversationHistory,
        complexity,
      );
    }

    const formattedResponse = formatResponse(aiResponse);
    const responseTime = Date.now() - startTime;

    const contactInfo = extractContactInfo(message);
    const shouldNotify = Boolean(
      leadData.score >= 10 || contactInfo.email || contactInfo.phone,
    );

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
      } catch (notificationError) {
        console.error("❌ Notification failed:", notificationError);
      }
    }

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
