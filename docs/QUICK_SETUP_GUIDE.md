# FIELDPORTER n8n Integration - Quick Setup Guide

## Prerequisites ✅

- n8n is running on localhost:5678
- Firebase service bugs are fixed
- Next.js application builds successfully

## Step 1: Import n8n Workflows

### Access n8n Interface

1. Open browser to http://localhost:5678
2. Complete initial n8n setup if prompted

### Import Test Workflow

1. Click "Import from file" or "+" → "Import"
2. Select `fieldporter-test-workflow.json`
3. Click "Import"
4. Activate the workflow

### Import Main AI Workflow

1. Click "Import from file" or "+" → "Import"
2. Select `fieldporter-n8n-workflow-simplified.json`
3. Click "Import"
4. **Do not activate yet** - needs DeepSeek configuration

## Step 2: Configure DeepSeek API

### Add DeepSeek Credentials

1. In n8n, go to "Credentials" section
2. Click "Add Credential"
3. Search for "DeepSeek" or add generic API credential
4. Name: `DeepSeek API Key`
5. Add your DeepSeek API key
6. Save credential

### Update AI Workflow

1. Open the main FIELDPORTER workflow
2. Click on "DeepSeek Chat Model" node
3. Select the credential you just created
4. Save the workflow
5. Activate the workflow

## Step 3: Test Integration

### Test Basic Connectivity

```bash
node test-n8n-simple.js
```

### Test from Frontend

1. Start Next.js: `npm run dev`
2. Open http://localhost:3001
3. Open chat widget
4. Send test message
5. Verify AI response

## Step 4: Environment Configuration

### Create .env.local

```bash
cp env.example .env.local
```

### Update Required Variables

```env
# Add your actual DeepSeek API key
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here

# Verify n8n webhook URL
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook/fieldporter-chat
```

## Troubleshooting

### Common Issues

**404 Webhook Error**

- Ensure workflows are imported and activated
- Check webhook path matches: `/webhook/fieldporter-chat`

**DeepSeek API Error**

- Verify API key is correct
- Check credential is assigned to DeepSeek node
- Ensure sufficient API credits

**CORS Error**

- Verify allowed origins in webhook configuration
- Check frontend is running on localhost:3001

**Firebase Error**

- Verify Firebase configuration in .env.local
- Check Firestore security rules allow access

### Success Indicators

- ✅ Test script shows all green checkmarks
- ✅ Chat widget receives AI responses
- ✅ Conversations saved to Firebase
- ✅ No console errors in browser

## Next Steps

Once basic integration works:

1. Configure production n8n instance
2. Add monitoring and alerting
3. Optimize AI prompts for lead qualification
4. Test with real user scenarios
5. Deploy to production environment

## Support

If issues persist:

1. Check n8n execution logs
2. Review browser console for errors
3. Verify all environment variables
4. Test each component individually

---

**Estimated Setup Time**: 15-30 minutes **Prerequisites**: Basic familiarity
with n8n interface
