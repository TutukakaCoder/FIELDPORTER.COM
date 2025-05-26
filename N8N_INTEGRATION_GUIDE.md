# FIELDPORTER N8N Integration Guide

This guide walks you through setting up the complete n8n workflow integration
for the FIELDPORTER AI chat system.

## Overview

The n8n integration provides:

- **AI-Powered Responses**: DeepSeek API integration for intelligent chat
  responses
- **Lead Scoring**: Automatic lead qualification based on conversation content
- **Business Context**: FIELDPORTER-specific knowledge and response guidelines
- **Fallback Handling**: Graceful degradation when services are unavailable
- **Analytics**: Conversation logging and business intelligence

## Prerequisites

### Required Services

1. **n8n Instance** (cloud or self-hosted)
2. **DeepSeek API Account** with API key
3. **FIELDPORTER Website** (Next.js application)
4. **Optional**: Backend API for conversation logging

### Technical Requirements

- Node.js 18+ for the frontend
- n8n version 1.0+
- Modern web browser with fetch API support

## Step 1: n8n Setup

### Option A: n8n Cloud (Recommended)

1. Sign up at [n8n.cloud](https://n8n.cloud)
2. Create a new workflow
3. Note your webhook URL format: `https://your-instance.app.n8n.cloud/webhook/`

### Option B: Self-Hosted n8n

1. Install n8n using Docker:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

2. Access n8n at `http://localhost:5678`
3. Complete the initial setup

## Step 2: Import Workflow

### Import Main Workflow

1. In n8n, go to **Workflows** → **Import from file**
2. Select `n8n-workflows/fieldporter-chat-workflow.json`
3. The workflow will be imported with all nodes configured

### Import Test Workflow (Optional)

1. Import `n8n-workflows/test-workflow.json` for testing
2. This provides mock responses without requiring DeepSeek API

## Step 3: Configure Credentials

### DeepSeek API Credential

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for "HTTP Header Auth"
3. Configure:
   - **Name**: `deepseekApi`
   - **Header Name**: `Authorization`
   - **Header Value**: `Bearer YOUR_DEEPSEEK_API_KEY`
4. Save the credential

### Get DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com)
2. Sign up and verify your account
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-`)

## Step 4: Test Workflow

### Activate Workflow

1. Click the **Active** toggle in the workflow
2. The webhook should now be live

### Test with curl

```bash
curl -X POST https://your-n8n-instance.com/webhook/fieldporter-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What AI strategy services do you offer?",
    "sessionId": "test-session-123",
    "conversationHistory": []
  }'
```

## Step 5: Frontend Integration

### Update Environment Variables

1. Copy `.env.example` to `.env.local`
2. Set your n8n webhook URL:

```bash
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/fieldporter-chat
```

### Use N8N Chat Widget

Replace your existing chat widget with the n8n-enabled version:

```tsx
import { N8NEnhancedChatWidget } from '@/components/chat/n8n-enhanced-chat-widget';

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <N8NEnhancedChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        userEmail='user@example.com' // Optional
      />
    </div>
  );
}
```

This integration provides a robust foundation for AI-powered customer
interactions while maintaining FIELDPORTER's enterprise standards.
