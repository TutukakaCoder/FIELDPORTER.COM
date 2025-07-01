"use client";

import type { Message } from "@/types/chat";
import { responseCacheService } from "./response-cache";

// n8n API Configuration with environment-specific defaults
const N8N_WEBHOOK_URL = process.env["NEXT_PUBLIC_N8N_WEBHOOK_URL"] || "";
const N8N_API_KEY = process.env["NEXT_PUBLIC_N8N_API_KEY"] || "";
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 1000; // 1 second

// Production URL validation
const isProductionEnvironment = process.env.NODE_ENV === "production";
const isValidProductionUrl = (url: string) => {
  return url && !url.includes("localhost") && !url.includes("127.0.0.1");
};

// Check if n8n URL is properly configured for production
const isN8nProperlyConfigured = () => {
  if (!N8N_WEBHOOK_URL) return false;
  if (isProductionEnvironment && !isValidProductionUrl(N8N_WEBHOOK_URL)) {
    console.error(
      "🚨 CRITICAL: Production deployment detected but n8n URL still uses localhost!",
    );
    console.error(
      "Please update NEXT_PUBLIC_N8N_WEBHOOK_URL in your environment variables.",
    );
    console.error("Current URL:", N8N_WEBHOOK_URL);
    return false;
  }
  return true;
};

// n8n API Request/Response Interfaces
export interface N8nChatRequest {
  message: string;
  sessionId: string;
  conversationHistory?: Message[];
  userEmail?: string | null;
  messageCount?: number;
}

export interface N8nChatResponse {
  response: string;
  metadata?: {
    confidence?: number;
    intent?: string;
    suggestedActions?: string[];
    leadScore?: number;
    serviceInterest?: string[];
  };
  error?: string;
}

export interface N8nServiceError {
  type:
    | "network"
    | "timeout"
    | "rate_limit"
    | "service_unavailable"
    | "invalid_response";
  message: string;
  retryable: boolean;
  timestamp: Date;
}

export class N8nChatService {
  private static instance: N8nChatService;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;
  private readonly rateLimitWindow = 60000; // 1 minute
  private readonly maxRequestsPerMinute = 30;

  constructor() {
    // Enhanced environment validation
    if (!isN8nProperlyConfigured()) {
      if (isProductionEnvironment) {
        console.error("🚨 PRODUCTION ERROR: n8n service misconfigured");
        console.error(
          "NEXT_PUBLIC_N8N_WEBHOOK_URL must be set to a valid production URL",
        );
        console.error("Current value:", N8N_WEBHOOK_URL || "undefined");
        console.error(
          "Expected format: https://your-n8n-instance.app.n8n.cloud/webhook/fieldporter-chat",
        );
      } else if (process.env.NODE_ENV === "development") {
        // Only warn in development to avoid console noise in production
        console.warn(
          "⚠️  N8N_WEBHOOK_URL not configured. AI responses will use fallback mode.",
        );
        console.warn(
          "For development: http://localhost:5678/webhook/fieldporter-chat",
        );
        console.warn(
          "For production: https://your-n8n-instance.app.n8n.cloud/webhook/fieldporter-chat",
        );
      }
    } else if (process.env.NODE_ENV === "development") {
      // Development logging removed for production compliance
    }
  }

  static getInstance(): N8nChatService {
    if (!N8nChatService.instance) {
      N8nChatService.instance = new N8nChatService();
    }
    return N8nChatService.instance;
  }

  /**
   * Check if we're within rate limits
   */
  private checkRateLimit(): boolean {
    const now = Date.now();

    // Reset counter if window has passed
    if (now - this.lastRequestTime > this.rateLimitWindow) {
      this.requestCount = 0;
      this.lastRequestTime = now;
    }

    return this.requestCount < this.maxRequestsPerMinute;
  }

  /**
   * Prepare conversation context for n8n
   */
  private prepareConversationContext(
    messages: Message[],
    maxMessages: number = 5,
  ): Message[] {
    // Get last N messages, excluding system messages
    const userAndAssistantMessages = messages
      .filter((msg) => msg.role === "user" || msg.role === "assistant")
      .slice(-maxMessages);

    return userAndAssistantMessages;
  }

  /**
   * Make API request to n8n with retry logic
   */
  private async makeN8nRequest(
    payload: N8nChatRequest,
    attempt: number = 1,
  ): Promise<N8nChatResponse> {
    if (!N8N_WEBHOOK_URL) {
      throw new Error("N8N webhook URL not configured");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(N8N_API_KEY && { Authorization: `Bearer ${N8N_API_KEY}` }),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded");
        }
        if (response.status >= 500) {
          throw new Error(`Server error: ${response.status}`);
        }
        throw new Error(`HTTP error: ${response.status}`);
      }

      let data;
      try {
        const responseText = await response.text();
        if (!responseText.trim()) {
          throw new Error("Empty response from n8n");
        }
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(
          `Invalid JSON response from n8n: ${parseError instanceof Error ? parseError.message : "Unknown parsing error"}`,
        );
      }

      // Validate response structure
      if (!data.response || typeof data.response !== "string") {
        throw new Error("Invalid response format from n8n");
      }

      return data as N8nChatResponse;
    } catch (error: any) {
      clearTimeout(timeoutId);

      // Handle different error types
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }

      if (
        error.message.includes("Rate limit") &&
        attempt < MAX_RETRY_ATTEMPTS
      ) {
        // Wait longer for rate limit errors
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY_BASE * attempt * 2),
        );
        return this.makeN8nRequest(payload, attempt + 1);
      }

      if (
        error.message.includes("Server error") &&
        attempt < MAX_RETRY_ATTEMPTS
      ) {
        // Exponential backoff for server errors
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY_BASE * Math.pow(2, attempt - 1)),
        );
        return this.makeN8nRequest(payload, attempt + 1);
      }

      throw error;
    }
  }

  /**
   * Get AI response from n8n agent with intelligent caching
   */
  async getChatResponse(
    message: string,
    sessionId: string,
    conversationHistory: Message[] = [],
    userEmail?: string,
  ): Promise<{
    response: string;
    error?: N8nServiceError;
    cached?: boolean;
    responseTime?: number;
  }> {
    // PERFORMANCE OPTIMIZATION: Check cache first for instant responses
    const cacheResult = await responseCacheService.getCachedResponse(
      message,
      sessionId,
    );

    if (cacheResult.source) {
      if (process.env.NODE_ENV === "development") {
        // Development logging removed for production compliance
      }

      return {
        response: cacheResult.response,
        cached: true,
        responseTime: cacheResult.responseTime,
      };
    }

    // No cache hit - proceed with AI processing
    const startTime = Date.now();

    // Check if n8n is properly configured
    if (!isN8nProperlyConfigured()) {
      const fallbackResponse = this.getFallbackResponse(message);
      const responseTime = Date.now() - startTime;

      return {
        response: fallbackResponse,
        error: {
          type: "service_unavailable",
          message: isProductionEnvironment
            ? "AI service configuration error - using fallback response"
            : "n8n webhook URL not configured - using fallback response",
          retryable: false,
          timestamp: new Date(),
        },
        cached: false,
        responseTime,
      };
    }

    // Check rate limiting
    if (!this.checkRateLimit()) {
      const responseTime = Date.now() - startTime;

      return {
        response: "",
        error: {
          type: "rate_limit",
          message: "Too many requests. Please wait a moment and try again.",
          retryable: true,
          timestamp: new Date(),
        },
        cached: false,
        responseTime,
      };
    }

    this.requestCount++;

    try {
      // Prepare the request payload
      const payload: N8nChatRequest = {
        message: message.trim(),
        sessionId,
        conversationHistory: this.prepareConversationContext(
          conversationHistory,
          3,
        ),
        userEmail: userEmail || null,
        messageCount: conversationHistory.length,
      };

      // Make the API request
      const response = await this.makeN8nRequest(payload);
      const totalResponseTime = Date.now() - startTime;

      // PERFORMANCE OPTIMIZATION: Store successful response in cache
      const confidence = this.calculateResponseConfidence(
        response.response,
        message,
      );
      responseCacheService.storeCachedResponse(
        message,
        response.response,
        sessionId,
        confidence,
      );

      // Log successful interaction for analytics (development only)
      if (process.env.NODE_ENV === "development") {
        // Development logging removed for production compliance
      }

      return {
        response: response.response,
        cached: false,
        responseTime: totalResponseTime,
      };
    } catch (error: any) {
      const responseTime = Date.now() - startTime;

      // Enhanced error logging for production debugging
      if (isProductionEnvironment) {
        console.error("N8n production error:", {
          error: error.message,
          sessionId,
          timestamp: new Date().toISOString(),
          webhookUrl: N8N_WEBHOOK_URL ? "configured" : "missing",
        });
      } else if (process.env.NODE_ENV === "development") {
        // Development logging removed for production compliance
      }

      // Categorize the error
      let errorType: N8nServiceError["type"] = "service_unavailable";
      let retryable = false;

      if (error.message.includes("timeout")) {
        errorType = "timeout";
        retryable = true;
      } else if (error.message.includes("Rate limit")) {
        errorType = "rate_limit";
        retryable = true;
      } else if (error.message.includes("fetch")) {
        errorType = "network";
        retryable = true;
      } else if (error.message.includes("Invalid response")) {
        errorType = "invalid_response";
        retryable = false;
      }

      return {
        response: this.getFallbackResponse(message),
        error: {
          type: errorType,
          message: error.message,
          retryable,
          timestamp: new Date(),
        },
        cached: false,
        responseTime,
      };
    }
  }

  /**
   * Get fallback response when n8n is unavailable
   * Frederick Hopkins authentic voice fallback responses
   */
  getFallbackResponse(userMessage: string): string {
    // Frederick's authentic fallback responses
    const authenticFallbackResponses = [
      "I'm having trouble connecting right now. For immediate help, you can email freddy@fieldporter.com or use the contact form - I typically respond within 24 hours.",

      "Technical issue on my end. I review all conversations, so if you leave your email, I'll follow up directly with you.",

      "My AI system is being a bit temperamental today. Drop me a line at freddy@fieldporter.com and I'll get back to you personally - usually within a day.",

      "Connection's acting up on my end. The old-fashioned way works best - shoot me an email at freddy@fieldporter.com and I'll respond directly.",
    ];

    // Context-aware responses based on user message content
    const lowerMessage = userMessage.toLowerCase();

    // Urgent requests
    if (
      lowerMessage.includes("urgent") ||
      lowerMessage.includes("asap") ||
      lowerMessage.includes("immediately")
    ) {
      return "I understand this is urgent. Email me directly at freddy@fieldporter.com with 'URGENT' in the subject line and I'll prioritize getting back to you today.";
    }

    // Pricing and cost inquiries
    if (
      lowerMessage.includes("pricing") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("budget") ||
      lowerMessage.includes("price")
    ) {
      return "Depends what you need. Strategic research runs $10K-$50K, rapid prototyping $5K-$25K, ongoing advisory $2K-$10K monthly. I prefer solving problems over counting hours. Email freddy@fieldporter.com to discuss your specific situation.";
    }

    // ROI and business impact questions
    if (
      lowerMessage.includes("roi") ||
      lowerMessage.includes("return") ||
      lowerMessage.includes("impact") ||
      lowerMessage.includes("business value")
    ) {
      return "Good question. I focus on quick wins that pay for themselves - recently helped a client cut manual work by 70% in 3 weeks. Let's discuss your specific situation. Email freddy@fieldporter.com and I'll share relevant examples.";
    }

    // Implementation and technical questions
    if (
      lowerMessage.includes("implement") ||
      lowerMessage.includes("integration") ||
      lowerMessage.includes("technical") ||
      lowerMessage.includes("how to")
    ) {
      return "I love implementation questions - I actually build the prototypes myself rather than just talking about them. Email freddy@fieldporter.com with your technical challenge and I'll give you honest feedback on approach.";
    }

    // Strategy and planning questions
    if (
      lowerMessage.includes("strategy") ||
      lowerMessage.includes("planning") ||
      lowerMessage.includes("roadmap") ||
      lowerMessage.includes("approach")
    ) {
      return "I start by building working prototypes instead of PowerPoint strategies. Better to test an 80% solution in 2 weeks than spend 6 months planning. Email freddy@fieldporter.com to discuss your specific challenge.";
    }

    // Default authentic response with some variation
    const randomIndex = Math.floor(
      Math.random() * authenticFallbackResponses.length,
    );
    const selectedResponse = authenticFallbackResponses[randomIndex];

    return (
      selectedResponse ||
      authenticFallbackResponses[0] ||
      "Technical issue on my end. Email freddy@fieldporter.com and I'll respond directly."
    );
  }

  /**
   * Health check for n8n service with enhanced production diagnostics
   */
  async healthCheck(): Promise<boolean> {
    if (!isN8nProperlyConfigured()) {
      return false;
    }

    try {
      const testPayload: N8nChatRequest = {
        message: "health_check",
        sessionId: "health_check_session",
      };

      await this.makeN8nRequest(testPayload);
      return true;
    } catch (error) {
      // Only log health check failures in development mode
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "N8n service unavailable:",
          error instanceof Error ? error.message : "Unknown error",
        );
      }
      return false;
    }
  }

  /**
   * Get current rate limit status
   */
  getRateLimitStatus(): { remaining: number; resetTime: number } {
    const now = Date.now();
    const remaining = Math.max(
      0,
      this.maxRequestsPerMinute - this.requestCount,
    );
    const resetTime = this.lastRequestTime + this.rateLimitWindow;

    return { remaining, resetTime };
  }

  /**
   * Calculate confidence score for caching decisions
   */
  private calculateResponseConfidence(response: string, query: string): number {
    let confidence = 0.8; // Base confidence

    // Higher confidence for comprehensive responses
    if (response.length > 200) confidence += 0.1;

    // Higher confidence for structured responses (with bullet points, etc.)
    if (
      response.includes("•") ||
      response.includes("**") ||
      response.includes("\n")
    ) {
      confidence += 0.05;
    }

    // Lower confidence for very generic responses
    if (
      response.includes("I apologize") ||
      response.includes("I don't have enough information")
    ) {
      confidence -= 0.3;
    }

    // Lower confidence for personalized queries
    if (
      query.toLowerCase().includes("my company") ||
      query.toLowerCase().includes("our business")
    ) {
      confidence -= 0.2;
    }

    // Higher confidence for FIELDPORTER-specific questions
    if (
      query.toLowerCase().includes("fieldporter") ||
      response.toLowerCase().includes("fieldporter")
    ) {
      confidence += 0.1;
    }

    return Math.max(0.1, Math.min(1.0, confidence));
  }

  /**
   * Get cache analytics for monitoring
   */
  getCacheAnalytics() {
    return responseCacheService.getAnalytics();
  }

  /**
   * Manually invalidate cache (for content updates)
   */
  invalidateCache(patterns: string[]): number {
    return responseCacheService.invalidateCache(patterns);
  }

  /**
   * Check if query would likely be cached
   */
  wouldBeCached(query: string): boolean {
    return responseCacheService.wouldHaveQuickResponse(query);
  }
}

// Export singleton instance
export const n8nChatService = N8nChatService.getInstance();
