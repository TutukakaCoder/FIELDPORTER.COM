# FIELDPORTER Firebase Setup Guide

## Overview

This guide covers setting up Firebase Firestore for the FIELDPORTER chat system
with cost-optimized configuration and enterprise-grade security.

## Prerequisites

- Firebase project created
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project configured for web app

## Environment Variables

Create a `.env.local` file in the project root with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Configuration Steps

### 1. Initialize Firebase in your project

```bash
firebase login
firebase init firestore
firebase init hosting
```

### 2. Deploy Firestore Rules and Indexes

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 3. Verify Security Rules

The security rules implement:

- Session-based access control
- Message content validation (max 1000 characters)
- Rate limiting (50 messages per session)
- Lead score validation (1-10 range)
- Automatic data structure validation

### 4. Test the Integration

1. Start the development server: `npm run dev`
2. Open the chat widget
3. Send a few messages
4. Check Firebase Console to verify data is being stored

## Data Structure

### Conversations Collection

```
conversations/{sessionId}
├── created_at: timestamp
├── last_active: timestamp
├── messages_count: number
├── email: string | null
├── lead_score: number (1-10)
├── service_interest: string[]
├── consultation_requested: boolean
└── status: 'active' | 'qualified' | 'converted' | 'inactive'
```

### Messages Subcollection

```
conversations/{sessionId}/messages/{messageId}
├── role: 'user' | 'assistant' | 'system'
├── content: string
├── timestamp: timestamp
└── message_id: string
```

## Cost Optimization Features

### Batch Writing

- Messages are batched every 5 messages or 30 seconds
- Reduces Firestore write operations by up to 80%
- Maintains real-time user experience

### Efficient Queries

- Limited to 20 recent messages per conversation
- Indexed queries for business intelligence
- Minimal field selection for analytics

### Automatic Cleanup

- 30-day data retention policy (implement via Cloud Functions)
- Session-based rate limiting
- Optimized for business intelligence needs

## Business Intelligence Queries

### High-Value Leads

```javascript
// Get conversations with lead score > 7
const highValueLeads = await getDocs(
  query(
    collection(db, 'conversations'),
    where('lead_score', '>', 7),
    orderBy('last_active', 'desc')
  )
);
```

### Service Interest Analysis

```javascript
// Get conversations by service interest
const aiStrategyLeads = await getDocs(
  query(
    collection(db, 'conversations'),
    where('service_interest', 'array-contains', 'AI Strategy'),
    orderBy('lead_score', 'desc')
  )
);
```

### Consultation Requests

```javascript
// Get all consultation requests
const consultationRequests = await getDocs(
  query(
    collection(db, 'conversations'),
    where('consultation_requested', '==', true),
    orderBy('last_active', 'desc')
  )
);
```

## Security Best Practices

### Environment Variables

- Never commit Firebase config to version control
- Use Firebase App Check for production
- Implement proper CORS policies

### Data Privacy

- No PII in security rules
- Automatic session expiration
- Encrypted data transmission
- GDPR/CCPA compliant data handling

### Rate Limiting

- 50 messages per session maximum
- Automatic session timeout after 24 hours
- IP-based rate limiting (implement via Cloud Functions)

## Monitoring and Analytics

### Firebase Console

- Monitor read/write operations
- Track storage usage
- Review security rule violations

### Business Metrics

- Lead score distribution
- Service interest trends
- Consultation conversion rates
- Session duration analytics

## Troubleshooting

### Common Issues

1. **Permission Denied**: Check Firestore security rules
2. **Quota Exceeded**: Review batch writing configuration
3. **Connection Failed**: Verify environment variables
4. **Type Errors**: Ensure TypeScript interfaces match Firestore schema

### Debug Mode

Enable debug logging in development:

```javascript
// Add to firebase.ts for debugging
import { connectFirestoreEmulator } from 'firebase/firestore';

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

## Production Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Environment Setup

1. Configure production environment variables
2. Enable Firebase App Check
3. Set up monitoring alerts
4. Configure backup policies

## Support

For technical issues with the Firebase integration, check:

1. Firebase Console logs
2. Browser developer tools
3. Network tab for failed requests
4. TypeScript compilation errors
