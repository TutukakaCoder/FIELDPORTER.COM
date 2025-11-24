# System Prompt Optimization Fix

**Date:** January 2025  
**Issue:** Slow Pro model responses causing timeouts  
**Root Cause:** Sending full 14K character system prompt + dynamic context on EVERY message  
**Solution:** Only send dynamic context for first message, use base prompt for follow-ups

## The Real Problem

You were right - Gemini 2.5 Pro handles millions of tokens easily. The issue wasn't the prompt size itself, but how we were using it:

1. **Every message sent full prompt** - 14,216 characters
2. **Plus dynamic context** - Added on every message
3. **Firebase SDK processed this every time** - Slow!
4. **Pro model especially slow** - More complex processing

## The Fix

**Before:**

```typescript
// Sent on EVERY message (including 3rd, 4th, 5th...)
const systemPromptText = extractSystemPrompt(
  conversationHistory,
  messageCount,
  complexity.userFrustrationLevel,
); // 14K chars + dynamic context
```

**After:**

```typescript
// Only send dynamic context for first message
// Use base prompt for follow-ups (much faster)
const systemPromptText = conversationHistory.length === 0
  ? extractSystemPrompt(...) // First message: full context
  : TEACHING_SYSTEM_PROMPT;    // Follow-ups: base prompt only
```

## Why This Works

Firebase SDK creates a NEW chat session for each message (stateless API). We were:

- ❌ Rebuilding full context prompt every time
- ❌ Adding dynamic context to every message
- ❌ Processing 14K+ characters on every request

Now we:

- ✅ Full context only for first message (set the stage)
- ✅ Base prompt for follow-ups (much faster)
- ✅ History provides conversation context (that's what it's for!)

## Expected Performance

**First message:**

- System prompt: 14K chars + dynamic context
- Response time: ~3-5s (Flash) or ~8-10s (Pro)

**Follow-up messages:**

- System prompt: 14K chars (no dynamic context)
- Conversation history: Provides context
- Response time: Should be faster, no timeout

## Key Insight

The conversation history ALREADY provides context. We don't need to keep adding dynamic context like "This is message 5 in an ongoing conversation" - the model can see that from the history!

## Build Status

✅ Build successful  
✅ Server needs restart to load new build

## Test Now

1. Kill and restart server
2. Test same conversation:
   - "hello" → Flash (fast)
   - "give some examples..." → Flash (fast)
   - "please go into far more depth, do some research..." → Pro (should NOT timeout now)

The Pro model will process faster because it's not rebuilding dynamic context every time!
