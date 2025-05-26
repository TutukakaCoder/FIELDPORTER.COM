'use client';

import { firestoreService } from '@/lib/firestore-service';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'failed';
}

export interface ConversationData {
  messages: Message[];
  userEmail?: string | undefined;
  lastActivity: Date;
  sessionId: string;
  leadScore?: number;
  consultationRequested?: boolean;
}

const STORAGE_KEY = 'fieldporter-chat-conversation';
const MAX_MESSAGE_LENGTH = 1000;
const STORAGE_EXPIRY_HOURS = 24;

export class FirebaseMessageManager {
  private messages: Message[] = [];
  private userEmail?: string | undefined;
  private sessionId: string;
  private lastActivity: Date;
  private leadScore: number = 0;
  private consultationRequested: boolean = false;
  private messagesSinceLastSave: number = 0;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.lastActivity = new Date();
    this.loadFromStorage();
    this.loadFromFirestore();
  }

  // Generate unique session ID
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Validate message content
  private validateMessage(content: string): { isValid: boolean; error?: string } {
    if (!content || content.trim().length === 0) {
      return { isValid: false, error: 'Message cannot be empty' };
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return { isValid: false, error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` };
    }

    // Basic sanitization check
    const sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    if (sanitized !== content) {
      return { isValid: false, error: 'Invalid content detected' };
    }

    return { isValid: true };
  }

  // Add message with validation and Firebase integration
  async addMessage(content: string, role: 'user' | 'assistant'): Promise<Message | null> {
    const validation = this.validateMessage(content);
    if (!validation.isValid) {
      console.error('Message validation failed:', validation.error);
      return null;
    }

    // Check rate limit
    const rateLimitOk = await firestoreService.checkRateLimit(this.sessionId);
    if (!rateLimitOk) {
      console.warn('Rate limit exceeded for session:', this.sessionId);
      return null;
    }

    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: content.trim(),
      role,
      timestamp: new Date(),
      status: role === 'user' ? 'sending' : 'sent',
    };

    this.messages.push(message);
    this.lastActivity = new Date();
    this.messagesSinceLastSave++;

    // Save to localStorage immediately (primary storage)
    this.saveToStorage();

    // Save to Firebase based on batch threshold or important events
    this.saveToFirebaseIfNeeded();

    return message;
  }

  // Update message status
  updateMessageStatus(messageId: string, status: 'sending' | 'sent' | 'failed'): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.status = status;
      this.saveToStorage();
    }
  }

  // Get all messages
  getMessages(): Message[] {
    return [...this.messages];
  }

  // Set user email with Firebase update
  async setUserEmail(email: string): Promise<void> {
    if (this.isValidEmail(email)) {
      this.userEmail = email;
      this.saveToStorage();

      // Update Firebase immediately for lead scoring
      await firestoreService.updateConversationEmail(this.sessionId, email);
    }
  }

  // Get user email
  getUserEmail(): string | undefined {
    return this.userEmail;
  }

  // Mark consultation as requested
  async markConsultationRequested(): Promise<void> {
    this.consultationRequested = true;
    this.saveToStorage();

    // Update Firebase immediately for lead tracking
    await firestoreService.markConsultationRequested(this.sessionId);
  }

  // Email validation
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Clear conversation
  clearConversation(): void {
    this.messages = [];
    this.userEmail = undefined;
    this.consultationRequested = false;
    this.leadScore = 0;
    this.lastActivity = new Date();
    this.messagesSinceLastSave = 0;
    this.saveToStorage();
  }

  // Get conversation summary for analytics
  getConversationSummary() {
    return {
      messageCount: this.messages.length,
      userMessageCount: this.messages.filter(m => m.role === 'user').length,
      assistantMessageCount: this.messages.filter(m => m.role === 'assistant').length,
      hasEmail: !!this.userEmail,
      consultationRequested: this.consultationRequested,
      leadScore: this.leadScore,
      sessionDuration: Date.now() - new Date(this.sessionId.split('_')[1] || '0').getTime(),
      lastActivity: this.lastActivity,
      sessionId: this.sessionId,
    };
  }

  // Save to Firebase when conditions are met (cost optimization)
  private async saveToFirebaseIfNeeded(): Promise<void> {
    try {
      await firestoreService.saveConversation(
        this.sessionId,
        this.messages,
        this.userEmail,
        this.consultationRequested
      );
      this.messagesSinceLastSave = 0;
    } catch (error) {
      console.warn('Failed to save to Firebase, continuing with localStorage:', error);
    }
  }

  // Force save to Firebase (for important events)
  async forceFirebaseSave(): Promise<void> {
    try {
      await firestoreService.saveConversation(
        this.sessionId,
        this.messages,
        this.userEmail,
        this.consultationRequested
      );
      this.messagesSinceLastSave = 0;
    } catch (error) {
      console.error('Failed to force save to Firebase:', error);
    }
  }

  // Load from Firestore (if available)
  private async loadFromFirestore(): Promise<void> {
    try {
      const firestoreData = await firestoreService.loadConversation(this.sessionId);
      if (firestoreData && firestoreData.messages.length > this.messages.length) {
        // Firestore has more recent data, use it
        this.messages = firestoreData.messages;
        this.userEmail = firestoreData.email;
        this.consultationRequested = firestoreData.consultationRequested;
        this.leadScore = firestoreData.leadScore;
        this.saveToStorage(); // Update localStorage with Firestore data
      }
    } catch (error) {
      console.warn('Failed to load from Firestore, using localStorage:', error);
    }
  }

  // Save to localStorage with error handling (existing functionality)
  private saveToStorage(): void {
    try {
      const data: ConversationData = {
        messages: this.messages,
        userEmail: this.userEmail,
        lastActivity: this.lastActivity,
        sessionId: this.sessionId,
        leadScore: this.leadScore,
        consultationRequested: this.consultationRequested,
      };

      const serialized = JSON.stringify(data);

      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(STORAGE_KEY, serialized);
        } catch (e: any) {
          if (e.name === 'QuotaExceededError') {
            this.clearOldStorageData();
            try {
              localStorage.setItem(STORAGE_KEY, serialized);
            } catch (retryError) {
              console.warn('Failed to save conversation after cleanup:', retryError);
            }
          } else {
            console.warn('Failed to save conversation to localStorage:', e);
          }
        }
      }
    } catch (error) {
      console.warn('Error saving conversation:', error);
    }
  }

  // Load from localStorage with error handling (existing functionality)
  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data: ConversationData = JSON.parse(stored);

          // Check if data is expired
          const expiryTime = new Date(data.lastActivity);
          expiryTime.setHours(expiryTime.getHours() + STORAGE_EXPIRY_HOURS);

          if (new Date() > expiryTime) {
            localStorage.removeItem(STORAGE_KEY);
            return;
          }

          // Restore data
          this.messages = data.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          this.userEmail = data.userEmail;
          this.lastActivity = new Date(data.lastActivity);
          this.sessionId = data.sessionId || this.sessionId;
          this.leadScore = data.leadScore || 0;
          this.consultationRequested = data.consultationRequested || false;
        }
      }
    } catch (error) {
      console.warn('Error loading conversation from localStorage:', error);
      this.clearOldStorageData();
    }
  }

  // Clear old storage data
  private clearOldStorageData(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('fieldporter-')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
      }
    } catch (error) {
      console.warn('Error clearing old storage data:', error);
    }
  }

  // Check if should show email prompt
  shouldShowEmailPrompt(): boolean {
    return !this.userEmail && this.messages.length >= 3;
  }

  // Get failed messages
  getFailedMessages(): Message[] {
    return this.messages.filter(m => m.status === 'failed');
  }

  // Retry failed message
  retryMessage(messageId: string): Message | null {
    const message = this.messages.find(m => m.id === messageId);
    if (message && message.status === 'failed') {
      message.status = 'sending';
      this.saveToStorage();
      return message;
    }
    return null;
  }

  // Get session ID
  getSessionId(): string {
    return this.sessionId;
  }

  // Get lead score
  getLeadScore(): number {
    return this.leadScore;
  }

  // Check if consultation was requested
  isConsultationRequested(): boolean {
    return this.consultationRequested;
  }
}
