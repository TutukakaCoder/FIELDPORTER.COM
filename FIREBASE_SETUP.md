# FIELDPORTER Firebase Integration Setup

## Overview

This document outlines the minimal Firebase Firestore integration for the
FIELDPORTER chat system, designed for cost optimization, privacy compliance, and
business intelligence.

## Database Structure

### Conversations Collection

```typescript
conversations/{sessionId}
├── created_at: Timestamp
├── last_message: Timestamp
├── message_count: number
├── email?: string (optional)
├── lead_score: number (1-10)
├── consultation_requested: boolean
├── messages: Message[] (max 50)
├── cleanup_date: Timestamp (30 days)
└── is_archived: boolean
```

### Message Structure

```typescript
{
  id: string,
  content: string,
  role: 'user' | 'assistant',
  timestamp: Timestamp
}
```

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing `fieldporter-website`
3. Enable Firestore Database
4. Choose production mode
5. Select region (asia-east1 recommended)

### 2. Environment Configuration

Create `.env.local` file with your Firebase config:

```bash
# Copy from env.example and fill in your values
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fieldporter-website.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fieldporter-website
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fieldporter-website.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

### 4. Deploy Indexes

```bash
firebase deploy --only firestore:indexes
```

## Cost Optimization Features

### Batch Writing Strategy

- Saves to Firestore every 3-5 messages (not every message)
- Uses localStorage as primary storage
- Firebase as backup/sync storage

### Message Limits

- Maximum 50 messages per conversation
- Automatic cleanup after 30 days
- Rate limiting: 20 messages per session

### Query Optimization

- Limited to 100 documents per query
- Indexed queries for performance
- Minimal read operations

## Lead Scoring Algorithm

### Scoring Criteria

- **+1 point**: Each message (engagement)
- **+3 points**: Email provided
- **+5 points**: Consultation requested
- **+2 points**: Long messages (>100 chars)
- **+1 point**: Business-related keywords

### Keywords Tracked

- strategy, ai, consulting, business, implementation, roi

### Score Interpretation

- **8-10**: High-quality lead
- **5-7**: Moderate lead quality
- **1-4**: Low engagement

## Privacy & Security

### Data Protection

- Automatic cleanup after 30 days
- No PII storage unless explicitly provided
- Session-based access control
- Basic input sanitization

### Security Rules

- Session ID validation
- Rate limiting protection
- Data type validation
- Size constraints

## Business Intelligence

### Available Metrics

- Total conversations (7-day window)
- Average messages per conversation
- Email capture rate
- Consultation request rate
- Lead score distribution

### Admin Dashboard

Access at `/admin` to view:

- Real-time conversation statistics
- Lead generation metrics
- Engagement quality insights
- Data cleanup tools

## Usage Examples

### Basic Integration

```typescript
import { FirebaseMessageManager } from '@/components/chat/firebase-message-manager';

const messageManager = new FirebaseMessageManager();

// Add message (auto-saves to localStorage + Firebase)
await messageManager.addMessage('Hello!', 'user');

// Set email (triggers lead score update)
await messageManager.setUserEmail('user@example.com');

// Mark consultation requested
await messageManager.markConsultationRequested();
```

### Analytics Usage

```typescript
import { firestoreService } from '@/lib/firestore-service';

// Get 7-day statistics
const stats = await firestoreService.getConversationStats(7);

// Cleanup old conversations
const deletedCount = await firestoreService.cleanupOldConversations();
```

## Development Setup

### Local Emulator

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Start Firestore emulator
firebase emulators:start --only firestore

# Access emulator UI at http://localhost:4000
```

### Testing

```bash
# Run with emulator
npm run dev

# Check console for Firebase connection logs
```

## Monitoring & Maintenance

### Regular Tasks

1. **Weekly**: Review conversation statistics
2. **Monthly**: Run cleanup for old conversations
3. **Quarterly**: Review lead scoring effectiveness

### Cost Monitoring

- Set up Firebase billing alerts
- Monitor read/write operations
- Track storage usage

### Performance Optimization

- Review slow queries in Firebase console
- Optimize indexes based on usage patterns
- Monitor bundle size impact

## Troubleshooting

### Common Issues

**Firebase not connecting:**

- Check environment variables
- Verify project ID matches
- Ensure Firestore is enabled

**Security rules blocking writes:**

- Verify session ID format
- Check required fields
- Review rate limiting

**High costs:**

- Review batch save threshold
- Check cleanup automation
- Monitor query patterns

### Debug Mode

```typescript
// Enable debug logging
localStorage.setItem('debug', 'firebase:*');
```

## Migration Notes

### From localStorage Only

- Existing conversations automatically sync
- No data loss during transition
- Gradual Firebase adoption

### Future Enhancements

- Real-time conversation sync
- Advanced analytics
- A/B testing framework
- Enhanced lead scoring

## Support

For technical issues:

1. Check Firebase console logs
2. Review browser console errors
3. Verify environment configuration
4. Test with emulator first

---

**Last Updated**: January 2025  
**Version**: 1.0.0
