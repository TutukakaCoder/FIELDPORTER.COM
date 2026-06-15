import {
  analyzeQueryComplexity,
  calculateEnhancedLeadScore,
  extractContactInfo,
} from "@/lib/chat/analysis";
import { getCachedResponse, setCachedResponse } from "@/lib/chat/cache";
import {
  convertHistoryToGemini,
  extractSystemPrompt,
  getContextAwareFallback,
} from "@/lib/chat/gemini-helpers";
import { notificationService } from "@/lib/notification-service";
import type { Message } from "@/types/chat";
import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAIBackend, getAI, getGenerativeModel } from "firebase/ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseAI() {
  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          apiKey: firebaseConfig.apiKey!,
          authDomain: firebaseConfig.authDomain!,
          projectId: firebaseConfig.projectId!,
          storageBucket: firebaseConfig.storageBucket!,
          messagingSenderId: firebaseConfig.messagingSenderId!,
          appId: firebaseConfig.appId!,
        });
  return getAI(app, { backend: new GoogleAIBackend() });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CHAT_MODEL = "gemini-3.1-flash-lite";

const chatRequestSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().min(1),
  conversationHistory: z
    .array(
      z.object({
        id: z.string().optional(),
        content: z.string(),
        role: z.enum(["user", "assistant", "system"]),
        timestamp: z.union([z.string(), z.date()]).optional(),
        status: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
  userEmail: z.string().nullable().optional(),
  messageCount: z.number().optional().default(1),
});

type GeminiHistoryEntry = {
  role: "user" | "model";
  parts: Array<{ text: string }>;
};

function sanitizeGeminiHistory(
  history: GeminiHistoryEntry[],
): GeminiHistoryEntry[] {
  const valid = history.filter((entry) => {
    if (!entry?.parts?.length) return false;
    return entry.parts.every(
      (part) =>
        part &&
        typeof part === "object" &&
        typeof part.text === "string" &&
        part.text.trim().length > 0,
    );
  });

  if (valid.length === 0) {
    return [];
  }

  let sanitized = valid;
  if (sanitized[0]?.role === "model") {
    sanitized = sanitized.slice(1);
  }

  const paired: GeminiHistoryEntry[] = [];
  for (let i = 0; i < sanitized.length; i += 2) {
    const userEntry = sanitized[i];
    const modelEntry = sanitized[i + 1];
    if (userEntry?.role === "user" && modelEntry?.role === "model") {
      paired.push(userEntry, modelEntry);
    }
  }

  return paired;
}

function buildHealthCheckResponse(sessionId: string, responseTime: number) {
  return NextResponse.json({
    response: "FIELDPORTER chat is online and ready.",
    sessionId,
    messageCount: 1,
    shouldNotify: false,
    userEmail: null,
    userPhone: null,
    leadScore: 1,
    metadata: {
      timestamp: new Date().toISOString(),
      agent: CHAT_MODEL,
      responseTime,
      leadScore: 1,
      emailCollected: false,
      phoneCollected: false,
      contactRequested: false,
      qualificationSignals: [],
      confidenceScore: 1,
    },
  });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let sessionId = "unknown";
  let trimmedMessage = "";
  let history: Message[] = [];

  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request format", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const parsedData = parsed.data;
    sessionId = parsedData.sessionId;
    trimmedMessage = parsedData.message.trim();
    history = parsedData.conversationHistory as Message[];
    const { userEmail, messageCount } = parsedData;

    if (trimmedMessage === "health_check") {
      return buildHealthCheckResponse(sessionId, Date.now() - startTime);
    }

    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return NextResponse.json(
        {
          error: "Chat service not configured",
          message: "Firebase configuration is missing",
        },
        { status: 500 },
      );
    }

    const historyMessages = history;
    const complexity = analyzeQueryComplexity(trimmedMessage, historyMessages);
    const systemPrompt = extractSystemPrompt(
      historyMessages,
      messageCount,
      complexity.userFrustrationLevel,
    );

    const cached = getCachedResponse(trimmedMessage, sessionId);
    let aiResponseText: string;

    if (cached) {
      aiResponseText = cached;
    } else {
      const geminiHistory = sanitizeGeminiHistory(
        convertHistoryToGemini(historyMessages),
      );

      const ai = getFirebaseAI();
      const model = getGenerativeModel(ai, {
        model: CHAT_MODEL,
        systemInstruction: systemPrompt,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: complexity.maxTokens,
        },
      });

      const chat = model.startChat({ history: geminiHistory });
      const result = await chat.sendMessage(trimmedMessage);
      aiResponseText = result.response.text().trim();

      if (!aiResponseText) {
        throw new Error("Empty response from Gemini");
      }

      setCachedResponse(trimmedMessage, sessionId, aiResponseText);
    }

    const contactInfo = extractContactInfo(trimmedMessage);
    const { score: leadScore, signals: qualificationSignals } =
      calculateEnhancedLeadScore(trimmedMessage, historyMessages);

    const emailCollected = Boolean(userEmail || contactInfo.email);
    const phoneCollected = Boolean(contactInfo.phone);
    const shouldNotify =
      emailCollected || phoneCollected || leadScore >= 10;

    if (shouldNotify) {
      await notificationService.sendLeadNotification({
        sessionId,
        userMessage: trimmedMessage,
        userEmail: userEmail || contactInfo.email,
        userPhone: contactInfo.phone,
        leadScore,
        qualificationSignals,
        timestamp: new Date().toISOString(),
      });
    }

    const responseTime = Date.now() - startTime;

    return NextResponse.json({
      response: aiResponseText,
      sessionId,
      messageCount: messageCount + 1,
      shouldNotify,
      userEmail: userEmail || contactInfo.email || null,
      userPhone: contactInfo.phone || null,
      leadScore,
      metadata: {
        timestamp: new Date().toISOString(),
        agent: CHAT_MODEL,
        responseTime,
        leadScore,
        emailCollected,
        phoneCollected,
        contactRequested: leadScore >= 10,
        qualificationSignals,
        confidenceScore: Math.min(leadScore / 20, 1),
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    const responseTime = Date.now() - startTime;
    const complexity = analyzeQueryComplexity(trimmedMessage, history);
    const fallback = getContextAwareFallback(trimmedMessage, history, complexity);

    return NextResponse.json({
      response: fallback,
      sessionId,
      messageCount: 1,
      shouldNotify: false,
      userEmail: null,
      userPhone: null,
      leadScore: 1,
      metadata: {
        timestamp: new Date().toISOString(),
        agent: CHAT_MODEL,
        responseTime,
        leadScore: 1,
        emailCollected: false,
        phoneCollected: false,
        contactRequested: false,
        qualificationSignals: [],
        confidenceScore: 0,
        error: true,
      },
    });
  }
}
