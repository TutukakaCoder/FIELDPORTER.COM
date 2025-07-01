"use client";

import { OptimizedFirebaseChatService } from "@/lib/optimized-firebase-chat-service";
import type { ConversationData, Message } from "@/types/chat";

interface MessageValidation {
  isValid: boolean;
  error?: string;
}

const STORAGE_KEY = "fieldporter-chat-conversation";
const SESSION_KEY = "fieldporter-chat-session";
const MAX_USER_MESSAGE_LENGTH = 1000;
const MAX_AI_MESSAGE_LENGTH = 4000;
const STORAGE_EXPIRY_HOURS = 24;

export class MessageManager {
  private messages: Message[] = [];
  private userEmail?: string | undefined;
  private sessionId: string;
  private lastActivity: Date;
  private firebaseService: OptimizedFirebaseChatService;
  private isFirebaseEnabled: boolean = false;
  private leadScore: number = 1;
  private serviceInterest: string[] = [];
  private consultationRequested: boolean = false;
  private conversationStarted: boolean = false;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.lastActivity = new Date();
    this.clearPreviousSession();
    this.firebaseService = new OptimizedFirebaseChatService(this.sessionId);
    this.initializeManager();
  }

  private async initializeManager(): Promise<void> {
    try {
      this.loadFromStorage();
      await this.initializeFirebase();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error initializing message manager:", error);
      }
      this.isFirebaseEnabled = false;
    }
  }

  private async initializeFirebase(): Promise<void> {
    try {
      const messages = await this.firebaseService.getConversationHistory(
        this.sessionId,
      );
      if (messages.length > 0) {
        if (
          this.messages.length === 0 ||
          messages.length > this.messages.length
        ) {
          this.messages = messages;
          this.saveToStorage();
        }
        this.isFirebaseEnabled = true;
        this.conversationStarted = true;
      } else {
        this.isFirebaseEnabled = true;
        this.conversationStarted = false;
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "Firebase initialization failed, using localStorage only:",
          error,
        );
      }
      this.isFirebaseEnabled = false;
      this.conversationStarted = false;
    }
  }

  private getOrCreateSessionId(): string {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        const existingSessionId = sessionStorage.getItem(SESSION_KEY);
        if (existingSessionId) {
          const stored = sessionStorage.getItem(STORAGE_KEY);
          if (stored) {
            const data: ConversationData = JSON.parse(stored);
            const expiryTime = new Date(data.lastActivity);
            expiryTime.setHours(expiryTime.getHours() + STORAGE_EXPIRY_HOURS);

            if (new Date() <= expiryTime) {
              return existingSessionId;
            } else {
              sessionStorage.removeItem(STORAGE_KEY);
              sessionStorage.removeItem(SESSION_KEY);
            }
          }
        }
      }

      if (typeof window !== "undefined" && window.localStorage) {
        const persistentSessionId = localStorage.getItem(
          "fieldporter-session-id",
        );
        const persistentTimestamp = localStorage.getItem(
          "fieldporter-session-timestamp",
        );

        if (persistentSessionId && persistentTimestamp) {
          const sessionAge = Date.now() - parseInt(persistentTimestamp);
          const twentyFourHours = 24 * 60 * 60 * 1000;

          if (sessionAge < twentyFourHours) {
            if (window.sessionStorage) {
              sessionStorage.setItem(SESSION_KEY, persistentSessionId);
            }
            return persistentSessionId;
          } else {
            localStorage.removeItem("fieldporter-session-id");
            localStorage.removeItem("fieldporter-session-timestamp");
          }
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error checking existing session:", error);
      }
    }

    return this.generateSessionId();
  }

  private generateSessionId(): string {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      if (typeof window !== "undefined") {
        if (window.sessionStorage) {
          sessionStorage.setItem(SESSION_KEY, newSessionId);
        }
        if (window.localStorage) {
          localStorage.setItem("fieldporter-session-id", newSessionId);
          localStorage.setItem(
            "fieldporter-session-timestamp",
            Date.now().toString(),
          );
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error storing new session ID:", error);
      }
    }

    return newSessionId;
  }

  private containsScriptContent(content: string): boolean {
    const scriptPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /eval\s*\(/gi,
      /document\.(write|writeln|createElement)/gi,
    ];

    return scriptPatterns.some((pattern) => pattern.test(content));
  }

  private async addMessageToFirebase(message: Message): Promise<void> {
    try {
      if (!this.conversationStarted && message.role === "user") {
        await this.firebaseService.createConversation(this.sessionId);
        this.conversationStarted = true;
      }

      await this.firebaseService.saveMessage(this.sessionId, message);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error adding message to Firebase:", error);
      }
    }
  }

  private validateMessage(
    content: string,
    type: "user" | "assistant",
  ): MessageValidation {
    if (!content.trim()) {
      return { isValid: false, error: "Message cannot be empty" };
    }

    const maxLength =
      type === "user" ? MAX_USER_MESSAGE_LENGTH : MAX_AI_MESSAGE_LENGTH;
    if (content.length > maxLength) {
      if (type === "user") {
        return {
          isValid: false,
          error: `Message too long (${content.length}/${maxLength} characters)`,
        };
      }
    }

    if (this.containsScriptContent(content)) {
      return { isValid: false, error: "Invalid content detected" };
    }

    return { isValid: true };
  }

  async addMessage(
    content: string,
    type: "user" | "assistant",
    email?: string,
  ): Promise<Message> {
    try {
      if (type === "assistant" && content.length > MAX_AI_MESSAGE_LENGTH) {
        content = content.substring(0, MAX_AI_MESSAGE_LENGTH) + "...";
      }

      if (type === "user" && content.length > MAX_USER_MESSAGE_LENGTH) {
        throw new Error(
          `Message too long (${content.length}/${MAX_USER_MESSAGE_LENGTH} characters)`,
        );
      }

      const validation = this.validateMessage(content, type);
      if (!validation.isValid) {
        throw new Error(validation.error || "Message validation failed");
      }

      const message: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content: content.trim(),
        role: type,
        timestamp: new Date(),
        status: type === "user" ? "sending" : "sent",
      };

      this.messages.push(message);
      this.lastActivity = new Date();

      this.saveToStorage();

      if (this.isFirebaseEnabled) {
        try {
          await this.addMessageToFirebase(message);
          message.status = "sent";
        } catch (error) {
          message.status = "failed";
          if (process.env.NODE_ENV === "development") {
            console.error("Firebase save failed:", error);
          }
        }
      }

      return message;
    } catch (error) {
      console.error("Error in addMessage:", error);
      throw error;
    }
  }

  updateMessageStatus(
    messageId: string,
    status: "sending" | "sent" | "failed",
  ): void {
    const message = this.messages.find((m) => m.id === messageId);
    if (message) {
      message.status = status;
      this.saveToStorage();
    }
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  async setUserEmail(email: string): Promise<void> {
    if (this.isValidEmail(email)) {
      this.userEmail = email;
      this.saveToStorage();

      if (this.isFirebaseEnabled) {
        try {
          await this.firebaseService.setUserEmail(this.sessionId, email);
          this.leadScore = await this.firebaseService.calculateLeadScore(
            this.sessionId,
          );
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error updating email in Firebase:", error);
          }
        }
      }
    }
  }

  getUserEmail(): string | undefined {
    return this.userEmail;
  }

  async markConsultationRequested(): Promise<void> {
    this.consultationRequested = true;
    this.saveToStorage();

    if (this.isFirebaseEnabled) {
      try {
        await this.firebaseService.updateConversationMetadata(this.sessionId, {
          consultation_requested: true,
        });
        this.leadScore = await this.firebaseService.calculateLeadScore(
          this.sessionId,
        );
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error marking consultation in Firebase:", error);
        }
      }
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearConversation(): void {
    this.messages = [];
    this.userEmail = undefined;
    this.lastActivity = new Date();
    this.leadScore = 1;
    this.serviceInterest = [];
    this.consultationRequested = false;

    // Clear storage and generate new session
    try {
      if (typeof window !== "undefined") {
        if (window.sessionStorage) {
          sessionStorage.removeItem(STORAGE_KEY);
          sessionStorage.removeItem(SESSION_KEY);
        }
        if (window.localStorage) {
          localStorage.removeItem("fieldporter-session-id");
          localStorage.removeItem("fieldporter-session-timestamp");
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error clearing storage:", error);
      }
    }

    // Generate new session ID for fresh start
    this.sessionId = this.generateSessionId();
    this.saveToStorage();
  }

  getConversationSummary() {
    return {
      messageCount: this.messages.length,
      userMessageCount: this.messages.filter((m) => m.role === "user").length,
      assistantMessageCount: this.messages.filter((m) => m.role === "assistant")
        .length,
      hasEmail: !!this.userEmail,
      sessionDuration:
        Date.now() - new Date(this.sessionId.split("_")[1] || "0").getTime(),
      lastActivity: this.lastActivity,
      leadScore: this.leadScore,
      serviceInterest: this.serviceInterest,
      consultationRequested: this.consultationRequested,
      isFirebaseEnabled: this.isFirebaseEnabled,
    };
  }

  private saveToStorage(): void {
    try {
      const data: ConversationData = {
        messages: this.messages,
        userEmail: this.userEmail,
        lastActivity: this.lastActivity,
        sessionId: this.sessionId,
        leadScore: this.leadScore,
        serviceInterest: this.serviceInterest,
        consultationRequested: this.consultationRequested,
      };

      if (typeof window !== "undefined") {
        // Save to sessionStorage for current session
        if (window.sessionStorage) {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          sessionStorage.setItem(SESSION_KEY, this.sessionId);
        }

        // Update localStorage timestamp to extend session persistence
        if (window.localStorage) {
          localStorage.setItem("fieldporter-session-id", this.sessionId);
          localStorage.setItem(
            "fieldporter-session-timestamp",
            Date.now().toString(),
          );
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error saving conversation:", error);
      }
    }
  }

  private loadFromStorage(): void {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        const storedSessionId = sessionStorage.getItem(SESSION_KEY);

        if (stored && storedSessionId === this.sessionId) {
          const data: ConversationData = JSON.parse(stored);

          // Check if session has expired
          const expiryTime = new Date(data.lastActivity);
          expiryTime.setHours(expiryTime.getHours() + STORAGE_EXPIRY_HOURS);

          if (new Date() > expiryTime) {
            // Session expired, clean up
            sessionStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem(SESSION_KEY);
            if (window.localStorage) {
              localStorage.removeItem("fieldporter-session-id");
              localStorage.removeItem("fieldporter-session-timestamp");
            }
            return;
          }

          // Load conversation data
          if (data.sessionId === this.sessionId) {
            this.messages = data.messages.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }));
            this.userEmail = data.userEmail;
            this.lastActivity = new Date(data.lastActivity);
            this.leadScore = data.leadScore || 1;
            this.serviceInterest = data.serviceInterest || [];
            this.consultationRequested = data.consultationRequested || false;

            if (process.env.NODE_ENV === "development") {
              // Development logging removed for production compliance
            }
          }
        } else if (stored && !storedSessionId) {
          // Clean up orphaned data
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error loading conversation from sessionStorage:", error);
      }
      // Clean up corrupted data
      if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
  }

  private clearPreviousSession(): void {
    // Clear any old localStorage data
    try {
      if (typeof window !== "undefined") {
        if (window.localStorage) {
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("fieldporter-chat-")) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach((key) => localStorage.removeItem(key));
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error clearing old storage data:", error);
      }
    }
  }

  shouldShowEmailPrompt(): boolean {
    return (
      !this.userEmail &&
      this.messages.filter((m) => m.role === "user").length >= 3
    );
  }

  getFailedMessages(): Message[] {
    return this.messages.filter((m) => m.status === "failed");
  }

  retryMessage(messageId: string): Message | null {
    const message = this.messages.find((m) => m.id === messageId);
    if (message && message.status === "failed") {
      message.status = "sending";
      this.saveToStorage();
      return message;
    }
    return null;
  }

  getCurrentLeadScore(): number {
    return this.leadScore;
  }

  getCurrentServiceInterests(): string[] {
    return [...this.serviceInterest];
  }

  isConsultationRequested(): boolean {
    return this.consultationRequested;
  }

  isFirebaseConnected(): boolean {
    return this.isFirebaseEnabled && this.firebaseService.isOnlineStatus();
  }

  getSessionId(): string {
    return this.sessionId;
  }

  async getPerformanceMetrics(): Promise<{
    queryTime?: number;
    estimatedCostReduction?: number;
    operationCount?: number;
  }> {
    try {
      const metrics = await this.firebaseService.getPerformanceMetrics(
        this.sessionId,
      );
      return {
        queryTime: metrics.queryTime,
        estimatedCostReduction: metrics.estimatedCostReduction,
        operationCount: metrics.operationCount,
      };
    } catch (error) {
      console.error("Failed to get performance metrics:", error);
      return {
        queryTime: 0,
        estimatedCostReduction: 0,
      };
    }
  }
}
