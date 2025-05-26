/**
 * N8N Chat Service for FIELDPORTER
 * Handles communication with n8n workflow for AI chat responses
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface N8NChatRequest {
  message: string;
  sessionId: string;
  userEmail?: string;
  conversationHistory?: ChatMessage[];
}

export interface N8NChatResponse {
  success: boolean;
  response: string;
  sessionId: string;
  leadScore: number;
  leadQuality: 'low' | 'medium' | 'high';
  timestamp: string;
  error?: string;
  testMode?: boolean;
}

export interface N8NChatConfig {
  webhookUrl: string;
  timeout?: number;
  retries?: number;
  testMode?: boolean;
}

export class N8NChatService {
  private config: N8NChatConfig;
  private requestCount: Map<string, number> = new Map();
  private lastRequestTime: Map<string, number> = new Map();

  constructor(config: N8NChatConfig) {
    this.config = {
      timeout: 10000, // 10 seconds default
      retries: 2,
      testMode: false,
      ...config,
    };
  }

  /**
   * Send a chat message to the n8n workflow
   */
  async sendMessage(request: N8NChatRequest): Promise<N8NChatResponse> {
    // Rate limiting check
    if (!this.checkRateLimit(request.sessionId)) {
      throw new Error('Rate limit exceeded. Please wait before sending another message.');
    }

    // Validate request
    this.validateRequest(request);

    // Prepare conversation history (last 5 messages)
    const conversationHistory = this.prepareConversationHistory(request.conversationHistory);

    const payload = {
      message: request.message,
      sessionId: request.sessionId,
      userEmail: request.userEmail,
      conversationHistory,
    };

    try {
      const response = await this.makeRequest(payload);

      // Update rate limiting
      this.updateRateLimit(request.sessionId);

      return response;
    } catch (error) {
      console.error('N8N Chat Service Error:', error);

      // Return fallback response
      return this.getFallbackResponse(request.sessionId);
    }
  }

  /**
   * Make HTTP request to n8n webhook
   */
  private async makeRequest(payload: any): Promise<N8NChatResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Validate response structure
      if (!this.isValidResponse(data)) {
        throw new Error('Invalid response format from n8n workflow');
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }

      throw error;
    }
  }

  /**
   * Validate incoming request
   */
  private validateRequest(request: N8NChatRequest): void {
    if (!request.message || request.message.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }

    if (!request.sessionId) {
      throw new Error('Session ID is required');
    }

    if (request.message.length > 1000) {
      throw new Error('Message too long (max 1000 characters)');
    }

    // Basic content filtering
    const suspiciousPatterns = [/<script/i, /javascript:/i, /on\w+\s*=/i];

    if (suspiciousPatterns.some(pattern => pattern.test(request.message))) {
      throw new Error('Invalid message content');
    }
  }

  /**
   * Prepare conversation history for n8n workflow
   */
  private prepareConversationHistory(history?: ChatMessage[]): ChatMessage[] {
    if (!history || history.length === 0) {
      return [];
    }

    // Take last 5 messages for context
    const recentHistory = history.slice(-5);

    // Ensure proper format
    return recentHistory.map(msg => ({
      role: msg.role,
      content: msg.content.substring(0, 500), // Limit content length
      timestamp: msg.timestamp || new Date().toISOString(),
    }));
  }

  /**
   * Validate n8n response structure
   */
  private isValidResponse(data: any): data is N8NChatResponse {
    return (
      typeof data === 'object' &&
      typeof data.success === 'boolean' &&
      typeof data.response === 'string' &&
      typeof data.sessionId === 'string' &&
      typeof data.timestamp === 'string'
    );
  }

  /**
   * Check rate limiting for session
   */
  private checkRateLimit(sessionId: string): boolean {
    const now = Date.now();
    const lastRequest = this.lastRequestTime.get(sessionId) || 0;
    const requestCount = this.requestCount.get(sessionId) || 0;

    // Reset count if more than 1 hour has passed
    if (now - lastRequest > 3600000) {
      // 1 hour
      this.requestCount.set(sessionId, 0);
      return true;
    }

    // Allow max 20 requests per hour per session
    return requestCount < 20;
  }

  /**
   * Update rate limiting counters
   */
  private updateRateLimit(sessionId: string): void {
    const now = Date.now();
    const currentCount = this.requestCount.get(sessionId) || 0;

    this.requestCount.set(sessionId, currentCount + 1);
    this.lastRequestTime.set(sessionId, now);
  }

  /**
   * Get fallback response when n8n is unavailable
   */
  private getFallbackResponse(sessionId: string): N8NChatResponse {
    const fallbackResponses = [
      "I apologize, but I'm experiencing technical difficulties at the moment. Please try again in a few moments, or feel free to contact us directly for immediate assistance with your AI strategy needs.",
      'Thank you for your patience. Our AI system is temporarily unavailable. In the meantime, you can reach out to our team directly to discuss your business automation requirements.',
      "We're currently experiencing high demand. While our AI assistant is temporarily unavailable, our human experts are ready to help you with your AI strategy consultation.",
    ];

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    return {
      success: false,
      response: randomResponse,
      sessionId,
      leadScore: 1,
      leadQuality: 'low',
      timestamp: new Date().toISOString(),
      error: 'Service temporarily unavailable',
    };
  }

  /**
   * Test the n8n connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const testRequest: N8NChatRequest = {
        message: 'Test connection',
        sessionId: 'test-connection-' + Date.now(),
      };

      const response = await this.sendMessage(testRequest);
      return response.success;
    } catch (error) {
      console.error('N8N connection test failed:', error);
      return false;
    }
  }

  /**
   * Get service status
   */
  getStatus(): {
    configured: boolean;
    webhookUrl: string;
    testMode: boolean;
    activeConnections: number;
  } {
    return {
      configured: !!this.config.webhookUrl,
      webhookUrl: this.config.webhookUrl,
      testMode: this.config.testMode || false,
      activeConnections: this.requestCount.size,
    };
  }

  /**
   * Clear rate limiting data (for testing)
   */
  clearRateLimits(): void {
    this.requestCount.clear();
    this.lastRequestTime.clear();
  }
}

// Default configuration for different environments
export const N8N_CONFIGS = {
  development: {
    webhookUrl: 'http://localhost:5678/webhook/fieldporter-chat-test',
    testMode: true,
    timeout: 5000,
  },
  staging: {
    webhookUrl: 'https://n8n-staging.fieldporter.com/webhook/fieldporter-chat',
    testMode: false,
    timeout: 8000,
  },
  production: {
    webhookUrl: 'https://n8n.fieldporter.com/webhook/fieldporter-chat',
    testMode: false,
    timeout: 10000,
  },
};

// Create service instance based on environment
export function createN8NChatService(): N8NChatService {
  const env = process.env.NODE_ENV || 'development';
  const customWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

  let config = N8N_CONFIGS[env as keyof typeof N8N_CONFIGS] || N8N_CONFIGS.development;

  // Override with custom webhook URL if provided
  if (customWebhookUrl) {
    config = {
      ...config,
      webhookUrl: customWebhookUrl,
    };
  }

  return new N8NChatService(config);
}

// Export singleton instance
export const n8nChatService = createN8NChatService();
