# FIELDPORTER n8n Chat Workflow

This directory contains the n8n workflow configuration for the FIELDPORTER AI
chat system that integrates with DeepSeek API for intelligent responses and lead
qualification.

## Overview

The workflow processes chat messages through a sophisticated pipeline that:

- Validates incoming messages
- Adds FIELDPORTER business context
- Calls DeepSeek API for intelligent responses
- Scores leads based on conversation content
- Logs conversations for business intelligence
- Returns formatted responses to the frontend

## Workflow Structure

### 1. Chat Message Webhook

- **Type**: Webhook Trigger
- **Path**: `/fieldporter-chat`
- **Method**: POST
- **Purpose**: Receives chat messages from the frontend

### 2. Context Preparation

- **Type**: Code Node
- **Purpose**: Validates input and adds FIELDPORTER business context
- **Features**:
  - Input validation (message, sessionId required)
  - Conversation history management (last 5 messages)
  - Company context injection
  - Error handling for missing fields

### 3. DeepSeek API Call

- **Type**: HTTP Request
- **Purpose**: Generates AI responses using DeepSeek chat model
- **Configuration**:
  - Model: `deepseek-chat`
  - Max tokens: 200
  - Temperature: 0.7
  - Timeout: 8 seconds
  - Retry: 2 attempts

### 4. Response Processing

- **Type**: Code Node
- **Purpose**: Cleans and formats AI responses
- **Features**:
  - Fallback responses for API failures
  - Response length limiting (500 chars max)
  - Text cleaning and formatting

### 5. Lead Scoring Logic

- **Type**: Code Node
- **Purpose**: Scores leads based on conversation content
- **Scoring Criteria**:
  - Budget/pricing mentions: +2 points
  - Timeline questions: +2 points
  - Case study requests: +1 point
  - Consultation requests: +5 points
  - Email provided: +3 points
  - Multiple messages: +1 per message (max 3)
  - Business keywords: +1 point

### 6. Conversation Logging

- **Type**: HTTP Request
- **Purpose**: Logs conversation data for analytics
- **Features**:
  - Continues on failure (non-blocking)
  - Structured data logging
  - Lead scoring metadata

### 7. Response Nodes

- **Send Response**: Returns successful chat response
- **Error Response**: Returns error response for API failures

## Setup Instructions

### Prerequisites

- n8n instance (cloud or self-hosted)
- DeepSeek API account and key
- FIELDPORTER backend API (optional for logging)

### 1. Import Workflow

1. Open n8n interface
2. Go to Workflows
3. Click "Import from file"
4. Select `fieldporter-chat-workflow.json`

### 2. Configure Credentials

#### DeepSeek API Credential

1. Go to Credentials in n8n
2. Create new credential: "HTTP Header Auth"
3. Name: `deepseekApi`
4. Header Name: `Authorization`
5. Header Value: `Bearer YOUR_DEEPSEEK_API_KEY`

#### FIELDPORTER API Credential (Optional)

1. Create new credential: "HTTP Header Auth"
2. Name: `fieldporterApi`
3. Header Name: `X-API-Key`
4. Header Value: `YOUR_FIELDPORTER_API_KEY`

### 3. Configure Webhook

1. Click on "Chat Message Webhook" node
2. Note the webhook URL (e.g., `https://your-n8n.com/webhook/fieldporter-chat`)
3. Update your frontend to use this URL

### 4. Test Workflow

1. Activate the workflow
2. Send a test POST request to the webhook URL:

```bash
curl -X POST https://your-n8n.com/webhook/fieldporter-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What AI strategy services do you offer?",
    "sessionId": "test-session-123",
    "conversationHistory": []
  }'
```

## Frontend Integration

### Request Format

```typescript
interface ChatRequest {
  message: string;
  sessionId: string;
  userEmail?: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}
```

### Response Format

```typescript
interface ChatResponse {
  success: boolean;
  response: string;
  sessionId: string;
  leadScore: number;
  leadQuality: 'low' | 'medium' | 'high';
  timestamp: string;
  error?: string;
}
```

### Example Frontend Code

```typescript
async function sendChatMessage(message: string, sessionId: string) {
  const response = await fetch(
    'https://your-n8n.com/webhook/fieldporter-chat',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId,
        conversationHistory: getConversationHistory(sessionId),
      }),
    }
  );

  return await response.json();
}
```

## Business Logic

### FIELDPORTER Context

The workflow includes comprehensive business context:

- Company overview and services
- Key differentiators
- Target audience (enterprise clients)
- Response guidelines
- Consultation booking goals

### Lead Scoring Algorithm

- **Low Quality (0-4 points)**: Basic inquiries, no clear buying signals
- **Medium Quality (5-7 points)**: Some buying signals, moderate engagement
- **High Quality (8-10 points)**: Strong buying signals, high engagement

### Response Guidelines

- Concise responses (under 200 words)
- Business value focus
- Qualifying questions
- Professional, consultative tone
- Consultation suggestions when appropriate

## Monitoring and Analytics

### Key Metrics to Track

- Response times
- API success rates
- Lead score distribution
- Conversation length
- Consultation requests
- Email capture rate

### Cost Monitoring

- DeepSeek API usage
- Daily spend alerts ($20 threshold)
- Token consumption tracking
- Rate limiting effectiveness

## Error Handling

### API Failures

- Automatic retries (2 attempts)
- Graceful fallback responses
- Error logging for debugging
- User-friendly error messages

### Input Validation

- Required field checking
- Session ID validation
- Message content sanitization
- Conversation history limits

## Security Considerations

### API Key Management

- Store credentials securely in n8n
- Use environment variables for sensitive data
- Regular key rotation
- Access logging

### Rate Limiting

- 10 calls per user per hour (recommended)
- Session-based tracking
- IP-based fallback limits
- Cost protection measures

### Data Privacy

- No PII storage in workflow
- Conversation logging is optional
- GDPR compliance considerations
- Data retention policies

## Troubleshooting

### Common Issues

#### Webhook Not Responding

- Check workflow activation status
- Verify webhook URL configuration
- Test with curl command
- Check n8n logs

#### DeepSeek API Errors

- Verify API key validity
- Check rate limits
- Monitor API status
- Review error logs

#### Poor Response Quality

- Adjust temperature setting
- Modify context prompt
- Review conversation history
- Update business context

### Debug Mode

1. Enable workflow execution logging
2. Add console.log statements in code nodes
3. Monitor execution history
4. Check individual node outputs

## Customization

### Modifying Business Context

Edit the `companyContext` variable in the "Context Preparation" node to update:

- Company description
- Service offerings
- Response guidelines
- Consultation goals

### Adjusting Lead Scoring

Modify the scoring logic in the "Lead Scoring Logic" node:

- Add new keywords
- Adjust point values
- Change quality thresholds
- Add new scoring factors

### Response Formatting

Update the "Response Processing" node to:

- Change response length limits
- Modify text cleaning rules
- Add response templates
- Include additional metadata

## Performance Optimization

### Response Time

- Optimize DeepSeek API calls
- Reduce conversation history size
- Minimize processing logic
- Use async operations

### Cost Efficiency

- Monitor token usage
- Implement smart caching
- Optimize prompt length
- Use appropriate model settings

### Scalability

- Implement proper rate limiting
- Monitor resource usage
- Plan for traffic spikes
- Consider load balancing

## Support

For technical support or questions about the workflow:

1. Check n8n documentation
2. Review DeepSeek API docs
3. Monitor workflow execution logs
4. Contact FIELDPORTER technical team

## Version History

- **v1.0**: Initial workflow implementation
- **v1.1**: Enhanced error handling and logging
- **v1.2**: Improved lead scoring algorithm
- **v1.3**: Added conversation context management
