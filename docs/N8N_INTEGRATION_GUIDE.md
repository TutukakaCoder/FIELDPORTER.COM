# FIELDPORTER n8n AI Agent Integration Guide

## Overview

This guide walks you through integrating the FIELDPORTER chat widget with your
n8n AI Agent workflow. The integration replaces simulated AI responses with real
AI-powered conversations using DeepSeek or other LLM providers through n8n.

## Environment Variables Setup

Add these environment variables to your `.env.local` file:

```bash
# n8n AI Agent Integration
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/fieldporter-chat
NEXT_PUBLIC_N8N_API_KEY=your_n8n_api_key_optional
```

## n8n Workflow Configuration

### Required Nodes for Your n8n Workflow:

1. **Webhook Trigger Node**

   - Method: POST
   - Path: `/webhook/fieldporter-chat`
   - Response Mode: "Respond to Webhook"

2. **Code Node (Input Processing)**

   - Purpose: Process incoming chat data and prepare for AI
   - Language: JavaScript

3. **AI Agent Node (DeepSeek/OpenAI/etc.)**

   - Your configured AI provider
   - Model: DeepSeek or preferred LLM

4. **Code Node (Response Processing)**

   - Purpose: Format AI response for FIELDPORTER
   - Language: JavaScript

5. **Respond to Webhook Node**
   - Return formatted response to chat widget

### Code Snippets for n8n Nodes

#### 1. Input Processing Code Node

```javascript
// Process incoming webhook data from FIELDPORTER chat widget
const inputData = $input.all()[0].json;

// Extract conversation data
const userMessage = inputData.message;
const sessionId = inputData.sessionId;
const conversationHistory = inputData.conversationHistory || [];
const userEmail = inputData.userEmail;
const serviceInterest = inputData.serviceInterest || [];
const leadScore = inputData.leadScore || 1;

// Prepare conversation context for AI
let conversationContext = '';

if (conversationHistory.length > 0) {
  conversationContext = conversationHistory
    .slice(-5) // Last 5 messages for context
    .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n');
}

// Build AI prompt with FIELDPORTER context
const systemPrompt = `You are FIELDPORTER's AI Strategy Consultant. You help Fortune 500 companies and enterprises with AI transformation, strategy, and implementation.

FIELDPORTER's Expertise:
- AI Strategy & Roadmap Development
- Enterprise AI Implementation
- AI-Powered Business Model Innovation
- Venture Capital AI Due Diligence
- Organizational AI Transformation

Your Role:
- Provide expert AI consulting advice
- Ask qualifying questions to understand client needs
- Demonstrate FIELDPORTER's unique value proposition
- Guide conversations toward consultation booking
- Maintain professional, consultative tone

Current Conversation Context:
${conversationContext}

User Information:
- Email: ${userEmail || 'Not provided'}
- Service Interest: ${serviceInterest.join(', ') || 'General inquiry'}
- Lead Score: ${leadScore}/10

Respond to the user's message professionally and helpfully.`;

const userPrompt = `User: ${userMessage}`;

return {
  systemPrompt,
  userPrompt,
  sessionId,
  userEmail,
  serviceInterest,
  leadScore,
  originalMessage: userMessage,
};
```

#### 2. AI Agent Configuration

Configure your AI Agent node with:

- **System Message**: Use `systemPrompt` from previous node
- **User Message**: Use `userPrompt` from previous node
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Max Tokens**: 500 (concise responses)

#### 3. Response Processing Code Node

```javascript
// Process AI response and format for FIELDPORTER
const aiResponse = $input.all()[0].json;
const inputData = $input.all()[1].json; // From input processing node

// Extract AI response text
let responseText = '';
if (aiResponse.choices && aiResponse.choices[0]) {
  responseText = aiResponse.choices[0].message.content;
} else if (aiResponse.response) {
  responseText = aiResponse.response;
} else if (aiResponse.text) {
  responseText = aiResponse.text;
} else {
  responseText =
    "I apologize, but I'm having trouble processing your request right now. Please contact our team directly at hello@fieldporter.com for immediate assistance.";
}

// Clean and validate response
responseText = responseText.trim();
if (!responseText || responseText.length < 10) {
  responseText =
    "Thank you for your question. I'd be happy to help you with your AI strategy needs. Could you tell me more about your specific challenges or goals?";
}

// Analyze response for lead scoring updates
let updatedLeadScore = inputData.leadScore || 1;
let updatedServiceInterest = inputData.serviceInterest || [];

// Simple keyword analysis for lead scoring
const responseKeywords = responseText.toLowerCase();
if (
  responseKeywords.includes('consultation') ||
  responseKeywords.includes('meeting')
) {
  updatedLeadScore = Math.min(10, updatedLeadScore + 1);
}

// Format response for FIELDPORTER chat widget
const formattedResponse = {
  response: responseText,
  metadata: {
    confidence: 0.9,
    intent: 'ai_consulting_inquiry',
    leadScore: updatedLeadScore,
    serviceInterest: updatedServiceInterest,
    sessionId: inputData.sessionId,
    timestamp: new Date().toISOString(),
  },
};

return formattedResponse;
```

#### 4. Error Handling Code Node (Optional)

```javascript
// Handle errors gracefully
const error = $input.all()[0].json;

const fallbackResponse = {
  response:
    "I'm experiencing a temporary issue. Let me connect you with our team directly. You can reach us at hello@fieldporter.com or book a consultation through our contact page.",
  metadata: {
    error: true,
    errorType: 'ai_service_error',
    timestamp: new Date().toISOString(),
  },
};

return fallbackResponse;
```

## Testing Your n8n Workflow

### 1. Test Webhook Endpoint

```bash
curl -X POST https://your-n8n-instance.com/webhook/fieldporter-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What AI services does FIELDPORTER offer?",
    "sessionId": "test_session_123",
    "conversationHistory": [],
    "leadScore": 1
  }'
```

Expected response:

```json
{
  "response": "FIELDPORTER specializes in AI strategy consulting...",
  "metadata": {
    "confidence": 0.9,
    "intent": "ai_consulting_inquiry",
    "leadScore": 2
  }
}
```

### 2. Test with Conversation History

```bash
curl -X POST https://your-n8n-instance.com/webhook/fieldporter-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How much does it cost?",
    "sessionId": "test_session_123",
    "conversationHistory": [
      {
        "role": "user",
        "content": "What AI services does FIELDPORTER offer?",
        "timestamp": "2024-01-01T10:00:00Z"
      },
      {
        "role": "assistant",
        "content": "FIELDPORTER offers comprehensive AI strategy consulting...",
        "timestamp": "2024-01-01T10:00:30Z"
      }
    ],
    "leadScore": 3
  }'
```

## Frontend Integration Status

✅ **Completed:**

- n8n service layer (`lib/n8n-chat-service.ts`)
- Enhanced chat widget integration
- Error handling and retry logic
- Rate limiting (30 requests/minute)
- Fallback responses when n8n is unavailable
- Connection status indicators
- Conversation context management

✅ **Features:**

- Real-time AI responses via n8n
- Automatic retry for failed requests
- Professional fallback messages
- Lead scoring integration
- Service interest tracking
- Mobile-optimized UI
- Firebase conversation backup

## Deployment Checklist

### 1. Environment Setup

- [ ] Add n8n webhook URL to environment variables
- [ ] Configure optional API key for authentication
- [ ] Test n8n workflow endpoint

### 2. n8n Workflow Deployment

- [ ] Import workflow nodes as described above
- [ ] Configure AI provider (DeepSeek/OpenAI)
- [ ] Test webhook endpoint
- [ ] Set up error handling
- [ ] Configure rate limiting if needed

### 3. Frontend Deployment

- [ ] Deploy updated chat widget code
- [ ] Verify environment variables are loaded
- [ ] Test chat functionality
- [ ] Monitor error logs
- [ ] Verify Firebase integration still works

### 4. Monitoring & Analytics

- [ ] Set up n8n execution monitoring
- [ ] Monitor API costs and usage
- [ ] Track conversation quality
- [ ] Monitor lead scoring accuracy

## Troubleshooting

### Common Issues:

1. **"N8N webhook URL not configured"**

   - Add `NEXT_PUBLIC_N8N_WEBHOOK_URL` to environment variables
   - Restart development server

2. **Connection timeout errors**

   - Check n8n instance is running and accessible
   - Verify webhook URL is correct
   - Check network connectivity

3. **Invalid response format**

   - Ensure n8n workflow returns `{ response: string }` format
   - Check response processing code node

4. **Rate limiting issues**
   - Monitor request frequency
   - Adjust rate limits in n8n-chat-service.ts
   - Implement user-specific rate limiting

### Debug Mode:

Enable debug logging by adding to your environment:

```bash
NODE_ENV=development
```

This will show detailed logs in browser console for:

- n8n API requests/responses
- Error details
- Rate limiting status
- Conversation context

## Security Considerations

1. **API Key Protection**

   - Never expose n8n API keys in client-side code
   - Use environment variables only
   - Consider server-side proxy for additional security

2. **Rate Limiting**

   - Current limit: 30 requests/minute per client
   - Adjust based on your n8n instance capacity
   - Monitor for abuse patterns

3. **Data Privacy**

   - Conversation data is encrypted in Firebase
   - n8n requests include minimal user data
   - Implement data retention policies

4. **Error Handling**
   - Graceful degradation when n8n is unavailable
   - Professional fallback messages
   - No sensitive error details exposed to users

## Performance Optimization

1. **Response Times**

   - Target: <3 seconds for 90% of requests
   - Optimize AI model parameters
   - Use conversation context efficiently

2. **Caching**

   - Consider caching common responses
   - Implement conversation memory
   - Cache user preferences

3. **Monitoring**
   - Track response times
   - Monitor AI model performance
   - Analyze conversation quality

## Next Steps

1. **Enhanced AI Features**

   - Implement conversation memory across sessions
   - Add sentiment analysis
   - Integrate with CRM systems

2. **Business Intelligence**

   - Advanced lead scoring algorithms
   - Conversation quality metrics
   - ROI tracking for AI interactions

3. **Scalability**
   - Load balancing for high traffic
   - Multiple AI model support
   - Advanced rate limiting strategies

---

This integration transforms your FIELDPORTER chat widget from simulated
responses to a sophisticated AI-powered consultation tool that demonstrates your
AI expertise while qualifying leads and driving business growth.
