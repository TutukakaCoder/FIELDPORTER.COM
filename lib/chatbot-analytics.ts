export interface ChatAnalytics {
  sessionId: string;
  messageCount: number;
  responseTime: number;
  userSatisfaction?: number;
  leadScore: number;
  conversationSource: string;
  deviceType: "mobile" | "desktop";
  timestamp: Date;
}

export interface PerformanceMetrics {
  averageResponseTime: number;
  successRate: number;
  quickResponseHitRate: number;
  leadQualificationRate: number;
  conversationCompletionRate: number;
}

class ChatbotAnalyticsService {
  private metrics: ChatAnalytics[] = [];
  private readonly maxStorageSize = 1000;

  trackInteraction(analytics: Omit<ChatAnalytics, "timestamp">) {
    const fullAnalytics: ChatAnalytics = {
      ...analytics,
      timestamp: new Date(),
    };

    this.metrics.push(fullAnalytics);

    // Keep storage size manageable
    if (this.metrics.length > this.maxStorageSize) {
      this.metrics = this.metrics.slice(-this.maxStorageSize);
    }

    // Send to Firebase for permanent storage
    this.sendToFirebase(fullAnalytics);
  }

  private async sendToFirebase(analytics: ChatAnalytics) {
    try {
      // Use Firestore instead of Realtime Database
      if (typeof window !== "undefined") {
        const { db } = await import("./firebase");
        const { collection, addDoc, serverTimestamp } = await import(
          "firebase/firestore"
        );

        await addDoc(collection(db, "chatbot_analytics"), {
          ...analytics,
          timestamp: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Failed to send analytics to Firebase:", error);
    }
  }

  getPerformanceMetrics(
    timeframe: "hour" | "day" | "week" = "day",
  ): PerformanceMetrics {
    const now = new Date();
    const timeLimit = new Date();

    switch (timeframe) {
      case "hour":
        timeLimit.setHours(now.getHours() - 1);
        break;
      case "day":
        timeLimit.setDate(now.getDate() - 1);
        break;
      case "week":
        timeLimit.setDate(now.getDate() - 7);
        break;
    }

    const recentMetrics = this.metrics.filter((m) => m.timestamp > timeLimit);

    if (recentMetrics.length === 0) {
      return {
        averageResponseTime: 0,
        successRate: 100,
        quickResponseHitRate: 0,
        leadQualificationRate: 0,
        conversationCompletionRate: 0,
      };
    }

    const totalResponseTime = recentMetrics.reduce(
      (sum, m) => sum + m.responseTime,
      0,
    );
    const averageResponseTime = totalResponseTime / recentMetrics.length;

    const successfulResponses = recentMetrics.filter(
      (m) => m.responseTime < 8000,
    );
    const successRate =
      (successfulResponses.length / recentMetrics.length) * 100;

    const quickResponses = recentMetrics.filter((m) => m.responseTime < 1000);
    const quickResponseHitRate =
      (quickResponses.length / recentMetrics.length) * 100;

    const qualifiedLeads = recentMetrics.filter((m) => m.leadScore > 5);
    const leadQualificationRate =
      (qualifiedLeads.length / recentMetrics.length) * 100;

    const completedConversations = recentMetrics.filter(
      (m) => m.messageCount >= 3,
    );
    const conversationCompletionRate =
      (completedConversations.length / recentMetrics.length) * 100;

    return {
      averageResponseTime,
      successRate,
      quickResponseHitRate,
      leadQualificationRate,
      conversationCompletionRate,
    };
  }

  getResponseTimeDistribution() {
    return {
      under1s: this.metrics.filter((m) => m.responseTime < 1000).length,
      under3s: this.metrics.filter((m) => m.responseTime < 3000).length,
      under5s: this.metrics.filter((m) => m.responseTime < 5000).length,
      over5s: this.metrics.filter((m) => m.responseTime >= 5000).length,
    };
  }

  identifyOptimizationOpportunities(): string[] {
    const metrics = this.getPerformanceMetrics();
    const opportunities: string[] = [];

    if (metrics.averageResponseTime > 3000) {
      opportunities.push(
        "Response time optimization needed - consider caching common responses",
      );
    }

    if (metrics.successRate < 95) {
      opportunities.push(
        "Error rate too high - review API reliability and error handling",
      );
    }

    if (metrics.quickResponseHitRate < 20) {
      opportunities.push("Expand quick response patterns for common questions");
    }

    if (metrics.leadQualificationRate < 10) {
      opportunities.push(
        "Improve conversation flow to better identify qualified prospects",
      );
    }

    if (metrics.conversationCompletionRate < 50) {
      opportunities.push(
        "Review conversation engagement - users may be dropping off too early",
      );
    }

    return opportunities;
  }
}

export const chatbotAnalytics = new ChatbotAnalyticsService();
