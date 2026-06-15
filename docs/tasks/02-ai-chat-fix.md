# Task 02: AI Chat Fix

## Goal

Get the site AI chat working again. Suspected cause: decommissioned Gemini model. Target model: **Gemini 3.1 Flash** (or current equivalent — verify against Google AI model list).

---

## Current state (code)

| Area | File | Notes |
|------|------|-------|
| Chat UI | `components/chat/enhanced-chat-widget.tsx` | Main widget |
| Mobile/desktop | `responsive-chat-manager.tsx`, `mobile-chat-interface.tsx`, `desktop-chat-sidebar.tsx` | |
| Client API call | `lib/enhanced-chat-service.ts` | POST `/api/chat`, 35s timeout |
| System prompt | `lib/chat/prompts.ts` | Full service knowledge — still AI-first / 4 equal services |
| Gemini helpers | `lib/chat/gemini-helpers.ts` | History format for Firebase AI |
| Knowledge | `lib/chatbot-knowledge-base.ts`, `lib/company-knowledge.ts` | |
| Firebase persistence | `lib/optimized-firebase-chat-service.ts` | |
| Mount point | `components/layout/conditional-fieldporter-extras.tsx` | Skipped on partner page |
| **API route** | `app/api/chat/route.ts` | **MISSING from workspace** — chat cannot work without it |
| Legacy config | `config/constants.ts` → `DEEPSEEK_CONFIG` | Stale; points to `/api/ai/chat` |
| Verify script | `scripts/verify-chat-model-3-0.js` | Expects `gemini-3.0-pro-preview` |
| Docs | `docs/FIELDPORTER_AI_CHAT_COMPREHENSIVE_ANALYSIS.md` | References Gemini 2.5 Flash |

---

## Reported symptoms

- Chat not responding / errors in console
- Likely wrong or retired model name in API route
- User will provide error logs in follow-up chat

---

## Work required

1. **Restore or locate `app/api/chat/route.ts`** — may exist only on deployed branch or was never committed
2. **Update model** to Gemini 3.1 Flash (confirm exact API string e.g. `gemini-3.1-flash-preview` or whatever Google documents in June 2025)
3. Verify Firebase AI Logic SDK init (`lib/firebase.ts`, env vars in `.env.local`)
4. Run `scripts/verify-chat-model-3-0.js` or update script for new model
5. Remove stale DeepSeek references if still wired anywhere
6. After content overhaul (Task 01/03): update `lib/chat/prompts.ts` so chat describes software-first positioning

---

## Env / config to check

- `.env.local` — Firebase / Google AI keys (do not commit)
- Firebase project AI Logic enabled
- Model availability in Firebase vs direct Google AI API

---

## Open questions

1. Paste browser console + network tab errors from failed chat request
2. Is API route deployed but not in local repo? Check git history / production
3. Confirm preferred model: Gemini 3.1 Flash vs 2.5 Flash fallback
4. Should chat stay on Firebase AI Logic SDK or move to direct `@google/generative-ai`?

---

## Research prompt (paste into new chat)

```
FieldPorter website AI chat is broken. Client posts to /api/chat via lib/enhanced-chat-service.ts but app/api/chat/route.ts is missing locally. Docs say Firebase AI Logic SDK + Gemini.

Research task:
1. List current available Gemini models (June 2025) — confirm gemini-3.1-flash exact model ID for Firebase AI Logic SDK and @google/generative-ai.
2. Provide minimal working app/api/chat/route.ts pattern for Next.js 14+ App Router using Firebase AI Logic getGenerativeModel.
3. Common failure modes when model is decommissioned — error signatures.
4. Best practice: Flash for chat widget vs Pro for complex queries.

I will paste console/network errors separately.

Files: lib/enhanced-chat-service.ts, lib/chat/prompts.ts, lib/chat/gemini-helpers.ts, scripts/verify-chat-model-3-0.js

Return: model string to use, route.ts skeleton, env vars needed, debugging checklist. Then implement.
```

---

## Acceptance criteria

- [ ] Chat sends message and receives response locally and in production
- [ ] Model is current, not decommissioned
- [ ] `app/api/chat/route.ts` exists in repo
- [ ] Stale DeepSeek paths removed or documented as dead
- [ ] `npm run build` passes
- [ ] Response time reasonable (<5s typical)
