"use client";

import type { Message } from "@/types/chat";

// Enhanced API configuration
const CHAT_API_ENDPOINT = "/api/chat";
const REQUEST_TIMEOUT = 15000; // 15 seconds
const MAX_RETRY_ATTEMPTS = 2; // Fewer retries since we have better control
const RETRY_DELAY_BASE = 500; // Faster retry

// Enhanced response interface matching our API
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

// Performance monitoring
interface PerformanceMetrics {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  lastRequestTime: Date | null;
}

export class EnhancedNextJSChatService {
  private static instance: EnhancedNextJSChatService;
  private requestCount: number = 0;
  private metrics: PerformanceMetrics = {
    totalRequests: 0,
    averageResponseTime: 0,
    errorRate: 0,
    lastRequestTime: null,
  };
  private responseTimeHistory: number[] = [];

  constructor() {
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Enhanced NextJS Chat Service initialized");
    }
  }

  static getInstance(): EnhancedNextJSChatService {
    if (!EnhancedNextJSChatService.instance) {
      EnhancedNextJSChatService.instance = new EnhancedNextJSChatService();
    }
    return EnhancedNextJSChatService.instance;
  }

  /**
   * Rate limiting check - much more lenient since we control the API
   */
  private canMakeRequest(): boolean {
    // Simple rate limiting - 100 requests per minute
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // In a real implementation, you'd track requests with timestamps
    // For now, we'll just limit consecutive rapid requests
    if (this.metrics.lastRequestTime) {
      const timeSinceLastRequest = now - this.metrics.lastRequestTime.getTime();
      if (timeSinceLastRequest < 100) {
        // Minimum 100ms between requests
        return false;
      }
    }

    return true;
  }

  /**
   * Prepare conversation context with better memory management
   */
  private prepareConversationHistory(
    messages: Message[],
    maxMessages: number = 10,
  ): Message[] {
    // Get last N messages, prioritizing user/assistant exchanges
    const userAndAssistantMessages = messages
      .filter((msg) => msg.role === "user" || msg.role === "assistant")
      .slice(-maxMessages);

    return userAndAssistantMessages;
  }

  /**
   * Make API request with enhanced error handling
   */
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

      let data;
      try {
        const responseText = await response.text();
        if (!responseText.trim()) {
          throw new Error("Empty response from API");
        }
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(
          `Invalid JSON response: ${parseError instanceof Error ? parseError.message : "Unknown parsing error"}`,
        );
      }

      // Validate response structure
      if (!data.response || typeof data.response !== "string") {
        throw new Error("Invalid response format from API");
      }

      return data as EnhancedChatResponse;
    } catch (error: any) {
      clearTimeout(timeoutId);

      // Handle different error types with smart retry logic
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }

      // Retry for specific error types
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

  /**
   * Update performance metrics
   */
  private updateMetrics(responseTime: number, isError: boolean = false) {
    this.metrics.totalRequests++;
    this.metrics.lastRequestTime = new Date();

    // Track response time history (last 50 requests)
    this.responseTimeHistory.push(responseTime);
    if (this.responseTimeHistory.length > 50) {
      this.responseTimeHistory.shift();
    }

    // Calculate average response time
    const totalTime = this.responseTimeHistory.reduce(
      (sum, time) => sum + time,
      0,
    );
    this.metrics.averageResponseTime =
      totalTime / this.responseTimeHistory.length;

    // Update error rate (simple moving average)
    if (isError) {
      this.metrics.errorRate = Math.min(100, this.metrics.errorRate + 2);
    } else {
      this.metrics.errorRate = Math.max(0, this.metrics.errorRate - 0.5);
    }
  }

  /**
   * Main chat response method
   */
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
      // Rate limiting check
      if (!this.canMakeRequest()) {
        throw new Error(
          "Rate limit: Please wait before sending another message",
        );
      }

      // Validate inputs
      if (!message || !sessionId) {
        throw new Error("Missing required parameters: message and sessionId");
      }

      if (message.trim().length === 0) {
        throw new Error("Message cannot be empty");
      }

      // Prepare request
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

      // Make API call
      const apiResponse = await this.makeAPIRequest(chatRequest);
      const responseTime = Date.now() - startTime;

      // Update metrics
      this.updateMetrics(responseTime, false);

      // Log performance for development
      if (process.env.NODE_ENV === "development") {
        console.log(
          `✅ Chat response: ${responseTime}ms, Lead Score: ${apiResponse.leadScore}`,
        );
        if (apiResponse.metadata.qualificationSignals.length > 0) {
          console.log(
            "🎯 Qualification signals:",
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
      this.updateMetrics(responseTime, true);

      console.error("Enhanced Chat Service error:", error);

      // Create appropriate error
      const chatError: ChatServiceError = {
        type: this.categorizeError(error),
        message: error.message || "Unknown error occurred",
        retryable: this.isRetryableError(error),
        timestamp: new Date(),
        responseTime,
      };

      // Return fallback response
      return {
        response: this.getFallbackResponse(message, chatError.type),
        error: chatError,
        responseTime,
      };
    }
  }

  /**
   * Categorize errors for better handling
   */
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

  /**
   * Determine if error is retryable
   */
  private isRetryableError(error: any): boolean {
    const message = error.message?.toLowerCase() || "";

    // Retryable errors
    if (
      message.includes("timeout") ||
      message.includes("server error") ||
      message.includes("network") ||
      message.includes("rate limit")
    ) {
      return true;
    }

    // Non-retryable errors
    if (
      message.includes("missing") ||
      message.includes("invalid") ||
      message.includes("unauthorized")
    ) {
      return false;
    }

    return true; // Default to retryable
  }

  /**
   * Enhanced fallback responses based on error type
   */
  private getFallbackResponse(
    userMessage: string,
    errorType: ChatServiceError["type"],
  ): string {
    const lowerMessage = userMessage.toLowerCase();

    // Context-aware fallbacks
    if (lowerMessage.includes("budget") || lowerMessage.includes("pricing")) {
      return "For specific pricing discussions, our team needs to understand your requirements better. Please use our contact page to connect directly.";
    }

    if (lowerMessage.includes("technical") || lowerMessage.includes("how")) {
      return "That's an excellent technical question. Our implementation approach varies based on your specific infrastructure. Would you like to connect with our technical team?";
    }

    // Error-type specific fallbacks
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

  /**
   * Health check with detailed diagnostics
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    responseTime: number;
    metrics: PerformanceMetrics;
  }> {
    const startTime = Date.now();

    try {
      const response = await this.makeAPIRequest({
        message: "health_check",
        sessionId: "health_check_session",
      });

      const responseTime = Date.now() - startTime;

      return {
        healthy: true,
        responseTime,
        metrics: { ...this.metrics },
      };
    } catch (error) {
      console.error("Health check failed:", error);

      return {
        healthy: false,
        responseTime: Date.now() - startTime,
        metrics: { ...this.metrics },
      };
    }
  }

  /**
   * Get performance analytics
   */
  getPerformanceAnalytics() {
    return {
      ...this.metrics,
      responseTimeDistribution: {
        under1s: this.responseTimeHistory.filter((t) => t < 1000).length,
        under2s: this.responseTimeHistory.filter((t) => t < 2000).length,
        under5s: this.responseTimeHistory.filter((t) => t < 5000).length,
        over5s: this.responseTimeHistory.filter((t) => t >= 5000).length,
      },
      recommendations: this.getPerformanceRecommendations(),
    };
  }

  /**
   * Performance improvement recommendations
   */
  private getPerformanceRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.metrics.averageResponseTime > 3000) {
      recommendations.push(
        "Response time is above target - consider optimizing API performance",
      );
    }

    if (this.metrics.errorRate > 5) {
      recommendations.push("Error rate is elevated - review API stability");
    }

    const fastResponses = this.responseTimeHistory.filter(
      (t) => t < 1000,
    ).length;
    const totalResponses = this.responseTimeHistory.length;

    if (totalResponses > 0 && fastResponses / totalResponses < 0.5) {
      recommendations.push(
        "Consider implementing response caching for common queries",
      );
    }

    return recommendations;
  }

  /**
   * Reset metrics for testing
   */
  resetMetrics() {
    this.metrics = {
      totalRequests: 0,
      averageResponseTime: 0,
      errorRate: 0,
      lastRequestTime: null,
    };
    this.responseTimeHistory = [];
  }
}

// Export singleton instance
export const enhancedNextJSChatService =
  EnhancedNextJSChatService.getInstance();
