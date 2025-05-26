'use client';

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

// Types matching the simplified database structure
export interface FirestoreMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Timestamp;
}

export interface FirestoreConversation {
  created_at: Timestamp;
  last_message: Timestamp;
  message_count: number;
  email?: string;
  lead_score: number;
  consultation_requested: boolean;
  messages: FirestoreMessage[];
  // Privacy and cost control
  cleanup_date?: Timestamp;
  is_archived?: boolean;
}

export interface ConversationStats {
  total_conversations: number;
  avg_message_count: number;
  consultation_requests: number;
  email_captures: number;
  top_lead_scores: number[];
}

class FirestoreService {
  private readonly COLLECTION_NAME = 'conversations';
  private readonly MAX_MESSAGES_PER_CONVERSATION = 50;
  private readonly BATCH_SAVE_THRESHOLD = 3; // Save every 3 messages
  private readonly CLEANUP_DAYS = 30;

  // Calculate simple lead score based on criteria
  private calculateLeadScore(
    messageCount: number,
    hasEmail: boolean,
    consultationRequested: boolean,
    messages: FirestoreMessage[]
  ): number {
    let score = 0;

    // +1 for each message (engagement)
    score += messageCount;

    // +3 for providing email
    if (hasEmail) score += 3;

    // +5 for consultation request
    if (consultationRequested) score += 5;

    // +2 for longer messages (shows engagement)
    const avgMessageLength =
      messages.reduce((sum, msg) => sum + msg.content.length, 0) / messages.length;
    if (avgMessageLength > 100) score += 2;

    // +1 for asking business-related questions
    const businessKeywords = ['strategy', 'ai', 'consulting', 'business', 'implementation', 'roi'];
    const hasBusinessContent = messages.some(msg =>
      businessKeywords.some(keyword => msg.content.toLowerCase().includes(keyword))
    );
    if (hasBusinessContent) score += 1;

    return Math.min(score, 10); // Cap at 10
  }

  // Save conversation to Firestore (cost-optimized)
  async saveConversation(
    sessionId: string,
    messages: { id: string; content: string; role: 'user' | 'assistant'; timestamp: Date }[],
    email?: string,
    consultationRequested: boolean = false
  ): Promise<void> {
    try {
      // Only save if we have enough messages or important events
      const shouldSave =
        messages.length % this.BATCH_SAVE_THRESHOLD === 0 ||
        email ||
        consultationRequested ||
        messages.length >= this.MAX_MESSAGES_PER_CONVERSATION;

      if (!shouldSave) return;

      // Limit messages to prevent runaway costs
      const limitedMessages = messages.slice(-this.MAX_MESSAGES_PER_CONVERSATION);

      // Convert messages to Firestore format
      const firestoreMessages: FirestoreMessage[] = limitedMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        timestamp: Timestamp.fromDate(msg.timestamp),
      }));

      const leadScore = this.calculateLeadScore(
        limitedMessages.length,
        !!email,
        consultationRequested,
        firestoreMessages
      );

      // Set cleanup date (30 days from now)
      const cleanupDate = new Date();
      cleanupDate.setDate(cleanupDate.getDate() + this.CLEANUP_DAYS);

      const conversationData: FirestoreConversation = {
        created_at: serverTimestamp() as Timestamp,
        last_message: serverTimestamp() as Timestamp,
        message_count: limitedMessages.length,
        email: email || undefined,
        lead_score: leadScore,
        consultation_requested: consultationRequested,
        messages: firestoreMessages,
        cleanup_date: Timestamp.fromDate(cleanupDate),
        is_archived: false,
      };

      const docRef = doc(db, this.COLLECTION_NAME, sessionId);
      await setDoc(docRef, conversationData, { merge: true });

      console.log(`Conversation saved: ${sessionId}, Lead Score: ${leadScore}`);
    } catch (error) {
      console.error('Error saving conversation to Firestore:', error);
      // Don't throw - graceful degradation
    }
  }

  // Load conversation from Firestore
  async loadConversation(sessionId: string): Promise<{
    messages: { id: string; content: string; role: 'user' | 'assistant'; timestamp: Date }[];
    email?: string;
    leadScore: number;
    consultationRequested: boolean;
  } | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, sessionId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data() as FirestoreConversation;

      // Convert back to local format
      const messages = data.messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        timestamp: msg.timestamp.toDate(),
      }));

      return {
        messages,
        email: data.email,
        leadScore: data.lead_score,
        consultationRequested: data.consultation_requested,
      };
    } catch (error) {
      console.error('Error loading conversation from Firestore:', error);
      return null;
    }
  }

  // Update email for existing conversation
  async updateConversationEmail(sessionId: string, email: string): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, sessionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data() as FirestoreConversation;
        const newLeadScore = this.calculateLeadScore(
          currentData.message_count,
          true, // now has email
          currentData.consultation_requested,
          currentData.messages
        );

        await updateDoc(docRef, {
          email,
          lead_score: newLeadScore,
          last_message: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error updating conversation email:', error);
    }
  }

  // Mark consultation as requested
  async markConsultationRequested(sessionId: string): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, sessionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data() as FirestoreConversation;
        const newLeadScore = this.calculateLeadScore(
          currentData.message_count,
          !!currentData.email,
          true, // consultation requested
          currentData.messages
        );

        await updateDoc(docRef, {
          consultation_requested: true,
          lead_score: newLeadScore,
          last_message: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error marking consultation requested:', error);
    }
  }

  // Get business intelligence data
  async getConversationStats(days: number = 7): Promise<ConversationStats> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('created_at', '>=', Timestamp.fromDate(cutoffDate)),
        orderBy('created_at', 'desc'),
        limit(100) // Limit for cost control
      );

      const querySnapshot = await getDocs(q);
      const conversations: FirestoreConversation[] = [];

      querySnapshot.forEach(doc => {
        conversations.push(doc.data() as FirestoreConversation);
      });

      const stats: ConversationStats = {
        total_conversations: conversations.length,
        avg_message_count:
          conversations.length > 0
            ? conversations.reduce((sum, conv) => sum + conv.message_count, 0) /
              conversations.length
            : 0,
        consultation_requests: conversations.filter(conv => conv.consultation_requested).length,
        email_captures: conversations.filter(conv => conv.email).length,
        top_lead_scores: conversations
          .map(conv => conv.lead_score)
          .sort((a, b) => b - a)
          .slice(0, 10),
      };

      return stats;
    } catch (error) {
      console.error('Error getting conversation stats:', error);
      return {
        total_conversations: 0,
        avg_message_count: 0,
        consultation_requests: 0,
        email_captures: 0,
        top_lead_scores: [],
      };
    }
  }

  // Cleanup old conversations (privacy compliance)
  async cleanupOldConversations(): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.CLEANUP_DAYS);

      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('cleanup_date', '<=', Timestamp.fromDate(cutoffDate)),
        limit(50) // Process in batches
      );

      const querySnapshot = await getDocs(q);
      let deletedCount = 0;

      for (const docSnapshot of querySnapshot.docs) {
        await deleteDoc(docSnapshot.ref);
        deletedCount++;
      }

      console.log(`Cleaned up ${deletedCount} old conversations`);
      return deletedCount;
    } catch (error) {
      console.error('Error cleaning up old conversations:', error);
      return 0;
    }
  }

  // Rate limiting check (20 messages per session max)
  async checkRateLimit(sessionId: string): Promise<boolean> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, sessionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as FirestoreConversation;
        return data.message_count < 20;
      }

      return true; // New session, allow
    } catch (error) {
      console.error('Error checking rate limit:', error);
      return true; // Fail open for better UX
    }
  }
}

// Export singleton instance
export const firestoreService = new FirestoreService();
