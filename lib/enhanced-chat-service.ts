"use client";

import type { Message } from "@/types/chat";

// Enhanced API configuration
const CHAT_API_ENDPOINT = "/api/chat";
const REQUEST_TIMEOUT = 35000; // 35 seconds - matches server timeout + buffer
const MAX_RETRY_ATTEMPTS = 2;
const RETRY_DELAY_BASE = 500;

// Enhanced response interface
export interface EnhancedChatResponse {
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
    error?: boolean;
  };
}

export interface EnhancedChatRequest {
  message: string;
  sessionId: string;
  conversationHistory?: Message[];
  userEmail?: string | null;
  messageCount?: number;
}

export interface ChatServiceError {
  type: "network" | "timeout" | "validation" | "api_error" | "rate_limit";
  message: string;
  retryable: boolean;
  timestamp: Date;
  responseTime?: number;
}

export class EnhancedChatService {
  private static instance: EnhancedChatService;
  private requestCount: number = 0;
  private responseTimeHistory: number[] = [];
  private lastRequestTime: Date | null = null;

  constructor() {
    // Service initialized silently
  }

  static getInstance(): EnhancedChatService {
    if (!EnhancedChatService.instance) {
      EnhancedChatService.instance = new EnhancedChatService();
    }
    return EnhancedChatService.instance;
  }

  private canMakeRequest(): boolean {
    if (this.lastRequestTime) {
      const timeSinceLastRequest = Date.now() - this.lastRequestTime.getTime();
      if (timeSinceLastRequest < 100) {
        return false;
      }
    }
    return true;
  }

  private prepareConversationHistory(
    messages: Message[],
    maxMessages: number = 10,
  ): Message[] {
    return messages
      .filter((msg) => msg.role === "user" || msg.role === "assistant")
      .slice(-maxMessages);
  }

  private async makeAPIRequest(
    payload: EnhancedChatRequest,
    attempt: number = 1,
  ): Promise<EnhancedChatResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(CHAT_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded");
        }
        if (response.status === 400) {
          throw new Error("Invalid request format");
        }
        if (response.status >= 500) {
          throw new Error(`Server error: ${response.status}`);
        }
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.response || typeof data.response !== "string") {
        throw new Error("Invalid response format from API");
      }

      return data as EnhancedChatResponse;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }

      if (attempt < MAX_RETRY_ATTEMPTS) {
        if (
          error.message.includes("Rate limit") ||
          error.message.includes("Server error") ||
          error.message.includes("timeout")
        ) {
          await new Promise((resolve) =>
            setTimeout(resolve, RETRY_DELAY_BASE * attempt),
          );
          return this.makeAPIRequest(payload, attempt + 1);
        }
      }

      throw error;
    }
  }

  async getChatResponse(
    message: string,
    sessionId: string,
    conversationHistory: Message[] = [],
    userEmail?: string,
  ): Promise<{
    response: string;
    error?: ChatServiceError;
    responseTime?: number;
    leadScore?: number;
    metadata?: EnhancedChatResponse["metadata"];
  }> {
    const startTime = Date.now();

    try {
      if (!this.canMakeRequest()) {
        throw new Error(
          "Rate limit: Please wait before sending another message",
        );
      }

      if (!message || !sessionId) {
        throw new Error("Missing required parameters: message and sessionId");
      }

      if (message.trim().length === 0) {
        throw new Error("Message cannot be empty");
      }

      const chatRequest: EnhancedChatRequest = {
        message: message.trim(),
        sessionId,
        conversationHistory: this.prepareConversationHistory(
          conversationHistory,
          10,
        ),
        userEmail: userEmail || null,
        messageCount: conversationHistory.length + 1,
      };

      const apiResponse = await this.makeAPIRequest(chatRequest);
      const responseTime = Date.now() - startTime;

      this.lastRequestTime = new Date();
      this.responseTimeHistory.push(responseTime);
      if (this.responseTimeHistory.length > 50) {
        this.responseTimeHistory.shift();
      }

      if (process.env.NODE_ENV === "development") {
        console.log(
          `Chat response: ${responseTime}ms, Lead Score: ${apiResponse.leadScore}`,
        );
        if (apiResponse.metadata.qualificationSignals.length > 0) {
          console.log(
            "Qualification signals:",
            apiResponse.metadata.qualificationSignals,
          );
        }
      }

      return {
        response: apiResponse.response,
        responseTime,
        leadScore: apiResponse.leadScore,
        metadata: apiResponse.metadata,
      };
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      console.error("Enhanced Chat Service error:", error);

      const chatError: ChatServiceError = {
        type: this.categorizeError(error),
        message: error.message || "Unknown error occurred",
        retryable: this.isRetryableError(error),
        timestamp: new Date(),
        responseTime,
      };

      return {
        response: this.getFallbackResponse(message, chatError.type),
        error: chatError,
        responseTime,
      };
    }
  }

  private categorizeError(error: any): ChatServiceError["type"] {
    const message = error.message?.toLowerCase() || "";

    if (message.includes("timeout") || message.includes("aborted")) {
      return "timeout";
    }
    if (message.includes("rate limit")) {
      return "rate_limit";
    }
    if (message.includes("network") || message.includes("fetch")) {
      return "network";
    }
    if (message.includes("missing") || message.includes("invalid")) {
      return "validation";
    }

    return "api_error";
  }

  private isRetryableError(error: any): boolean {
    const message = error.message?.toLowerCase() || "";

    if (
      message.includes("timeout") ||
      message.includes("server error") ||
      message.includes("network") ||
      message.includes("rate limit")
    ) {
      return true;
    }

    if (
      message.includes("missing") ||
      message.includes("invalid") ||
      message.includes("unauthorized")
    ) {
      return false;
    }

    return true;
  }

  private getFallbackResponse(
    userMessage: string,
    errorType: ChatServiceError["type"],
  ): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("budget") || lowerMessage.includes("pricing")) {
      return "For specific pricing discussions, our team needs to understand your requirements better. Please use our contact page to connect directly.";
    }

    if (lowerMessage.includes("technical") || lowerMessage.includes("how")) {
      return "That's an excellent technical question. Our implementation approach varies based on your specific infrastructure. Would you like to connect with our technical team?";
    }

    switch (errorType) {
      case "timeout":
        return "I'm processing your request more slowly than usual. For immediate assistance with serious inquiries, please use our contact page.";

      case "rate_limit":
        return "I'm receiving many requests right now. For immediate assistance, please use our contact page or try again in a moment.";

      case "network":
        return "I'm experiencing connectivity issues. All conversations are reviewed by our team, so if you leave your contact information, we'll follow up directly.";

      default:
        return "Thanks for your question! This sounds like something our team should discuss with you directly. What's the best way to connect about your AI strategy needs?";
    }
  }

  async healthCheck(): Promise<{
    healthy: boolean;
    responseTime: number;
    averageResponseTime: number;
  }> {
    const startTime = Date.now();

    try {
      const response = await this.makeAPIRequest({
        message: "health_check",
        sessionId: "health_check_session",
      });

      const responseTime = Date.now() - startTime;
      const avgResponseTime =
        this.responseTimeHistory.length > 0
          ? this.responseTimeHistory.reduce((sum, time) => sum + time, 0) /
            this.responseTimeHistory.length
          : 0;

      return {
        healthy: true,
        responseTime,
        averageResponseTime: avgResponseTime,
      };
    } catch (error) {
      console.error("Health check failed:", error);

      return {
        healthy: false,
        responseTime: Date.now() - startTime,
        averageResponseTime: 0,
      };
    }
  }

  getPerformanceMetrics() {
    const avgResponseTime =
      this.responseTimeHistory.length > 0
        ? this.responseTimeHistory.reduce((sum, time) => sum + time, 0) /
          this.responseTimeHistory.length
        : 0;

    return {
      averageResponseTime: avgResponseTime,
      totalRequests: this.responseTimeHistory.length,
      responseTimeDistribution: {
        under1s: this.responseTimeHistory.filter((t) => t < 1000).length,
        under2s: this.responseTimeHistory.filter((t) => t < 2000).length,
        under5s: this.responseTimeHistory.filter((t) => t < 5000).length,
        over5s: this.responseTimeHistory.filter((t) => t >= 5000).length,
      },
    };
  }
}

export const enhancedChatService = EnhancedChatService.getInstance();
