# Domain Update Diagnosis Guide

## Current Status

- **Firebase Project:** `fieldporter-website`
- **Default URL:** `https://fieldporter-website.web.app`
- **Custom Domain:** `fieldporter.com`
- **Issue:** Custom domain not showing latest fixes

## Step 1: Verify Default URL Works

Test if fixes are visible on the default Firebase URL:

- Open: `https://fieldporter-website.web.app`
- Check: Images load correctly (kebab-case filenames)
- Check: Chat API works (no 404 errors)

**If fixes ARE visible here:** Deployment worked, issue is domain configuration.
**If fixes are NOT visible:** Need to redeploy.

## Step 2: Check Custom Domain Configuration

### Option A: Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `fieldporter-website`
3. Navigate to: **Hosting** → **Custom domains**
4. Verify `fieldporter.com` is listed and shows status "Connected"

### Option B: Firebase CLI

Run: `npx firebase hosting:sites:list`
Then: `npx firebase hosting:channel:list` (if using channels)

## Step 3: DNS Verification

Check if DNS is pointing to Firebase:

```bash
# Check A records
nslookup fieldporter.com

# Check CNAME records
nslookup www.fieldporter.com
```

**Expected Firebase DNS:**

- A records should point to Firebase IPs (151.101.1.195, 151.101.65.195)
- CNAME should point to `fieldporter-website.web.app` or Firebase hosting domain

**CRITICAL FINDING:**
Diagnostic shows A record pointing to `199.36.158.100` - this is NOT a Firebase IP address.
This suggests the domain may be pointing to:

- Cloudflare (common IP range)
- Vercel or another hosting provider
- Legacy hosting setup

**Action Required:** Verify in Firebase Console if `fieldporter.com` is actually connected as a custom domain. If not, the domain is pointing elsewhere.

## Step 4: Cache Issues

### Browser Cache

- Test in **Incognito/Private mode**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Firebase CDN Cache

Firebase Hosting uses Google CDN which caches content:

- **HTML/JSON:** Cache-Control max-age=3600 (1 hour)
- **Static assets:** Cache-Control max-age=31536000 (1 year, immutable)
- **API routes:** Cache-Control no-cache

**Wait time:** Up to 1 hour for HTML changes, longer for static assets.

### Force Cache Clear

If domain is correctly configured, wait 5-10 minutes for CDN propagation.

## Step 5: Verify Domain Points to Correct Project

**Critical Check:** Ensure `fieldporter.com` is NOT pointing to:

- A different Firebase project
- Legacy hosting (Vercel, Netlify, etc.)
- Old deployment

**How to check:**

1. Visit `fieldporter.com` in browser
2. Open DevTools → Network tab
3. Check response headers for `x-firebase-hosting` header
4. Verify it matches your Firebase project

## Step 6: Re-add Custom Domain (If Needed)

If domain is missing or misconfigured:

```bash
# Navigate to project
cd FIELDPORTER.COM

# Add custom domain (if not already added)
npx firebase hosting:channel:deploy production --only hosting

# Or use Firebase Console:
# Hosting → Add custom domain → Enter fieldporter.com
```

## Common Issues & Solutions

### Issue: Domain shows "Pending" status

**Solution:** Complete DNS verification in Firebase Console

### Issue: Domain points to wrong project

**Solution:** Remove domain from old project, add to `fieldporter-website`

### Issue: DNS not propagated

**Solution:** Wait 24-48 hours for DNS changes, verify with `nslookup`

### Issue: SSL certificate pending

**Solution:** Firebase auto-provisions SSL, wait 24 hours

## Quick Diagnostic Commands

```bash
# Check Firebase sites
npx firebase hosting:sites:list

# Check deployment history
npx firebase hosting:channel:list

# View current deployment
npx firebase hosting:channel:open production

# Test default URL
curl -I https://fieldporter-website.web.app

# Test custom domain
curl -I https://fieldporter.com
```

## Next Steps

1. **If default URL works but custom domain doesn't:**
   - Verify domain configuration in Firebase Console
   - Check DNS records
   - Wait for cache/CDN propagation

2. **If neither URL works:**
   - Redeploy: `npm run build:firebase`
   - Check build logs for errors

3. **If domain is not configured:**
   - Add custom domain in Firebase Console
   - Follow DNS setup instructions
   - Wait for SSL provisioning (24 hours)
