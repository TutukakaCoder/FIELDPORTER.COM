import { Timestamp } from 'firebase/firestore';

// Message interface for Firestore
export interface FirestoreMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Timestamp;
  message_id: string;
}

// Optimized conversation structure for Firestore
export interface OptimizedFirestoreConversation {
  created_at: Timestamp;
  last_active: Timestamp;
  messages: FirestoreMessage[]; // Store messages as array instead of subcollection
  metadata: {
    messages_count: number;
    email: string | null;
    lead_score: number; // 1-10 based on engagement
    service_interest: string[]; // AI Strategy, Automation, VC Consulting
    consultation_requested: boolean;
    status: 'active' | 'qualified' | 'converted' | 'inactive';
  };
  analytics: {
    user_message_count: number;
    assistant_message_count: number;
    session_duration_ms: number;
    last_lead_score_update: Timestamp;
    urgency_score: number;
  };
}

// Local message interface
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'failed';
  message_id?: string; // Firebase message ID
}

// Conversation data interface
export interface ConversationData {
  messages: Message[];
  userEmail?: string | undefined;
  lastActivity: Date;
  sessionId: string;
  firebaseConversationId?: string;
  leadScore?: number;
  serviceInterest?: string[];
  consultationRequested?: boolean;
  status?: 'active' | 'qualified' | 'converted' | 'inactive';
}

// Analytics data interface
export interface ConversationAnalytics {
  sessionId: string;
  messageCount: number;
  userMessageCount: number;
  assistantMessageCount: number;
  hasEmail: boolean;
  sessionDuration: number;
  lastActivity: Date;
  leadScore: number;
  serviceInterest: string[];
  consultationRequested: boolean;
}

// Conversation summary for business intelligence
export interface ConversationSummary {
  sessionId: string;
  created_at: Date;
  last_active: Date;
  messages_count: number;
  email: string | null;
  lead_score: number;
  service_interest: string[];
  consultation_requested: boolean;
  status: 'active' | 'qualified' | 'converted' | 'inactive';
  session_duration_minutes: number;
}

// Daily chat analytics
export interface ChatAnalytics {
  total_conversations: number;
  active_conversations: number;
  email_capture_rate: number;
  consultation_requests: number;
  average_messages_per_conversation: number;
  average_lead_score: number;
  top_service_interests: Array<{ service: string; count: number }>;
  conversion_funnel: {
    visitors: number;
    engaged: number; // >3 messages
    qualified: number; // email provided
    consultation_requested: number;
  };
}

// Qualified lead interface
export interface QualifiedLead {
  sessionId: string;
  email: string;
  lead_score: number;
  service_interest: string[];
  consultation_requested: boolean;
  created_at: Date;
  last_active: Date;
  messages_count: number;
  key_messages: string[]; // Most relevant user messages
  urgency_score: number; // Based on keywords like "urgent", "asap", "timeline"
}

// Error handling interface
export interface FirebaseError {
  code: string;
  message: string;
  timestamp: Date;
  operation: string;
  sessionId?: string | undefined;
}
