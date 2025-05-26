/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

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
}

const STORAGE_KEY = 'fieldporter-chat-conversation';
const MAX_MESSAGE_LENGTH = 1000;
const STORAGE_EXPIRY_HOURS = 24;

export class MessageManager {
  private messages: Message[] = [];
  private userEmail?: string | undefined;
  private sessionId: string;
  private lastActivity: Date;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.lastActivity = new Date();
    this.loadFromStorage();
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

  // Add message with validation
  addMessage(content: string, role: 'user' | 'assistant'): Message | null {
    const validation = this.validateMessage(content);
    if (!validation.isValid) {
      console.error('Message validation failed:', validation.error);
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
    this.saveToStorage();

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

  // Set user email
  setUserEmail(email: string): void {
    if (this.isValidEmail(email)) {
      this.userEmail = email;
      this.saveToStorage();
    }
  }

  // Get user email
  getUserEmail(): string | undefined {
    return this.userEmail;
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
    this.lastActivity = new Date();
    this.saveToStorage();
  }

  // Get conversation summary for analytics
  getConversationSummary() {
    return {
      messageCount: this.messages.length,
      userMessageCount: this.messages.filter(m => m.role === 'user').length,
      assistantMessageCount: this.messages.filter(m => m.role === 'assistant').length,
      hasEmail: !!this.userEmail,
      sessionDuration: Date.now() - new Date(this.sessionId.split('_')[1] || '0').getTime(),
      lastActivity: this.lastActivity,
    };
  }

  // Save to localStorage with error handling
  private saveToStorage(): void {
    try {
      const data: ConversationData = {
        messages: this.messages,
        userEmail: this.userEmail,
        lastActivity: this.lastActivity,
        sessionId: this.sessionId,
      };

      const serialized = JSON.stringify(data);

      // Check if localStorage is available and has space
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(STORAGE_KEY, serialized);
        } catch (e: any) {
          if (e.name === 'QuotaExceededError') {
            // Clear old data and try again
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

  // Load from localStorage with error handling
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
            // Data expired, clear it
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
        }
      }
    } catch (error) {
      console.warn('Error loading conversation from localStorage:', error);
      // Clear corrupted data
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  // Clear old storage data
  private clearOldStorageData(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Remove old chat data
        localStorage.removeItem(STORAGE_KEY);

        // Could also clear other old data if needed
        const keysToCheck = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('fieldporter-chat-')) {
            keysToCheck.push(key);
          }
        }

        keysToCheck.forEach(key => {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              const parsed = JSON.parse(data);
              if (parsed.lastActivity) {
                const lastActivity = new Date(parsed.lastActivity);
                const expiryTime = new Date(lastActivity);
                expiryTime.setHours(expiryTime.getHours() + STORAGE_EXPIRY_HOURS);

                if (new Date() > expiryTime) {
                  localStorage.removeItem(key);
                }
              }
            }
          } catch (e) {
            // Remove corrupted data
            localStorage.removeItem(key);
          }
        });
      }
    } catch (error) {
      console.warn('Error clearing old storage data:', error);
    }
  }

  // Check if conversation should show email prompt
  shouldShowEmailPrompt(): boolean {
    const userMessageCount = this.messages.filter(m => m.role === 'user').length;
    return userMessageCount >= 3 && !this.userEmail;
  }

  // Get retry-able failed messages
  getFailedMessages(): Message[] {
    return this.messages.filter(m => m.status === 'failed');
  }

  // Retry failed message
  retryMessage(messageId: string): Message | null {
    const message = this.messages.find(m => m.id === messageId);
    if (message && message.status === 'failed') {
      message.status = 'sending';
      message.timestamp = new Date();
      this.saveToStorage();
      return message;
    }
    return null;
  }
}
