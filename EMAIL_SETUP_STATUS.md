# EMAIL NOTIFICATIONS - STATUS & SETUP GUIDE

## Current Status

### What's Working ✅

- RESEND_API_KEY is loaded correctly
- Chat email extraction and lead scoring
- Contact form submission and lead scoring
- Email service initialization
- Notification triggering logic

### What Needs Setup ⚠️

- **Domain Verification in Resend** (required for emails to actually send)

---

## Issue Identified

The email service is using `onboarding@resend.dev` as the sender (line 71 in `lib/email-service.ts`):

```typescript
from: "FIELDPORTER <onboarding@resend.dev>",
```

**This is Resend's test sender** which has limitations:

- Sandbox mode: Only sends to verified email addresses
- Cannot send to external emails until domain is verified
- Production use requires custom domain

---

## Solution: Verify Your Domain

### Step 1: Add Domain in Resend

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter: `fieldporter.com`

### Step 2: Add DNS Records

Resend will provide DNS records to add to your domain registrar:

**SPF Record (TXT)**

```
Name: @
Value: v=spf1 include:amazonses.com ~all
```

**DKIM Records (3 CNAME records)**

```
Name: resend._domainkey
Value: [Resend will provide]

Name: resend2._domainkey
Value: [Resend will provide]

Name: resend3._domainkey
Value: [Resend will provide]
```

**DMARC Record (TXT)**

```
Name: _dmarc
Value: v=DMARC1; p=none;
```

### Step 3: Verify Domain

After adding DNS records (wait 5-10 minutes for propagation):

1. Return to Resend dashboard
2. Click "Verify" on your domain
3. Wait for verification confirmation

### Step 4: Update Email Service

Once verified, update `lib/email-service.ts`:

**Change line 71 from:**

```typescript
from: "FIELDPORTER <onboarding@resend.dev>",
```

**To:**

```typescript
from: "FIELDPORTER <notifications@fieldporter.com>",
```

---

## Testing Before Domain Verification

### Option 1: Add Your Email as Verified

In Resend dashboard:

1. Go to Settings → Verified Emails
2. Add `freddy@fieldporter.com`
3. Verify via email confirmation

Now test emails will reach your inbox.

### Option 2: Check Fallback Logs

Without verification, the service logs notification details to console. Check terminal for:

```
🚨 FALLBACK NOTIFICATION - EMAIL SERVICE UNAVAILABLE 🚨
```

---

## Current Configuration

**Environment Variable:** ✅ RESEND_API_KEY is set  
**API Key Location:** `.env.local`  
**Startup Script:** `start-dev.ps1` (loads env vars automatically)

**How to Start Server:**

```powershell
.\start-dev.ps1
```

**DO NOT use `npm run dev`** - it won't load `.env.local` correctly on Windows.

---

## Notification Triggers

### Contact Form

- **Trigger:** Lead score ≥ 5 (basically all submissions)
- **Recipient:** freddy@fieldporter.com
- **Format:** Professional HTML email with lead details

### Chat Widget

- **Trigger:** Email provided OR lead score ≥ 10
- **Recipient:** freddy@fieldporter.com
- **Format:** Qualified lead notification

### Newsletter

- **Trigger:** All signups
- **Recipient:** freddy@fieldporter.com
- **Format:** Simple notification

---

## Verification Checklist

- [ ] Resend API key added to `.env.local`
- [ ] Server started with `.\start-dev.ps1`
- [ ] Domain added in Resend dashboard
- [ ] DNS records added to domain registrar
- [ ] Domain verified in Resend
- [ ] Email sender updated to `notifications@fieldporter.com`
- [ ] Test email sent successfully

---

## Current Test Results

**Chat Endpoint:** ✅ Working

```json
{
  "shouldNotify": true,
  "userEmail": "test@fieldporter.com",
  "leadScore": 5
}
```

**Contact Form:** ✅ Working

```json
{
  "success": true,
  "leadScore": 10
}
```

**Email Sending:** ⚠️ Pending domain verification

---

## Next Actions Required

1. **Immediate:** Verify domain in Resend (15-20 min setup)
2. **After Verification:** Update sender email in code
3. **Testing:** Submit test form to verify emails arrive

---

**Updated:** November 6, 2025  
**Status:** Configuration complete, awaiting domain verification
