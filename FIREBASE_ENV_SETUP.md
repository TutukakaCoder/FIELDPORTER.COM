# Firebase Environment Variable Setup

## Add RESEND_API_KEY to Production

### Method 1: Firebase Console (Easiest)

1. Go to: https://console.firebase.google.com/project/fieldporter-website/functions
2. Click your function: `ssrfieldporterwebsite`
3. Click "Edit"
4. Scroll to "Runtime environment variables"
5. Click "Add variable"
6. Add:
   - Name: `RESEND_API_KEY`
   - Value: [Your Resend API key]
7. Save
8. Redeploy: `npx firebase-tools deploy --only functions`

### Method 2: CLI (Alternative)

```bash
# Create a text file with just the API key
echo "your-api-key-here" > temp-key.txt

# Set it as a secret
cat temp-key.txt | npx firebase-tools functions:secrets:set RESEND_API_KEY

# Delete temp file
del temp-key.txt

# Redeploy
npx firebase-tools deploy --only functions
```

### Verify It Works

After adding and redeploying:

1. Submit contact form at https://fieldporter-website.web.app/contact
2. Check Firebase Functions logs
3. Look for: `✅ Email sent successfully`
4. Check freddy@fieldporter.com for email
