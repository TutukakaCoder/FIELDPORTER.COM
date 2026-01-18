# Chat Summary & Diagnostic Prompt

## Chat Summary

- **Issue:** User reported chat agent giving evasive answers when asked "what model are you?"
- **Current State:** Chat uses Gemini 2.5 Flash/Pro models
- **Requirement:** Update to use Gemini 3.0 only (tag: gemini-3.0-pro-preview or gemini-3-pro-preview)
- **Action:** Need to find all model references and update to Gemini 3.0

## Diagnostic Prompt for New Chat Session

Test these questions in a new chat to diagnose what model is actually being used:

```
what model are you?
```

```
are you gemini, claude, gpt? what model?
```

```
I need to know the exact model you're using. What AI model powers this chat?
```

**Expected Response:**

- Should identify: "Gemini 3.0" or "gemini-3.0-pro-preview" or similar
- Current system may say: "gemini-2.5-flash" or "gemini-2.5-pro"

## Files to Update for Gemini 3.0 Migration

### Primary Code File:

- `app/api/chat/route.ts` - Lines 807-808, 825-826 (model selection logic)

### Documentation Files (reference only):

- `TASK_PROMPTS.md`
- `COMPLETE_IMPLEMENTATION_REPORT.md`
- Various report files

### Test Scripts (update for verification):

- `scripts/verify-chat-implementation.js`
- `scripts/test-firebase-direct.js`
- `scripts/test-chat-models.js`

## Next Steps

1. Update route.ts to use gemini-3.0-pro-preview (or gemini-3.0-flash if preview not available)
2. Remove dynamic model routing - use only Gemini 3.0
3. Test in chat to verify model response
4. Run build to ensure no errors
