# FIELDPORTER Firebase Service Layer Documentation

## Overview

The Firebase service layer provides a clean, enterprise-grade interface for
managing chat conversations, lead scoring, and business intelligence for the
FIELDPORTER chat widget. It implements retry logic, offline support, and cost
optimization through batch operations.

## Architecture

```
Enhanced Chat Widget
       ↓
Enhanced Message Manager (Hybrid Storage)
       ↓
Firebase Chat Service (Service Layer)
       ↓
Firebase Firestore (Persistence)
```

## Core Features

### 🔄 Retry Logic & Error Handling

- Exponential backoff retry mechanism (3 attempts)
- Automatic offline detection and retry queue
- Graceful fallback to localStorage when Firebase is unavailable
- Structured error reporting with operation context

### 💰 Cost Optimization

- Batch writes every 5 messages or 30 seconds
- Efficient Firestore queries with proper indexing
- Lazy loading of conversation history
- Memory caching for recent messages

### 📊 Business Intelligence

- Real-time lead scoring (1-10 scale)
- Service interest tracking
- Conversion funnel analytics
- High-value lead identification

### 🔒 Security & Validation

- Input sanitization and validation
- Rate limiting (50 messages per session)
- Session-based access control
- Structured audit logging

## Core Functions

### Conversation Management

```typescript
// Create new conversation
await firebaseService.createConversation(sessionId: string): Promise<void>

// Save individual message
await firebaseService.saveMessage(sessionId: string, message: Message): Promise<void>

// Get conversation history
const messages = await firebaseService.getConversationHistory(sessionId: string): Promise<Message[]>

// Update conversation metadata
await firebaseService.updateConversationMetadata(
  sessionId: string,
  updates: Partial<FirestoreConversation>
): Promise<void>
```

### Lead Management

```typescript
// Calculate lead score
const score = await firebaseService.calculateLeadScore(sessionId: string): Promise<number>

// Set user email
await firebaseService.setUserEmail(sessionId: string, email: string): Promise<void>

// Mark consultation requested
await firebaseService.markConsultationRequested(): Promise<boolean>
```

### Business Intelligence

```typescript
// Get active conversations
const conversations = await firebaseService.getActiveConversations(): Promise<ConversationSummary[]>

// Get daily analytics
const stats = await firebaseService.getDailyStats(): Promise<ChatAnalytics>

// Get high-value leads
const leads = await firebaseService.getHighValueLeads(): Promise<QualifiedLead[]>
```

## Lead Scoring Algorithm

### Point System

- **Base Score**: 1 point (starting score)
- **Message Count**: +0.5 points per message (max 3 points)
- **Email Provided**: +3 points
- **Service Interest**: +2 points per service mentioned
- **Consultation Request**: +5 points (sets to max 10)

### Keyword Scoring

```typescript
const LEAD_SCORE_KEYWORDS = {
  'ai strategy': 3,
  enterprise: 2,
  transformation: 2,
  consulting: 2,
  automation: 2,
  implementation: 2,
  roi: 3,
  budget: 3,
  timeline: 2,
  urgent: 2,
  asap: 2,
  deadline: 2,
};
```

### Urgency Scoring

```typescript
const URGENCY_KEYWORDS = {
  urgent: 3,
  asap: 3,
  immediate: 3,
  deadline: 2,
  priority: 1,
  'time sensitive': 2,
  rush: 2,
};
```

## Service Interest Detection

The system automatically detects and tracks service interests based on message
content:

- **AI Strategy**: Keywords like "ai strategy", "strategic"
- **Automation**: Keywords like "automation", "automate"
- **VC Consulting**: Keywords like "vc", "venture", "investment"

## Error Handling Strategy

### Retry Logic

```typescript
private async withRetry<T>(
  operation: () => Promise<T>,
  operationName: string,
  sessionId?: string
): Promise<T>
```

- **Attempts**: 3 retries with exponential backoff
- **Base Delay**: 1 second, doubles each retry
- **Offline Handling**: Operations queued for retry when connection restored
- **Error Context**: Structured error objects with operation details

### Offline Support

- Automatic detection of online/offline status
- Retry queue for failed operations
- Graceful fallback to localStorage
- Automatic sync when connection restored

## Performance Optimization

### Batch Operations

```typescript
// Messages are batched automatically
addMessageToBatch(message: Message): void

// Manual batch execution
await executeBatchWrite(): Promise<boolean>
```

### Query Optimization

- Indexed queries for conversation retrieval
- Limited result sets (20 messages, 50 conversations)
- Efficient filtering with compound indexes
- Lazy loading for older messages

### Memory Management

- Conversation data cached in service instance
- Automatic cleanup of old localStorage data
- Efficient message status tracking
- Minimal memory footprint

## Integration Examples

### Basic Usage

```typescript
// Initialize service
const firebaseService = new FirebaseChatService(sessionId);

// Create conversation
await firebaseService.createConversation(sessionId);

// Add message
const message: Message = {
  id: 'msg_123',
  content: 'Hello, I need AI strategy consulting',
  role: 'user',
  timestamp: new Date(),
};

await firebaseService.saveMessage(sessionId, message);

// Get lead score
const score = await firebaseService.calculateLeadScore(sessionId);
console.log(`Lead score: ${score}/10`);
```

### Business Intelligence Dashboard

```typescript
// Get daily analytics
const analytics = await firebaseService.getDailyStats();
console.log(`Conversations today: ${analytics.total_conversations}`);
console.log(`Email capture rate: ${analytics.email_capture_rate}%`);
console.log(`Consultation requests: ${analytics.consultation_requests}`);

// Get high-value leads
const leads = await firebaseService.getHighValueLeads();
leads.forEach(lead => {
  console.log(
    `Lead: ${lead.email} (Score: ${lead.lead_score}, Urgency: ${lead.urgency_score})`
  );
});
```

### Error Handling

```typescript
try {
  await firebaseService.saveMessage(sessionId, message);
} catch (error) {
  if (error instanceof FirebaseError) {
    console.error(`Firebase operation failed: ${error.operation}`);
    console.error(`Error code: ${error.code}`);
    console.error(`Message: ${error.message}`);

    // Handle specific error types
    if (error.code === 'permission-denied') {
      // Handle permission error
    } else if (error.code === 'unavailable') {
      // Handle offline scenario
    }
  }
}
```

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /conversations/{sessionId} {
      allow read, write: if request.auth == null &&
        resource == null ||
        resource.data.created_at > timestamp.date(2024, 1, 1);

      match /messages/{messageId} {
        allow read, write: if request.auth == null;
      }
    }
  }
}
```

### Required Indexes

```json
{
  "indexes": [
    {
      "collectionGroup": "conversations",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "last_active", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "conversations",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "lead_score", "order": "DESCENDING" },
        { "fieldPath": "email", "order": "ASCENDING" },
        { "fieldPath": "last_active", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "conversations",
      "queryScope": "COLLECTION",
      "fields": [{ "fieldPath": "created_at", "order": "ASCENDING" }]
    }
  ]
}
```

## Monitoring & Analytics

### Key Metrics to Track

- **Conversation Volume**: Total conversations per day/week
- **Email Capture Rate**: Percentage of conversations with email
- **Lead Score Distribution**: Average and distribution of lead scores
- **Consultation Conversion**: Rate of consultation requests
- **Service Interest Trends**: Popular services mentioned
- **Response Times**: Firebase operation performance
- **Error Rates**: Failed operations and retry success

### Dashboard Queries

```typescript
// Daily performance
const dailyStats = await firebaseService.getDailyStats();

// Lead quality
const highValueLeads = await firebaseService.getHighValueLeads();

// Conversation health
const activeConversations = await firebaseService.getActiveConversations();
```

## Best Practices

### 1. Error Handling

- Always wrap Firebase operations in try-catch blocks
- Implement graceful degradation to localStorage
- Log errors with sufficient context for debugging
- Provide user-friendly error messages

### 2. Performance

- Use batch operations for multiple writes
- Implement proper pagination for large datasets
- Cache frequently accessed data
- Monitor Firestore usage and costs

### 3. Security

- Validate all user inputs before storage
- Implement rate limiting for message sending
- Use structured security rules
- Regular security audits and updates

### 4. Business Intelligence

- Regular analysis of lead scoring effectiveness
- A/B testing of conversation flows
- Monitoring of conversion funnel performance
- Continuous optimization based on data insights

## Troubleshooting

### Common Issues

#### Firebase Connection Errors

```typescript
// Check connection status
const isOnline = firebaseService.isOnlineStatus();
const retryQueueLength = firebaseService.getRetryQueueLength();

if (!isOnline) {
  console.log(`Offline mode: ${retryQueueLength} operations queued`);
}
```

#### Lead Scoring Issues

```typescript
// Debug lead scoring
const currentScore = firebaseService.getCurrentLeadScore();
const interests = firebaseService.getCurrentServiceInterests();

console.log(`Current lead score: ${currentScore}`);
console.log(`Service interests: ${interests.join(', ')}`);
```

#### Batch Write Failures

```typescript
// Force flush pending operations
const success = await firebaseService.flushPendingMessages();
if (!success) {
  console.error('Failed to flush pending messages');
}
```

## Future Enhancements

### Planned Features

- **Real-time Analytics Dashboard**: Live conversation monitoring
- **Advanced Lead Scoring**: ML-based scoring improvements
- **Integration APIs**: CRM and marketing automation connections
- **A/B Testing Framework**: Conversation flow optimization
- **Advanced Security**: Enhanced rate limiting and fraud detection

### Scalability Considerations

- **Horizontal Scaling**: Multi-region Firestore deployment
- **Caching Layer**: Redis for high-frequency data
- **Message Queuing**: For high-volume message processing
- **Analytics Pipeline**: BigQuery integration for advanced analytics

---

This service layer provides a robust foundation for enterprise-grade chat
functionality while maintaining the flexibility to evolve with business needs.
