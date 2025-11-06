# Email Notification System - Configuration Required

**Date:** November 6, 2025  
**Issue:** Email notifications to freddy@fieldporter.com not being sent  
**Status:** ⚠️ CONFIGURATION REQUIRED

---

## Summary

The email notification system is **fully functional** in the code, but requires the `RESEND_API_KEY` environment variable to actually send emails.

**Current Behavior:**

- Lead scoring: ✅ Working
- Email extraction: ✅ Working
- Notification triggering: ✅ Working
- Email sending: ❌ Disabled (missing API key)

---

## What You Need To Do

### 1. Get Resend API Key

Visit: https://resend.com/api-keys

- Sign in or create account
- Create new API key
- Copy the key (format: `re_...`)

### 2. Add to Environment File

Open: `FIELDPORTER.COM/.env.local`

Add this line:

```bash
RESEND_API_KEY=re_your_actual_key_here
```

### 3. Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## How It Works (Once Configured)

### Notification Flow:

```
User provides email
  ↓
Email extracted (freddy.hopkins2@gmail.com)
  ↓
Lead score calculated (+5 points for email)
  ↓
shouldNotify = true (email provided)
  ↓
notificationService.sendLeadNotification()
  ↓
emailService.sendLeadNotification()
  ↓
Resend API sends email to freddy@fieldporter.com
```

### Email Contains:

- 🔥 Subject: "QUALIFIED LEAD: [QUALIFICATION] (Score: X) - user@example.com"
- Lead score and qualification level
- User's message
- User's email/phone (if provided)
- Qualification signals (keywords detected)
- Direct link to Firebase conversation
- Timestamp

### Trigger Conditions:

Notification sent when ANY of these are true:

- Lead score ≥ 10 points
- Email address provided (+5 points = triggers immediately)
- Phone number provided (+4 points + other signals)

---

## Verification

### Check Configuration:

```bash
node check-email-config.js
```

This will tell you if `RESEND_API_KEY` is set.

### Test the System:

1. Start dev server: `npm run dev`
2. Open chat widget
3. Send: "My email is test@example.com"
4. Check freddy@fieldporter.com inbox
5. Should receive notification within seconds

---

## Code References

**Email Service:** `lib/email-service.ts`

- Line 30: Checks for RESEND_API_KEY
- Line 63: Sends to freddy@fieldporter.com
- Line 85-93: sendLeadNotification() method

**Notification Service:** `lib/notification-service.ts`

- Line 21-65: sendLeadNotification() triggers email

**Chat API:** `app/api/chat/route.ts`

- Line 592-595: Determines shouldNotify
- Line 598-616: Calls notification service

---

## Environment Variables Needed

```bash
# REQUIRED for email notifications
RESEND_API_KEY=re_your_key_here

# Optional (defaults to freddy@fieldporter.com)
NOTIFICATION_EMAIL=freddy@fieldporter.com
```

---

## Fallback Behavior (When Key Missing)

When `RESEND_API_KEY` is not set:

- Console log shows detailed notification data
- Firebase still logs the notification
- No actual email sent
- Console warning: "⚠️ RESEND_API_KEY not found - email notifications disabled"

---

## Production Deployment

Remember to add `RESEND_API_KEY` to your production environment variables (Vercel/hosting dashboard).

---

**Status:** Waiting for RESEND_API_KEY configuration  
**Next Step:** Add API key to .env.local and restart server
