# AI Chat Fix Report - November 5, 2025

## Issue

Chat API failing with: `TypeError: Cannot read properties of undefined (reading 'some')`

## Root Cause Analysis

The error occurs in the Firebase AI Logic SDK when calling Gemini API. The issue appears to be related to how `systemInstruction` is formatted.

## Fixes Applied

### 1. System Instruction Format (Primary Fix)

**File:** `app/api/chat/route.ts` (Line 308-317)

Changed from Content object to plain string format:

```typescript
// FINAL FIX - Using plain string
systemInstruction: systemPromptText,
```

Previous attempts:

- ❌ `{ role: "user", parts: [...] }` - caused undefined reading error
- ❌ `{ role: "system", parts: [...] }` - incompatible with Firebase AI SDK

### 2. Enhanced Message Validation

**File:** `app/api/chat/route.ts` (Line 232-242)

- Added `?.trim()` for safer content handling
- Enhanced filtering to prevent empty messages
- Improved null checks in conversion function

## Build Status

✅ Build completed successfully (3 times)
✅ No TypeScript errors
✅ No linter errors
✅ Server running on port 3000

## Current Status

⚠️ API still returning fallback responses

- Response time: ~1500ms (improved from ~5000ms)
- Error handling working correctly
- Fallback message displaying properly

## Possible Remaining Issues

### 1. Firebase AI API Not Enabled

**Most Likely Cause**

**Check:**

1. Go to Firebase Console: https://console.firebase.google.com/project/fieldporter-website/genai
2. Click "Get started" to enable Firebase AI API
3. Verify `firebasevertexai.googleapis.com` is enabled

### 2. API Key Permissions

**Check .env.local file has:**

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (should be 39 chars)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fieldporter-website
```

### 3. Gemini API Quota/Billing

- Verify Firebase project has billing enabled
- Check Gemini API quota limits

## Testing Instructions

### Manual Test via Browser:

1. Navigate to http://localhost:3000
2. Open chat widget
3. Send message: "How can AI help my business?"
4. Check browser console (F12) for detailed errors

### Terminal Test:

```powershell
$body = @{
  message="Test message";
  sessionId="test-$(Get-Date -Format 'yyyyMMddHHmmss')";
  conversationHistory=@();
  messageCount=1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method POST -Body $body -ContentType "application/json"
```

## Next Steps

1. **Enable Firebase AI API** (most critical)

   - Visit Firebase Console → Vertex AI page
   - Click "Get started" button
   - Wait 2-3 minutes for activation

2. **Verify API Keys**

   - Check `.env.local` has all Firebase config
   - Restart server after any env changes

3. **Check Server Logs**

   - Look for specific error messages in terminal
   - Note: Current build includes extensive debug logging

4. **Test After Each Change**
   - Rebuild: `npm run build`
   - Restart: Stop server, run `npm start`
   - Test via browser or PowerShell

## Files Modified

- `app/api/chat/route.ts` - systemInstruction format + message validation
- `AI_CHAT_FIX_REPORT.md` - this report

## Contact Support

If issues persist after enabling Firebase AI API:

1. Check terminal output for specific error messages
2. Share full error stack trace
3. Verify Firebase project billing status
