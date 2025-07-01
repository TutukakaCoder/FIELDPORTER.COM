import type {
  ChatAnalytics,
  ConversationSummary,
  FirebaseError,
  FirestoreMessage,
  Message,
  OptimizedFirestoreConversation,
} from "@/types/chat";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const CONVERSATIONS_COLLECTION = "conversations_v2";
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 1000;

const LEAD_SCORE_KEYWORDS = {
  "ai strategy": 3,
  enterprise: 2,
  automation: 2,
  consulting: 2,
  roi: 3,
  budget: 3,
  timeline: 2,
  urgent: 2,
};

interface OptimizedChatSession {
  sessionId: string;
  userId?: string;
  email?: string;
  phone?: string;
  leadScore: number;
  totalMessages: number;
  messages: Array<{
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Timestamp;
    leadScore?: number;
    metadata?: Record<string, any>;
  }>;
  analytics: {
    firstMessageAt: Timestamp;
    lastActiveAt: Timestamp;
    responseTimeMs: number[];
    deviceType: "mobile" | "desktop";
    conversationSource: string;
    emailCollected: boolean;
    phoneCollected: boolean;
    notificationSent: boolean;
    conversionEvents: string[];
  };
  qualification: {
    currentScore: number;
    maxScore: number;
    signals: string[];
    qualification:
      | "unqualified"
      | "browsing"
      | "interested"
      | "qualified"
      | "hot";
    lastUpdated: Timestamp;
  };
}

export class OptimizedFirebaseChatService {
  private conversationId: string | null = null;
  private isOnline: boolean = true;
  private retryQueue: Array<() => Promise<unknown>> = [];
  private conversationCache: Map<string, OptimizedFirestoreConversation> =
    new Map();
  private readonly COLLECTION_NAME = "chat_sessions";
  private readonly MAX_MESSAGES_PER_SESSION = 50;

  constructor(sessionId: string) {
    this.conversationId = sessionId;
    this.setupConnectionMonitoring();
  }

  private setupConnectionMonitoring(): void {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => {
        this.isOnline = true;
        this.processRetryQueue();
      });
      window.addEventListener("offline", () => {
        this.isOnline = false;
      });
    }
  }

  private async processRetryQueue(): Promise<void> {
    while (this.retryQueue.length > 0 && this.isOnline) {
      const operation = this.retryQueue.shift();
      if (operation) {
        try {
          await operation();
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error processing retry queue:", error);
          }
        }
      }
    }
  }

  private async withRetry<T>(
    operation: () => Promise<T>,
    operationName: string,
    sessionId?: string,
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (process.env.NODE_ENV === "development") {
          console.error(`${operationName} attempt ${attempt} failed:`, error);
        }

        if (attempt < RETRY_ATTEMPTS) {
          const delay = RETRY_DELAY_BASE * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    if (!this.isOnline) {
      this.retryQueue.push(operation);
    }

    const firebaseError: FirebaseError = {
      code: (lastError as any)?.code || "unknown",
      message: lastError?.message || "Unknown error",
      timestamp: new Date(),
      operation: operationName,
      sessionId,
    };

    throw firebaseError;
  }

  async createConversation(sessionId: string): Promise<void> {
    await this.withRetry(
      async () => {
        const conversationRef = doc(db, CONVERSATIONS_COLLECTION, sessionId);
        const now = Timestamp.now();

        const conversationData: OptimizedFirestoreConversation = {
          created_at: now,
          last_active: now,
          messages: [],
          metadata: {
            messages_count: 0,
            email: null,
            lead_score: 1,
            service_interest: [],
            consultation_requested: false,
            status: "active",
          },
          analytics: {
            user_message_count: 0,
            assistant_message_count: 0,
            session_duration_ms: 0,
            last_lead_score_update: now,
            urgency_score: 0,
          },
        };

        await setDoc(conversationRef, conversationData);
        this.conversationCache.set(sessionId, conversationData);
        this.conversationId = sessionId;
      },
      "createConversation",
      sessionId,
    );
  }

  async saveMessage(sessionId: string, message: Message): Promise<void> {
    await this.withRetry(
      async () => {
        const conversationRef = doc(db, CONVERSATIONS_COLLECTION, sessionId);

        const conversationSnap = await getDoc(conversationRef);
        if (!conversationSnap.exists()) {
          throw new Error(
            "Conversation does not exist. Create conversation before saving messages.",
          );
        }

        const firestoreMessage: FirestoreMessage = {
          role: message.role,
          content: message.content,
          timestamp: Timestamp.fromDate(message.timestamp),
          message_id: message.id,
        };

        const now = Timestamp.now();

        await updateDoc(conversationRef, {
          messages: arrayUnion(firestoreMessage),
          last_active: now,
          "metadata.messages_count": increment(1),
          [`analytics.${message.role}_message_count`]: increment(1),
        });

        const cachedConversation = this.conversationCache.get(sessionId);
        if (cachedConversation) {
          cachedConversation.messages.push(firestoreMessage);
          cachedConversation.metadata.messages_count++;
          cachedConversation.last_active = now;
          if (message.role === "user") {
            cachedConversation.analytics.user_message_count++;
          } else if (message.role === "assistant") {
            cachedConversation.analytics.assistant_message_count++;
          }
        }
      },
      "saveMessage",
      sessionId,
    );
  }

  async getConversationHistory(sessionId: string): Promise<Message[]> {
    return await this.withRetry(
      async () => {
        const cachedConversation = this.conversationCache.get(sessionId);
        if (cachedConversation && cachedConversation.messages.length > 0) {
          return this.convertFirestoreMessagesToMessages(
            cachedConversation.messages,
          );
        }

        const conversationRef = doc(db, CONVERSATIONS_COLLECTION, sessionId);
        const conversationSnap = await getDoc(conversationRef);

        if (!conversationSnap.exists()) {
          return [];
        }

        const data = conversationSnap.data() as OptimizedFirestoreConversation;
        this.conversationCache.set(sessionId, data);

        return this.convertFirestoreMessagesToMessages(data.messages || []);
      },
      "getConversationHistory",
      sessionId,
    );
  }

  private convertFirestoreMessagesToMessages(
    firestoreMessages: FirestoreMessage[],
  ): Message[] {
    return firestoreMessages
      .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
      .map((data, index) => ({
        id: data.message_id || `msg_${index}`,
        content: data.content,
        role: data.role,
        timestamp: data.timestamp.toDate(),
        status: "sent" as const,
        message_id: data.message_id,
      }));
  }

  async updateConversationMetadata(
    sessionId: string,
    metadata: Partial<OptimizedFirestoreConversation["metadata"]>,
  ): Promise<void> {
    await this.withRetry(
      async () => {
        const conversationRef = doc(db, CONVERSATIONS_COLLECTION, sessionId);

        const updates: Record<string, any> = {
          last_active: Timestamp.now(),
        };

        Object.entries(metadata).forEach(([key, value]) => {
          updates[`metadata.${key}`] = value;
        });

        await updateDoc(conversationRef, updates);

        const cachedConversation = this.conversationCache.get(sessionId);
        if (cachedConversation) {
          Object.assign(cachedConversation.metadata, metadata);
          cachedConversation.last_active = Timestamp.now();
        }
      },
      "updateConversationMetadata",
      sessionId,
    );
  }

  async calculateLeadScore(sessionId: string): Promise<number> {
    return await this.withRetry(
      async () => {
        let conversation = this.conversationCache.get(sessionId);

        if (!conversation) {
          const conversationRef = doc(db, CONVERSATIONS_COLLECTION, sessionId);
          const conversationSnap = await getDoc(conversationRef);

          if (!conversationSnap.exists()) {
            return 1;
          }

          conversation =
            conversationSnap.data() as OptimizedFirestoreConversation;
          this.conversationCache.set(sessionId, conversation);
        }

        let score = 1;

        score += Math.min(conversation.metadata.messages_count * 0.5, 3);

        if (conversation.metadata.email) score += 3;

        score += conversation.metadata.service_interest.length * 2;

        if (conversation.metadata.consultation_requested) score += 5;

        conversation.messages.forEach((message) => {
          if (message.role === "user") {
            const content = message.content.toLowerCase();
            Object.entries(LEAD_SCORE_KEYWORDS).forEach(([keyword, points]) => {
              if (content.includes(keyword)) {
                score += points * 0.5;
              }
            });
          }
        });

        const finalScore = Math.min(Math.round(score), 10);

        await this.updateConversationMetadata(sessionId, {
          lead_score: finalScore,
        });

        return finalScore;
      },
      "calculateLeadScore",
      sessionId,
    );
  }

  async setUserEmail(sessionId: string, email: string): Promise<void> {
    await this.withRetry(
      async () => {
        const currentScore = await this.calculateLeadScore(sessionId);

        await this.updateConversationMetadata(sessionId, {
          email,
          lead_score: Math.min(currentScore + 3, 10),
        });
      },
      "setUserEmail",
      sessionId,
    );
  }

  async getActiveConversations(): Promise<ConversationSummary[]> {
    return await this.withRetry(async () => {
      const conversationsRef = collection(db, CONVERSATIONS_COLLECTION);
      const activeQuery = query(
        conversationsRef,
        where("metadata.status", "in", ["active", "qualified"]),
        orderBy("last_active", "desc"),
        limit(50),
      );

      const snapshot = await getDocs(activeQuery);
      return snapshot.docs.map((doc) => {
        const data = doc.data() as OptimizedFirestoreConversation;
        const sessionDuration =
          data.last_active.toMillis() - data.created_at.toMillis();

        return {
          sessionId: doc.id,
          created_at: data.created_at.toDate(),
          last_active: data.last_active.toDate(),
          messages_count: data.metadata.messages_count,
          email: data.metadata.email,
          lead_score: data.metadata.lead_score,
          service_interest: data.metadata.service_interest,
          consultation_requested: data.metadata.consultation_requested,
          status: data.metadata.status,
          session_duration_minutes: Math.round(sessionDuration / (1000 * 60)),
        };
      });
    }, "getActiveConversations");
  }

  async getDailyStats(): Promise<ChatAnalytics> {
    return await this.withRetry(async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = Timestamp.fromDate(today);

      const conversationsRef = collection(db, CONVERSATIONS_COLLECTION);
      const todayQuery = query(
        conversationsRef,
        where("created_at", ">=", todayTimestamp),
      );

      const snapshot = await getDocs(todayQuery);
      const conversations = snapshot.docs.map(
        (doc) => doc.data() as OptimizedFirestoreConversation,
      );

      const totalConversations = conversations.length;
      const activeConversations = conversations.filter(
        (c) => c.metadata.status === "active",
      ).length;
      const conversationsWithEmail = conversations.filter(
        (c) => c.metadata.email,
      ).length;
      const consultationRequests = conversations.filter(
        (c) => c.metadata.consultation_requested,
      ).length;

      const totalMessages = conversations.reduce(
        (sum, c) => sum + c.metadata.messages_count,
        0,
      );
      const averageMessages =
        totalConversations > 0 ? totalMessages / totalConversations : 0;

      const totalLeadScore = conversations.reduce(
        (sum, c) => sum + c.metadata.lead_score,
        0,
      );
      const averageLeadScore =
        totalConversations > 0 ? totalLeadScore / totalConversations : 0;

      const serviceInterestMap = new Map<string, number>();
      conversations.forEach((c) => {
        c.metadata.service_interest.forEach((service) => {
          serviceInterestMap.set(
            service,
            (serviceInterestMap.get(service) || 0) + 1,
          );
        });
      });

      const topServiceInterests = Array.from(serviceInterestMap.entries())
        .map(([service, count]) => ({ service, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return {
        total_conversations: totalConversations,
        active_conversations: activeConversations,
        email_capture_rate:
          totalConversations > 0
            ? (conversationsWithEmail / totalConversations) * 100
            : 0,
        consultation_requests: consultationRequests,
        average_messages_per_conversation:
          Math.round(averageMessages * 10) / 10,
        average_lead_score: Math.round(averageLeadScore * 10) / 10,
        top_service_interests: topServiceInterests,
        conversion_funnel: {
          visitors: totalConversations,
          engaged: conversations.filter((c) => c.metadata.messages_count > 3)
            .length,
          qualified: conversationsWithEmail,
          consultation_requested: consultationRequests,
        },
      };
    }, "getDailyStats");
  }

  async getPerformanceMetrics(sessionId: string): Promise<{
    operationCount: number;
    estimatedCostReduction: number;
    queryTime: number;
  }> {
    const startTime = Date.now();

    await this.getConversationHistory(sessionId);

    const queryTime = Date.now() - startTime;

    const conversation = this.conversationCache.get(sessionId);
    const messageCount = conversation?.metadata.messages_count || 0;

    const oldOperationCount = 1 + messageCount + messageCount * 2;
    const newOperationCount = 1 + messageCount;

    const operationReduction = oldOperationCount - newOperationCount;
    const costReduction = (operationReduction / oldOperationCount) * 100;

    return {
      operationCount: newOperationCount,
      estimatedCostReduction: Math.round(costReduction),
      queryTime,
    };
  }

  clearCache(): void {
    this.conversationCache.clear();
  }

  isOnlineStatus(): boolean {
    return this.isOnline;
  }

  getRetryQueueLength(): number {
    return this.retryQueue.length;
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.conversationCache.size,
      keys: Array.from(this.conversationCache.keys()),
    };
  }

  async createOrUpdateSession(
    sessionId: string,
    message: Message,
    leadScore: number = 1,
    metadata: Record<string, any> = {},
  ): Promise<void> {
    try {
      const sessionRef = doc(db, this.COLLECTION_NAME, sessionId);
      const sessionSnap = await getDoc(sessionRef);

      const messageData: {
        id: string;
        role: "user" | "assistant" | "system";
        content: string;
        timestamp: Timestamp;
        leadScore?: number;
        metadata?: Record<string, any>;
      } = {
        id: message.id,
        role: message.role,
        content: message.content,
        timestamp: Timestamp.now(),
        ...(message.role === "user" ? { leadScore } : {}),
        ...(message.role === "user" ? { metadata } : {}),
      };

      if (!sessionSnap.exists()) {
        // Create new session
        const newSession: OptimizedChatSession = {
          sessionId,
          email: metadata["email"] || undefined,
          phone: metadata["phone"] || undefined,
          leadScore,
          totalMessages: 1,
          messages: [messageData],
          analytics: {
            firstMessageAt: Timestamp.now(),
            lastActiveAt: Timestamp.now(),
            responseTimeMs: [],
            deviceType: metadata["deviceType"] || "desktop",
            conversationSource: metadata["source"] || "chat_widget",
            emailCollected: !!metadata["email"],
            phoneCollected: !!metadata["phone"],
            notificationSent: false,
            conversionEvents: [],
          },
          qualification: {
            currentScore: leadScore,
            maxScore: leadScore,
            signals: metadata["qualificationSignals"] || [],
            qualification: this.getQualificationLevel(leadScore),
            lastUpdated: Timestamp.now(),
          },
        };

        await setDoc(sessionRef, newSession);
      } else {
        // Update existing session
        const updateData: any = {
          totalMessages: increment(1),
          messages: arrayUnion(messageData),
          "analytics.lastActiveAt": serverTimestamp(),
          "qualification.lastUpdated": serverTimestamp(),
        };

        // Update lead score if higher
        const sessionData = sessionSnap.data();
        if (
          sessionData &&
          leadScore > (sessionData["qualification"]?.["currentScore"] || 0)
        ) {
          updateData.leadScore = leadScore;
          updateData["qualification.currentScore"] = leadScore;
          updateData["qualification.maxScore"] = Math.max(
            leadScore,
            sessionData["qualification"]?.["maxScore"] || 0,
          );
          updateData["qualification.qualification"] =
            this.getQualificationLevel(leadScore);
        }

        // Update contact info if provided
        if (sessionData && metadata["email"] && !sessionData["email"]) {
          updateData.email = metadata["email"];
          updateData["analytics.emailCollected"] = true;
        }

        if (sessionData && metadata["phone"] && !sessionData["phone"]) {
          updateData.phone = metadata["phone"];
          updateData["analytics.phoneCollected"] = true;
        }

        // Add response time if provided
        if (metadata["responseTime"]) {
          updateData["analytics.responseTimeMs"] = arrayUnion(
            metadata["responseTime"],
          );
        }

        // Track qualification signals
        if (sessionData && metadata["qualificationSignals"]?.length > 0) {
          const existingSignals =
            sessionData["qualification"]?.["signals"] || [];
          const newSignals = [
            ...existingSignals,
            ...metadata["qualificationSignals"],
          ];
          updateData["qualification.signals"] = [...new Set(newSignals)]; // Remove duplicates
        }

        await updateDoc(sessionRef, updateData);
      }
    } catch (error) {
      console.error("Failed to save chat session:", error);
      // Don't throw - chat should continue even if Firebase fails
    }
  }

  async getSession(sessionId: string): Promise<OptimizedChatSession | null> {
    try {
      const sessionRef = doc(db, this.COLLECTION_NAME, sessionId);
      const sessionSnap = await getDoc(sessionRef);

      if (sessionSnap.exists()) {
        return sessionSnap.data() as OptimizedChatSession;
      }

      return null;
    } catch (error) {
      console.error("Failed to get chat session:", error);
      return null;
    }
  }

  async markNotificationSent(sessionId: string): Promise<void> {
    try {
      const sessionRef = doc(db, this.COLLECTION_NAME, sessionId);
      await updateDoc(sessionRef, {
        "analytics.notificationSent": true,
        "analytics.conversionEvents": arrayUnion("notification_sent"),
      });
    } catch (error) {
      console.error("Failed to mark notification sent:", error);
    }
  }

  async trackConversionEvent(
    sessionId: string,
    eventType: string,
  ): Promise<void> {
    try {
      const sessionRef = doc(db, this.COLLECTION_NAME, sessionId);
      await updateDoc(sessionRef, {
        "analytics.conversionEvents": arrayUnion(eventType),
        "analytics.lastActiveAt": serverTimestamp(),
      });
    } catch (error) {
      console.error("Failed to track conversion event:", error);
    }
  }

  private getQualificationLevel(
    score: number,
  ): OptimizedChatSession["qualification"]["qualification"] {
    if (score >= 15) return "hot";
    if (score >= 10) return "qualified";
    if (score >= 7) return "interested";
    if (score >= 3) return "browsing";
    return "unqualified";
  }

  // Analytics methods
  async getSessionAnalytics(): Promise<{
    totalSessions: number;
    activeSessions: number;
    emailCaptureRate: number;
    qualificationRate: number;
    averageLeadScore: number;
  }> {
    // This would typically use Firebase Functions or server-side aggregation
    // For now, return placeholder data
    return {
      totalSessions: 0,
      activeSessions: 0,
      emailCaptureRate: 0,
      qualificationRate: 0,
      averageLeadScore: 0,
    };
  }
}
